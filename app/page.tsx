"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  BarChart3,
  Clock,
  Lock,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Download,
} from "lucide-react";

/* ─── Helpers ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Token Hero Visual ─── */
function TokenVisual() {
  return (
    <div style={{ position: "relative", width: 320, height: 320 }}>
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          {/* Coin face radial gradient */}
          <radialGradient id="tkCoinFace" cx="38%" cy="32%" r="72%">
            <stop offset="0%"   stopColor="#FFF4B0" />
            <stop offset="18%"  stopColor="#F5D642" />
            <stop offset="50%"  stopColor="#C9A227" />
            <stop offset="85%"  stopColor="#9A7A10" />
            <stop offset="100%" stopColor="#6B5008" />
          </radialGradient>

          {/* Coin rim gradient */}
          <linearGradient id="tkCoinRim" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%"   stopColor="#F5E87A" />
            <stop offset="45%"  stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#7a5c08" />
          </linearGradient>

          {/* Coin inner shadow */}
          <radialGradient id="tkCoinShadow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)"    />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
          </radialGradient>

          {/* Gold dot glow */}
          <filter id="tkGoldGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Blue dot glow */}
          <filter id="tkBlueGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Coin drop shadow */}
          <filter id="tkCoinShadowF" x="-20%" y="-20%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="10" result="blur" />
          </filter>

          {/* Orbit paths — Gold: wide horizontal ellipse; Equity: tall vertical ellipse */}
          <path id="tkOrbitGold"
            d="M 40,160 a 120,44 0 1,0 240,0 a 120,44 0 1,0 -240,0"
          />
          <path id="tkOrbitEquity"
            d="M 160,44 a 38,116 0 1,0 0,232 a 38,116 0 1,0 0,-232"
          />
        </defs>

        {/* ── Background hex dots (blockchain texture) ── */}
        {[
          [36,  56], [284, 56],  [36, 264], [284, 264],
          [160, 18], [160, 302], [18, 160], [302, 160],
          [82,  36], [238, 36],  [82, 284], [238, 284],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(212,175,55,0.12)">
            <animate
              attributeName="opacity"
              values="0.12;0.35;0.12"
              dur={`${2.5 + (i % 4) * 0.7}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.4) % 2}s`}
            />
          </circle>
        ))}

        {/* ── Gold orbit track ── */}
        <ellipse cx="160" cy="160" rx="120" ry="44"
          fill="none"
          stroke="rgba(212,175,55,0.14)"
          strokeWidth="1"
          strokeDasharray="5 7"
        />

        {/* ── Equity orbit track (slightly rotated) ── */}
        <g transform="rotate(6, 160, 160)">
          <ellipse cx="160" cy="160" rx="38" ry="116"
            fill="none"
            stroke="rgba(99,138,198,0.14)"
            strokeWidth="1"
            strokeDasharray="5 7"
          />
        </g>

        {/* ── Coin drop shadow ── */}
        <ellipse cx="163" cy="172" rx="54" ry="16"
          fill="rgba(0,0,0,0.55)"
          filter="url(#tkCoinShadowF)"
        />

        {/* ── Pulse rings ── */}
        <circle cx="160" cy="160" r="68" fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="1">
          <animate attributeName="r"       values="68;94;68"  dur="3.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
          <animate attributeName="opacity" values="0.2;0;0.2" dur="3.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </circle>
        <circle cx="160" cy="160" r="68" fill="none" stroke="rgba(212,175,55,0.10)" strokeWidth="1">
          <animate attributeName="r"       values="68;94;68"  dur="3.8s" repeatCount="indefinite" begin="-1.9s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
          <animate attributeName="opacity" values="0.15;0;0.15" dur="3.8s" repeatCount="indefinite" begin="-1.9s" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </circle>

        {/* ── Coin body ── */}
        {/* Outer rim */}
        <circle cx="160" cy="160" r="58" fill="url(#tkCoinRim)" />
        {/* Knurled edge ring */}
        <circle cx="160" cy="160" r="58" fill="none"
          stroke="rgba(255,240,100,0.15)" strokeWidth="4"
          strokeDasharray="2.5 2.5"
        />
        {/* Face */}
        <circle cx="160" cy="160" r="52" fill="url(#tkCoinFace)" />
        {/* Inner shadow vignette */}
        <circle cx="160" cy="160" r="52" fill="url(#tkCoinShadow)" />
        {/* Decorative inner ring */}
        <circle cx="160" cy="160" r="44" fill="none"
          stroke="rgba(255,240,120,0.18)" strokeWidth="0.75"
        />

        {/* ── M lettermark ── */}
        <text
          x="160" y="179"
          textAnchor="middle"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 52,
            fontWeight: 400,
            fill: "rgba(8,7,6,0.82)",
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          M
        </text>

        {/* Coin highlight (specular) */}
        <ellipse cx="143" cy="136" rx="17" ry="9"
          fill="rgba(255,252,210,0.22)"
          transform="rotate(-40, 143, 136)"
        />

        {/* ── Orbiting Gold dot ── */}
        <g filter="url(#tkGoldGlow)">
          <circle r="8.5" fill="#F5C842" stroke="rgba(255,240,140,0.6)" strokeWidth="1.5">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
              <mpath href="#tkOrbitGold" />
            </animateMotion>
          </circle>
        </g>

        {/* ── Orbiting Equity dot (on rotated orbit) ── */}
        <g transform="rotate(6, 160, 160)" filter="url(#tkBlueGlow)">
          <circle r="7" fill="#638AC6" stroke="rgba(99,138,198,0.5)" strokeWidth="1.5">
            <animateMotion dur="10.5s" repeatCount="indefinite" begin="-4s" rotate="auto">
              <mpath href="#tkOrbitEquity" />
            </animateMotion>
          </circle>
        </g>

        {/* ── Orbit labels ── */}
        {/* Gold label — top-right of horizontal orbit */}
        <g>
          <rect x="245" y="108" width="66" height="28" rx="5"
            fill="rgba(212,175,55,0.08)"
            stroke="rgba(212,175,55,0.25)" strokeWidth="0.75"
          />
          <text x="278" y="120" textAnchor="middle"
            style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fill: "#D4AF37", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            GOLD (XAU)
          </text>
          <text x="278" y="131" textAnchor="middle"
            style={{ fontSize: 8, fontFamily: "Plus Jakarta Sans, sans-serif", fill: "rgba(212,175,55,0.55)", letterSpacing: "0.02em" }}>
            London Fixing
          </text>
        </g>

        {/* Equity label — bottom-left of vertical orbit */}
        <g>
          <rect x="8" y="186" width="72" height="28" rx="5"
            fill="rgba(99,138,198,0.08)"
            stroke="rgba(99,138,198,0.25)" strokeWidth="0.75"
          />
          <text x="44" y="198" textAnchor="middle"
            style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, fill: "#638AC6", letterSpacing: "0.04em" }}>
            EQUITY
          </text>
          <text x="44" y="209" textAnchor="middle"
            style={{ fontSize: 8, fontFamily: "Plus Jakarta Sans, sans-serif", fill: "rgba(99,138,198,0.55)", letterSpacing: "0.02em" }}>
            MSCI World
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ─── Performance Bar ─── */
function PerfBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setWidth((value / max) * 100); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, max]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, color, fontFamily: "monospace", fontWeight: 600 }}>{value}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 9999 }}>
        <div
          className="bar-fill"
          style={{ height: "100%", width: `${width}%`, background: color, borderRadius: 9999 }}
        />
      </div>
    </div>
  );
}

