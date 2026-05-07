"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Bot,
  BriefcaseBusiness,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  Server,
  Sparkles,
  X,
} from "lucide-react";

const techStack = [
  { name: "Next.js", detail: "App Router, RSC", icon: Blocks, accent: "cyan" },
  { name: "Django", detail: "APIs, admin systems", icon: Server, accent: "emerald" },
  { name: "Tailwind", detail: "Design systems", icon: Sparkles, accent: "sky" },
  { name: "PostgreSQL", detail: "Relational data", icon: Database, accent: "amber" },
  { name: "AI Apps", detail: "LLM workflows", icon: Bot, accent: "rose" },
  { name: "TypeScript", detail: "Typed interfaces", icon: Code2, accent: "violet" },
];

const projects = [
  {
    title: "Vertec",
    description:
      "A refined full-stack platform built around fast workflows, clean dashboards, and reliable backend operations.",
    tech: ["Next.js", "Django", "PostgreSQL", "Tailwind"],
    source: "https://github.com/",
  },
  {
    title: "AI Apps Lab",
    description:
      "A suite of intelligent product experiments focused on useful automation, conversational UX, and lean interfaces.",
    tech: ["React", "AI SDK", "TypeScript", "APIs"],
    source: "https://github.com/",
  },
  {
    title: "Portfolio System",
    description:
      "A personal brand surface with motion, responsive composition, glass panels, and a cinematic dark-mode foundation.",
    tech: ["Next.js", "Framer Motion", "Lucide", "Tailwind"],
    source: "https://github.com/",
  },
];

const timeline = [
  {
    title: "Full-Stack Developer",
    period: "Present",
    body: "Building production-grade web apps with modern frontend architecture, API design, and database-backed products.",
    icon: BriefcaseBusiness,
  },
  {
    title: "AI Product Builder",
    period: "Recent Work",
    body: "Designing practical AI interfaces that turn model capability into focused, usable workflows.",
    icon: Bot,
  },
  {
    title: "Computer Science Foundation",
    period: "Education",
    body: "Grounded in software engineering fundamentals, data modeling, web systems, and problem solving.",
    icon: GraduationCap,
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/", icon: Code2 },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: BriefcaseBusiness },
  { label: "Email", href: "mailto:azhar@example.com", icon: Mail },
];

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050505] text-zinc-100">
      <IntroLoader />
      <ScrollProgress />
      <CursorAura />
      <AmbientBackground />
      <ChapterRail />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <Header />
        <Hero />
        <KineticRibbon />
        <TechStack />
        <Projects />
        <Experience />
        <KineticRibbon reverse />
        <Contact />
      </div>
      <FloatingChatbot />
    </main>
  );
}

function CursorAura() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 80, damping: 24, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 24, mass: 0.2 });

  useEffect(() => {
    const update = (event: PointerEvent) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
    };

    window.addEventListener("pointermove", update);
    return () => window.removeEventListener("pointermove", update);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed z-20 hidden h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.14),transparent_62%)] mix-blend-screen blur-xl lg:block"
    />
  );
}

function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((value) => Math.min(value + 5, 100));
    }, 42);
    const exitTimer = window.setTimeout(() => setVisible(false), 1500);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-0 z-50 grid place-items-center bg-[#050505]"
      aria-hidden={!visible}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,23,41,0.16),transparent_34%)]" />
      <div className="cyber-grid absolute inset-0 opacity-25" />
      <div className="relative flex w-[min(82vw,420px)] flex-col gap-5 border border-red-500/20 bg-black/35 p-6 backdrop-blur-xl">
        <div className="flex items-end justify-between gap-8">
          <span className="font-display text-5xl leading-none text-white sm:text-7xl">
            {String(progress).padStart(3, "0")}
          </span>
          <span className="pb-2 font-mono text-xs uppercase tracking-[0.36em] text-red-200/70">
            Assembling interface
          </span>
        </div>
        <div className="h-px w-full bg-white/10">
          <motion.div
            className="h-px bg-red-400 shadow-[0_0_22px_rgba(248,113,113,0.75)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 top-0 z-40 h-px w-full origin-left bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.9)]"
    />
  );
}

