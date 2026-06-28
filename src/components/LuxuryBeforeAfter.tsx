import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export type ResultStats = {
  timeline: string;
  metric: string;
  metricLabel: string;
  duration: string;
};

export type LuxuryBeforeAfterProps = {
  beforeImage: string;
  afterImage: string;
  treatmentName: string;
  treatmentCategory: string;
  resultStats: ResultStats;
  defaultPosition?: number;
  objectPosition?: string;
  onProgress?: (revealed: number) => void;
  onInteract?: () => void;
};

export function LuxuryBeforeAfter({
  beforeImage,
  afterImage,
  treatmentName,
  treatmentCategory,
  resultStats,
  defaultPosition = 100,
  objectPosition = "50% 40%",
  onProgress,
  onInteract,
}: LuxuryBeforeAfterProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const frameWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastXRef = useRef(0);
  const hintAbortRef = useRef<AbortController | null>(null);
  const interactedRef = useRef(false);
  const crossedHalfRef = useRef(false);

  const position = useMotionValue(defaultPosition);
  const positionSpring = useSpring(position, { stiffness: 480, damping: 44, mass: 0.3 });
  const maskWidth = useTransform(positionSpring, (v) => `${v}%`);
  const dividerLeft = useTransform(positionSpring, (v) => `${v}%`);
  const beforeLabelOpacity = useTransform(positionSpring, (v) => Math.min(1, v / 40));
  const afterLabelOpacity = useTransform(positionSpring, (v) => Math.min(1, (100 - v) / 40));
  const handleRotate = useMotionValue(0);

  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [ariaReveal, setAriaReveal] = useState(0);
  const [frameWidth, setFrameWidth] = useState(0);

  const imgPos = { objectPosition } as const;

  const emitProgress = useCallback(
    (cover: number) => {
      const revealed = Math.round(100 - cover);
      setAriaReveal(revealed);
      onProgress?.(revealed);
      if (revealed >= 50 && !crossedHalfRef.current) {
        crossedHalfRef.current = true;
        setShowResultCard(true);
      }
    },
    [onProgress],
  );

  const measureFrame = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    frameWidthRef.current = w;
    setFrameWidth(w);
  }, []);

  const setPositionFromClientX = useCallback(
    (clientX: number) => {
      const el = frameRef.current;
      if (!el) return;
      const { left, width } = el.getBoundingClientRect();
      const dx = clientX - lastXRef.current;
      lastXRef.current = clientX;
      if (Math.abs(dx) > 0.5) {
        handleRotate.set(Math.max(-12, Math.min(12, dx * 0.35)));
      }
      const next = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
      position.set(next);
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        emitProgress(position.get());
      });
    },
    [position, handleRotate, emitProgress],
  );

  const markInteracted = useCallback(() => {
    if (!interactedRef.current) {
      interactedRef.current = true;
      setInteracted(true);
      onInteract?.();
    }
  }, [onInteract]);

  const cancelHint = () => {
    hintAbortRef.current?.abort();
    hintAbortRef.current = null;
  };

  const playHint = useCallback(async () => {
    cancelHint();
    const ac = new AbortController();
    hintAbortRef.current = ac;
    position.set(defaultPosition);
    emitProgress(defaultPosition);
    await new Promise((r) => setTimeout(r, 480));
    if (ac.signal.aborted) return;
    await animate(position, 35, { duration: 1.1, ease: EASE });
    if (ac.signal.aborted) return;
    await animate(position, 65, { duration: 0.8, ease: EASE });
    if (ac.signal.aborted) return;
    await animate(position, defaultPosition, { duration: 1, ease: EASE });
    emitProgress(defaultPosition);
  }, [position, defaultPosition, emitProgress]);

  useEffect(() => {
    measureFrame();
    const ro = new ResizeObserver(measureFrame);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, [measureFrame]);

  useEffect(() => {
    const unsub = positionSpring.on("change", (v) => emitProgress(v));
    return unsub;
  }, [positionSpring, emitProgress]);

  useEffect(() => {
    interactedRef.current = false;
    crossedHalfRef.current = false;
    setInteracted(false);
    setDragging(false);
    setShowResultCard(false);
    cancelHint();
    position.set(defaultPosition);
    emitProgress(defaultPosition);
    const t = setTimeout(() => {
      if (!interactedRef.current) void playHint();
    }, 550);
    return () => {
      clearTimeout(t);
      cancelHint();
    };
  }, [beforeImage, afterImage, defaultPosition, position, playHint, emitProgress]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    cancelHint();
    markInteracted();
    lastXRef.current = e.clientX;
    frameRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    setPositionFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    frameRef.current?.releasePointerCapture(e.pointerId);
    setDragging(false);
    animate(handleRotate, 0, { duration: 0.35, ease: EASE });
  };

  const showHandle = !interacted || dragging;

  const sharedImgClass =
    "pointer-events-none absolute top-0 left-0 h-full select-none object-cover";

  return (
    <div
      className="group/compare relative w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        ref={frameRef}
        className={cn(
          "photo-frame relative aspect-[3/4] w-full touch-none overflow-hidden transition-transform duration-700 ease-out sm:aspect-[4/5] lg:aspect-[16/11]",
          hovering && !dragging && "scale-[1.02]",
          dragging ? "cursor-ew-resize" : "cursor-grab",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={(e) => dragging && setPositionFromClientX(e.clientX)}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label={`${treatmentName} before and after comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaReveal}
        aria-valuetext={`${ariaReveal}% of after result revealed`}
        tabIndex={0}
        onKeyDown={(e) => {
          markInteracted();
          cancelHint();
          let next = position.get();
          if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.max(0, next - 5);
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.min(100, next + 5);
          if (e.key === "End") next = 0;
          if (e.key === "Home") next = 100;
          if (next !== position.get()) {
            position.set(next);
            emitProgress(next);
          }
        }}
      >
        {/* After — base layer, locked geometry */}
        <img
          src={afterImage}
          alt={`After ${treatmentName}`}
          className={cn(sharedImgClass, "z-0 w-full")}
          style={imgPos}
          draggable={false}
          loading="lazy"
          decoding="async"
        />

        {/* Before — top layer, width-masked; image spans full frame width */}
        <motion.div
          className="absolute inset-y-0 left-0 z-10 overflow-hidden will-change-[width]"
          style={{ width: maskWidth }}
        >
          <img
            src={beforeImage}
            alt={`Before ${treatmentName}`}
            className={sharedImgClass}
            style={{
              ...imgPos,
              width: frameWidth > 0 ? frameWidth : "100%",
              maxWidth: "none",
            }}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <div className="photo-vignette pointer-events-none absolute inset-0 z-20" aria-hidden />
        <div className="photo-grain pointer-events-none absolute inset-0 z-20" aria-hidden />

        <motion.span
          className="pointer-events-none absolute left-4 top-4 z-30 rounded-full border border-cream/30 bg-cream/15 px-3.5 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-cream backdrop-blur-md"
          style={{ opacity: beforeLabelOpacity }}
        >
          Before
        </motion.span>
        <motion.span
          className="pointer-events-none absolute right-4 top-4 z-30 rounded-full border border-cream/20 bg-ink/20 px-3.5 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-cream backdrop-blur-md"
          style={{ opacity: afterLabelOpacity }}
        >
          After
        </motion.span>

        <AnimatePresence>
          {showResultCard && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="pointer-events-none absolute bottom-5 right-4 z-30 max-w-[12rem] rounded-sm border border-cream/25 bg-cream/12 p-3.5 backdrop-blur-xl sm:bottom-6 sm:right-6"
            >
              <p className="text-[0.625rem] uppercase tracking-[0.18em] text-cream/80">
                {resultStats.timeline}
              </p>
              <motion.p
                key={resultStats.metric}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="display mt-1.5 text-xl leading-none text-cream"
              >
                {resultStats.metric}
              </motion.p>
              <motion.p
                key={treatmentName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 }}
                className="mt-1.5 text-[0.7rem] leading-snug text-cream/85"
              >
                {treatmentName} · {resultStats.metricLabel}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="pointer-events-none absolute top-0 z-40 h-full w-[2px] bg-[oklch(0.82_0.055_75)] shadow-[0_0_18px_oklch(0.75_0.07_75/0.55),2px_0_24px_oklch(0_0_0/0.18)]"
          style={{ left: dividerLeft, x: "-50%" }}
        />

        <AnimatePresence>
          {showHandle && (
            <motion.div
              className="absolute top-1/2 z-50 -translate-y-1/2"
              style={{ left: dividerLeft, x: "-50%", rotate: handleRotate }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{
                opacity: 1,
                scale: dragging ? 1.1 : hovering ? 1.05 : 1,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/18 backdrop-blur-2xl sm:h-[3.25rem] sm:w-[3.25rem]",
                  "shadow-[0_4px_24px_oklch(0_0_0/0.22),inset_0_1px_0_oklch(1_0_0/0.35)]",
                  !interacted && "animate-[pulse_2.4s_ease-in-out_infinite]",
                )}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M6.5 4.5L3.5 9L6.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    className="text-ink/75"
                  />
                  <path
                    d="M11.5 4.5L14.5 9L11.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    className="text-ink/75"
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!interacted && !dragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-x-0 bottom-7 z-30 flex justify-center"
            >
              <span className="rounded-full border border-cream/20 bg-ink/35 px-4 py-1.5 text-[0.625rem] uppercase tracking-[0.18em] text-cream/90 backdrop-blur-md">
                Peel to reveal · {treatmentCategory}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
