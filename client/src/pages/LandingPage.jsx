import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import girlImg from "../assets/LANDING_PAGE_GIRL.png";
import aiBoxImg from "../assets/LANDING_PAGE_AI_BOX.png";
import ctaImage from "../assets/style_image.png";
import curatedWardrobe from "../assets/curated_wardrobe.png"
import dragDrop from "../assets/drag_drop_canvas.png"
import aiSuggest from "../assets/ai_suggestion.png"
import styleImage from "../assets/style_image.png"
import { Link } from "react-router-dom";

const C = {
  bg:       "#F8F5F0",
  card:     "#FDFBF8",
  text:     "#1C1A18",
  mid:      "#6B6560",
  faint:    "#A09A93",
  primary:  "#1C1A18",
  gold:     "#C6A97E",
  border:   "#E8E2D9",
  dark:     "#141210",
};

const serif = "'Playfair Display', Georgia, serif";
const sans  = "'Inter', system-ui, sans-serif";

function FadeUp({ children, delay = 0, className = "", style = {} }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const navLinks = [
    { name: "Home", id: "#" },
    { name: "Features", id: "#features" },
    { name: "How It Works", id: "#how-it-works" },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: C.bg,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 32px", height: 60,
        display: "flex", alignItems: "center", gap: 40,
      }}>
        <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: C.text, letterSpacing: "0.05em" }}>
          LAYRD
        </span>
        <div style={{ display: "flex", gap: 36, flex: 1, justifyContent: "center" }}>
          {navLinks.map(l => (
            <a key={l.name} href={l.id} style={{ fontFamily: sans, fontSize: 14, color: C.mid, textDecoration: "none" }}
               onMouseEnter={e => e.target.style.color = C.text}
               onMouseLeave={e => e.target.style.color = C.mid}>
              {l.name}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/login" style={{ fontFamily: sans, fontSize: 14, color: C.text, textDecoration: "none" }}>Log in</a>
          <motion.a href="/library" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              background: C.primary, color: "#fff",
              fontFamily: sans, fontSize: 14, fontWeight: 500,
              padding: "9px 22px", borderRadius: 8, textDecoration: "none",
            }}>
            Get Started
          </motion.a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        background: C.bg,
        minHeight: "88vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={girlImg}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "40% top",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to right, ${C.bg} 0%, ${C.bg}CC 30%, ${C.bg}55 55%, transparent 75%)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: `linear-gradient(to top, ${C.bg}, transparent)`,
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "72px 32px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontFamily: sans,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.13em",
              color: C.gold,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            AI Stylist. Your Look, Perfected.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(42px, 5vw, 64px)",
              lineHeight: 1.08,
              color: C.text,
              marginBottom: 4,
            }}
          >
            Build Your
            <br />
            Wardrobe.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.19 }}
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(38px, 4.6vw, 60px)",
              lineHeight: 1.08,
              color: C.gold,
              marginBottom: 24,
            }}
          >
            Style Your Look.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            style={{
              fontFamily: sans,
              fontSize: 15,
              lineHeight: 1.7,
              color: C.mid,
              marginBottom: 36,
              maxWidth: 340,
            }}
          >
            Layrd is your AI-powered stylist that helps you mix,
            match and complete outfits effortlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <motion.a
              href="/library"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: C.primary,
                color: "#fff",
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 500,
                padding: "12px 28px",
                borderRadius: 8,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Start Styling →
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.75,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          right: "3%",
          bottom: "8%",
          width: "clamp(210px, 20vw, 270px)",
          borderRadius: 22,
          overflow: "hidden",
          background: C.card,
          zIndex: 5,
          boxShadow: "0 35px 80px rgba(0,0,0,0.18)",
        }}
      >
        <img
          src={aiBoxImg}
          alt="AI Stylist"
          style={{
            width: "100%",
            display: "block",
          }}
        />
      </motion.div>
    </section>
  );
}

const STATS = [
  { icon: "🪝", num: "60+",    label: "Curated Pieces"        },
  { icon: "✦",  num: "AI",     label: "Smart Stylist"         },
  { icon: "♡",  num: "20+",  label: "Looks Created"         },
  { icon: "🔖", num: "Save & Organize", label: "Your Favorite Outfits" },
];

