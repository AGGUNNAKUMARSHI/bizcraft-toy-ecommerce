// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

/* -------------------------
   Placeholder image + handler
   ------------------------- */
const PLACEHOLDER = "https://via.placeholder.com/800x600?text=No+Image";
function handleImgError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = PLACEHOLDER;
}

/* -------------------------
   Global styles (animations, neon, responsive)
   ------------------------- */
const globalStyles = `
@keyframes fadeZoom {
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes neonPulse {
  0% {
    text-shadow:
      0 0 4px #ffffff,
      0 0 8px #0ea5a4,
      0 0 16px #0ea5a4;
  }
  50% {
    text-shadow:
      0 0 6px #ffffff,
      0 0 14px #22d3ee,
      0 0 28px #22d3ee;
  }
  100% {
    text-shadow:
      0 0 4px #ffffff,
      0 0 8px #0ea5a4,
      0 0 16px #0ea5a4;
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.neon-logo {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  background-image: linear-gradient(
    120deg,
    #f97316,
    #facc15,
    #22d3ee,
    #a855f7,
    #f97316
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation:
    gradientShift 6s ease-in-out infinite,
    neonPulse 2.4s ease-in-out infinite;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .nav-links.open {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }
}
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = globalStyles;
  document.head.appendChild(style);
}

/* -------------------------
   Data
   ------------------------- */
const SERVICES = [
  { id: 1, title: "UI/UX Design", desc: "Human-centered design, prototypes and user testing." },
  { id: 2, title: "Web Development", desc: "Responsive, performant websites using modern stacks." },
  { id: 3, title: "E-commerce Solutions", desc: "Shopify, custom stores, payment integrations." },
  { id: 4, title: "SEO & Marketing", desc: "Search engine optimization and growth marketing." }
];

const PRODUCTS = [
  { id: 1, title: "Remote Control Car", price: 899, desc: "High-speed RC car with rechargeable battery.", img: "https://images.unsplash.com/photo-1606813902917-4c2d565e5c9d?auto=format&fit=crop&w=800&q=80", category: "Cars" },
  { id: 2, title: "Building Blocks Set", price: 499, desc: "Creative building blocks to improve motor skills.", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80", category: "Learning" },
  { id: 3, title: "Teddy Bear Plush Toy", price: 699, desc: "Soft & cuddly teddy bear made from premium cotton.", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", category: "Plush" },
  { id: 4, title: "Kids Robot Toy", price: 1299, desc: "Interactive robot toy with lights and voice control.", img: "https://images.unsplash.com/photo-1618401472979-45a9f3f98d4f?auto=format&fit=crop&w=800&q=80", category: "Robots" },
  { id: 5, title: "Doll House Set", price: 1599, desc: "Beautiful multi-floor doll house with mini furniture.", img: "https://images.unsplash.com/photo-1617042375876-a13e78b1e16d?auto=format&fit=crop&w=800&q=80", category: "Dolls" },
  { id: 6, title: "Mini Train Set", price: 999, desc: "Battery-powered train with track loops.", img: "https://images.unsplash.com/photo-1598378625181-fd1dbb5e8af0?auto=format&fit=crop&w=800&q=80", category: "Vehicles" },
  { id: 7, title: "Diecast Car Pack", price: 349, desc: "Set of 6 metal die-cast cars.", img: "https://images.unsplash.com/photo-1616627562712-1d3f0a3bd6ee?auto=format&fit=crop&w=800&q=80", category: "Cars" },
  { id: 8, title: "Wooden Puzzle", price: 249, desc: "Eco wooden puzzle for ages 3+.", img: "https://images.unsplash.com/photo-1584940011843-1b6e7a7e0b6f?auto=format&fit=crop&w=800&q=80", category: "Learning" },
  { id: 9, title: "Stuffed Puppy", price: 599, desc: "Adorable plush puppy for kids.", img: "https://images.unsplash.com/photo-1583948530793-8b1b6a5c4b5f?auto=format&fit=crop&w=800&q=80", category: "Plush" },
  { id: 10, title: "Coding Robot Kit", price: 2499, desc: "Beginner-friendly robot you can program.", img: "https://images.unsplash.com/photo-1591011874442-6f0c2c8da2c8?auto=format&fit=crop&w=800&q=80", category: "Robots" },
  { id: 11, title: "Fashion Doll", price: 799, desc: "Poseable fashion doll with accessories.", img: "https://images.unsplash.com/photo-1541534401786-6a0c7d7a7f5a?auto=format&fit=crop&w=800&q=80", category: "Dolls" },
  { id: 12, title: "Pull-along Train", price: 459, desc: "Colorful wooden pull-along train.", img: "https://images.unsplash.com/photo-1605559425463-6bd5b3f9a8cf?auto=format&fit=crop&w=800&q=80", category: "Vehicles" },
  { id: 13, title: "Foam Blocks", price: 329, desc: "Soft foam blocks for safe play.", img: "https://images.unsplash.com/photo-1603376396795-7a3ab4f8a7b5?auto=format&fit=crop&w=800&q=80", category: "Learning" },
  { id: 14, title: "Action Figure Pack", price: 699, desc: "Set of 4 action figures with accessories.", img: "https://images.unsplash.com/photo-1568506584004-0d1f9f5b7d7c?auto=format&fit=crop&w=800&q=80", category: "Vehicles" },
  { id: 15, title: "Plush Unicorn", price: 749, desc: "Magical plush unicorn with sparkly mane.", img: "https://images.unsplash.com/photo-1562019410-4b9c0f6a1f2a?auto=format&fit=crop&w=800&q=80", category: "Plush" },
  { id: 16, title: "RC Helicopter", price: 1899, desc: "Mini RC helicopter with gyro.", img: "https://images.unsplash.com/photo-1477934993100-5a7cbe3fd1b8?auto=format&fit=crop&w=800&q=80", category: "Vehicles" },
  { id: 17, title: "Magnetic Tiles", price: 899, desc: "Build 3D structures with magnetic tiles.", img: "https://images.unsplash.com/photo-1607010610546-9fbf7f4f8c1d?auto=format&fit=crop&w=800&q=80", category: "Learning" },
  { id: 18, title: "Robot Dog", price: 2199, desc: "Interactive robot dog that responds to touch.", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80", category: "Robots" },
  { id: 19, title: "Collector Car Model", price: 1299, desc: "Scale model car with detailed finish.", img: "https://images.unsplash.com/photo-1563720226613-7b1540b9d77b?auto=format&fit=crop&w=800&q=80", category: "Cars" },
  { id: 20, title: "Baby Soft Blocks", price: 219, desc: "Bright soft blocks for infants.", img: "https://images.unsplash.com/photo-1548083840-5c0e2ebb7e5e?auto=format&fit=crop&w=800&q=80", category: "Plush" },
  { id: 21, title: "Puzzle Race Game", price: 549, desc: "Fun board and puzzle hybrid for family play.", img: "https://images.unsplash.com/photo-1606813902781-0b2e1d8e88d6?auto=format&fit=crop&w=800&q=80", category: "Learning" },
  { id: 22, title: "Wooden Pull Car", price: 399, desc: "Classic wooden car with pull string.", img: "https://images.unsplash.com/photo-1610383709478-7cd16d1f4e02?auto=format&fit=crop&w=800&q=80", category: "Cars" }
];

const TESTIMONIALS = [
  { id: 1, name: "Kumarshi", role: "CEO at Acme", text: "They transformed our online presence and increased conversions." },
  { id: 2, name: "Dhruva", role: "Founder at ShopX", text: "Fast, reliable and delightful to work with." }
];

/* -------------------------
   Helpers
   ------------------------- */
const formatDate = (iso) => {
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
};

/* -------------------------
   Skip to content
   ------------------------- */
function SkipToContent() {
  const style = {
    position: "absolute",
    left: -9999,
    top: "auto",
    width: 1,
    height: 1,
    overflow: "hidden",
  };
  return (
    <a
      href="#main"
      style={style}
      onFocus={(e) => (e.currentTarget.style.left = 8)}
      onBlur={(e) => (e.currentTarget.style.left = -9999)}
    >
      Skip to content
    </a>
  );
}

/* -------------------------
   Navbar (with cart, mobile)
   ------------------------- */
function Navbar({ cartCount }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Shopping Products", path: "/shopping-products" },
    { name: "Toy Categories", path: "/categories" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 60,
    background: "#ffffff",
    borderBottom: "1px solid #e6e7eb",
  };
  const container = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
  };
  const topRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const logoLink = { textDecoration: "none" };
  const navList = {
    display: "flex",
    gap: 18,
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };
  const linkStyle = (active) => ({
    textDecoration: "none",
    color: active ? "#0ea5a4" : "#1f2937",
    fontWeight: active ? 700 : 500,
    fontSize: 14,
  });
  const ctaStyle = {
    background: "#0ea5a4",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 8,
    textDecoration: "none",
    fontSize: 14,
  };
  const burgerBtn = {
    display: "none",
    border: "none",
    background: "transparent",
    fontSize: 22,
    marginLeft: 12,
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <header style={headerStyle}>
      <nav style={container} aria-label="Main navigation">
        <div style={topRow}>
          <Link to="/" style={logoLink} aria-label="BizCraft home">
            <span className="neon-logo" style={{ fontSize: 22 }}>
              BizCraft
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link to="/cart" style={{ textDecoration: "none", color: "#0f172a", fontSize: 14 }}>
              🛒 Cart {cartCount > 0 ? `(${cartCount})` : ""}
            </Link>
            <Link
              to="/checkout"
              style={{
                textDecoration: "none",
                fontSize: 14,
                color: "#f97316",
                marginLeft: 4,
              }}
            >
              Checkout
            </Link>

            <button
              type="button"
              style={{
                ...burgerBtn,
                display: isMobile ? "block" : "none",
              }}
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <ul
          className="nav-links"
          style={{
            ...navList,
            display: isMobile ? "none" : "flex",
            marginTop: 10,
          }}
        >
          {navItems.map((it) => (
            <li key={it.path}>
              <Link to={it.path} style={linkStyle(location.pathname === it.path)}>
                {it.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" style={ctaStyle}>
              Get In Touch
            </Link>
          </li>
          <li>
            <Link
              to="/admin/contacts"
              style={{
                marginLeft: 8,
                textDecoration: "none",
                color: "#64748b",
                fontSize: 13,
              }}
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Mobile nav */}
        {isMobile && (
          <ul
            className={`nav-links ${open ? "open" : ""}`}
            style={{
              ...navList,
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: open ? 10 : 0,
              display: open ? "flex" : "none",
            }}
          >
            {navItems.map((it) => (
              <li key={it.path}>
                <Link
                  to={it.path}
                  style={linkStyle(location.pathname === it.path)}
                  onClick={() => setOpen(false)}
                >
                  {it.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" style={ctaStyle} onClick={() => setOpen(false)}>
                Get In Touch
              </Link>
            </li>
            <li>
              <Link
                to="/admin/contacts"
                style={{
                  marginLeft: 0,
                  textDecoration: "none",
                  color: "#64748b",
                  fontSize: 13,
                }}
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

/* -------------------------
   Footer
   ------------------------- */
function Footer() {
  const style = {
    background: "#0f172a",
    color: "white",
    marginTop: 24,
    padding: "28px 16px",
  };
  const inner = {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 20,
  };
  return (
    <footer style={style}>
      <div style={inner}>
        <div>
          <h4 style={{ margin: 0 }}>BizCraft</h4>
          <p style={{ marginTop: 8, fontSize: 14, color: "#c7d2fe" }}>
            We build beautiful, fast, accessible web experiences for SMEs.
          </p>
        </div>
        <div>
          <h5 style={{ margin: 0 }}>Quick Links</h5>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
            <li>
              <Link to="/about" style={{ color: "#cbd5e1" }}>
                About
              </Link>
            </li>
            <li>
              <Link to="/services" style={{ color: "#cbd5e1" }}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/shopping-products" style={{ color: "#cbd5e1" }}>
                Shopping Products
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 style={{ margin: 0 }}>Contact</h5>
          <address style={{ marginTop: 8, color: "#cbd5e1", fontStyle: "normal" }}>
            123 Business St.
            <br /> Hyderabad, India
            <br />
            <a
              href="tel:+911234567890"
              style={{ color: "#cbd5e1", display: "block", marginTop: 8 }}
            >
              +91 12345 67890
            </a>
            <a
              href="mailto:hello@bizcraft.example"
              style={{ color: "#cbd5e1", display: "block", marginTop: 4 }}
            >
              hello@bizcraft.example
            </a>
          </address>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 18, color: "#94a3b8" }}>
        © {new Date().getFullYear()} BizCraft — All rights reserved.
      </div>
    </footer>
  );
}

/* -------------------------
   Hero, ServicesGrid, ProductsList, Modal, Gallery, ContactForm, Testimonials,
   SplashScreen, page components (Home, About, ServicesPage, ShoppingProducts, etc.)
   These are the same as your original — included here to be self-contained.
   (They are unchanged except for small syntax fixes)
   ------------------------- */

function Hero() {
  const style = {
    width: "100%",
    height: 260,
    background: "#0ea5a4",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  };
  return (
    <section style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px" }}>
      <div style={style}>
        <div style={{ maxWidth: 800, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, margin: 0 }}>We craft web experiences</h1>
          <p style={{ marginTop: 8, opacity: 0.95 }}>
            Design-led development for modern brands — performance-first websites and PWAs.
          </p>
          <div style={{ marginTop: 12 }}>
            <Link
              to="/services"
              style={{
                background: "#fff",
                color: "#0ea5a4",
                padding: "8px 12px",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 12,
    marginTop: 12,
  };
  const card = {
    background: "#fff",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #e6e7eb",
  };
  return (
    <section style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px" }}>
      <h2 style={{ margin: 0 }}>Our Services</h2>
      <p style={{ color: "#64748b", marginTop: 6 }}>
        Complete solutions from design to deployment.
      </p>
      <div style={grid}>
        {SERVICES.map((s) => (
          <article key={s.id} style={card}>
            <h3 style={{ margin: 0 }}>{s.title}</h3>
            <p style={{ marginTop: 8, color: "#475569" }}>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductsList({ products, onOpen, onAdd }) {
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 16,
    marginTop: 12,
  };
  const card = {
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid #e6e7eb",
    background: "#fff",
  };
  const imgStyle = {
    width: "100%",
    height: 140,
    objectFit: "cover",
    display: "block",
  };
  const body = { padding: 12 };

  return (
    <div style={grid}>
      {products.map((p) => (
        <div key={p.id} style={card}>
          <img src={p.img} alt={p.title} style={imgStyle} onError={handleImgError} />
          <div style={body}>
            <div style={{ fontWeight: 700 }}>{p.title}</div>
            <div style={{ marginTop: 6, color: "#475569" }}>{p.desc}</div>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 700 }}>₹{p.price}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => onOpen && onOpen(p)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    background: "#0ea5a4",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Quick view
                </button>
                <button
                  onClick={() => onAdd && onAdd(p)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid #e6e7eb",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Modal({ item, onClose, onAdd }) {
  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 90,
  };
  const box = {
    background: "#fff",
    borderRadius: 8,
    maxWidth: 900,
    width: "95%",
    padding: 16,
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;
  return (
    <div style={overlay} role="dialog" aria-modal="true">
      <div style={box}>
        <button
          onClick={onClose}
          style={{
            float: "right",
            background: "transparent",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 8, flexWrap: "wrap" }}>
          <img
            src={item.img}
            alt={item.title}
            style={{ width: 300, height: 200, objectFit: "cover", borderRadius: 6 }}
            onError={handleImgError}
          />
          <div>
            <h3 style={{ margin: 0 }}>{item.title}</h3>
            <p style={{ color: "#475569" }}>{item.desc}</p>
            <div style={{ fontWeight: 700, marginTop: 8 }}>₹{item.price}</div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "#0ea5a4",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Buy now
              </button>
              <button
                onClick={() => onAdd && onAdd(item)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #e6e7eb",
                  cursor: "pointer",
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const images = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    src: `https://picsum.photos/seed/gallery${i}/800/600`,
  }));
  const [active, setActive] = useState(null);
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
    gap: 8,
  };

  return (
    <section style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px" }}>
      <h2 style={{ margin: 0 }}>Gallery</h2>
      <div style={grid}>
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setActive(img)}
            style={{ padding: 0, border: "none", background: "transparent", cursor: "pointer" }}
          >
            <img
              src={img.src}
              alt={`Gallery ${img.id + 1}`}
              style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 6 }}
              onError={handleImgError}
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 90,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 12,
              borderRadius: 8,
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          >
            <button
              onClick={() => setActive(null)}
              style={{ float: "right", background: "transparent", border: "none", cursor: "pointer" }}
            >
              ✕
            </button>
            <img
              src={active.src}
              alt="Active"
              style={{ width: "100%", height: "70vh", objectFit: "contain" }}
              onError={handleImgError}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const saveContact = (contact) => {
    const key = "bizcraft_contacts";
    try {
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.unshift(contact);
      localStorage.setItem(key, JSON.stringify(prev));
      return true;
    } catch (e) {
      console.error("Storage error", e);
      return false;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Please fill all fields." });
      return;
    }
    setStatus({ type: "loading", text: "Saving..." });
    const contact = { ...form, createdAt: new Date().toISOString() };
    const ok = saveContact(contact);
    setTimeout(() => {
      if (ok) {
        setStatus({ type: "success", text: "Message saved. We will contact you soon." });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", text: "Unable to save message. Check console." });
      }
    }, 400);
  };

  const field = { width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" };

  return (
    <section style={{ maxWidth: 720, margin: "20px auto", padding: "0 16px" }}>
      <h2 style={{ margin: 0 }}>Contact us</h2>
      <form onSubmit={onSubmit} style={{ marginTop: 12, display: "grid", gap: 12 }}>
        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Name</div>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            style={field}
            required
          />
        </label>
        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Email</div>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            style={field}
            required
          />
        </label>
        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Message</div>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help?"
            rows={6}
            style={field}
            required
          />
        </label>
        <div>
          <button
            type="submit"
            style={{
              background: "#0ea5a4",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Send message
          </button>
        </div>

        {status && (
          <div
            style={{
              marginTop: 8,
              padding: 8,
              borderRadius: 6,
              background:
                status.type === "error"
                  ? "#fee2e2"
                  : status.type === "success"
                  ? "#dcfce7"
                  : "#f3f4f6",
              color: status.type === "error" ? "#991b1b" : "#064e3b",
            }}
          >
            {status.text}
          </div>
        )}
      </form>
    </section>
  );
}

function Testimonials() {
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 12,
    marginTop: 12,
  };
  const card = {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #e6e7eb",
    background: "#fff",
  };
  return (
    <section style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px" }}>
      <h2 style={{ margin: 0 }}>Testimonials</h2>
      <div style={grid}>
        {TESTIMONIALS.map((t) => (
          <blockquote key={t.id} style={card}>
            <p style={{ margin: 0, fontStyle: "italic" }}>“{t.text}”</p>
            <footer style={{ marginTop: 8, color: "#64748b" }}>
              — {t.name}, <span style={{ color: "#94a3b8" }}>{t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

/* -------------------------
   Splash Screen
   ------------------------- */
function SplashScreen() {
  const splashStyle = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#020617",
    animation: "fadeZoom 2s ease-out",
  };

  return (
    <div style={splashStyle}>
      <span className="neon-logo" style={{ fontSize: "96px" }}>
        BizCraft
      </span>
    </div>
  );
}

/* -------------------------
   Pages
   ------------------------- */
function Home({ onOpen, onAdd }) {
  return (
    <main id="main">
      <Hero />
      <ServicesGrid />

      <section style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px" }}>
        <h2 style={{ margin: 0 }}>Popular Toys</h2>
        <ProductsList products={PRODUCTS.slice(0, 6)} onOpen={onOpen} onAdd={onAdd} />
      </section>

      <Testimonials />
    </main>
  );
}

function About() {
  return (
    <main
      id="main"
      style={{ maxWidth: 900, margin: "20px auto", padding: "0 16px" }}
    >
      <h1>About BizCraft</h1>
      <p style={{ color: "#475569" }}>
        We are a team of designers and developers passionate about building
        delightful digital products. Our approach focuses on accessibility,
        performance and measurable business outcomes.
      </p>
    </main>
  );
}

function ServicesPage() {
  return (
    <main
      id="main"
      style={{ maxWidth: 900, margin: "20px auto", padding: "0 16px" }}
    >
      <h1>Services</h1>
      <p style={{ color: "#475569" }}>End-to-end product and marketing services.</p>
      <ServicesGrid />
    </main>
  );
}

/* ShoppingProducts */
function ShoppingProducts({ onOpen, onAdd }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "BizCraft - Shopping Products";
  }, []);

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  const filtered = PRODUCTS.filter((p) => {
    const matchCategory = category === "All" || p.category === category;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  return (
    <main id="main">
      <section style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px" }}>
        <h1>Shopping Products</h1>
        <p style={{ color: "#64748b" }}>Browse toys by category or search.</p>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "8px 10px",
                borderRadius: 6,
                border: category === c ? "2px solid #0ea5a4" : "1px solid #e6e7eb",
                background: category === c ? "#ecfeff" : "white",
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          ))}

          <input
            type="text"
            placeholder="Search toys..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              marginLeft: "auto",
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              minWidth: 180,
            }}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
              }}
            >
              No toys match your filters.
            </div>
          ) : (
            <ProductsList products={filtered} onOpen={onOpen} onAdd={onAdd} />
          )}
        </div>
      </section>
    </main>
  );
}

