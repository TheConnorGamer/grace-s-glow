import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LuxuryBeforeAfter } from "@/components/LuxuryBeforeAfter";

export type RevealCase = {
  id: string;
  label: string;
  headline: string;
  timeline: string;
  metric: string;
  metricLabel: string;
  duration: string;
  after: string;
  before: string;
  focus: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

type SectionProps = {
  cases: RevealCase[];
};

export function ResultsRevealSection({ cases }: SectionProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const current = cases[active];

  return (
    <section id="results" className="section-pad overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-5 lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="label-caps flex items-center gap-3">
              <span className="h-px w-8 bg-clay/50" aria-hidden />
              Results
            </p>
            <h2 className="display mt-5 text-balance text-[clamp(2rem,4.5vw,3.25rem)] text-ink">
              Proof you can{" "}
              <span className="display-italic text-clay">feel in the skin.</span>
            </h2>
            <p className="prose-calm mt-5 max-w-md">
              Unretouched photographs, shared with permission. One frame — peel back
              the before to uncover the result.
            </p>

            <div className="mt-8 hidden lg:block" role="tablist" aria-label="Treatment results">
              <ul className="space-y-1">
                {cases.map((c, i) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={active === i}
                      onClick={() => setActive(i)}
                      className={cn(
                        "w-full rounded-sm px-4 py-3.5 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
                        active === i
                          ? "bg-cream shadow-sm"
                          : "text-muted-foreground hover:bg-cream/50 hover:text-ink",
                      )}
                    >
                      <span className="label-caps !text-[0.58rem] text-clay">{c.headline}</span>
                      <AnimatePresence mode="wait">
                        {active === i ? (
                          <motion.span
                            key={c.label}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 block font-medium text-ink"
                          >
                            {c.label}
                          </motion.span>
                        ) : (
                          <span className="mt-1 block font-medium text-ink">{c.label}</span>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 hidden lg:block">
              <div className="flex items-center justify-between label-caps !text-[0.58rem]">
                <span>Reveal progress</span>
                <motion.span key={progress} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
                  {progress}%
                </motion.span>
              </div>
              <div className="mt-2 h-px w-full overflow-hidden bg-border">
                <motion.div
                  className="h-full bg-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: EASE }}
                />
              </div>
            </div>

            <div className="mt-8 hidden flex-wrap gap-3 lg:flex">
              <div className="flex items-center gap-2 rounded-sm border border-border/80 bg-cream/60 px-3 py-2">
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-[0.75rem] text-ink">5.0 · Faces reviews</span>
              </div>
              <div className="rounded-sm border border-border/80 bg-cream/60 px-3 py-2 text-[0.75rem] text-ink">
                73 treatments performed
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.08, ease: EASE }}
          >
            <div
              className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
            >
              {cases.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.14em]",
                    active === i ? "bg-ink text-cream" : "border border-border bg-cream text-ink/70",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <p className="label-caps mb-4 hidden lg:block">{current.duration}</p>

            <div className="lux-shadow relative rounded-sm bg-bone p-1 sm:p-1.5">
              <LuxuryBeforeAfter
                key={current.id}
                beforeImage={current.before}
                afterImage={current.after}
                treatmentName={current.label}
                treatmentCategory={current.headline}
                objectPosition={current.focus}
                defaultPosition={100}
                resultStats={{
                  timeline: current.timeline,
                  metric: current.metric,
                  metricLabel: current.metricLabel,
                  duration: current.duration,
                }}
                onProgress={setProgress}
              />
            </div>

            <div className="mt-4 flex items-center justify-between lg:hidden">
              <motion.span
                key={progress}
                className="label-caps !text-[0.58rem]"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                Reveal {progress}%
              </motion.span>
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
