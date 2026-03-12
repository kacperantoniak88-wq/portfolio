import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Eye,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Quote,
  Sparkles,
  X,
} from "lucide-react";

type PortfolioItem = {
  title: string;
  client: string;
  category: string;
  url: string;
  embed?: string;
  description: string;
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Usługi", href: "#uslugi" },
  { label: "Dlaczego ja", href: "#dlaczego-ja" },
  { label: "O mnie", href: "#o-mnie" },
  { label: "Opinie", href: "#opinie" },
  { label: "Cennik", href: "#wycena" },
  { label: "Kontakt", href: "#kontakt" },
];

const portfolioItems: PortfolioItem[] = [
  {
    title: "YouTube — vlog / dynamic edit",
    client: "OGLIFE",
    category: "YouTube",
    url: "https://www.youtube.com/watch?v=nPHcGcqoqgk&t",
    embed: "https://www.youtube.com/embed/nPHcGcqoqgk",
    description:
      "Dynamiczny montaż vlogowy z naciskiem na tempo, rytm i utrzymanie uwagi widza.",
  },
  {
    title: "YouTube — storytelling edit",
    client: "OGLIFE",
    category: "YouTube",
    url: "https://youtu.be/VC2bD6Ual10",
    embed: "https://www.youtube.com/embed/VC2bD6Ual10",
    description:
      "Montaż nastawiony na płynne prowadzenie historii i mocniejsze tempo narracji.",
  },
  {
    title: "YouTube — creator content",
    client: "OGLIFE",
    category: "YouTube",
    url: "https://youtu.be/kdsdKUxBbB4",
    embed: "https://www.youtube.com/embed/kdsdKUxBbB4",
    description:
      "Nowoczesny, czysty montaż z dynamicznymi przejściami i selekcją najlepszych momentów.",
  },
  {
    title: "Kanał YouTube",
    client: "OGLIFE",
    category: "Kanał",
    url: "https://youtube.com/@ogglifee",
    description:
      "Stała współpraca przy vlogach od marca 2025 — regularny montaż contentu kanału.",
  },
  {
    title: "Instagram Reel",
    client: "Mateusz Flis",
    category: "Instagram Reels",
    url: "https://www.instagram.com/reel/DUdV2vYjE5F/",
    description:
      "Krótka forma zaprojektowana pod zatrzymanie uwagi i lepszy watchtime.",
  },
  {
    title: "Instagram Reel",
    client: "Mateusz Flis",
    category: "Instagram Reels",
    url: "https://www.instagram.com/reel/DUYXS5vDbAn/",
    description:
      "Montaż social media z szybkim tempem i mocnym otwarciem pierwszych sekund.",
  },
  {
    title: "Instagram Reel — brand video",
    client: "Exotico Watches",
    category: "Instagram Reels",
    url: "https://www.instagram.com/reel/DSXuJF4DOBK/",
    description:
      "Premium feel, clean cuts i estetyczne prowadzenie produktu w formacie short-form.",
  },
  {
    title: "Instagram Reel — product promo",
    client: "Exotico Watches",
    category: "Instagram Reels",
    url: "https://www.instagram.com/reel/DR-jpk2jDRC/",
    description:
      "Materiał promocyjny dla marki — tempo, elegancja i nacisk na detale wizualne.",
  },
  {
    title: "TikTok — collab edit",
    client: "OGLIFE x SketchNight",
    category: "TikTok",
    url: "https://vm.tiktok.com/ZNRuseRR3/",
    description:
      "Montaż zaprojektowany pod zaangażowanie i szybkie utrzymanie uwagi na mobile.",
  },
  {
    title: "TikTok — expert content",
    client: "Trener Michał Zając",
    category: "TikTok",
    url: "https://vm.tiktok.com/ZNRusFajp/",
    description:
      "Dynamiczne shorty z czytelną strukturą, napisami i montażem pod algorytm.",
  },
];

