/**
 * LUMOS LABS — Premium Cinematic Website
 * ========================================
 * Single-file React component. No external dependencies beyond:
 *   - framer-motion
 *   - Google Fonts (Clash Display + IBM Plex Sans — loaded via <style> tag below)
 *
 * HOW TO EDIT:
 *  - Hero text      → HeroSection component (search: HERO CONTENT)
 *  - Value cards    → VALUE_CARDS array
 *  - Pain points    → PAIN_POINTS array
 *  - Services       → SERVICES array
 *  - Portfolio      → PORTFOLIO_ITEMS array  ← main editable data
 *  - CTA text       → CTASection component
 */

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
//  PORTFOLIO DATA  ← EDIT YOUR PROJECTS HERE
// ─────────────────────────────────────────────
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "ProMovie",
    // REPLACE description ↓
    description: "Cinematic movie discovery platform with immersive trailer experience and premium retention-focused UX.",
    // REPLACE result ↓
    result: "+42% session duration · 3× return visits",
    // REPLACE image URL ↓  (use your own hosted image or relative path)
    image: null,
    // REPLACE link ↓ (or set to null to hide)
    link: null,
    accent: "#FF5A1F",
    category: "Entertainment",
  },
  {
    id: 2,
    title: "Aura Beauty",
    // REPLACE description ↓
    description: "Premium booking experience designed to increase repeat appointments and eliminate scheduling friction.",
    // REPLACE result ↓
    result: "+38% repeat bookings · −60% no-shows",
    // REPLACE image URL ↓
    image: null,
    // REPLACE link ↓
    link: null,
    accent: "#8A0F16",
    category: "Beauty & Wellness",
  },
  {
    id: 3,
    title: "Carta Dining",
    // REPLACE description ↓
    description: "Mobile ordering system optimised for faster checkout, upsell flows, and repeat customer retention.",
    // REPLACE result ↓
    result: "+27% avg order value · 2× checkout speed",
    // REPLACE image URL ↓
    image: null,
    // REPLACE link ↓
    link: null,
    accent: "#FF5A1F",
    category: "Food & Hospitality",
  },
  {
    id: 4,
    title: "FleetOS",
    // REPLACE description ↓
    description: "Logistics dashboard eliminating manual dispatch, reducing delivery delays with real-time fleet intelligence.",
    // REPLACE result ↓
    result: "−22% delivery delays · 3× dispatch speed",
    // REPLACE image URL ↓
    image: null,
    // REPLACE link ↓
    link: null,
    accent: "#8A0F16",
    category: "Fashion Tech",
  },
  {
    id: 5,
    title: "Vault Loyalty",
    // REPLACE description ↓
    description: "High-end loyalty platform that converts one-time buyers into brand advocates through personalised rewards.",
    // REPLACE result ↓
    result: "+55% loyalty redemption · −30% churn",
    // REPLACE image URL ↓
    image: null,
    // REPLACE link ↓
    link: null,
    accent: "#FF5A1F",
    category: "Retail",
  },
  {
    id: 6,
    title: "MedFlow",
    // REPLACE description ↓
    description: "Patient-facing clinic app streamlining intake, scheduling, and follow-ups into one frictionless experience.",
    // REPLACE result ↓
    result: "+48% completed bookings · −70% admin load",
    // REPLACE image URL ↓
    image: null,
    // REPLACE link ↓
    link: null,
    accent: "#8A0F16",
    category: "Healthcare",
  },
];

// ─────────────────────────────────────────────
//  VALUE CARDS  ← EDIT HERE
// ─────────────────────────────────────────────
const VALUE_CARDS = [
  { icon: "◈", title: "Reduce Friction", body: "Every unnecessary tap, form field, and loading screen costs you revenue. We map and eliminate it." },
  { icon: "◉", title: "Increase Retention", body: "Customers who stay are worth 5× more than new ones. We build systems that make leaving harder." },
  { icon: "⬡", title: "Automate Chaos", body: "Manual workflows are silent revenue killers. We replace them with intelligent mobile automation." },
  { icon: "◎", title: "Premium Customer Flows", body: "The path from discovery to purchase to loyalty — rebuilt so every step feels effortless." },
  { icon: "◇", title: "Operational Clarity", body: "Real-time dashboards and smart notifications so your team always knows exactly what's happening." },
];

