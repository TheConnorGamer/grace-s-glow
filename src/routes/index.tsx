import { createFileRoute } from '@tanstack/react-router'
import { ResultsRevealSection, type RevealCase } from "@/components/ResultsRevealSection";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Star,
  ArrowUpRight,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

import hero from "@/assets/hero.jpg";
import clinic from "@/assets/clinic.jpg";
import grace from "@/assets/grace.jpg";
import tAnti from "@/assets/treatment-antiwrinkle.jpg";
import tFill from "@/assets/treatment-fillers.jpg";
import tBoost from "@/assets/treatment-skinboosters.jpg";
import tFacial from "@/assets/treatment-facials.jpg";
import tVit from "@/assets/treatment-vitamins.jpg";
import tPeel from "@/assets/treatment-peels.jpg";
import ctaImg from "@/assets/cta.jpg";
import transformation from "@/assets/transformation.jpg";

const BOOKING_URL =
  "https://facesconsent.com/clinics/glow-by-grace-02cb6071feeb/grace-jones-1?clinicName=grace-jones-1";
const WHATSAPP_URL = `https://wa.me/447808801607?text=${encodeURIComponent(
  "Hi Grace! I'd love to enquire about a treatment at Glow By Grace.",
)}`;
const PHONE_URL = "tel:+447808801607";
const EMAIL_URL = "mailto:glow.bygrace@outlook.com";

function WhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glow By Grace — Luxury Aesthetics Clinic in Henley-on-Thames" },
      {
        name: "description",
        content:
          "An intimate, results-led aesthetics clinic in Sonning Common. Natural anti-wrinkle treatments, dermal fillers, skin boosters, facials and vitamin therapy — by Grace.",
      },
      { property: "og:title", content: "Glow By Grace — Luxury Aesthetics, Henley-on-Thames" },
      {
        property: "og:description",
        content:
          "Confidence, refined. Bespoke, natural aesthetic treatments by Grace in Henley-on-Thames.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Home,
});

/* -------------------------------------------------------------------------- */
/*  Design primitives — varied rhythm, not one AI template                     */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type RevealMode = "rise" | "fade" | "slide" | "scale";

const revealVariants: Record<
  RevealMode,
  { hidden: object; show: (delay: number) => object }
> = {
  rise: {
    hidden: { opacity: 0, y: 20 },
    show: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: EASE, delay },
    }),
  },
  fade: {
    hidden: { opacity: 0 },
    show: (delay) => ({
      opacity: 1,
      transition: { duration: 0.6, ease: EASE_OUT, delay },
    }),
  },
  slide: {
    hidden: { opacity: 0, x: -16 },
    show: (delay) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: EASE, delay },
    }),
  },
  scale: {
    hidden: { opacity: 0, scale: 0.98 },
    show: (delay) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: EASE_OUT, delay },
    }),
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
  mode = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  mode?: RevealMode;
}) {
  const v = revealVariants[mode];
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: v.hidden,
        show: v.show(delay),
      }}
    >
      {children}
    </motion.div>
  );
}

type LabelTone = "line" | "num" | "plain";