const services = [
  {
    number: "01",
    title: "Montaż TikTok / Reels / Shorts",
    description:
      "Dynamiczny montaż pod social media zwiększający watchtime i zatrzymanie widza.",
  },
  {
    number: "02",
    title: "Montaż YouTube",
    description:
      "Montaż vlogów, storytelling, selekcja ujęć, rytm i nowoczesne przejścia.",
  },
  {
    number: "03",
    title: "Reklamy wideo",
    description:
      "Montaż materiałów promocyjnych dla marek z premium feel i mocnym first impression.",
  },
];

const reasons = [
  "Dynamiczne cięcia co kilka sekund",
  "Storytelling który utrzymuje uwagę",
  "Efekty wizualne zwiększające engagement",
  "Napisy które zatrzymują widza",
  "Montaż pod algorytm TikTok / Reels",
];

const testimonials = [
  {
    name: "Mateusz Flis",
    text: "Świetny montaż, rolki mają dużo większy watchtime.",
  },
  {
    name: "Trener Michał Zając",
    text: "Dynamiczne i nowoczesne filmy. Bardzo dobra współpraca.",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MarkerUnderline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <motion.svg
        viewBox="0 0 260 20"
        className="absolute -bottom-2 left-0 z-0 h-4 w-full"
        initial={{ pathLength: 0, opacity: 0.6 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.15, ease: "easeInOut" }}
        fill="none"
      >
        <motion.path
          d="M4 14 C 50 18, 120 4, 256 12"
          stroke="#00aaff"
          strokeWidth="7"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 10px rgba(0,170,255,0.35))" }}
        />
      </motion.svg>
    </span>
  );
}

function AnimatedLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent"
          style={{
            top: `${14 + i * 11}%`,
            left: i % 2 === 0 ? "-10%" : "10%",
            width: `${36 + (i % 3) * 16}%`,
            boxShadow: "0 0 18px rgba(0,170,255,0.18)",
          }}
          animate={{
            x: i % 2 === 0 ? [0, 120, 0] : [0, -120, 0],
            opacity: [0.2, 0.85, 0.2],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/70 bg-white/75 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-4xl">
      <div className="mb-4 text-[13px] uppercase tracking-[0.24em] text-slate-500">
        {eyebrow}
      </div>
      <h2 className="text-[clamp(2.2rem,4vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-slate-950">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/70 bg-white/75 px-5 py-3 backdrop-blur-xl shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-200 bg-white text-sky-500 shadow-[0_0_24px_rgba(0,170,255,0.22)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                Kacper Antoniak
              </div>
              <div className="text-sm font-semibold text-slate-950">
                Video Editor
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm text-slate-600 transition hover:text-slate-950 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-sky-400 after:shadow-[0_0_12px_rgba(0,170,255,0.45)] after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#kontakt"
              className="inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(2,8,23,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(2,8,23,0.18)]"
            >
              Skontaktuj się
            </a>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              className="mx-auto mt-3 max-w-7xl xl:hidden"
            >
              <div className="rounded-[28px] border border-white/70 bg-white/85 p-4 backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.12)]">
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-50"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 90]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-32"
    >
      <AnimatedLines />

      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 opacity-80"
      >
        <div className="absolute right-[8%] top-[16%] h-64 w-64 rounded-full bg-sky-300/10 blur-3xl" />
        <div className="absolute bottom-[10%] left-[-40px] h-56 w-56 rounded-full bg-sky-300/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <SectionReveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-4 py-2 text-sm text-slate-600 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(0,170,255,0.75)]" />
            Luxury edit studio / short-form & YouTube
          </div>

          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-extrabold leading-[0.94] tracking-[-0.065em] text-slate-950">
            Tworzę filmy,
            <br className="hidden md:block" />
            których <MarkerUnderline>nie da się</MarkerUnderline>
            <br className="hidden md:block" />
            przestać oglądać
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Montaż TikTok, Reels i YouTube który zwiększa watchtime i zatrzymuje
            uwagę widza.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#portfolio"
              className="inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-7 text-base font-semibold text-white shadow-[0_14px_40px_rgba(2,8,23,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(2,8,23,0.2)]"
            >
              Zobacz portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#kontakt"
              className="inline-flex h-14 items-center justify-center rounded-full border border-sky-200 bg-white/85 px-7 text-base font-semibold text-slate-950 transition hover:bg-sky-50 hover:shadow-[0_0_20px_rgba(0,170,255,0.12)]"
            >
              Skontaktuj się
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              ["3+", "lat montażu"],
              ["2025", "start współpracy z OGLIFE"],
              ["TikTok / Reels / YT", "główna specjalizacja"],
            ].map(([a, b], i) => (
              <SectionReveal key={a} delay={0.08 * i}>
                <GlassCard className="p-5">
                  <div className="text-2xl font-bold tracking-[-0.04em] text-slate-950">
                    {a}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{b}</div>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <GlassCard className="p-5 md:p-6">
            <div className="relative overflow-hidden rounded-[24px] border border-sky-100 bg-[linear-gradient(145deg,#fbfdff_0%,#ffffff_45%,#f5fbff_100%)] p-6 md:p-7">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-300/15 blur-3xl" />

              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="text-[13px] uppercase tracking-[0.2em] text-slate-500">
                    Creative Edit Suite
                  </div>
                  <div className="mt-2 text-2xl font-bold tracking-[-0.05em] text-slate-950">
                    Short-form that performs
                  </div>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-sky-100 bg-white text-sky-500 shadow-[0_0_28px_rgba(0,170,255,0.14)]">
                  <Play className="h-5 w-5 fill-sky-500" />
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {[
                  ["Hook w pierwszych sekundach", "Premium"],
                  ["Dynamiczne cięcia i napisy", "Studio"],
                  ["Montaż zwiększający retention", "Luxury"],
                ].map(([item, tag], i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-center justify-between rounded-[20px] border border-slate-100 bg-white/85 px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-center gap-3 text-slate-700">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-100 bg-sky-50">
                        <Check className="h-4 w-4 text-sky-500" />
                      </span>
                      <span>{item}</span>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                      {tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </SectionReveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const items = useMemo(() => portfolioItems, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="portfolio" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                Wybrane realizacje i <MarkerUnderline>materiały</MarkerUnderline>{" "}
                do obejrzenia
              </>
            }
            description="Nowoczesna siatka projektów z szybkim podglądem. YouTube otwiera się bezpośrednio w modalu, a Instagram i TikTok prowadzą do oryginalnego materiału."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <SectionReveal key={item.url} delay={(index % 6) * 0.05}>
              <motion.button
                onClick={() => setSelected(item)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative w-full overflow-hidden rounded-[28px] border border-white/70 bg-white/75 p-6 text-left backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,170,255,0.12),transparent_35%)] opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="inline-flex rounded-full border border-sky-200 bg-sky-50/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-700">
                    {item.category}
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-500">{item.client}</p>

                  <div className="mt-6 flex min-h-[180px] flex-col justify-between rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
                    <p className="leading-7 text-slate-600">{item.description}</p>
                    <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                      <span>Otwórz podgląd</span>
                      <span className="font-medium text-slate-900">
                        Zobacz →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </SectionReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] bg-slate-950/50 p-4 backdrop-blur-md md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-h-[90vh] max-w-6xl overflow-auto rounded-[30px] border border-white/70 bg-white/90 backdrop-blur-xl shadow-[0_30px_120px_rgba(15,23,42,0.25)]"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 rounded-t-[30px] border-b border-slate-100 bg-white/85 px-5 py-4 backdrop-blur-xl md:px-7">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-slate-500">
                    {selected.category}
                  </div>
                  <div className="mt-1 text-xl font-bold tracking-[-0.04em] text-slate-950 md:text-2xl">
                    {selected.title}
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-7 p-5 lg:grid-cols-[1.2fr_0.8fr] md:p-7">
                <div className="min-h-[280px] overflow-hidden rounded-[26px] border border-slate-100 bg-slate-50">
                  {selected.embed ? (
                    <div className="aspect-video w-full">
                      <iframe
                        className="h-full w-full"
                        src={selected.embed}
                        title={selected.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-[320px] items-center justify-center bg-[linear-gradient(145deg,#fbfdff_0%,#ffffff_45%,#f4faff_100%)] p-8 text-center md:min-h-[420px]">
                      <div className="max-w-md">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-sky-100 bg-white text-sky-500 shadow-[0_0_30px_rgba(0,170,255,0.12)]">
                          <ExternalLink className="h-6 w-6" />
                        </div>
                        <h4 className="mt-6 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                          Podgląd zewnętrzny
                        </h4>
                        <p className="mt-3 leading-7 text-slate-600">
                          Instagram i TikTok najlepiej otwierają się bezpośrednio
                          w aplikacji lub nowej karcie. Kliknij poniżej, aby
                          zobaczyć oryginalny materiał.
                        </p>
                        <a
                          href={selected.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 font-semibold text-white"
                        >
                          Otwórz materiał
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <GlassCard className="p-6 md:p-7">
                  <div className="text-[12px] uppercase tracking-[0.18em] text-slate-500">
                    O projekcie
                  </div>
                  <p className="mt-4 leading-8 text-slate-600">
                    {selected.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {[
                      `Klient: ${selected.client}`,
                      `Format: ${selected.category}`,
                      "Cel: retention + zaangażowanie",
                      "Styl: dynamiczny, nowoczesny, premium",
                    ].map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 rounded-[18px] border border-slate-100 bg-slate-50 px-4 py-4 text-slate-700"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-sky-100 bg-sky-50">
                          <Check className="h-4 w-4 text-sky-500" />
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-sky-200 bg-white font-semibold text-slate-950 transition hover:bg-sky-50"
                  >
                    Zobacz oryginał
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </GlassCard>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Services() {
  return (
    <section id="uslugi" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Usługi"
            title={
              <>
                Montaż dopasowany do <MarkerUnderline>platformy</MarkerUnderline>{" "}
                i celu filmu
              </>
            }
            description="Każda usługa została zaprojektowana tak, aby materiał wyglądał profesjonalnie, nowocześnie i realnie zatrzymywał widza."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <SectionReveal key={service.number} delay={i * 0.08}>
              <motion.div whileHover={{ y: -10 }}>
                <GlassCard className="group relative h-full overflow-hidden p-7 md:p-8">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-300/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-sky-100 bg-white font-bold text-sky-500 shadow-[0_0_30px_rgba(0,170,255,0.12)]">
                    {service.number}
                  </div>
                  <h3 className="mt-8 text-2xl font-bold tracking-[-0.04em] text-slate-950">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-8 text-slate-600">
                    {service.description}
                  </p>
                </GlassCard>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMe() {
  return (
    <section id="dlaczego-ja" className="relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,170,255,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(0,170,255,0.08),transparent_28%)]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionReveal>
          <SectionHeading
            eyebrow="Dlaczego moje montaże zatrzymują widza"
            title={
              <>
                Tutaj liczy się nie tylko estetyka, ale też{" "}
                <MarkerUnderline>retention</MarkerUnderline>.
              </>
            }
            description="Dobry montaż nie kończy się na ładnych przejściach. Ma utrzymać uwagę, prowadzić historię i sprawić, że widz ogląda dalej."
          />
        </SectionReveal>

        <div className="grid gap-4">
          {reasons.map((reason, i) => (
            <SectionReveal key={reason} delay={i * 0.07}>
              <motion.div whileHover={{ x: 6 }}>
                <GlassCard className="flex gap-4 px-5 py-5 md:px-6">
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] border border-sky-100 bg-sky-50 text-sky-500 shadow-[0_0_22px_rgba(0,170,255,0.12)]">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950 md:text-xl">
                      {reason}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      Każdy z tych elementów pomaga utrzymać tempo materiału i
                      zwiększyć szansę, że widz zostanie do końca.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="o-mnie" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="O mnie"
            title={
              <>
                Montaż, który łączy <MarkerUnderline>estetykę</MarkerUnderline>{" "}
                z wynikiem.
              </>
            }
            description="Nazywam się Kacper Antoniak. Mam 17 lat i pochodzę z okolic Częstochowy. Od ponad 3 lat zajmuję się montażem wideo i specjalizuję się w dynamicznym contencie dla social mediów i YouTube."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <SectionReveal>
            <GlassCard className="p-7 md:p-8">
              <div className="text-[13px] uppercase tracking-[0.2em] text-slate-500">
                Profil
              </div>
              <div className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950">
                Kacper Antoniak
              </div>
              <p className="mt-4 leading-8 text-slate-600">
                Od marca 2025 roku aktywnie montuję vlogi dla kanału OGLIFE.
                Montowałem również materiały dla twórców takich jak Mateusz Flis,
                trener_michal_zajac i Exotico Watches.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "17 lat",
                  "3+ lata doświadczenia",
                  "Okolice Częstochowy",
                  "Short-form + YouTube",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[20px] border border-slate-100 bg-white/85 px-4 py-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-100 bg-sky-50">
                      <Check className="h-4 w-4 text-sky-500" />
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </SectionReveal>

          <div className="grid gap-8">
            <SectionReveal delay={0.08}>
              <GlassCard className="p-7 md:p-8">
                <div className="text-[13px] uppercase tracking-[0.2em] text-slate-500">
                  Specjalizacje
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["TikTok", "Instagram Reels", "YouTube", "Short form content"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-full border border-sky-200 bg-sky-50/70 px-5 py-3 text-slate-800 shadow-[0_0_18px_rgba(0,170,255,0.08)]"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </GlassCard>
            </SectionReveal>

            <SectionReveal delay={0.14}>
              <GlassCard className="p-7 md:p-8">
                <div className="text-[13px] uppercase tracking-[0.2em] text-slate-500">
                  Programy
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Pr", "Adobe Premiere Pro"],
                    ["Ae", "Adobe After Effects"],
                  ].map(([short, name]) => (
                    <div
                      key={name}
                      className="flex items-center gap-4 rounded-[20px] border border-slate-100 bg-white/85 px-5 py-5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 font-semibold text-sky-500">
                        {short}
                      </div>
                      <div className="font-medium text-slate-800">{name}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="opinie" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Opinie"
            title={
              <>
                Efekt współpracy w słowach <MarkerUnderline>klientów</MarkerUnderline>
              </>
            }
            description="Nowoczesne montaże mają wyglądać świetnie, ale przede wszystkim mają działać."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <SectionReveal key={item.name} delay={i * 0.08}>
              <motion.div whileHover={{ y: -8 }}>
                <GlassCard className="h-full overflow-hidden p-7 md:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-sky-100 bg-white text-sky-500 shadow-[0_0_30px_rgba(0,170,255,0.12)]">
                    <Quote className="h-6 w-6" />
                  </div>
                  <p className="mt-8 text-xl leading-9 tracking-[-0.03em] text-slate-900 md:text-2xl">
                    “{item.text}”
                  </p>
                  <div className="mt-8">
                    <div className="text-lg font-semibold text-slate-950">
                      {item.name}
                    </div>
                    <div className="mt-1 text-slate-500">
                      Klient / współpraca kreatywna
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="wycena" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(247,251,255,0.96)_100%)] p-8 shadow-[0_30px_120px_rgba(15,23,42,0.1)] backdrop-blur-xl md:p-12">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-300/15 blur-3xl" />
            <div className="text-[13px] uppercase tracking-[0.24em] text-slate-500">
              Współpraca / cennik
            </div>
            <h2 className="mt-4 text-[clamp(2.2rem,4vw,4.7rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-slate-950">
              Wycena projektu
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              Każdy projekt jest inny, dlatego wycena ustalana jest
              indywidualnie w zależności od:
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                "długości materiału",
                "stylu montażu",
                "ilości efektów",
                "liczby filmów",
                "częstotliwości współpracy",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/80 bg-white/85 px-5 py-5 text-slate-800 shadow-[0_14px_30px_rgba(15,23,42,0.05)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-3xl text-lg leading-8 text-slate-600">
              Jeśli chcesz poznać wycenę swojego projektu — napisz do mnie.
            </p>

            <div className="mt-8">
              <a
                href="https://wa.me/48531924806"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-8 text-base font-semibold text-white shadow-[0_14px_40px_rgba(2,8,23,0.16)] transition hover:-translate-y-0.5"
              >
                Zapytaj o wycenę
                <MessageCircle className="ml-2 h-4 w-4" />
              </a>
              <p className="mt-4 text-sm text-slate-500">
                Odpowiadam zazwyczaj w ciągu kilku godzin.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontakt" className="relative py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionReveal>
          <SectionHeading
            eyebrow="Kontakt"
            title={
              <>
                Napisz, jeśli chcesz montażu, który wygląda{" "}
                <MarkerUnderline>premium</MarkerUnderline>.
              </>
            }
            description="Najprościej przez WhatsApp lub Instagram. Możesz też napisać maila i krótko opisać projekt."
          />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <GlassCard className="p-7 md:p-8">
            <div className="grid gap-4">
              {[
                {
                  icon: <Instagram className="h-5 w-5 text-sky-500" />,
                  label: "Instagram",
                  value: "@xkacper_antoniak",
                  href: "https://www.instagram.com/xkacper_antoniak/",
                },
                {
                  icon: <MessageCircle className="h-5 w-5 text-sky-500" />,
                  label: "WhatsApp",
                  value: "531 924 806",
                  href: "https://wa.me/48531924806",
                },
                {
                  icon: <Mail className="h-5 w-5 text-sky-500" />,
                  label: "Email",
                  value: "kacper.antoniak@poczta.fm",
                  href: "mailto:kacper.antoniak@poczta.fm",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-[22px] border border-slate-100 bg-white/85 px-5 py-5 transition hover:border-sky-200 hover:bg-sky-50/40"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-sky-100 bg-white shadow-[0_0_22px_rgba(0,170,255,0.08)]">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="font-medium text-slate-950">
                        {item.value}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900" />
                </a>
              ))}
            </div>
          </GlassCard>
        </SectionReveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="pb-20 pt-6 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-[36px] bg-slate-950 px-7 py-10 shadow-[0_30px_120px_rgba(2,8,23,0.22)] md:px-12 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,170,255,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(0,170,255,0.18),transparent_32%)]" />
            <motion.div
              className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent"
              animate={{ opacity: [0.4, 0.9, 0.4], x: [-50, 40, -50] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />

            <div className="relative z-10 max-w-4xl">
              <div className="mb-4 text-[13px] uppercase tracking-[0.24em] text-sky-200/70">
                Let’s work
              </div>
              <h2 className="text-[clamp(2.3rem,5vw,5.2rem)] font-extrabold leading-[0.96] tracking-[-0.055em] text-white">
                Potrzebujesz montażu który zatrzyma widza?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Jeśli chcesz żeby Twoje filmy były bardziej dynamiczne i
                przyciągały uwagę — napisz do mnie.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://wa.me/48531924806"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-slate-950 shadow-[0_14px_40px_rgba(255,255,255,0.12)]"
                >
                  Napisz na WhatsApp
                  <MessageCircle className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Zobacz portfolio
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pb-10 pt-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 md:flex-row md:px-8">
        <div>© {new Date().getFullYear()} Kacper Antoniak — Video Editor</div>
        <div className="flex items-center gap-5">
          <a href="#portfolio" className="transition hover:text-slate-900">
            Portfolio
          </a>
          <a href="#kontakt" className="transition hover:text-slate-900">
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#fcfdff_0%,#f8fafc_100%)] text-slate-900">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <WhyMe />
        <About />
        <Testimonials />
        <Pricing />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}