function ChapterRail() {
  const items = ["Hero", "Stack", "Work", "Experience", "Contact"];

  return (
    <nav
      aria-label="Portfolio sections"
      className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ol className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={item}>
            <a
              href={`#${item === "Hero" ? "hero" : item.toLowerCase()}`}
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600 transition hover:text-red-200"
            >
              <span className="font-display text-lg leading-none text-red-400/70 transition group-hover:text-red-300">
                {index.toString().padStart(2, "0")}
              </span>
              <span className="max-w-0 overflow-hidden transition-all duration-300 group-hover:max-w-28">
                {item}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-4 z-30 flex items-center justify-between border border-white/10 bg-white/[0.035] px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-5"
    >
      <a href="#hero" className="font-mono text-sm uppercase text-zinc-100">
        Azhar.dev
      </a>
      <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
        {["Stack", "Work", "Experience", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="transition-colors hover:text-cyan-200"
          >
            {item}
          </a>
        ))}
      </nav>
      <a
        href="mailto:azhar@example.com"
        className="inline-flex h-10 items-center gap-2 bg-cyan-300 px-4 text-sm font-semibold text-black shadow-[0_0_32px_rgba(103,232,249,0.25)] transition hover:bg-cyan-200"
      >
        <Mail size={16} />
        Contact
      </a>
    </motion.header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const orbY = useTransform(scrollYProgress, [0, 0.28], [0, -64]);
  const orbRotate = useTransform(scrollYProgress, [0, 0.28], [0, 18]);

  return (
    <section
      id="hero"
      className="relative grid min-h-[calc(100vh-88px)] items-center gap-12 py-20 md:grid-cols-[1.04fr_0.96fr] md:py-28"
    >
      <TopographicLines />
      <div className="pointer-events-none absolute inset-x-[-20vw] top-[28%] z-0 hidden rotate-[-12deg] overflow-hidden border-y border-red-500/15 bg-red-500/[0.035] py-3 md:block">
        <div className="marquee-track font-display text-4xl uppercase text-red-200/20">
          <span>Build with intent · Motion with restraint · Systems with soul ·</span>
          <span>Build with intent · Motion with restraint · Systems with soul ·</span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl"
      >
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.2 }}
          className="mb-7 inline-flex items-center gap-2 border border-red-400/20 bg-red-400/[0.06] px-3 py-2 font-mono text-xs uppercase tracking-[0.22em] text-red-100 shadow-[0_0_42px_rgba(248,113,113,0.12)]"
        >
          <span className="h-2 w-2 bg-red-300 shadow-[0_0_18px_rgba(252,165,165,0.85)]" />
          Available for futuristic web builds
        </motion.div>
        <RevealText className="font-display max-w-5xl text-4xl font-bold uppercase leading-[0.9] text-white sm:text-7xl lg:text-6xl">
          Azhar builds sleek digital systems for the next interface era.
        </RevealText>
        <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
          Full-stack developer crafting fast, intelligent, and visually precise
          products with Next.js, Django, Tailwind, PostgreSQL, and AI workflows.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#work"
            className="group inline-flex h-12 items-center justify-center gap-2 bg-red-400 px-5 font-semibold text-black shadow-[0_0_46px_rgba(248,113,113,0.32)] transition hover:-translate-y-0.5 hover:bg-red-300"
          >
            Explore Work
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 border border-white/12 bg-white/[0.035] px-5 font-semibold text-zinc-100 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07]"
          >
            <ExternalLink size={18} />
            View GitHub
          </a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotateX: 16, rotateY: -18 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{ y: orbY, rotate: orbRotate }}
        className="hero-orb relative z-10 mx-auto aspect-square w-full max-w-[420px]"
      >
        <div className="absolute inset-8 border border-red-200/20 bg-white/[0.035] shadow-[0_0_90px_rgba(248,113,113,0.2)] backdrop-blur-xl" />
        <div className="absolute inset-14 border border-cyan-200/15" />
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 bg-red-200/15 blur-2xl" />
        <motion.div
          animate={{ y: [-10, 12, -10], rotate: [0, 4, 0], scale: [1, 1.035, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-20 grid place-items-center border border-white/15 bg-black/50 shadow-[0_24px_90px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
        >
          <Code2 className="h-16 w-16 text-red-100 drop-shadow-[0_0_24px_rgba(248,113,113,0.7)]" />
        </motion.div>
        <FloatingMetric className="left-0 top-12" label="Latency" value="38ms" />
        <FloatingMetric className="bottom-10 right-0" label="Build" value="Clean" />
      </motion.div>
    </section>
  );
}

function TopographicLines() {
  const paths = [
    "M-120 90 C180 20 420 160 720 120 S1240 10 1580 160 S2040 260 2140 210",
    "M-140 190 C200 120 480 260 780 220 S1300 110 1640 260 S2060 360 2160 310",
    "M-160 300 C220 230 540 370 840 330 S1360 220 1700 370 S2080 470 2180 420",
    "M-180 420 C240 350 600 490 900 450 S1420 340 1760 490 S2100 590 2200 540",
    "M-200 560 C260 490 660 630 960 590 S1480 480 1820 630 S2120 730 2220 680",
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1920 820"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke="rgba(248,113,113,0.52)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 + index * 0.12 }}
        />
      ))}
    </svg>
  );
}