function ToyCategories() {
  const cats = Array.from(new Set(PRODUCTS.map((p) => p.category)));
  const card = {
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    padding: 12,
    background: "#fff",
  };
  return (
    <main id="main" style={{ maxWidth: 900, margin: "20px auto", padding: "0 16px" }}>
      <h1>Toy Categories</h1>
      <p style={{ color: "#64748b" }}>
        Overview of toy categories available in our BizCraft toy store.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
          marginTop: 12,
        }}
      >
        {cats.map((c) => (
          <div key={c} style={card}>
            <h3 style={{ margin: 0 }}>{c}</h3>
            <p style={{ marginTop: 6, fontSize: 14, color: "#475569" }}>
              Explore all {c.toLowerCase()} toys in Shopping Products page.
            </p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 16 }}>
        Go to{" "}
        <Link to="/shopping-products" style={{ color: "#0ea5a4" }}>
          Shopping Products
        </Link>{" "}
        to filter by these categories and search toys.
      </p>
    </main>
  );
}

function ContactPage() {
  return (
    <main id="main">
      <section style={{ maxWidth: 900, margin: "20px auto", padding: "0 16px" }}>
        <h1>Contact</h1>
        <ContactForm />
      </section>
    </main>
  );
}

function GalleryPage() {
  return (
    <main id="main">
      <section style={{ maxWidth: 1100, margin: "20px auto", padding: "0 16px" }}>
        <h1>Gallery</h1>
      </section>
      <Gallery />
    </main>
  );
}