/* ─── Nav ─── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how" },
    { label: "Performance", href: "#performance" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,7,6,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div
            style={{
              width: 28, height: 28, borderRadius: 6,
              background: "linear-gradient(135deg, #D4AF37, #F5C842)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ color: "#080706", fontWeight: 700, fontSize: 11, letterSpacing: "-0.02em" }}>M</span>
          </div>
          <span style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>
            IDDF-MSCI
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-primary flex items-center gap-1.5" style={{ padding: "7px 16px", fontSize: 13 }}>
            <Download size={12} />
            Download Whitepaper
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "rgba(8,7,6,0.98)",
            borderTop: "1px solid rgba(212,175,55,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="block nav-link text-base" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Download size={13} />
                Download Whitepaper
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── VALUE PROP CARD ─── */
function ValueCard({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <div
      className="card reveal p-6"
      style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
    >
      <div
        style={{
          width: 40, height: 40, borderRadius: 8,
          background: "rgba(212,175,55,0.1)",
          border: "1px solid rgba(212,175,55,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Icon size={18} color="var(--gold-mid)" />
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 590, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.01em" }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.65, letterSpacing: "-0.01em" }}>
        {desc}
      </p>
    </div>
  );
}

/* ─── STEP CARD ─── */
function StepCard({
  num,
  title,
  desc,
  detail,
  delay = 0,
}: {
  num: string;
  title: string;
  desc: string;
  detail: string;
  delay?: number;
}) {
  return (
    <div
      className="reveal relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: "50%",
          background: "rgba(212,175,55,0.1)",
          border: "1px solid rgba(212,175,55,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600,
          color: "var(--gold-mid)",
          flexShrink: 0,
          fontFamily: "monospace",
        }}
      >
        {num}
      </div>
      <div style={{ paddingLeft: 48 }}>
        <div className="tag" style={{ marginBottom: 12 }}>{detail}</div>
        <h3 style={{ fontSize: 20, fontWeight: 500, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.02em" }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.7 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ─── CERTIFICATION BADGE ─── */
function CertBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 6,
        background: "rgba(212,175,55,0.04)",
        border: "1px solid rgba(212,175,55,0.15)",
        fontSize: 11,
        fontWeight: 500,
        color: "var(--gold-mid)",
        letterSpacing: "0.03em",
      }}
    >
      <Shield size={11} />
      {label}
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function HomePage() {
  useReveal();

  return (
    <>
      {/* Grain overlay */}
      <div className="grain" />

      <Nav />

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center"
        style={{ paddingTop: 80 }}
      >
        <div className="hero-gradient" />

        <div className="max-w-6xl mx-auto px-6 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="tag" style={{ marginBottom: 24 }}>
                Real World Asset · BNB Smart Chain · LayerZero OFT
              </div>

              <h1 className="text-display-xl" style={{ marginBottom: 20 }}>
                Professional{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, #F5C842 0%, #D4AF37 60%, #F5C842 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Gold‑Equity
                </em>{" "}
                Strategy, Now On‑Chain
              </h1>

              <p
                style={{
                  fontSize: 17,
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: 36,
                  maxWidth: 480,
                  letterSpacing: "-0.01em",
                }}
              >
                IDDF-MSCI gives you fractional exposure to the{" "}
                <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>MSCI ID Digital Funds</strong> —
                a professionally managed Equity-Gold Rotation strategy by{" "}
                <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>STAR Asset Management</strong>,
                IDR 30T+ AUM, available 24/7 on-chain.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mb-12">
                <button className="btn-primary flex items-center gap-2">
                  <Download size={14} />
                  Download Whitepaper
                </button>
                <a href="#about" className="btn-ghost flex items-center gap-2" style={{ textDecoration: "none" }}>
                  Learn More
                  <ArrowRight size={13} />
                </a>
              </div>

              {/* Quick metrics */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
                style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
              >
                {[
                  { label: "AUM STAR AM", value: "IDR 30T+" },
                  { label: "Target AUM", value: "IDR 200B" },
                  { label: "25Y CAGR", value: "11.2%" },
                  { label: "Return/Risk", value: "1.11" },
                ].map((m) => (
                  <div key={m.label}>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--gold-bright)",
                        lineHeight: 1.2,
                      }}
                    >
                      {m.value}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 3, letterSpacing: "0.03em" }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: token visual */}
            <div className="flex flex-col items-center">
              <div className="token-scale-desktop">
                <div className="float-animation">
                  <TokenVisual />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2"
          style={{ transform: "translateX(-50%)", animation: "float 2s ease-in-out infinite" }}
        >
          <ChevronDown size={18} color="var(--text-muted)" />
        </div>
      </section>

      {/* ── PARTNER / TRUST BAR ── */}
      <section style={{ borderTop: "1px solid rgba(212,175,55,0.08)", borderBottom: "1px solid rgba(212,175,55,0.08)", background: "var(--bg-panel)" }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Backed by
            </span>
            {[
              { name: "STAR Asset Management", tag: "Investment Manager" },
              { name: "PT. Sejahtera Bersama Nano", tag: "Token Issuer" },
              { name: "BNB Smart Chain", tag: "Blockchain" },
              { name: "OJK Compliant", tag: "Regulated" },
            ].map((p) => (
              <div key={p.name} className="flex flex-col">
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{p.name}</span>
                <span style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em" }}>{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / VALUE PROPS ── */}
      <section id="about" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Why IDDF-MSCI?</div>
            <h2 className="text-display" style={{ marginBottom: 16 }}>
              Institutional Investing,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Without Barriers
              </span>
            </h2>
            <p style={{ fontSize: 17, color: "var(--text-tertiary)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              IDDF-MSCI bridges the MSCI ID Digital Funds — STAR Asset Management&apos;s Equity-Gold Rotation strategy —
              with blockchain accessibility. Open to everyone, from as little as IDR 100,000.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ValueCard
              icon={BarChart3}
              title="Fractional Access"
              desc="Invest from a small amount — no large capital required to access professional fund strategies previously reserved for institutions."
              delay={0}
            />
            <ValueCard
              icon={Clock}
              title="24/7 Distribution"
              desc="Buy and sell anytime through trusted crypto exchanges. On-chain transfers on BNB Smart Chain with no time restrictions."
              delay={80}
            />
            <ValueCard
              icon={Shield}
              title="Expert Management"
              desc="MSCI ID Digital Funds managed by STAR Asset Management — IDR 30T+ AUM, 8M+ investor accounts, ISO 9001/27001/37001 certified."
              delay={160}
            />
            <ValueCard
              icon={Lock}
              title="Transparent Pricing"
              desc="Token price always tracks the fund's daily NAV — no secondary market speculation or manipulative premiums."
              delay={240}
            />
          </div>

          {/* ISO certs row */}
          <div className="flex flex-wrap gap-3 mt-10 justify-center reveal" style={{ transitionDelay: "300ms" }}>
            {["ISO 9001", "ISO 27001", "ISO 27701", "ISO 37001"].map((c) => (
              <CertBadge key={c} label={c} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left sticky header */}
            <div className="reveal lg:sticky lg:top-24">
              <div className="tag" style={{ marginBottom: 16 }}>Mechanism</div>
              <h2 className="text-display" style={{ marginBottom: 20 }}>
                How{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  IDDF-MSCI
                </span>{" "}
                Works
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-tertiary)", lineHeight: 1.75, marginBottom: 28 }}>
                Three core mechanisms that set IDDF-MSCI apart from conventional investment products.
              </p>

              {/* Structure diagram */}
              <div className="card p-5" style={{ fontSize: 13 }}>
                {[
                  { name: "PT. Sejahtera Bersama Nano", role: "Token Issuer" },
                  { name: "STAR Asset Management", role: "Investment Manager" },
                  { name: "IDDF-MSCI Token (BEP-20 · OFT)", role: "On-Chain Representation" },
                  { name: "Exchange Partners", role: "Distribution" },
                  { name: "Investor", role: "End User" },
                ].map((node, i, arr) => (
                  <div key={node.name}>
                    <div className="flex items-center gap-3 py-2">
                      <div
                        style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: i < 3 ? "var(--gold-mid)" : "rgba(255,255,255,0.3)",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 500, color: "var(--text-primary)" }}>{node.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{node.role}</div>
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ marginLeft: 9, borderLeft: "1px dashed rgba(212,175,55,0.2)", height: 12 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: steps */}
            <div className="space-y-12">
              <StepCard
                num="01"
                title="Smart Rotation Strategy"
                desc="A quantitative algorithm allocates 100% of the portfolio between MSCI World Islamic Top 50 Index (equity) and iShares Gold Trust / IAU (gold) based on the strongest trend signal. Annualized volatility target: 10%."
                detail="MSCI Islamic Top 50 · IAU · Quantitative"
                delay={0}
              />
              <StepCard
                num="02"
                title="Transparent Tokenization"
                desc="Each IDDF-MSCI token represents fractional ownership in the MSCI ID Digital Funds Discretionary Mandate (KPD). Tokens are minted on capital entry and burned on redemption — all recorded on BNB Smart Chain."
                detail="BEP-20 · LayerZero OFT · NAV Pricing"
                delay={100}
              />
              <StepCard
                num="03"
                title="Simple Buy & Sell"
                desc="Access via licensed crypto exchanges — deposit IDR or stablecoins (USDT/USDC), buy IDDF-MSCI, monitor your portfolio, and redeem anytime within 2–3 business days."
                detail="24/7 · Fiat & Crypto"
                delay={200}
              />

              {/* Allocation scenarios */}
              <div className="reveal card p-5 space-y-4" style={{ transitionDelay: "250ms" }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                  3 Automatic Allocation Scenarios
                </div>
                {[
                  { cond: "Both assets trending ↑↑", action: "100% to the strongest asset", color: "var(--gold-bright)" },
                  { cond: "One asset trending ↑", action: "100% to the trending asset", color: "var(--gold-mid)" },
                  { cond: "No clear trend ↓→", action: "100% to lower volatility asset", color: "var(--text-tertiary)" },
                ].map((s) => (
                  <div key={s.cond} className="flex items-start gap-3">
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{s.cond}</div>
                      <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>→ {s.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── PERFORMANCE ── */}
      <section id="performance" className="py-32 relative overflow-hidden">
        <div className="section-gradient absolute inset-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16 reveal">
            <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Historical Performance</div>
            <h2 className="text-display" style={{ marginBottom: 16 }}>
              25 Years{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Proven
              </span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-tertiary)", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
              Simulation of the MSCI ID Digital Funds Equity-Gold Rotation strategy vs. benchmarks — March 2001 to April 2026, net total returns in USD.
            </p>
          </div>

          {/* Big metrics row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Annualized Return", value: "11.2%", sub: "Gold & Equity Rotation", highlight: true },
              { label: "Annualized Risk", value: "10.1%", sub: "Volatility (USD)" },
              { label: "Return/Risk Ratio", value: "1.11", sub: "vs 0.83 Gold · 0.63 Equity" },
              { label: "Simultaneous Drawdown", value: "~7%", sub: "Both assets down at once" },
            ].map((m) => (
              <div
                key={m.label}
                className={`card p-5 reveal ${m.highlight ? "card-gold" : ""}`}
              >
                <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                  {m.label}
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: m.highlight ? "var(--gold-bright)" : "var(--text-primary)",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {m.value}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Comparison bars */}
          <div className="card p-6 reveal">
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", marginBottom: 20, letterSpacing: "-0.01em" }}>
              Annualized Return — 25-Year Simulation (Mar 2001 – Apr 2026)
            </div>
            <div className="space-y-5">
              <PerfBar label="Gold & Equity Rotation (IDDF-MSCI)" value={11.2} max={14} color="var(--gold-bright)" />
              <PerfBar label="iShares Gold Trust (IAU)" value={8.3} max={14} color="rgba(212,175,55,0.5)" />
              <PerfBar label="MSCI World Islamic Top 50" value={6.2} max={14} color="rgba(99,138,198,0.6)" />
            </div>

            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.04)",
                fontSize: 11,
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              <span style={{ marginRight: 6 }}>⚠️</span>Past performance is not indicative of future results. Figures based on simulated backtests using historical asset prices. Simulations have not been adopted or endorsed by MSCI.
            </div>
          </div>

          {/* Correlation insight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="card p-5 reveal">
              <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                Historical Correlation (25Y)
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: "1.8rem", fontWeight: 700, color: "var(--gold-bright)" }}>~0</div>
                  <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Gold ↔ Equity Correlation</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.6, maxWidth: 200 }}>
                  Gold and equities exhibit near-zero long-term correlation — a powerful portfolio diversification tool.
                </div>
              </div>
            </div>
            <div className="card p-5 reveal" style={{ transitionDelay: "80ms" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                Volatility Target
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: "1.8rem", fontWeight: 700, color: "var(--gold-bright)" }}>10%</div>
                  <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Annualized Target</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.6, maxWidth: 200 }}>
                  Every allocation is calibrated to maintain consistent risk exposure.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── GETTING STARTED ── */}
      <section id="invest" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <div className="tag" style={{ marginBottom: 16 }}>Get Started</div>
              <h2 className="text-display" style={{ marginBottom: 20 }}>
                3{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Simple
                </span>{" "}
                Steps
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-tertiary)", lineHeight: 1.75, marginBottom: 32 }}>
                From registration to holding IDDF-MSCI tokens, the process is designed to be as straightforward as possible.
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Choose an Exchange Platform",
                    desc: "Register on one of our OJK-licensed exchange partners. Start from as little as IDR 100,000.",
                  },
                  {
                    step: "2",
                    title: "Complete KYC Verification",
                    desc: "Upload your ID, tax number, and a selfie. Approval typically takes 1–2 business days.",
                  },
                  {
                    step: "3",
                    title: "Buy IDDF-MSCI Tokens",
                    desc: "Deposit IDR or USDT, search for IDDF-MSCI, and confirm your purchase. Tokens are delivered to your wallet.",
                  },
                ].map((s, i) => (
                  <div
                    key={s.step}
                    className="reveal flex gap-4"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div
                      style={{
                        width: 36, height: 36,
                        borderRadius: 8,
                        background: i === 0 ? "linear-gradient(135deg, #D4AF37, #F5C842)" : "rgba(212,175,55,0.08)",
                        border: i === 0 ? "none" : "1px solid rgba(212,175,55,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700,
                        color: i === 0 ? "#080706" : "var(--gold-mid)",
                        flexShrink: 0,
                        fontFamily: "monospace",
                      }}
                    >
                      {s.step}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginBottom: 4 }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.65 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-10">
                <button className="btn-primary flex items-center gap-2">
                  <Download size={14} />
                  Download Whitepaper
                </button>
              </div>
            </div>

            {/* Right: KYC doc list + investment limits */}
            <div className="space-y-4 reveal" style={{ transitionDelay: "100ms" }}>
              <div className="card p-5">
                <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
                  Required KYC Documents
                </div>
                {[
                  { doc: "National ID / Passport", note: "Clear photo or scan" },
                  { doc: "Tax Identification Number (NPWP)", note: "Required for Indonesian residents" },
                  { doc: "Selfie with ID", note: "Real-time, tamper-proof" },
                  { doc: "Proof of Address", note: "Utility bill or bank statement (last 3 months)" },
                  { doc: "Source of Funds", note: "Form provided by the platform" },
                ].map((item) => (
                  <div
                    key={item.doc}
                    className="flex items-start gap-3 py-2.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div
                      style={{
                        width: 16, height: 16, borderRadius: "50%",
                        border: "1px solid rgba(212,175,55,0.4)",
                        flexShrink: 0, marginTop: 1,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-mid)" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{item.doc}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Investment limits */}
              <div className="card-gold p-5">
                <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                  Minimum Investment
                </div>
                {[
                  { platform: "Via Exchange Partner", min: "IDR 100,000", recommended: true },
                  { platform: "Direct via PT. SBN", min: "IDR 10,000,000", recommended: false },
                ].map((row) => (
                  <div key={row.platform} className="flex justify-between items-center py-2.5" style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{row.platform}</div>
                      {row.recommended && (
                        <div style={{ fontSize: 10, color: "var(--gold-mid)", letterSpacing: "0.04em" }}>RECOMMENDED</div>
                      )}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: "var(--gold-bright)" }}>
                      {row.min}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TRUST / CREDIBILITY ── */}
      <section id="resources" className="py-32 relative overflow-hidden">
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }} />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16 reveal">
            <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Trust & Security</div>
            <h2 className="text-display" style={{ marginBottom: 16 }}>
              Built on a{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Solid Foundation
              </span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-tertiary)", maxWidth: 450, margin: "0 auto", lineHeight: 1.7 }}>
              Regulated, audited, and managed by Indonesia&apos;s most trusted institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Shield,
                title: "Token Issuer",
                name: "PT. Sejahtera Bersama Nano",
                points: ["IDDF-MSCI token issuer", "KYC/AML compliance", "KPD (MSCI ID Digital Funds)", "Commercial operations"],
              },
              {
                icon: TrendingUp,
                title: "Investment Manager",
                name: "STAR Asset Management",
                points: ["IDR 30T+ AUM", "8M+ Investor Accounts", "Manages MSCI ID Digital Funds KPD", "ISO 9001/27001/37001 certified"],
                featured: true,
              },
              {
                icon: Lock,
                title: "Blockchain Security",
                name: "BNB Smart Chain (BEP-20)",
                points: ["Multi-sig governance", "OpenZeppelin standards", "LayerZero OFT omnichain", "Smart contract audited"],
              },
            ].map((col) => (
              <div
                key={col.name}
                className={`card reveal p-6 ${col.featured ? "card-gold" : ""}`}
                style={col.featured ? { position: "relative" } : {}}
              >
                {col.featured && (
                  <div
                    style={{
                      position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                      background: "linear-gradient(90deg, #D4AF37, #F5C842)",
                      color: "#080706", fontSize: 9, fontWeight: 700,
                      padding: "2px 12px", borderRadius: "0 0 6px 6px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    CORE PARTNER
                  </div>
                )}
                <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                  {col.title}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginBottom: 14 }}>
                  {col.name}
                </div>
                <ul className="space-y-2">
                  {col.points.map((p) => (
                    <li key={p} className="flex items-center gap-2" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold-mid)", flexShrink: 0 }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Fee structure */}
          <div className="card p-6 reveal mb-4">
            <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
              Fee Structure
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { fee: "Asset Management Fee", range: "100 – 150 bps", note: "Charged by STAR AM" },
                { fee: "Custodian Bank Fee", range: "10 – 25 bps", note: "Custody & settlement" },
                { fee: "Exchange / Distribution Fee", range: "Disclosed by Exchange", note: "Per exchange platform" },
              ].map((f) => (
                <div key={f.fee} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>{f.fee}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: "var(--gold-bright)", marginBottom: 2 }}>{f.range}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{f.note}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 12, lineHeight: 1.6 }}>
              All fees are embedded in the daily NAV per Unit. No additional subscription or redemption fees at the token level beyond what is disclosed by the exchange platform.
            </div>
          </div>

          {/* Stats row */}
          <div className="card p-6 reveal">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: "IDR 30T+", label: "AUM by STAR AM" },
                { value: "8M+", label: "Investor Accounts" },
                { value: "#13", label: "Fixed Income MF Ranking" },
                { value: "4x", label: "ISO Certifications" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--gold-bright)", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── ROADMAP ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Roadmap</div>
            <h2 className="text-heading-1" style={{ marginBottom: 12 }}>
              Path to{" "}
              <span style={{ background: "linear-gradient(135deg, #F5C842, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Launch
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 reveal">
            {[
              { phase: "Phase 1", title: "Index Development", timeline: "1 Month", desc: "Design and finalize the Equity-Gold Rotation quantitative strategy and index methodology." },
              { phase: "Phase 2", title: "Regulatory Approval", timeline: "3 Months", desc: "Legal structuring of the KPD. Obtain OJK regulatory approvals for the tokenized product." },
              { phase: "Phase 3", title: "Book Building", timeline: "1 Month", desc: "Investor education, marketing campaign, and pre-subscription from anchor investors." },
              { phase: "Phase 4", title: "Launch", timeline: "Q3 2026", desc: "Integration with licensed Crypto Exchanges. Live token issuance. Target AUM: IDR 200 Billion.", highlight: true },
              { phase: "Phase 5", title: "Omnichain Expansion", timeline: "H1 2027", desc: "Ethereum and additional chain deployments via LayerZero OFT." },
            ].map((p) => (
              <div
                key={p.phase}
                className={p.highlight ? "card-gold p-5" : "card p-5"}
                style={{ position: "relative" }}
              >
                {p.highlight && (
                  <div style={{
                    position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(90deg, #D4AF37, #F5C842)",
                    color: "#080706", fontSize: 9, fontWeight: 700,
                    padding: "2px 10px", borderRadius: "0 0 5px 5px", letterSpacing: "0.08em",
                  }}>LAUNCH</div>
                )}
                <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{p.phase}</div>
                <div style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: p.highlight ? "var(--gold-bright)" : "var(--gold-mid)", marginBottom: 8 }}>{p.timeline}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FAQ PREVIEW ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="text-heading-1" style={{ marginBottom: 12 }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: 15, color: "var(--text-tertiary)" }}>The most common questions from IDDF-MSCI investors.</p>
          </div>

          <div className="space-y-2 reveal">
            {[
              {
                q: "How is IDDF-MSCI different from regular cryptocurrency?",
                a: "IDDF-MSCI is an RWA token — its value tracks the daily NAV per Unit of the MSCI ID Digital Funds, a Discretionary Mandate (KPD) managed by STAR Asset Management. There is no secondary market speculation or premium.",
              },
              {
                q: "What is the minimum investment?",
                a: "Starting from IDR 100,000 through our exchange partners. There is no maximum limit (investments above IDR 1M may require enhanced due diligence).",
              },
              {
                q: "How do I sell or redeem IDDF-MSCI?",
                a: "Submit a redemption request on your exchange. The process takes 2–3 business days: tokens are burned, STAR AM liquidates positions, and proceeds are returned in IDR or stablecoins.",
              },
              {
                q: "Is there a lock-up period?",
                a: "There is no lock-up period. However, because the underlying asset is a KPD, redemptions require 2–3 business days for settlement. Large redemptions may be queued.",
              },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* ── FINAL CTA ── */}
      <section className="py-32 relative overflow-hidden">
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="reveal">
            <div className="tag" style={{ display: "inline-flex", marginBottom: 20 }}>Ready to Start?</div>
            <h2 className="text-display-lg" style={{ marginBottom: 20 }}>
              Smart Investing{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #F5C842 0%, #D4AF37 60%, #F5C842 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Starts Today
              </span>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-tertiary)",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 460,
                margin: "0 auto 36px",
              }}
            >
              Join thousands of investors accessing a professional Gold-Equity rotation strategy
              through IDDF-MSCI. Start from as little as IDR 100,000.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <button className="btn-primary flex items-center gap-2" style={{ padding: "12px 28px", fontSize: 15 }}>
                <Download size={15} />
                Download Whitepaper
              </button>
              <a href="#about" className="btn-ghost flex items-center gap-2" style={{ padding: "12px 24px", fontSize: 15, textDecoration: "none" }}>
                Learn More
                <ArrowRight size={14} />
              </a>
            </div>

            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                justifyContent: "center",
                lineHeight: 1.5,
              }}
            >
              {["KYC required · OJK compliant", "No lock-up period", "Redemption T+2–3 business days"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold-deep)", flexShrink: 0 }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(212,175,55,0.08)",
          background: "var(--bg-panel)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  style={{
                    width: 24, height: 24, borderRadius: 5,
                    background: "linear-gradient(135deg, #D4AF37, #F5C842)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#080706", fontWeight: 700, fontSize: 10 }}>M</span>
                </div>
                <span style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em" }}>IDDF-MSCI</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                Real World Asset Token providing access to a professional Gold-Equity rotation fund.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["About IDDF-MSCI", "Tokenomics", "Smart Contract", "Roadmap"],
              },
              {
                title: "Resources",
                links: ["Whitepaper", "FAQs", "Education", "Risk Disclosure"],
              },
              {
                title: "Invest",
                links: ["Exchange Partners", "Direct Investment", "KYC Process", "Fee Structure"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Telegram", "Instagram"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        style={{ fontSize: 13, color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
              paddingTop: 20,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              © 2026 PT. Sejahtera Bersama Nano & STAR Asset Management. All rights reserved.
            </div>
            <div className="flex gap-5">
              {["Privacy Policy", "Terms of Service", "Risk Disclosure"].map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "none" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─── FAQ Accordion Item ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="card"
      style={{
        borderColor: open ? "rgba(212,175,55,0.2)" : undefined,
        transition: "border-color 0.2s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
          {q}
        </span>
        <ChevronDown
          size={16}
          color="var(--text-tertiary)"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s ease", flexShrink: 0 }}
        />
      </button>
      {open && (
        <div style={{ padding: "0 20px 16px", fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.7 }}>
          {a}
        </div>
      )}
    </div>
  );
}