function SectionLabel({
  children,
  tone = "line",
  index,
  className = "",
}: {
  children: React.ReactNode;
  tone?: LabelTone;
  index?: string;
  className?: string;
}) {
  if (tone === "num" && index) {
    return (
      <div className={`flex items-baseline gap-4 ${className}`}>
        <span className="display text-4xl text-gold/80 lg:text-5xl">{index}</span>
        <span className="label-caps">{children}</span>
      </div>
    );
  }
  if (tone === "plain") {
    return <p className={`label-caps ${className}`}>{children}</p>;
  }
  return (
    <div className={`label-caps flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-clay/50" aria-hidden />
      {children}
    </div>
  );
}

function SectionTitle({
  children,
  accent,
  className = "",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  accent?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={`display text-balance text-ink ${className}`}>
      {children}
      {accent ? (
        <>
          {" "}
          <span className="display-italic text-clay">{accent}</span>
        </>
      ) : null}
    </Tag>
  );
}

function BookButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
} & React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
      />
    </a>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
} as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
} as const;

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased selection:bg-[var(--gold-soft)] selection:text-ink">
      <AnnouncementBar />
      <Nav />
      <Hero />
      <TrustStrip />
      <Intro />
      <Treatments />
      <AboutGrace />
      <WhyUs />
      <Transformations />
      <Testimonials />
      <Process />
      <InstagramFeed />
      <FinalCTA />
      <Footer />
      <FloatingActions />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Announcement                                                              */
/* -------------------------------------------------------------------------- */

function AnnouncementBar() {
  const items = [
    "New autumn appointments open",
    "Complimentary 15-minute consultations",
    "Sonning Common · By appointment",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="border-b border-cream/10 bg-ink text-cream/90">
      <div className="mx-auto max-w-[1400px] overflow-hidden py-2.5">
        <div className="marquee-track gap-16 px-6 label-caps !text-cream/75">
          {doubled.map((msg, i) => (
            <span key={`${msg}-${i}`} className="flex shrink-0 items-center gap-16">
              {msg}
              <span className="text-gold-soft/60" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nav                                                                       */
/* -------------------------------------------------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    ["Treatments", "#treatments"],
    ["About", "#about"],
    ["Results", "#results"],
    ["Journal", "#instagram"],
    ["Visit", "#footer"],
  ];

  const closeMenu = () => setOpen(false);

  const mobileMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col bg-cream touch-none"
              style={{
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                <a href="#" onClick={closeMenu} className="flex flex-col">
                  <span className="display text-[1.45rem] leading-none text-ink">Glow</span>
                  <span className="label-caps !text-[0.58rem] !tracking-[0.22em] text-clay">
                    by Grace
                  </span>
                </a>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-cream text-ink transition-colors hover:border-ink/30"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-8" aria-label="Mobile">
                <ul className="divide-y divide-border/50">
                  {links.map(([label, href], i) => (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between py-5"
                      >
                        <span className="display text-[clamp(1.75rem,7vw,2.35rem)] leading-none text-ink transition-colors group-active:text-clay">
                          {label}
                        </span>
                        <span className="label-caps !text-[0.55rem] text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-3 border-t border-border/60 px-5 py-5">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="btn-ghost w-full justify-center"
                >
                  <WhatsApp className="h-4 w-4" />
                  WhatsApp
                </a>
                <BookButton className="w-full justify-center" onClick={closeMenu}>
                  Book consultation
                </BookButton>
                <p className="text-center text-[0.7rem] text-muted-foreground">
                  Sonning Common · RG9 5HH
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <header
      className={`sticky top-0 z-50 transition-[background,box-shadow,border-color] duration-500 ${
        scrolled
          ? "border-b border-border/70 bg-cream/97 shadow-[0_8px_30px_-20px_oklch(0.27_0.018_50/0.15)] backdrop-blur-xl"
          : "border-b border-transparent bg-cream/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 lg:px-10 lg:py-5">
        <a href="#" className="group flex shrink-0 flex-col">
          <span className="display text-[1.55rem] leading-none tracking-tight text-ink lg:text-[1.65rem]">
            Glow
          </span>
          <span className="label-caps !text-[0.6rem] !tracking-[0.24em] text-clay transition-colors group-hover:text-ink">
            by Grace
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex xl:gap-10" aria-label="Primary">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="label-caps !text-[0.625rem] text-ink/65 transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-[#25D366] hover:text-[#25D366] lg:inline-flex"
            aria-label="Message on WhatsApp"
          >
            <WhatsApp className="h-4 w-4" />
          </a>
          <BookButton className="!hidden !py-3 !text-[0.625rem] lg:!inline-flex">
            Book
          </BookButton>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-cream text-ink transition-colors hover:border-ink/30 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {mobileMenu}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border/50">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="relative z-10 flex flex-col justify-center px-5 pb-14 pt-10 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="label-caps mb-6">
              Sonning Common · Est. 2021
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="display max-w-[14ch] text-[clamp(2.75rem,6.5vw,5.75rem)] text-ink"
            >
              Look like you,
              <span className="block display-italic text-clay">only rested.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="prose-calm mt-8 max-w-md">
              A private aesthetics studio for natural anti-wrinkle work, fillers,
              facials and skin boosters — planned around your face, not a menu.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
              <BookButton>Book consultation</BookButton>
              <a href="#treatments" className="btn-ghost !border-transparent !px-4 hover:!bg-transparent hover:!text-clay">
                View treatments
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 inline-flex items-center gap-4 border border-border/80 bg-cream/60 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                ))}
              </div>
              <div className="text-[0.8125rem] leading-snug text-ink">
                <span className="font-medium">5.0</span>
                <span className="text-muted-foreground"> · 73 treatments on Faces</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative min-h-[52svh] lg:min-h-[calc(100svh-7rem)]">
          <motion.div style={{ y }} className="absolute inset-0">
            <img
              src={hero}
              alt="Client with natural, glowing skin after treatment at Glow By Grace"
              className="h-full w-full object-cover object-[center_20%]"
              width={1600}
              height={1920}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/20 to-transparent lg:via-transparent" />
          </motion.div>

          <blockquote className="absolute bottom-4 left-4 right-4 border-l-2 border-gold bg-cream/92 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:max-w-xs sm:p-5 lg:bottom-10 lg:left-8">
            <p className="font-serif text-[1.05rem] italic leading-snug text-ink">
              I treat every face as a portrait — never a formula.
            </p>
            <footer className="mt-3 label-caps !text-[0.6rem]">Grace · Founder</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Trust strip                                                               */
/* -------------------------------------------------------------------------- */

function TrustStrip() {
  const items = [
    "Fully insured practitioner",
    "Medical-grade products only",
    "5.0 client rating",
    "Consultation-first approach",
    "Private studio setting",
  ];
  const track = [...items, ...items];
  return (
    <section aria-label="Credentials" className="border-b border-border/60 bg-sand/50">
      <div className="overflow-hidden py-4">
        <div className="marquee-track gap-12 px-6 label-caps !text-[0.625rem] !text-ink/55">
          {track.map((label, i) => (
            <span key={`${label}-${i}`} className="flex shrink-0 items-center gap-12">
              {label}
              <span className="text-gold/70" aria-hidden>
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Intro                                                                     */
/* -------------------------------------------------------------------------- */

function Intro() {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-5" mode="slide">
          <SectionLabel tone="plain">The studio</SectionLabel>
          <SectionTitle
            className="mt-5 text-[clamp(2rem,4vw,3.25rem)]"
            accent="not a conveyor belt."
          >
            Aesthetics,
          </SectionTitle>
          <p className="prose-calm mt-8 max-w-md">
            Treatments here start with listening. Grace maps what your skin and
            structure actually need — then builds a plan you can trust, without
            pressure to do more than necessary.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" mode="fade" delay={0.08}>
          <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={clinic}
                alt="Interior of the Glow By Grace treatment studio"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-end gap-4">
              <p className="prose-calm border-l border-gold/60 pl-5">
                Low light, linen textures, one client at a time. The studio is
                designed to feel like an hour stolen from the rest of your week.
              </p>
              <p className="prose-calm pl-5 text-[0.875rem]">
                17 Shiplake Bottom, Sonning Common — appointments by booking only.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Treatments                                                                */
/* -------------------------------------------------------------------------- */

const treatments = [
  {
    n: "01",
    title: "Anti-Wrinkle Treatments",
    tagline: "Soften time, never your expression.",
    img: tAnti,
    body:
      "Precision-placed muscle relaxants for the forehead, frown and eye area. Refreshed, never frozen.",
    from: "from £180",
  },
  {
    n: "02",
    title: "Dermal Fillers",
    tagline: "Restore the volume only you remember.",
    img: tFill,
    body:
      "Bespoke lip, cheek and chin enhancement using premium HA fillers — proportion-led, sculpted, undetectable.",
    from: "from £260",
  },
  {
    n: "03",
    title: "Skin Boosters",
    tagline: "The lit-from-within glow.",
    img: tBoost,
    body:
      "Micro-injections of hyaluronic acid that hydrate from the inside out — for skin that catches the light.",
    from: "from £220",
  },
  {
    n: "04",
    title: "Signature Facials",
    tagline: "An hour reserved entirely for your skin.",
    img: tFacial,
    body:
      "Hand-tailored facial rituals using medical-grade actives, cool globes, lymphatic massage and aromatic steam.",
    from: "from £95",
  },
  {
    n: "05",
    title: "Vitamin Injections",
    tagline: "Wellness, in a single vial.",
    img: tVit,
    body:
      "B12, biotin and immunity boosters to support energy, hair, skin and balance — administered safely in clinic.",
    from: "from £45",
  },
  {
    n: "06",
    title: "Chemical Peels",
    tagline: "Reveal the skin underneath.",
    img: tPeel,
    body:
      "Gentle, prescription-grade resurfacing that brightens tone, refines texture and softens fine lines.",
    from: "from £120",
  },
];

function Treatments() {
  const [active, setActive] = useState(0);
  const current = treatments[active];

  return (
    <section id="treatments" className="section-pad bg-bone">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start" mode="slide">
            <SectionLabel tone="num" index="02">
              Treatments
            </SectionLabel>
            <SectionTitle className="mt-6 text-[clamp(2rem,3.5vw,3rem)]" accent="priced honestly.">
              The menu,
            </SectionTitle>
            <p className="prose-calm mt-6 max-w-sm">
              Starting prices below. Your plan is confirmed in consultation — nothing
              is booked until you are ready.
            </p>
            <BookButton className="mt-8 hidden lg:inline-flex">View availability</BookButton>
          </Reveal>

          <div className="lg:col-span-8">
            {/* Mobile / tablet preview */}
            <div className="relative mb-6 aspect-[16/10] overflow-hidden lg:hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.n}
                  src={current.img}
                  alt={current.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="label-caps !text-cream/80">{current.n}</p>
                <p className="display mt-1 text-2xl text-cream">{current.title}</p>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(240px,38%)] lg:gap-10">
              <ul className="border-t border-border/70" role="list">
                {treatments.map((t, i) => {
                  const open = active === i;
                  return (
                    <li key={t.n} className="border-b border-border/70">
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-expanded={open}
                        className={`group relative flex w-full items-start gap-4 py-5 text-left outline-none transition-colors sm:py-6 ${
                          open
                            ? "bg-cream/50 pl-4"
                            : "bg-transparent pl-0 hover:bg-cream/30"
                        } focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bone`}
                      >
                        {open ? (
                          <span
                            className="absolute bottom-4 left-0 top-4 w-0.5 bg-gold"
                            aria-hidden
                          />
                        ) : null}

                        <div className="min-w-0 flex-1">
                          <span className="label-caps !text-[0.6rem] text-clay">{t.n}</span>
                          <h3
                            className={`display mt-1.5 text-[clamp(1.25rem,2.2vw,1.75rem)] transition-colors ${
                              open ? "text-ink" : "text-ink/75 group-hover:text-ink"
                            }`}
                          >
                            {t.title}
                          </h3>

                          <AnimatePresence initial={false}>
                            {open ? (
                              <motion.div
                                key="body"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <p className="display-italic mt-3 text-[0.95rem] text-clay sm:text-[1rem]">
                                  {t.tagline}
                                </p>
                                <p className="prose-calm mt-3 max-w-lg text-[0.9rem]">{t.body}</p>
                                <div className="mt-5 flex flex-wrap items-center gap-3 pb-1">
                                  <span className="label-caps !text-ink">{t.from}</span>
                                  <BookButton variant="ghost" className="!py-2.5 !text-[0.6rem]">
                                    Book this treatment
                                  </BookButton>
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>

                        <ChevronDown
                          className={`mt-2 h-4 w-4 shrink-0 text-clay transition-transform duration-300 ${
                            open ? "rotate-180 text-ink" : "group-hover:text-ink"
                          }`}
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="relative hidden min-h-[28rem] overflow-hidden lg:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.n}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <img
                      src={current.img}
                      alt={current.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="label-caps !text-cream/75">{current.n}</p>
                      <p className="display mt-2 text-[1.75rem] leading-tight text-cream">
                        {current.title}
                      </p>
                      <p className="display-italic mt-2 text-[1rem] text-cream/85">
                        {current.tagline}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 lg:hidden">
              <BookButton className="w-full justify-center">View availability</BookButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  About Grace                                                               */
/* -------------------------------------------------------------------------- */

function AboutGrace() {
  return (
    <section id="about" className="section-pad border-t border-border/50">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-12 lg:items-center lg:gap-20 lg:px-10">
        <Reveal className="lg:col-span-5" mode="scale">
          <div className="relative">
            <img
              src={grace}
              alt="Grace, aesthetic practitioner and founder of Glow By Grace"
              className="aspect-[4/5] w-full object-cover object-top lux-shadow"
              loading="lazy"
              width={1200}
              height={1500}
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" mode="fade" delay={0.1}>
          <SectionLabel tone="plain">Meet Grace</SectionLabel>
          <SectionTitle className="mt-5 text-[clamp(2rem,4vw,3.5rem)]" accent="and an honest eye.">
            Trained hands
          </SectionTitle>
          <div className="mt-8 space-y-5 prose-calm max-w-xl">
            <p>
              Grace is a fully insured aesthetic practitioner with advanced facial
              anatomy training and a client list built largely on referral. Her
              reputation rests on restraint — knowing when not to treat.
            </p>
            <p>
              Consultations are unhurried. You leave with a plan that makes sense
              for your face, not a sales pitch for the most expensive option on
              the menu.
            </p>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border/70 pt-8">
            {[
              ["8+ years", "in practice"],
              ["1,400+", "clients"],
              ["5.0", "average rating"],
            ].map(([val, label]) => (
              <div key={label}>
                <dt className="display text-2xl text-ink">{val}</dt>
                <dd className="label-caps mt-1 !text-[0.6rem]">{label}</dd>
              </div>
            ))}
          </dl>

          <BookButton className="mt-10" variant="ghost">
            Book with Grace
          </BookButton>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why Us                                                                    */
/* -------------------------------------------------------------------------- */

function WhyUs() {
  const items = [
    ["Natural results", "Work that reads as rested — never 'done'."],
    ["Tailored plans", "Protocols built around your anatomy and lifestyle."],
    ["Regulated products", "Premium brands only. No grey-market shortcuts."],
    ["No pressure", "Consultations without upsell or same-day treatment."],
    ["Comfort-first", "Numbing, calm environment, time to ask questions."],
    ["Aftercare", "Check-ins after treatment — for as long as you need them."],
  ];

  return (
    <section className="section-pad relative overflow-hidden bg-ink text-cream">
      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4" mode="slide">
            <SectionLabel tone="plain" className="!text-[var(--gold-soft)]">
              Why clients return
            </SectionLabel>
            <h2 className="display mt-6 text-balance text-[clamp(2rem,4vw,3.25rem)] text-cream">
              Six standards
              <span className="display-italic text-[var(--gold-soft)]"> we hold ourselves to.</span>
            </h2>
          </Reveal>

          <ol className="lg:col-span-8 divide-y divide-cream/12">
            {items.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.04} mode="fade">
                <li className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-8 sm:py-7">
                  <span className="display text-2xl text-[var(--gold-soft)]/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display text-xl text-cream sm:text-2xl">{title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/65">{body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Results reveal                                                          */
/* -------------------------------------------------------------------------- */

const revealCases: RevealCase[] = [
  {
    id: "boosters",
    label: "Skin Boosters",
    headline: "Hydration",
    timeline: "4 weeks later",
    metric: "+42%",
    metricLabel: "Natural glow restored",
    duration: "Hydration & luminosity — 4 weeks apart",
    after: transformation,
    before: transformation,
    focus: "50% 38%",
  },
  {
    id: "antiwrinkle",
    label: "Anti-Wrinkle",
    headline: "Expression",
    timeline: "2 weeks later",
    metric: "Softened",
    metricLabel: "Lines eased, movement kept",
    duration: "Forehead & frown — natural movement retained",
    after: transformation,
    before: transformation,
    focus: "50% 18%",
  },
  {
    id: "fillers",
    label: "Dermal Fillers",
    headline: "Volume",
    timeline: "6 weeks later",
    metric: "Restored",
    metricLabel: "Subtle cheek definition",
    duration: "Cheek restoration — subtle volume",
    after: hero,
    before: transformation,
    focus: "50% 42%",
  },
];

function Transformations() {
  return <ResultsRevealSection cases={revealCases} />;
}

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                              */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  const featured = {
    name: "Sophia M.",
    city: "Henley",
    body:
      "Grace talked me out of a treatment I didn't need on my first visit. That honesty is why she's the only person I trust with my face.",
    months: "2 weeks ago",
  };
  const others = [
    {
      name: "Olivia R.",
      city: "Marlow",
      body: "Everyone keeps asking if I've been on holiday. Subtle, flattering, completely me.",
      months: "1 month ago",
    },
    {
      name: "Charlotte W.",
      city: "Reading",
      body: "Aftercare WhatsApp the next morning. Worth every mile of the drive.",
      months: "1 month ago",
    },
    {
      name: "Imogen P.",
      city: "Oxford",
      body: "She has a real artist's eye — natural results every time.",
      months: "3 months ago",
    },
  ];

  return (
    <section className="section-pad-tight bg-bone" id="reviews">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <Reveal mode="fade">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel tone="plain">Reviews</SectionLabel>
              <p className="mt-4 display text-3xl text-ink lg:text-4xl">
                5.0 <span className="display-italic text-clay text-2xl lg:text-3xl">from real clients</span>
              </p>
            </div>
            <p className="label-caps">6 verified on Faces · 73 treatments performed</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" mode="slide">
            <figure className="h-full border border-border/70 bg-cream p-8 lg:p-10">
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-6 font-serif text-[clamp(1.25rem,2.5vw,1.75rem)] italic leading-snug text-ink">
                "{featured.body}"
              </blockquote>
              <figcaption className="mt-8 label-caps">
                {featured.name} · {featured.city} · {featured.months}
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {others.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.06} mode="fade">
                <figure className="border border-border/60 bg-cream/80 p-5">
                  <blockquote className="text-[0.9rem] leading-relaxed text-ink/85">"{r.body}"</blockquote>
                  <figcaption className="mt-4 label-caps !text-[0.6rem]">
                    {r.name} · {r.city}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Process                                                                   */
/* -------------------------------------------------------------------------- */

function Process() {
  const steps = [
    {
      t: "Book online",
      b: "Choose a complimentary 15-minute consultation slot that fits your diary.",
    },
    {
      t: "Meet Grace",
      b: "Discuss your face, history and goals. No treatment happens in this visit unless you want it to.",
    },
    {
      t: "Your plan",
      b: "Return for treatment in a private room. Aftercare guidance and check-ins follow.",
    },
  ];
  return (
    <section id="book" className="section-pad border-t border-border/50">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <Reveal mode="slide">
          <SectionLabel tone="num" index="03">
            How it works
          </SectionLabel>
          <SectionTitle className="mt-6 max-w-2xl text-[clamp(2rem,4vw,3.25rem)]" accent="in three visits.">
            From enquiry
          </SectionTitle>
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08} mode="fade">
              <li className="relative md:pt-2">
                <span className="label-caps text-gold">Step {i + 1}</span>
                <h3 className="display mt-3 text-2xl text-ink">{s.t}</h3>
                <p className="prose-calm mt-3 max-w-xs">{s.b}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-wrap gap-3" mode="fade" delay={0.2}>
          <BookButton>Book online</BookButton>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <WhatsApp className="h-4 w-4" />
            Ask a question first
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Instagram                                                                 */
/* -------------------------------------------------------------------------- */

function InstagramFeed() {
  const tiles = [
    { img: tBoost, alt: "Skin booster treatment result" },
    { img: clinic, alt: "Glow By Grace studio interior" },
    { img: tAnti, alt: "Anti-wrinkle consultation" },
    { img: tFacial, alt: "Signature facial treatment" },
    { img: tFill, alt: "Dermal filler treatment" },
    { img: hero, alt: "Natural glowing skin" },
  ];
  return (
    <section id="instagram" className="section-pad-tight bg-bone">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6" mode="fade">
          <div>
            <SectionLabel tone="plain">On Instagram</SectionLabel>
            <p className="mt-4 display text-2xl text-ink">@glowbygraceaesthetics</p>
          </div>
          <a
            href="https://www.instagram.com/glowbygraceaesthetics"
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps inline-flex items-center gap-2 text-ink hover:text-clay"
          >
            Follow
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {tiles.map(({ img, alt }, i) => (
            <Reveal key={alt} delay={i * 0.03} mode="scale">
              <a
                href="https://www.instagram.com/glowbygraceaesthetics"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden"
              >
                <img
                  src={img}
                  alt={alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Final CTA                                                                 */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="border-t border-border/60 bg-cream">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <div className="relative min-h-[22rem] overflow-hidden lg:min-h-[28rem]">
          <img
            src={ctaImg}
            alt="Client smiling after treatment at Glow By Grace"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-14 lg:px-14 lg:py-20">
          <Reveal mode="slide">
            <SectionLabel tone="plain">Ready when you are</SectionLabel>
            <SectionTitle className="mt-5 text-[clamp(2rem,4vw,3rem)]" accent="starts with a conversation.">
              Your consultation
            </SectionTitle>
            <p className="prose-calm mt-6 max-w-md">
              Fifteen minutes, no obligation. Tell Grace what you would like to
              feel when you look in the mirror — she will tell you honestly what
              makes sense.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <BookButton>Book consultation</BookButton>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsApp className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer id="footer" className="bg-ink pt-24 pb-10 text-cream">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="display text-4xl">
              Glow <span className="display-italic text-[var(--gold-soft)]">by Grace</span>
            </div>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.85] text-cream/65">
              A private aesthetics studio in Sonning Common. Natural results,
              consultation-first care.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/glowbygraceaesthetics"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:bg-cream hover:text-ink"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:bg-[#25D366] hover:text-white"
                aria-label="WhatsApp"
              >
                <WhatsApp className="h-4 w-4" />
              </a>
              <a
                href={EMAIL_URL}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:bg-cream hover:text-ink"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={PHONE_URL}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:bg-cream hover:text-ink"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <FooterCol
            title="Treatments"
            links={[
              ["Anti-Wrinkle", "#treatments"],
              ["Dermal Fillers", "#treatments"],
              ["Skin Boosters", "#treatments"],
              ["Facials", "#treatments"],
            ]}
          />
          <FooterCol
            title="Studio"
            links={[
              ["About Grace", "#about"],
              ["How it works", "#book"],
              ["Results", "#results"],
              ["Reviews", "#reviews"],
            ]}
          />

          <div className="lg:col-span-3">
            <div className="label-caps text-[var(--gold-soft)]">Visit</div>
            <address className="mt-5 not-italic text-[14px] leading-[1.85] text-cream/70">
              17 Shiplake Bottom<br />
              Sonning Common<br />
              Reading RG9 5HH
            </address>
            <div className="mt-6 text-[12px] uppercase tracking-[0.22em] text-[var(--gold-soft)]">
              Opening Hours
            </div>
            <div className="mt-3 space-y-1 text-[13px] text-cream/70">
              <div className="flex justify-between"><span>Tue – Fri</span><span>9.00 – 19.00</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>9.00 – 16.00</span></div>
              <div className="flex justify-between"><span>Sun – Mon</span><span>Closed</span></div>
            </div>

            <div className="mt-8 overflow-hidden border border-cream/15">
              <iframe
                title="Glow By Grace studio location map"
                src="https://www.google.com/maps?q=17+Shiplake+Bottom+Sonning+Common+RG9+5HH&output=embed"
                className="aspect-[4/3] w-full grayscale-[50%] invert-[0.85] hue-rotate-180"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-[11px] uppercase tracking-[0.22em] text-cream/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Glow By Grace Aesthetics</div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-cream">Privacy</a>
            <a href="#" className="transition-colors hover:text-cream">Terms</a>
            <a href="#" className="transition-colors hover:text-cream">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div className="lg:col-span-2">
      <div className="label-caps text-[var(--gold-soft)]">{title}</div>
      <ul className="mt-5 space-y-3 text-[14px] text-cream/70">
        {links.map(([l, href]) => (
          <li key={l}>
            <a href={href} className="transition-colors hover:text-cream">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Floating contact buttons                                                  */
/* -------------------------------------------------------------------------- */

function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 640);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div
      className={`fixed z-40 flex flex-col items-end gap-2 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      aria-hidden={!show}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white lux-shadow transition-transform hover:scale-105"
        aria-label="Message on WhatsApp"
      >
        <WhatsApp className="h-5 w-5" />
      </a>
      <BookButton className="!py-3 !text-[0.6rem]">Book</BookButton>
    </div>
  );
}