function AdminContacts() {
  const [list, setList] = useState([]);
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("bizcraft_contacts") || "[]");
      setList(data);
    } catch (e) {
      console.error(e);
      setList([]);
    }
  }, []);

  return (
    <main id="main" style={{ maxWidth: 960, margin: "20px auto", padding: "0 16px" }}>
      <h1>Saved Contacts</h1>
      <p style={{ color: "#64748b" }}>Messages submitted by visitors (localStorage)</p>

      <div style={{ marginTop: 16 }}>
        {list.length === 0 && (
          <div style={{ padding: 12, background: "#f8fafc", borderRadius: 8 }}>
            No contacts yet.
          </div>
        )}
        {list.map((c, i) => (
          <div
            key={i}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #e6e9ee",
              marginTop: 12,
              background: "#fff",
            }}
          >
            <div style={{ fontWeight: 700 }}>
              {c.name}{" "}
              <span style={{ color: "#94a3b8", fontWeight: 500, marginLeft: 8 }}>
                {c.email}
              </span>
            </div>
            <div style={{ marginTop: 8 }}>{c.message}</div>
            <div style={{ marginTop: 8, color: "#94a3b8", fontSize: 12 }}>
              {formatDate(c.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function CartPage({ cart, updateQty, removeItem, clearCart }) {
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <main id="main" style={{ maxWidth: 960, margin: "20px auto", padding: "0 16px" }}>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: "#f8fafc",
            borderRadius: 8,
          }}
        >
          Your cart is empty.
        </div>
      ) : (
        <>
          <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #e6e7eb",
                  background: "#fff",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }}
                  onError={handleImgError}
                />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 700 }}>{item.title}</div>
                  <div style={{ marginTop: 6, color: "#475569" }}>₹{item.price} each</div>
                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <label style={{ fontSize: 13, color: "#64748b" }}>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.id, Math.max(1, parseInt(e.target.value || 1)))
                      }
                      style={{
                        width: 60,
                        padding: 6,
                        borderRadius: 6,
                        border: "1px solid #e6e7eb",
                      }}
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: "1px solid #ef4444",
                        color: "#ef4444",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div style={{ fontWeight: 700 }}>₹{item.price * item.qty}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <button
              onClick={clearCart}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #e6e7eb",
                background: "white",
                cursor: "pointer",
              }}
            >
              Clear cart
            </button>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Total: ₹{total}</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <Link to="/checkout" style={{ color: "#0ea5a4" }}>
              Go to checkout →
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