function FloatingMetric({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute border border-white/12 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl ${className}`}
    >
      <p className="font-mono text-[11px] uppercase text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </motion.div>
  );
}

function TechStack() {
  return (
    <Section id="stack" eyebrow="Core stack" title="Tools tuned for shipping.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <motion.article
              key={tech.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.06 }}
              whileHover={{ y: -10, scale: 1.015, rotateX: 3, rotateY: -3 }}
              className={`glass-card accent-${tech.accent} group p-5`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{tech.detail}</p>
                </div>
                <div className="grid h-11 w-11 place-items-center border border-white/10 bg-white/[0.04] text-red-100 transition group-hover:border-red-200/35 group-hover:text-red-50">
                  <Icon size={21} />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="work" eyebrow="Selected work" title="Interfaces with depth and discipline.">
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: index * 0.08 }}
            whileHover={{ y: -12, rotate: index % 2 === 0 ? -0.75 : 0.75 }}
            className="glass-card group flex min-h-[330px] flex-col p-6"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.26em] text-red-200/80">
                0{index + 1}
              </span>
              <ArrowUpRight className="text-zinc-600 transition group-hover:text-red-200" />
            </div>
            <h3 className="font-display text-4xl font-bold uppercase leading-none text-white">
              {project.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.source}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-red-200 transition hover:text-white"
            >
              View Source <ArrowUpRight size={16} />
            </a>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Trajectory" title="A focused path through product craft.">
      <div className="relative grid gap-5">
        <div className="absolute left-5 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-red-300/0 via-red-300/40 to-red-300/0 sm:block" />
        {timeline.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.07 }}
              className="glass-card relative grid gap-4 p-5 sm:grid-cols-[44px_1fr] sm:p-6"
            >
              <div className="z-10 grid h-11 w-11 place-items-center border border-red-200/25 bg-red-200/[0.08] text-red-100">
                <Icon size={20} />
              </div>
              <div>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <span className="font-mono text-xs uppercase text-zinc-500">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
                  {item.body}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <motion.footer
      id="contact"
      {...fadeUp}
      className="mb-10 mt-14 border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-red-200">Contact</p>
          <h2 className="font-display mt-4 max-w-2xl text-5xl font-bold uppercase leading-none text-white sm:text-6xl">
            Let&apos;s build something sharp, fast, and useful.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="inline-flex h-11 items-center gap-2 border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-zinc-200 transition hover:-translate-y-0.5 hover:border-red-200/40 hover:text-red-100"
              >
                <Icon size={17} />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
    </motion.footer>
  );
}

function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask me about Azhar's stack, projects, experience, or availability. I only answer from the portfolio context.",
    },
  ]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.message ??
            data.error ??
            "I could not reach the portfolio assistant right now.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "The assistant is offline right now. Check the API key and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`mb-4 w-[min(calc(100vw-2.5rem),390px)] overflow-hidden border border-white/10 bg-black/55 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-200">
              Azhar AI
            </p>
            <p className="mt-1 text-sm text-zinc-400">Context-aware portfolio chat</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-red-300/40 hover:text-red-100"
            aria-label="Close chat"
          >
            <X size={17} />
          </button>
        </div>
        <div className="flex max-h-[420px] flex-col gap-3 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[86%] border px-3 py-2 text-sm leading-6 ${
                message.role === "user"
                  ? "ml-auto border-red-300/20 bg-red-300/10 text-red-50"
                  : "border-white/10 bg-white/[0.045] text-zinc-300"
              }`}
            >
              {message.content}
            </div>
          ))}
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking from Azhar&apos;s context
            </div>
          ) : null}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 p-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Azhar..."
            className="min-w-0 flex-1 border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-300/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="grid h-10 w-10 place-items-center bg-red-400 text-black transition hover:bg-red-300 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Send message"
          >
            {loading ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
          </button>
        </form>
      </motion.div>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ y: -4, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="ml-auto grid h-14 w-14 place-items-center bg-red-400 text-black shadow-[0_0_46px_rgba(248,113,113,0.45)]"
        aria-expanded={open}
        aria-label="Open portfolio chat"
      >
        <MessageCircle size={22} />
      </motion.button>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <motion.div {...fadeUp} className="mb-10 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-red-200">{eyebrow}</p>
        <RevealText className="font-display mt-4 block text-5xl font-bold uppercase leading-none text-white sm:text-7xl">
          {title}
        </RevealText>
      </motion.div>
      {children}
    </section>
  );
}

function RevealText({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      variants={{
        visible: { transition: { staggerChildren: 0.045 } },
        hidden: {},
      }}
    >
      {children.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-2 pr-3">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotate: 2, opacity: 0 },
              visible: {
                y: "0%",
                rotate: 0,
                opacity: 1,
                transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function KineticRibbon({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative my-8 overflow-hidden border-y border-white/10 py-4">
      <div
        className={`marquee-track font-display text-4xl uppercase text-white/12 sm:text-6xl ${
          reverse ? "marquee-reverse" : ""
        }`}
      >
        <span>Design meets logic · Motion meets clarity · Code meets atmosphere ·</span>
        <span>Design meets logic · Motion meets clarity · Code meets atmosphere ·</span>
      </div>
    </div>
  );
}

function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(244,114,182,0.1),transparent_24%),radial-gradient(circle_at_55%_82%,rgba(52,211,153,0.08),transparent_30%)]" />
      <div className="cyber-grid absolute inset-0 opacity-45" />
      <div className="particle-field absolute inset-0" />
      <div className="petal-field absolute inset-0">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="seam-light absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
    </div>
  );
}