// ─────────────────────────────────────────────
//  PAIN POINTS  ← EDIT HERE
// ─────────────────────────────────────────────
const PAIN_POINTS = [
  { number: "01", headline: "Customers drop off at checkout", body: "Every additional step in a purchase flow reduces conversion by up to 20%. Friction is invisible until it's costing you millions." },
  { number: "02", headline: "Manual workflows consume your team", body: "Staff spend hours on tasks that a well-built mobile system could handle in seconds. That's not an operations problem — it's a systems problem." },
  { number: "03", headline: "Poor onboarding destroys retention", body: "80% of users abandon an app within 72 hours of download. First impressions are set in the first 60 seconds. Most apps fail here." },
  { number: "04", headline: "Businesses lose repeat customers", body: "Acquiring a new customer costs 5–7× more than keeping one. Without a loyalty-driving system, you're paying that premium every single time." },
  { number: "05", headline: "Scattered systems create invisible losses", body: "When your booking, ordering, CRM, and payments don't talk to each other, errors compound silently. The cost is real — it just doesn't appear on one report." },
];

// ─────────────────────────────────────────────
//  SERVICES  ← EDIT HERE
// ─────────────────────────────────────────────
const SERVICES = [
  "Mobile App Strategy",
  "Premium UX / UI Design",
  "Booking & Scheduling Systems",
  "Mobile Ordering Platforms",
  "Loyalty & Retention Systems",
  "Customer Dashboards",
  "App Store & Google Play Launch",
  "Payment & Monetisation Systems",
  "Retention Automation",
];

// ─────────────────────────────────────────────
//  GLOBAL STYLES (injected once)
// ─────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

    /* Clash Display via CDN */
    @font-face {
      font-family: 'Clash Display';
      src: url('https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap');
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black:     #0B0B0C;
      --charcoal:  #121316;
      --metal:     #1B1D21;
      --red:       #8A0F16;
      --orange:    #FF5A1F;
      --white:     #F5F5F5;
      --white-dim: rgba(245,245,245,0.55);
      --white-faint: rgba(245,245,245,0.08);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--black);
      color: var(--white);
      font-family: 'IBM Plex Sans', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::selection { background: var(--orange); color: #000; }

    .clash { font-family: 'Clash Display', 'DM Serif Display', Georgia, serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 2px; }

    /* Noise grain overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.4;
    }
  `}</style>
);

// ─────────────────────────────────────────────
//  NAV
// ─────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "1.5rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(11,11,12,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,245,245,0.05)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <div className="clash" style={{ fontSize: "1.3rem", letterSpacing: "0.12em", fontWeight: 700 }}>
        LUMOS<span style={{ color: "var(--orange)" }}>.</span>
      </div>

      {/* CTA */}
      <a
        href="#contact"
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--white)",
          textDecoration: "none",
          padding: "0.6rem 1.4rem",
          border: "1px solid rgba(245,245,245,0.18)",
          borderRadius: "2px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={e => { e.target.style.borderColor = "var(--orange)"; e.target.style.color = "var(--orange)"; }}
        onMouseLeave={e => { e.target.style.borderColor = "rgba(245,245,245,0.18)"; e.target.style.color = "var(--white)"; }}
      >
        Book a Call
      </a>
    </motion.nav>
  );
};