function StatsStrip() {
  return (
    <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.bg, padding: "28px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
        {STATS.map((s, i) => (
          <div key={s.num} style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 32px", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div>
              <p style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{s.num}</p>
              <p style={{ fontFamily: sans, fontSize: 12, color: C.faint, marginTop: 2 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "Curated Wardrobe",
    body: "Explore handpicked pieces that fit your style.",
    image: curatedWardrobe,
    icon: "🪝",
  },
  {
    title: "Drag & Drop Canvas",
    body: "Build your outfit visually with our easy canvas.",
    image: dragDrop,
    icon: "⠿",
  },
  {
    title: "AI Stylist",
    body: "Get smart recommendations to complete your look.",
    image: aiSuggest,
    icon: "✦",
  },
  {
    title: "Save Your Looks",
    body: "Save outfits you love and revisit them anytime.",
    image: styleImage,
    icon: "🔖",
  },
];

function Features() {
  return (
    <section id="features" style={{ background: C.bg, padding: "90px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <FadeUp>
          <p
            style={{
              fontFamily: sans,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: C.gold,
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            Everything You Need
          </p>
        </FadeUp>

        <FadeUp delay={0.07}>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 700,
              fontSize: "clamp(32px, 3.5vw, 46px)",
              color: C.text,
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            Your Personal
            <br />
            Styling Studio
          </h2>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: "0 18px 40px rgba(28,26,24,0.10)",
                }}
                transition={{ duration: 0.25 }}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: 200,
                  }}
                >
                  <img
                    src={f.image}
                    alt={f.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    }}
                  >
                    {f.icon}
                  </div>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      fontFamily: serif,
                      fontSize: 22,
                      fontWeight: 700,
                      color: C.text,
                      marginBottom: 10,
                    }}
                  >
                    {f.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: sans,
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: C.mid,
                    }}
                  >
                    {f.body}
                  </p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", title: "Browse Pieces",   body: "Explore our collection of curated clothing." },
  { n: "02", title: "Add to Canvas",   body: "Drag and drop your favorite items."          },
  { n: "03", title: "AI Completes",    body: "Our AI stylist suggests the perfect matching pieces." },
  { n: "04", title: "Save & Wear",     body: "Save your look and wear it with confidence." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: C.bg, padding: "90px 0", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(30px, 3.5vw, 44px)", color: C.text, textAlign: "center", marginBottom: 64 }}>Style in 4 Simple Steps</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {STEPS.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div style={{ textAlign: "center", padding: "0 24px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.border}`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.text }}>{s.n}</div>
                <h3 style={{ fontFamily: serif, fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.65, color: C.mid }}>{s.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
function CTASplit() {
  return (
    <section
      style={{
        background: C.bg,
        padding: 0,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "380px",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${ctaImage})`,
            backgroundSize: "cover",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            minHeight: "380px",
          }}
        />

        <div
          style={{
            background: "#EDE8E0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 64px",
          }}
        >
          <FadeUp>
            <div>
              <h2
                style={{
                  fontFamily: serif,
                  fontWeight: 700,
                  fontSize: "clamp(30px, 3vw, 46px)",
                  color: C.text,
                  lineHeight: 1.15,
                  marginBottom: 20,
                }}
              >
                Ready to Elevate
                <br />
                Your Style?
              </h2>

              <p
                style={{
                  fontFamily: sans,
                  color: C.mid,
                  lineHeight: 1.7,
                  fontSize: 15,
                  maxWidth: 340,
                  marginBottom: 32,
                }}
              >
                Join Layrd and let AI help you create
                outfits that truly represent your style.
              </p>

              <motion.a
                href="/register"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  background: C.primary,
                  color: "#fff",
                  fontFamily: sans,
                  fontWeight: 500,
                  fontSize: 14,
                  padding: "14px 30px",
                  borderRadius: 8,
                  textDecoration: "none",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                }}
              >
                Get Started for Free →
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2E2621] text-[#F8F5F0] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-14">
        <div className="space-y-5">
          <h2 className="font-serif text-3xl tracking-[0.25em]">
            LAYRD
          </h2>

          <p className="text-[#A89F94] text-sm leading-7 max-w-xs">
            AI-powered wardrobe styling that helps you build,
            organize and complete outfits effortlessly.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#8A8072] mb-5">
            Platform
          </h4>

          <div className="flex flex-col gap-3">
            <Link to="/library" className="hover:text-[#E7C76A] transition">
              Library
            </Link>

            <Link to="/canvas" className="hover:text-[#E7C76A] transition">
              Outfit Builder
            </Link>

            <Link to="/wardrobe" className="hover:text-[#E7C76A] transition">
              My Wardrobe
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#8A8072] mb-5">
            Resources
          </h4>

          <div className="flex flex-col gap-3">
            <a href="#features" className="hover:text-[#E7C76A] transition">
              Features
            </a>

            <a href="#how-it-works" className="hover:text-[#E7C76A] transition">
              How it Works
            </a>

            <a href="#faq" className="hover:text-[#E7C76A] transition">
              FAQ
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#8A8072] mb-5">
            Connect
          </h4>

          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/niyatipandey"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E7C76A] transition"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E7C76A] transition"
            >
              LinkedIn
            </a>

            <a
              href="mailto:your@email.com"
              className="hover:text-[#E7C76A] transition"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 px-8 border-t border-[#433A34] flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-xs tracking-wider text-[#8A8072]">
          © 2026 Layrd. All rights reserved.
        </p>

        <p className="text-xs text-[#8A8072]">
          Built with React • Node.js • MongoDB • Gemini AI
        </p>

      </div>
    </footer>
  );
}
export default function LandingPage() {
  return (
    <div style={{ background: C.bg }}>
      <Navbar />
      <Hero />
      <StatsStrip />
      <Features />
      <HowItWorks />
      <CTASplit />
      <Footer />
    </div>
  );
}