/* -------------------------
   Checkout Page - already implemented above
   ------------------------- */
/* -------------------------
   Checkout Page
   ------------------------- */
function CheckoutPage({ cart, clearCart }) {
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const [form, setForm] = useState({ name: "", address: "", payment: "card" });
  const [status, setStatus] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.address.trim()) {
      setStatus({ type: "error", text: "Please fill your name and address." });
      return;
    }
    if (cart.length === 0) {
      setStatus({ type: "error", text: "Your cart is empty." });
      return;
    }
    setStatus({ type: "loading", text: "Processing order..." });
    setTimeout(() => {
      clearCart();
      setStatus({
        type: "success",
        text: "Order placed successfully! (Demo only, no payment processed.)",
      });
    }, 800);
  };

  const field = { width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d1d5db" };

  return (
    <main id="main" style={{ maxWidth: 960, margin: "20px auto", padding: "0 16px" }}>
      <h1>Checkout</h1>
      <p style={{ color: "#64748b", marginBottom: 12 }}>
        Review your order and enter your details.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
          gap: 18,
        }}
      >
        <section>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>Shipping Details</h2>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
            <label>
              <div style={{ fontSize: 13, marginBottom: 4 }}>Full Name</div>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={field}
                required
              />
            </label>

            <label>
              <div style={{ fontSize: 13, marginBottom: 4 }}>Address</div>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                style={field}
                rows={4}
                required
              />
            </label>

            <label>
              <div style={{ fontSize: 13, marginBottom: 4 }}>Payment Method</div>
              <select
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value })}
                style={field}
              >
                <option value="card">Credit / Debit Card</option>
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI</option>
              </select>
            </label>

            <div style={{ marginTop: 8 }}>
              <button
                type="submit"
                style={{
                  background: "#0ea5a4",
                  color: "#fff",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Place Order
              </button>
            </div>

            {status && (
              <div
                style={{
                  marginTop: 8,
                  padding: 8,
                  borderRadius: 6,
                  background:
                    status.type === "error"
                      ? "#fee2e2"
                      : status.type === "success"
                      ? "#dcfce7"
                      : "#f3f4f6",
                  color: status.type === "error" ? "#991b1b" : "#064e3b",
                }}
              >
                {status.text}
              </div>
            )}
          </form>
        </section>

        <section>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>Order Summary</h2>
          {cart.length === 0 ? (
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
              }}
            >
              No items in cart.
            </div>
          ) : (
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: "#ffffff",
                border: "1px solid #e5e7eb",
              }}
            >
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: 14,
                  }}
                >
                  <span>
                    {item.title} × {item.qty}
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}

              <hr style={{ margin: "8px 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                }}
              >
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}


/* -------------------------
   App (root)
   ------------------------- */
export default function App() {
  const [modalItem, setModalItem] = useState(null);

  // Cart state (Add to Cart system)
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bizcraft_cart") || "[]");
    } catch {
      return [];
    }
  });

  // persist cart
  useEffect(() => {
    localStorage.setItem("bizcraft_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, qty } : it)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  // Splash screen
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          color: "#0f172a",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SkipToContent />
        <Navbar cartCount={cartCount} />

        <marquee
          style={{
            background: "#0ea5a4",
            color: "white",
            padding: "10px 0",
            fontWeight: "bold",
          }}
        >
          Welcome to BizCraft — Premium Toys & Shopping Products!
        </marquee>

        <div style={{ flex: "1 0 auto" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpen={(p) => setModalItem(p)}
                  onAdd={addToCart}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/shopping-products"
              element={
                <ShoppingProducts
                  onOpen={(p) => setModalItem(p)}
                  onAdd={addToCart}
                />
              }
            />
            <Route path="/categories" element={<ToyCategories />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  updateQty={updateQty}
                  removeItem={removeItem}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cart={cart}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: 24 }}>
                  <h1>Page not found</h1>
                  <p>
                    <Link to="/">Go home</Link>
                  </p>
                </main>
              }
            />
          </Routes>
        </div>

        <Footer />

        <Modal
          item={modalItem}
          onClose={() => setModalItem(null)}
          onAdd={addToCart}
        />
      </div>
    </Router>
  );
}
