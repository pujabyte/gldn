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

        {/* ── G lettermark ── */}
        <text
          x="160" y="179"
          textAnchor="middle"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 58,
            fontWeight: 400,
            fill: "rgba(8,7,6,0.82)",
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          G
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
            <span style={{ color: "#080706", fontWeight: 700, fontSize: 12, letterSpacing: "-0.02em" }}>G</span>
          </div>
          <span style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>
            GLDN
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
                Real World Asset · BNB Smart Chain
              </div>

              <h1 className="text-display-xl" style={{ marginBottom: 20 }}>
                Strategi{" "}
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
                Profesional, Kini On‑Chain
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
                GLDN memberi Anda eksposur fraksional ke Indonesia&apos;s premier Gold Plus Fund —
                dikelola oleh <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>STAR Asset Management</strong>,
                Rp 30T+ AUM, tersedia 24/7 on-chain.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mb-12">
                <button className="btn-primary flex items-center gap-2">
                  <Download size={14} />
                  Download Whitepaper
                </button>
                <a href="#about" className="btn-ghost flex items-center gap-2" style={{ textDecoration: "none" }}>
                  Pelajari Lebih Lanjut
                  <ArrowRight size={13} />
                </a>
              </div>

              {/* Quick metrics */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
                style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
              >
                {[
                  { label: "AUM STAR AM", value: "Rp 30T+" },
                  { label: "Current NAV", value: "$100.00" },
                  { label: "25Y CAGR", value: "~12%" },
                  { label: "GLDN Holders", value: "1,200+" },
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
              Didukung oleh
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
            <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Mengapa GLDN?</div>
            <h2 className="text-display" style={{ marginBottom: 16 }}>
              Investasi Profesional,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Tanpa Batas
              </span>
            </h2>
            <p style={{ fontSize: 17, color: "var(--text-tertiary)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              GLDN menghubungkan world-class institutional fund management dengan aksesibilitas blockchain —
              terbuka untuk semua, dari Rp 100.000.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ValueCard
              icon={BarChart3}
              title="Akses Fraksional"
              desc="Investasi dari nilai kecil — tidak perlu modal besar untuk akses strategi fund profesional yang biasanya hanya untuk institusi."
              delay={0}
            />
            <ValueCard
              icon={Clock}
              title="Distribusi 24/7"
              desc="Beli dan jual kapan saja melalui exchange crypto terpercaya. Transfer on-chain BNB Smart Chain tanpa batas waktu."
              delay={80}
            />
            <ValueCard
              icon={Shield}
              title="Manajemen Expert"
              desc="Dikelola STAR Asset Management — AUM Rp 30 Triliun, 8+ juta SID, ISO 9001/27001/37001 certified."
              delay={160}
            />
            <ValueCard
              icon={Lock}
              title="Harga Transparan"
              desc="Harga token selalu mengikuti NAV harian fund — tidak ada spekulasi pasar sekunder atau premium manipulatif."
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
              <div className="tag" style={{ marginBottom: 16 }}>Mekanisme</div>
              <h2 className="text-display" style={{ marginBottom: 20 }}>
                Bagaimana{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GLDN
                </span>{" "}
                Bekerja?
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-tertiary)", lineHeight: 1.75, marginBottom: 28 }}>
                Tiga mekanisme utama yang membuat GLDN berbeda dari produk investasi konvensional.
              </p>

              {/* Structure diagram */}
              <div className="card p-5" style={{ fontSize: 13 }}>
                {[
                  { name: "PT. Sejahtera Bersama Nano", role: "Token Issuer" },
                  { name: "STAR Asset Management", role: "Investment Manager" },
                  { name: "GLDN Token (BEP-20)", role: "On-Chain Representation" },
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
                title="Strategi Rotasi Cerdas"
                desc="Algoritma kuantitatif secara otomatis mengalokasikan 100% portfolio antara emas global dan ekuitas berdasarkan trend signal terkuat. Target volatilitas 10% annualized."
                detail="Gold + Equity · Quantitative"
                delay={0}
              />
              <StepCard
                num="02"
                title="Tokenisasi Transparan"
                desc="Setiap token GLDN merepresentasikan kepemilikan fraksional dalam Discretionary Mandate (KPD). Mint saat modal masuk, burn saat redemption — semua tercatat on-chain."
                detail="BEP-20 · NAV-Based Pricing"
                delay={100}
              />
              <StepCard
                num="03"
                title="Beli & Jual Mudah"
                desc="Akses melalui exchange crypto licensed — deposit IDR atau stablecoin USDT/USDC, beli GLDN, pantau portofolio, redeem kapan saja dalam 2-3 hari kerja."
                detail="24/7 · Fiat & Crypto"
                delay={200}
              />

              {/* Allocation scenarios */}
              <div className="reveal card p-5 space-y-4" style={{ transitionDelay: "250ms" }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                  3 Skenario Alokasi Otomatis
                </div>
                {[
                  { cond: "Keduanya trending ↑↑", action: "100% ke asset paling kuat", color: "var(--gold-bright)" },
                  { cond: "Satu asset trending ↑", action: "100% ke asset yang trending", color: "var(--gold-mid)" },
                  { cond: "Tidak ada trend ↓→", action: "100% ke volatilitas lebih rendah", color: "var(--text-tertiary)" },
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
            <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Kinerja Historis</div>
            <h2 className="text-display" style={{ marginBottom: 16 }}>
              25 Tahun{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Terbukti
              </span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-tertiary)", maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}>
              Simulasi backtest strategi Gold Plus Fund vs benchmark selama 25 tahun.
            </p>
          </div>

          {/* Big metrics row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { label: "25Y CAGR", value: "~12.4%", sub: "Gold Plus Strategy", highlight: true },
              { label: "Max Drawdown", value: "-18.2%", sub: "vs -57% Equity Only" },
              { label: "Sharpe Ratio", value: "0.87", sub: "Risk-adjusted return" },
              { label: "Win Rate", value: "73%", sub: "Positive years" },
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
              Comparative CAGR — Simulasi 25 Tahun
            </div>
            <div className="space-y-5">
              <PerfBar label="GLDN Gold Plus Strategy" value={12.4} max={15} color="var(--gold-bright)" />
              <PerfBar label="Gold Only (XAU/USD)" value={8.1} max={15} color="rgba(212,175,55,0.5)" />
              <PerfBar label="MSCI World Equity" value={9.6} max={15} color="rgba(99,138,198,0.6)" />
              <PerfBar label="60/40 Portfolio" value={7.2} max={15} color="rgba(99,138,198,0.35)" />
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
                Korelasi Historis (25Y)
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: "1.8rem", fontWeight: 700, color: "var(--gold-bright)" }}>~0</div>
                  <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Gold ↔ Equity Correlation</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.6, maxWidth: 200 }}>
                  Kombinasi dua asset yang tidak berkorelasi = diversifikasi optimal.
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
                  Setiap alokasi dikalibrasi untuk mempertahankan risiko yang konsisten.
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
              <div className="tag" style={{ marginBottom: 16 }}>Mulai Investasi</div>
              <h2 className="text-display" style={{ marginBottom: 20 }}>
                3 Langkah{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Mudah
                </span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-tertiary)", lineHeight: 1.75, marginBottom: 32 }}>
                Dari registrasi hingga kepemilikan GLDN token, prosesnya dirancang sesederhana mungkin.
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Pilih Platform Exchange",
                    desc: "Daftar di salah satu exchange partner berlisensi OJK. Mulai dari Rp 100.000.",
                  },
                  {
                    step: "2",
                    title: "Lengkapi Verifikasi KYC",
                    desc: "Upload KTP, NPWP, dan selfie. Proses approval biasanya 1–2 hari kerja.",
                  },
                  {
                    step: "3",
                    title: "Beli GLDN Token",
                    desc: "Deposit IDR atau USDT, cari GLDN, konfirmasi pembelian. Token masuk wallet Anda.",
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

            {/* Right: KYC doc list + calculator preview */}
            <div className="space-y-4 reveal" style={{ transitionDelay: "100ms" }}>
              <div className="card p-5">
                <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
                  Dokumen KYC yang Diperlukan
                </div>
                {[
                  { doc: "KTP / Passport", note: "Foto atau scan jelas" },
                  { doc: "NPWP", note: "Wajib untuk WNI" },
                  { doc: "Selfie dengan KTP", note: "Real-time, tidak bisa dimanipulasi" },
                  { doc: "Proof of Address", note: "Tagihan listrik / bank statement 3 bln" },
                  { doc: "Sumber Dana", note: "Form disediakan oleh platform" },
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
                  Minimum Investasi
                </div>
                {[
                  { platform: "Via Exchange Partner", min: "Rp 100.000", recommended: true },
                  { platform: "Direct via PT. SBN", min: "Rp 10.000.000", recommended: false },
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
            <div className="tag" style={{ display: "inline-flex", marginBottom: 16 }}>Kepercayaan & Keamanan</div>
            <h2 className="text-display" style={{ marginBottom: 16 }}>
              Dibangun di Atas{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F5C842, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Fondasi Kokoh
              </span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-tertiary)", maxWidth: 450, margin: "0 auto", lineHeight: 1.7 }}>
              Regulated, audited, dan dikelola oleh lembaga terpercaya Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Shield,
                title: "Token Issuer",
                name: "PT. Sejahtera Bersama Nano",
                points: ["Issuer GLDN token", "KYC/AML compliance", "KPD arrangement", "Commercial operations"],
              },
              {
                icon: TrendingUp,
                title: "Investment Manager",
                name: "STAR Asset Management",
                points: ["Rp 30T+ AUM", "8M+ SID Registrations", "#13 Fixed Income MF", "ISO 9001/27001 certified"],
                featured: true,
              },
              {
                icon: Lock,
                title: "Blockchain Security",
                name: "BNB Smart Chain (BEP-20)",
                points: ["Multi-sig governance", "OpenZeppelin standards", "On-chain transparency", "Smart contract audited"],
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

          {/* Stats row */}
          <div className="card p-6 reveal">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: "Rp 30T+", label: "AUM by STAR AM" },
                { value: "8M+", label: "SID Registrations" },
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

      {/* ── FAQ PREVIEW ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="text-heading-1" style={{ marginBottom: 12 }}>Pertanyaan Umum</h2>
            <p style={{ fontSize: 15, color: "var(--text-tertiary)" }}>Hal yang paling sering ditanyakan investor GLDN.</p>
          </div>

          <div className="space-y-2 reveal">
            {[
              {
                q: "Apa bedanya GLDN dengan cryptocurrency biasa?",
                a: "GLDN adalah RWA token — nilainya mengikuti NAV fund profesional, bukan spekulasi pasar. Setiap token di-backed oleh aset nyata dalam Discretionary Mandate yang dikelola STAR AM.",
              },
              {
                q: "Berapa minimum investasi?",
                a: "Mulai dari Rp 100.000 melalui exchange partner. Tidak ada batas maksimum (investasi >Rp 1M mungkin memerlukan enhanced due diligence).",
              },
              {
                q: "Bagaimana cara menjual/redeem GLDN?",
                a: "Submit redemption request di exchange. Proses 2–3 hari kerja: token diburn, STAR AM likuidasi posisi, proceeds dikembalikan dalam IDR atau stablecoin.",
              },
              {
                q: "Apakah ada lock-up period?",
                a: "Tidak ada lock-up period. Namun karena underlying adalah KPD, redemption membutuhkan 2–3 hari kerja untuk settlement. Large redemptions mungkin diqueue.",
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
            <div className="tag" style={{ display: "inline-flex", marginBottom: 20 }}>Siap Memulai?</div>
            <h2 className="text-display-lg" style={{ marginBottom: 20 }}>
              Investasi{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #F5C842 0%, #D4AF37 60%, #F5C842 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Cerdas
              </span>{" "}
              Dimulai Hari Ini
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
              Bergabung dengan ribuan investor yang mengakses strategi Gold-Equity rotation profesional
              melalui GLDN token. Mulai dari Rp 100.000.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <button className="btn-primary flex items-center gap-2" style={{ padding: "12px 28px", fontSize: 15 }}>
                <Download size={15} />
                Download Whitepaper
              </button>
              <a href="#about" className="btn-ghost flex items-center gap-2" style={{ padding: "12px 24px", fontSize: 15, textDecoration: "none" }}>
                Pelajari Lebih Lanjut
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
              {["KYC required · OJK compliant", "Tidak ada lock-up period", "Redemption T+2-3 hari kerja"].map((t) => (
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
                  <span style={{ color: "#080706", fontWeight: 700, fontSize: 10 }}>G</span>
                </div>
                <span style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em" }}>GLDN</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                Real World Asset Token untuk akses ke Gold-Equity rotation fund profesional.
              </p>
            </div>

            {[
              {
                title: "Produk",
                links: ["Tentang GLDN", "Tokenomics", "Smart Contract", "Roadmap"],
              },
              {
                title: "Resources",
                links: ["Whitepaper", "FAQs", "Edukasi", "Risk Disclosure"],
              },
              {
                title: "Investasi",
                links: ["Exchange Partners", "Direct Investment", "KYC Process", "Fee Structure"],
              },
              {
                title: "Support",
                links: ["Help Center", "Hubungi Kami", "Telegram", "Instagram"],
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