// ─────────────────────────────────────────────
//  HERO — liquid distortion effect
// ─────────────────────────────────────────────
const HeroSection = () => {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Derived glow positions
  const glowX = `${mouse.x * 100}%`;
  const glowY = `${mouse.y * 100}%`;

  const textDistort = hovering
    ? `translate(${(mouse.x - 0.5) * 8}px, ${(mouse.y - 0.5) * 5}px)`
    : "translate(0,0)";

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--black)",
        padding: "0 3rem",
      }}
    >
      {/* ── Liquid background orbs ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        transition: "all 0.08s linear",
      }}>
        {/* Primary glow — follows cursor */}
        <div style={{
          position: "absolute",
          width: "70vw", height: "70vw",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(138,15,22,0.28) 0%, rgba(255,90,31,0.10) 40%, transparent 70%)`,
          left: glowX, top: glowY,
          transform: "translate(-50%, -50%)",
          transition: "left 0.25s ease, top 0.25s ease",
          filter: "blur(60px)",
        }} />
        {/* Static deep glow — bottom left */}
        <div style={{
          position: "absolute",
          width: "50vw", height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(138,15,22,0.18) 0%, transparent 65%)",
          left: "-10vw", bottom: "-10vw",
          filter: "blur(80px)",
        }} />
        {/* Subtle top-right accent */}
        <div style={{
          position: "absolute",
          width: "30vw", height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,90,31,0.07) 0%, transparent 70%)",
          right: "5vw", top: "10vh",
          filter: "blur(50px)",
        }} />

        {/* Cinematic horizontal line */}
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          top: "50%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,90,31,0.15), rgba(138,15,22,0.2), transparent)",
          transform: `translateY(${(mouse.y - 0.5) * -20}px)`,
          transition: "transform 0.3s ease",
        }} />
      </div>

      {/* ── HERO CONTENT ── */}
      <div style={{
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        paddingTop: "8rem",
      }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ width: "28px", height: "1px", background: "var(--orange)" }} />
          <span style={{
            fontSize: "0.7rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: "var(--orange)",
            fontWeight: 500,
          }}>
            Premium Mobile Systems
          </span>
        </motion.div>

        {/* Main headline — liquid distortion on hover */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: textDistort, transition: "transform 0.35s ease", willChange: "transform" }}
        >
          <h1 className="clash" style={{
            fontSize: "clamp(3rem, 7.5vw, 8rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "var(--white)",
            marginBottom: "0.15em",
          }}>
            {/* REPLACE headline text below */}
            Premium mobile
            <br />
            systems built to
            <br />
            <span style={{
              background: "linear-gradient(135deg, #FF5A1F 0%, #8A0F16 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              reduce friction.
            </span>
          </h1>
        </motion.div>

        {/* Sub-headline + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            marginTop: "3rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            gap: "3rem",
            justifyContent: "space-between",
          }}
        >
          {/* REPLACE subheadline below */}
          <p style={{
            maxWidth: "480px",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "var(--white-dim)",
            fontWeight: 300,
          }}>
            We build mobile platforms that reduce operational chaos, increase customer retention, and turn complex journeys into seamless digital experiences.
          </p>

          {/* CTA Button */}
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1.1rem 2.4rem",
              background: "linear-gradient(135deg, #FF5A1F, #8A0F16)",
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              borderRadius: "2px",
              boxShadow: "0 0 40px rgba(255,90,31,0.3)",
              transition: "box-shadow 0.3s ease, transform 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 60px rgba(255,90,31,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(255,90,31,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Book a Strategy Call
            <span style={{ fontSize: "1rem" }}>→</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            marginTop: "8rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "var(--white-dim)",
            fontSize: "0.7rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ fontSize: "1rem" }}
          >
            ↓
          </motion.div>
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
//  SECTION WRAPPER — fade-in on scroll
// ─────────────────────────────────────────────
const FadeSection = ({ children, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    style={style}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
//  SECTION LABEL
// ─────────────────────────────────────────────
const SectionLabel = ({ number, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "4rem" }}>
    <span style={{ fontSize: "0.65rem", color: "var(--orange)", letterSpacing: "0.2em" }}>{number}</span>
    <div style={{ width: "28px", height: "1px", background: "rgba(245,245,245,0.15)" }} />
    <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--white-dim)" }}>{label}</span>
  </div>
);

// ─────────────────────────────────────────────
//  SECTION 2 — VALUE PROPOSITION
// ─────────────────────────────────────────────
const ValueSection = () => (
  <section style={{
    padding: "10rem 3rem",
    background: "var(--charcoal)",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* Subtle background accent */}
    <div style={{
      position: "absolute", right: "-20vw", top: "50%",
      width: "50vw", height: "50vw",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(138,15,22,0.08) 0%, transparent 70%)",
      transform: "translateY(-50%)",
      pointerEvents: "none",
    }} />

    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <FadeSection>
        <SectionLabel number="02" label="Value Proposition" />
        <h2 className="clash" style={{
          fontSize: "clamp(2rem, 4.5vw, 5rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          maxWidth: "780px",
          marginBottom: "5rem",
        }}>
          We do not sell code.{" "}
          <span style={{ color: "var(--white-dim)", fontWeight: 300 }}>
            We build systems that make businesses easier to buy from.
          </span>
        </h2>
      </FadeSection>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1px",
        background: "rgba(245,245,245,0.05)",
        border: "1px solid rgba(245,245,245,0.05)",
      }}>
        {VALUE_CARDS.map((card, i) => (
          <FadeSection key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
            <motion.div
              whileHover={{ background: "rgba(255,90,31,0.04)" }}
              style={{
                padding: "2.5rem 2rem",
                background: "var(--charcoal)",
                cursor: "default",
                transition: "background 0.3s ease",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: "1.2rem", color: "var(--orange)" }}>
                {card.icon}
              </div>
              <h3 className="clash" style={{
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                marginBottom: "0.8rem",
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: "0.82rem",
                lineHeight: 1.65,
                color: "var(--white-dim)",
                fontWeight: 300,
              }}>
                {card.body}
              </p>
            </motion.div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
//  SECTION 3 — PAIN POINTS
// ─────────────────────────────────────────────
const PainSection = () => (
  <section style={{ padding: "10rem 3rem", background: "var(--black)", position: "relative", overflow: "hidden" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <FadeSection>
        <SectionLabel number="03" label="Business Problems" />
        <h2 className="clash" style={{
          fontSize: "clamp(1.8rem, 3.5vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          maxWidth: "600px",
          marginBottom: "5rem",
        }}>
          Where businesses{" "}
          <span style={{ color: "var(--orange)" }}>silently lose</span>{" "}
          revenue every day.
        </h2>
      </FadeSection>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {PAIN_POINTS.map((point, i) => (
          <FadeSection key={i}>
            <motion.div
              whileHover={{ x: 8 }}
              transition={{ duration: 0.25 }}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "2rem",
                padding: "2.5rem 0",
                borderBottom: "1px solid rgba(245,245,245,0.06)",
                cursor: "default",
              }}
            >
              <span style={{
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                color: "var(--orange)",
                paddingTop: "0.2rem",
                fontWeight: 500,
              }}>
                {point.number}
              </span>
              <div>
                <h3 className="clash" style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                  fontWeight: 600,
                  marginBottom: "0.7rem",
                  letterSpacing: "-0.01em",
                }}>
                  {point.headline}
                </h3>
                <p style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "var(--white-dim)",
                  maxWidth: "680px",
                  fontWeight: 300,
                }}>
                  {point.body}
                </p>
              </div>
            </motion.div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
//  SECTION 4 — SERVICES
// ─────────────────────────────────────────────
const ServicesSection = () => (
  <section style={{
    padding: "10rem 3rem",
    background: "var(--metal)",
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <FadeSection>
        <SectionLabel number="04" label="Services" />
        <h2 className="clash" style={{
          fontSize: "clamp(1.8rem, 3.5vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          maxWidth: "700px",
          marginBottom: "5rem",
        }}>
          Built for businesses where customer experience{" "}
          <span style={{ color: "var(--orange)" }}>directly affects revenue.</span>
        </h2>
      </FadeSection>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1px",
        background: "rgba(245,245,245,0.04)",
      }}>
        {SERVICES.map((service, i) => (
          <FadeSection key={i}>
            <motion.div
              whileHover={{ background: "rgba(255,90,31,0.05)" }}
              style={{
                padding: "2rem 1.8rem",
                background: "var(--metal)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                transition: "background 0.3s ease",
              }}
            >
              <div style={{
                width: "5px", height: "5px",
                borderRadius: "50%",
                background: "var(--orange)",
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: "0.95rem",
                fontWeight: 400,
                letterSpacing: "0.01em",
              }}>
                {service}
              </span>
            </motion.div>
          </FadeSection>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
//  SECTION 5 — PORTFOLIO
// ─────────────────────────────────────────────
const PortfolioSection = () => {
  const [active, setActive] = useState(null);

  return (
    <section style={{ padding: "10rem 3rem", background: "var(--charcoal)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <FadeSection>
          <SectionLabel number="05" label="Selected Work" />
          <h2 className="clash" style={{
            fontSize: "clamp(1.8rem, 3.5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: "600px",
            marginBottom: "5rem",
          }}>
            Systems that moved{" "}
            <span style={{ color: "var(--orange)" }}>real numbers.</span>
          </h2>
        </FadeSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {PORTFOLIO_ITEMS.map((project, i) => (
            <FadeSection key={project.id}>
              <motion.div
                onHoverStart={() => setActive(project.id)}
                onHoverEnd={() => setActive(null)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background: "var(--black)",
                  border: `1px solid ${active === project.id ? project.accent + "55" : "rgba(245,245,245,0.06)"}`,
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: "default",
                  transition: "border-color 0.3s ease",
                }}
              >
                {/* Image placeholder / real image */}
                <div style={{
                  height: "200px",
                  background: `linear-gradient(135deg, ${project.accent}22 0%, rgba(11,11,12,0.9) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    // PLACEHOLDER — replace by setting project.image above
                    <>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: `radial-gradient(circle at 30% 50%, ${project.accent}30 0%, transparent 65%)`,
                      }} />
                      <span className="clash" style={{
                        fontSize: "0.65rem", letterSpacing: "0.25em",
                        textTransform: "uppercase", color: "rgba(245,245,245,0.2)",
                        position: "relative",
                      }}>
                        {/* Replace image → set project.image */}
                        Add Image
                      </span>
                    </>
                  )}

                  {/* Category tag */}
                  <div style={{
                    position: "absolute", top: "1rem", left: "1rem",
                    fontSize: "0.6rem", letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.7rem",
                    background: "rgba(11,11,12,0.7)",
                    border: `1px solid ${project.accent}44`,
                    borderRadius: "2px",
                    color: project.accent,
                    backdropFilter: "blur(8px)",
                  }}>
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.8rem" }}>
                  <h3 className="clash" style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    marginBottom: "0.6rem",
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: "0.83rem",
                    lineHeight: 1.65,
                    color: "var(--white-dim)",
                    fontWeight: 300,
                    marginBottom: "1.4rem",
                  }}>
                    {project.description}
                  </p>

                  {/* Result badge */}
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    color: project.accent,
                    padding: "0.4rem 0.8rem",
                    background: `${project.accent}12`,
                    borderRadius: "2px",
                    border: `1px solid ${project.accent}22`,
                    fontWeight: 500,
                  }}>
                    ↑ {project.result}
                  </div>

                  {/* Optional link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        marginTop: "1rem",
                        fontSize: "0.7rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--white-dim)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => e.target.style.color = "var(--orange)"}
                      onMouseLeave={e => e.target.style.color = "var(--white-dim)"}
                    >
                      View project →
                    </a>
                  )}
                </div>
              </motion.div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
//  SECTION 6 — FINAL CTA
// ─────────────────────────────────────────────
const CTASection = () => (
  <section
    id="contact"
    style={{
      padding: "12rem 3rem",
      background: "var(--black)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}
  >
    {/* Glow */}
    <div style={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%,-50%)",
      width: "60vw", height: "60vw",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(138,15,22,0.15) 0%, rgba(255,90,31,0.06) 40%, transparent 70%)",
      filter: "blur(60px)",
      pointerEvents: "none",
    }} />

    <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
      <FadeSection>
        <SectionLabel number="06" label="Ready to Build" />

        {/* REPLACE CTA headline below */}
        <h2 className="clash" style={{
          fontSize: "clamp(2.2rem, 5.5vw, 6.5rem)",
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          marginBottom: "3rem",
        }}>
          If your business loses customers through friction,{" "}
          <span style={{
            background: "linear-gradient(135deg, #FF5A1F 0%, #8A0F16 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            the app is not the product.
          </span>{" "}
          The system is.
        </h2>

        <p style={{
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "var(--white-dim)",
          maxWidth: "500px",
          margin: "0 auto 4rem",
          fontWeight: 300,
        }}>
          Every week you operate with friction in your customer journey is revenue you will never recover.
        </p>

        <motion.a
          href="alinadev.apps@gmail.com"  // REPLACE with your actual email or Calendly link
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.9rem",
            padding: "1.3rem 3rem",
            background: "linear-gradient(135deg, #FF5A1F, #8A0F16)",
            color: "#fff",
            textDecoration: "none",
            fontSize: "0.85rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            borderRadius: "2px",
            boxShadow: "0 0 60px rgba(255,90,31,0.35)",
          }}
        >
          Start the Conversation
          <span>→</span>
        </motion.a>
      </FadeSection>
    </div>
  </section>
);

// ─────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────
const Footer = () => (
  <footer style={{
    padding: "2.5rem 3rem",
    background: "var(--charcoal)",
    borderTop: "1px solid rgba(245,245,245,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  }}>
    <div className="clash" style={{ fontSize: "1.1rem", letterSpacing: "0.1em", fontWeight: 700 }}>
      LUMOS<span style={{ color: "var(--orange)" }}>.</span>
    </div>
    <p style={{ fontSize: "0.72rem", color: "var(--white-dim)", letterSpacing: "0.06em" }}>
      © {new Date().getFullYear()} Lumos Labs. All rights reserved.
    </p>
  </footer>
);

// ─────────────────────────────────────────────
//  ROOT EXPORT
// ─────────────────────────────────────────────
export default function LumosLabs() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <HeroSection />
      <ValueSection />
      <PainSection />
      <ServicesSection />
      <PortfolioSection />
      <CTASection />
      <Footer />
    </>
  );
}
