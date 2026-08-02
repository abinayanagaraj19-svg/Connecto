import { useState, useEffect, useCallback } from "react";

// ─── Simulated Database ───────────────────────────────────────────────────────
const DB = {
  users: [
    { id: 1, name: "Demo User", email: "demo@connecto.com", password: "demo123", avatar: "DU" }
  ],
  hotels: [
    { id: 1, name: "The Grand Oasis", rating: 4.8, price: 4200, priceLabel: "₹4,200/night", distance: "0.3 km", category: "Luxury", amenities: ["Pool", "Spa", "WiFi", "Gym"], lat: 11.0168, lng: 76.9558, image: "🏨", city: "Coimbatore" },
    { id: 2, name: "Heritage Haveli", rating: 4.5, price: 2800, priceLabel: "₹2,800/night", distance: "0.7 km", category: "Boutique", amenities: ["WiFi", "Restaurant", "AC"], lat: 11.0200, lng: 76.9600, image: "🏰", city: "Coimbatore" },
    { id: 3, name: "Comfort Inn Express", rating: 4.2, price: 1500, priceLabel: "₹1,500/night", distance: "1.2 km", category: "Budget", amenities: ["WiFi", "Parking", "AC"], lat: 11.0140, lng: 76.9520, image: "🏩", city: "Coimbatore" },
    { id: 4, name: "Sky Suites Tower", rating: 4.7, price: 6500, priceLabel: "₹6,500/night", distance: "0.5 km", category: "Luxury", amenities: ["Pool", "Spa", "WiFi", "Lounge", "Gym"], lat: 11.0180, lng: 76.9570, image: "🌇", city: "Coimbatore" },
    { id: 5, name: "Backpacker's Den", rating: 4.0, price: 800, priceLabel: "₹800/night", distance: "1.8 km", category: "Hostel", amenities: ["WiFi", "Common Kitchen"], lat: 11.0120, lng: 76.9500, image: "🛖", city: "Coimbatore" },
  ],
  restaurants: [
    { id: 1, name: "Spice Route Kitchen", cuisine: "South Indian", rating: 4.7, distance: "0.2 km", price: "₹₹", hours: "7am-11pm", specialty: "Dosa & Filter Coffee", lat: 11.0165, lng: 76.9555, image: "🍛" },
    { id: 2, name: "The Mughal Darbar", cuisine: "North Indian", rating: 4.5, distance: "0.5 km", price: "₹₹₹", hours: "12pm-11pm", specialty: "Biryani & Kebabs", lat: 11.0195, lng: 76.9595, image: "🍖" },
    { id: 3, name: "Chettinad House", cuisine: "Chettinad", rating: 4.9, distance: "0.9 km", price: "₹₹₹", hours: "11am-10pm", specialty: "Chettinad Curry", lat: 11.0135, lng: 76.9515, image: "🌶️" },
    { id: 4, name: "Green Bowl Café", cuisine: "Multi-cuisine / Veg", rating: 4.3, distance: "0.4 km", price: "₹", hours: "8am-9pm", specialty: "Salads & Smoothies", lat: 11.0175, lng: 76.9565, image: "🥗" },
    { id: 5, name: "Street Bites Corner", cuisine: "Street Food", rating: 4.6, distance: "0.1 km", price: "₹", hours: "6pm-1am", specialty: "Sundal & Bajji", lat: 11.0162, lng: 76.9552, image: "🥘" },
  ],
  spots: [
    { id: 1, name: "Marudamalai Temple", category: "Spiritual", rating: 4.8, distance: "12 km", duration: "2-3 hrs", bestTime: "6am-8am", description: "Ancient hilltop Murugan temple with panoramic city views", image: "🛕", lat: 11.0769, lng: 76.9008 },
    { id: 2, name: "Ooty (Nilgiris)", category: "Nature", rating: 4.9, distance: "86 km", duration: "Full day", bestTime: "Oct-Mar", description: "Queen of Hill Stations with lush tea gardens and toy train", image: "🌿", lat: 11.4102, lng: 76.6950 },
    { id: 3, name: "Kovai Kondattam", category: "Theme Park", rating: 4.3, distance: "8 km", duration: "4-6 hrs", bestTime: "Weekdays", description: "Amusement and water park perfect for families", image: "🎢", lat: 11.0510, lng: 76.9703 },
    { id: 4, name: "Isha Yoga Center", category: "Wellness", rating: 4.9, distance: "30 km", duration: "3-4 hrs", bestTime: "Early morning", description: "Sprawling ashram with the iconic Adiyogi statue", image: "🧘", lat: 11.1025, lng: 76.8220 },
    { id: 5, name: "Siruvani Waterfalls", category: "Nature", rating: 4.7, distance: "35 km", duration: "Half day", bestTime: "Monsoon-Winter", description: "One of the sweetest water sources, stunning forest waterfall", image: "💧", lat: 10.9833, lng: 76.7167 },
    { id: 6, name: "VOC Park & Zoo", category: "Family", rating: 4.2, distance: "3 km", duration: "2-3 hrs", bestTime: "Weekdays", description: "City zoo with variety of animals, great for kids", image: "🦁", lat: 11.0018, lng: 76.9629 },
  ],
  routes: [
    { id: 1, name: "Main Highway Route", duration: "45 min", distance: "22 km", traffic: "Heavy", status: "congested", color: "#ef4444" },
    { id: 2, name: "Bypass Road Alt", duration: "38 min", distance: "26 km", traffic: "Moderate", status: "recommended", color: "#22c55e" },
    { id: 3, name: "Inner City Route", duration: "52 min", distance: "18 km", traffic: "Light", status: "scenic", color: "#3b82f6" },
  ]
};

// ─── Color Palette & Theme ────────────────────────────────────────────────────
const theme = {
  bg: "#0a0f1e",
  card: "#111827",
  cardBorder: "#1f2937",
  accent: "#f59e0b",
  accentGlow: "rgba(245,158,11,0.3)",
  teal: "#14b8a6",
  purple: "#8b5cf6",
  text: "#f9fafb",
  muted: "#9ca3af",
  danger: "#ef4444",
  success: "#22c55e",
};

// ─── Inline Styles ────────────────────────────────────────────────────────────
const S = {
  app: { minHeight: "100vh", background: theme.bg, color: theme.text, fontFamily: "'Sora', 'DM Sans', sans-serif", position: "relative", overflow: "hidden" },
  glowOrb: (color, top, left, size = 300) => ({ position: "fixed", top, left, width: size, height: size, background: color, borderRadius: "50%", filter: "blur(100px)", opacity: 0.15, pointerEvents: "none", zIndex: 0 }),
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: "rgba(10,15,30,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${theme.cardBorder}`, position: "sticky", top: 0, zIndex: 100 },
  logo: { fontSize: 24, fontWeight: 800, background: `linear-gradient(135deg, ${theme.accent}, ${theme.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.5px" },
  navBtn: (active) => ({ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s", background: active ? theme.accent : "transparent", color: active ? "#000" : theme.muted }),
  heroSection: { position: "relative", zIndex: 1, textAlign: "center", padding: "80px 24px 40px" },
  heroTitle: { fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 16 },
  heroSub: { fontSize: 18, color: theme.muted, maxWidth: 520, margin: "0 auto 40px" },
  card: (extra = {}) => ({ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 16, padding: 20, ...extra }),
  btn: (variant = "primary", extra = {}) => ({
    padding: "12px 28px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, transition: "all 0.2s",
    background: variant === "primary" ? theme.accent : variant === "outline" ? "transparent" : theme.teal,
    color: variant === "primary" ? "#000" : variant === "outline" ? theme.accent : "#000",
    border: variant === "outline" ? `2px solid ${theme.accent}` : "none",
    ...extra
  }),
  input: { width: "100%", padding: "12px 16px", background: "#0d1424", border: `1px solid ${theme.cardBorder}`, borderRadius: 10, color: theme.text, fontSize: 14, outline: "none", boxSizing: "border-box" },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: theme.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" },
  badge: (color = theme.accent) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${color}22`, color, border: `1px solid ${color}44` }),
  stars: (n) => "★".repeat(Math.floor(n)) + "☆".repeat(5 - Math.floor(n)),
  section: { position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" },
  sectionTitle: { fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.5px" },
  sectionSub: { color: theme.muted, fontSize: 14, marginBottom: 28 },
  grid: (cols = 3) => ({ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${cols === 2 ? 320 : 260}px, 1fr))`, gap: 16 }),
  mapContainer: { borderRadius: 16, overflow: "hidden", border: `1px solid ${theme.cardBorder}`, background: "#0d1424", position: "relative", height: 320 },
  tag: { display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 6, background: "#1f2937", fontSize: 12, color: theme.muted },
};

// ─── Components ───────────────────────────────────────────────────────────────

function StarRating({ n }) {
  return <span style={{ color: theme.accent, fontSize: 13 }}>{S.stars(n)} <span style={{ color: theme.muted, fontSize: 12 }}>({n})</span></span>;
}

function MapVisual({ spots, hotels, center }) {
  const mapSpots = [...(spots || []).slice(0, 4), ...(hotels || []).slice(0, 3)];
  return (
    <div style={S.mapContainer}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d1f2d 0%, #0a1628 50%, #111827 100%)" }} />
      {/* Grid lines */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${i * 20}%`, left: 0, right: 0, height: 1, background: "#1f2937", opacity: 0.5 }} />
      ))}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: "absolute", left: `${i * 14}%`, top: 0, bottom: 0, width: 1, background: "#1f2937", opacity: 0.5 }} />
      ))}
      {/* Road lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path d="M0,160 Q200,120 400,160 T800,150" stroke="#1e3a5f" strokeWidth="8" fill="none" />
        <path d="M0,160 Q200,120 400,160 T800,150" stroke="#2563eb" strokeWidth="2" fill="none" strokeDasharray="12,8" opacity="0.5" />
        <path d="M300,0 Q320,160 300,320" stroke="#1e3a5f" strokeWidth="6" fill="none" />
        <path d="M300,0 Q320,160 300,320" stroke="#2563eb" strokeWidth="1.5" fill="none" strokeDasharray="10,6" opacity="0.4" />
        {/* Alt route */}
        <path d="M0,200 Q250,240 500,180 T900,200" stroke="#065f46" strokeWidth="4" fill="none" strokeDasharray="8,6" opacity="0.7" />
      </svg>
      {/* Location pins */}
      {mapSpots.map((s, i) => {
        const x = 8 + (i * 13) % 80;
        const y = 15 + (i * 17) % 65;
        return (
          <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-100%)" }}>
            <div style={{ background: i < 4 ? theme.teal : theme.accent, borderRadius: "50% 50% 50% 0", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, boxShadow: `0 0 12px ${i < 4 ? theme.teal : theme.accent}66`, transform: "rotate(-45deg)" }}>
              <span style={{ transform: "rotate(45deg)" }}>{s.image}</span>
            </div>
          </div>
        );
      })}
      {/* Current location */}
      <div style={{ position: "absolute", left: "45%", top: "50%", transform: "translate(-50%,-50%)" }}>
        <div style={{ width: 16, height: 16, background: "#3b82f6", borderRadius: "50%", border: "3px solid white", boxShadow: "0 0 0 6px rgba(59,130,246,0.3)" }} />
      </div>
      {/* Legend */}
      <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(10,15,30,0.85)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "8px 12px", fontSize: 11, border: `1px solid ${theme.cardBorder}` }}>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ color: theme.teal }}>● Tourist Spots</span>
          <span style={{ color: theme.accent }}>● Hotels</span>
          <span style={{ color: "#3b82f6" }}>● You</span>
        </div>
      </div>
      <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(10,15,30,0.85)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: theme.teal, border: `1px solid ${theme.cardBorder}` }}>
        📍 Coimbatore, Tamil Nadu
      </div>
    </div>
  );
}

function LoginPage({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError(""); setLoading(true);
    setTimeout(() => {
      if (isLogin) {
        const user = DB.users.find(u => u.email === form.email && u.password === form.password);
        if (user) onLogin(user);
        else setError("Invalid credentials. Try demo@connecto.com / demo123");
      } else {
        if (!form.name || !form.email || !form.password) { setError("All fields required"); setLoading(false); return; }
        const newUser = { id: Date.now(), name: form.name, email: form.email, password: form.password, avatar: form.name.slice(0,2).toUpperCase() };
        DB.users.push(newUser);
        onLogin(newUser);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", zIndex: 1 }}>
      <div style={{ ...S.card(), width: "100%", maxWidth: 440, padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ ...S.logo, display: "block", fontSize: 36, marginBottom: 8 }}>Connecto</div>
          <p style={{ color: theme.muted, fontSize: 14 }}>Your AI-Powered Travel Companion</p>
        </div>
        <div style={{ display: "flex", background: "#0d1424", borderRadius: 10, padding: 4, marginBottom: 28 }}>
          {["Login", "Register"].map((t, i) => (
            <button key={t} onClick={() => setIsLogin(i === 0)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, transition: "all 0.2s", background: (isLogin ? i === 0 : i === 1) ? theme.accent : "transparent", color: (isLogin ? i === 0 : i === 1) ? "#000" : theme.muted }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {!isLogin && (
            <div>
              <label style={S.label}>Full Name</label>
              <input style={S.input} placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}
          <div>
            <label style={S.label}>Email Address</label>
            <input style={S.input} placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={S.label}>Password</label>
            <input style={S.input} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          {error && <div style={{ color: theme.danger, fontSize: 13, padding: "8px 12px", background: "#ef444422", borderRadius: 8 }}>{error}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{ ...S.btn("primary"), padding: "14px", fontSize: 15, opacity: loading ? 0.7 : 1 }}>
            {loading ? "⏳ Please wait..." : isLogin ? "🚀 Sign In" : "🌟 Create Account"}
          </button>
          {isLogin && (
            <p style={{ textAlign: "center", fontSize: 12, color: theme.muted }}>
              Demo: <span style={{ color: theme.accent }}>demo@connecto.com</span> / <span style={{ color: theme.accent }}>demo123</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function TripPlanner({ onPlan }) {
  const [form, setForm] = useState({ days: 3, companions: 1, transport: "car", startDate: "", budget: "medium", destination: "Coimbatore" });
  const [detecting, setDetecting] = useState(false);
  const [location, setLocation] = useState(null);

  const detectLocation = () => {
    setDetecting(true);
    setTimeout(() => {
      setLocation({ city: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558 });
      setDetecting(false);
    }, 1500);
  };

  const transports = [
    { id: "car", icon: "🚗", label: "Car" },
    { id: "bike", icon: "🏍️", label: "Bike" },
    { id: "bus", icon: "🚌", label: "Bus" },
    { id: "train", icon: "🚂", label: "Train" },
    { id: "flight", icon: "✈️", label: "Flight" },
  ];

  const budgets = [
    { id: "budget", label: "Budget", desc: "< ₹2000/day", color: theme.success },
    { id: "medium", label: "Mid-range", desc: "₹2000–5000/day", color: theme.teal },
    { id: "luxury", label: "Luxury", desc: "> ₹5000/day", color: theme.accent },
  ];

  return (
    <div style={S.section}>
      <h2 style={S.sectionTitle}>✈️ Plan Your Trip</h2>
      <p style={S.sectionSub}>Tell us about your journey and we'll craft the perfect experience</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Location Detection */}
        <div style={{ ...S.card(), gridColumn: "1/-1" }}>
          <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 700 }}>📍 Your Current Location</h3>
          {location ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 12, height: 12, background: theme.success, borderRadius: "50%", boxShadow: `0 0 8px ${theme.success}` }} />
              <span style={{ fontWeight: 600 }}>{location.city}, {location.state}</span>
              <span style={{ color: theme.muted, fontSize: 13 }}>({location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E)</span>
              <button onClick={() => setLocation(null)} style={{ ...S.btn("outline"), padding: "6px 12px", fontSize: 12, marginLeft: "auto" }}>Change</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button onClick={detectLocation} disabled={detecting} style={{ ...S.btn("primary"), opacity: detecting ? 0.7 : 1 }}>
                {detecting ? "🔍 Detecting..." : "📡 Detect My Location"}
              </button>
              <span style={{ color: theme.muted, fontSize: 13 }}>or</span>
              <input style={{ ...S.input, maxWidth: 250 }} placeholder="Enter city manually..." />
            </div>
          )}
        </div>

        {/* Days */}
        <div style={S.card()}>
          <label style={S.label}>Number of Days</label>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
            <button onClick={() => setForm({ ...form, days: Math.max(1, form.days - 1) })} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${theme.cardBorder}`, background: "#0d1424", color: theme.text, cursor: "pointer", fontSize: 18 }}>−</button>
            <span style={{ fontSize: 32, fontWeight: 800, color: theme.accent }}>{form.days}</span>
            <button onClick={() => setForm({ ...form, days: Math.min(30, form.days + 1) })} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${theme.cardBorder}`, background: "#0d1424", color: theme.text, cursor: "pointer", fontSize: 18 }}>+</button>
            <span style={{ color: theme.muted }}>day{form.days > 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Companions */}
        <div style={S.card()}>
          <label style={S.label}>Travel Companions</label>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
            <button onClick={() => setForm({ ...form, companions: Math.max(1, form.companions - 1) })} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${theme.cardBorder}`, background: "#0d1424", color: theme.text, cursor: "pointer", fontSize: 18 }}>−</button>
            <span style={{ fontSize: 32, fontWeight: 800, color: theme.teal }}>{form.companions}</span>
            <button onClick={() => setForm({ ...form, companions: Math.min(20, form.companions + 1) })} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${theme.cardBorder}`, background: "#0d1424", color: theme.text, cursor: "pointer", fontSize: 18 }}>+</button>
            <span style={{ color: theme.muted }}>person{form.companions > 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Start Date */}
        <div style={S.card()}>
          <label style={S.label}>Travel Start Date</label>
          <input type="date" style={S.input} value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} min={new Date().toISOString().split("T")[0]} />
        </div>

        {/* Destination */}
        <div style={S.card()}>
          <label style={S.label}>Destination</label>
          <input style={S.input} placeholder="Destination city..." value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} />
        </div>

        {/* Transport Mode */}
        <div style={{ ...S.card(), gridColumn: "1/-1" }}>
          <label style={S.label}>Mode of Transport</label>
          <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
            {transports.map(t => (
              <button key={t.id} onClick={() => setForm({ ...form, transport: t.id })} style={{ padding: "12px 20px", borderRadius: 12, border: `2px solid ${form.transport === t.id ? theme.accent : theme.cardBorder}`, background: form.transport === t.id ? `${theme.accent}22` : "#0d1424", color: form.transport === t.id ? theme.accent : theme.muted, cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all 0.2s" }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{t.icon}</div>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div style={{ ...S.card(), gridColumn: "1/-1" }}>
          <label style={S.label}>Budget Preference</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 10 }}>
            {budgets.map(b => (
              <button key={b.id} onClick={() => setForm({ ...form, budget: b.id })} style={{ padding: "16px", borderRadius: 12, border: `2px solid ${form.budget === b.id ? b.color : theme.cardBorder}`, background: form.budget === b.id ? `${b.color}15` : "#0d1424", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                <div style={{ fontWeight: 700, color: form.budget === b.id ? b.color : theme.text, marginBottom: 4 }}>{b.label}</div>
                <div style={{ fontSize: 12, color: theme.muted }}>{b.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: "1/-1", display: "flex", gap: 12 }}>
          <button onClick={() => onPlan(form)} style={{ ...S.btn("primary"), flex: 1, padding: "16px", fontSize: 16 }}>
            🗺️ Generate My Trip Plan
          </button>
        </div>
      </div>
    </div>
  );
}

function HotelsPage({ tripData }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Luxury", "Boutique", "Budget", "Hostel"];
  const filtered = filter === "All" ? DB.hotels : DB.hotels.filter(h => h.category === filter);

  return (
    <div style={S.section}>
      <h2 style={S.sectionTitle}>🏨 Nearby Hotels</h2>
      <p style={S.sectionSub}>Based on your location in Coimbatore • {DB.hotels.length} properties found</p>
      <MapVisual hotels={DB.hotels} />
      <div style={{ display: "flex", gap: 8, margin: "20px 0", flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ ...S.navBtn(filter === c), border: `1px solid ${filter === c ? theme.accent : theme.cardBorder}`, borderRadius: 20, padding: "7px 16px", fontSize: 13 }}>
            {c}
          </button>
        ))}
      </div>
      <div style={S.grid(3)}>
        {filtered.map(h => (
          <div key={h.id} style={{ ...S.card(), transition: "transform 0.2s, border-color 0.2s", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{h.image}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, flex: 1 }}>{h.name}</h3>
              <span style={S.badge(theme.teal)}>{h.category}</span>
            </div>
            <StarRating n={h.rating} />
            <div style={{ display: "flex", gap: 8, margin: "10px 0", flexWrap: "wrap" }}>
              {h.amenities.map(a => <span key={a} style={S.tag}>{a}</span>)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.cardBorder}` }}>
              <div>
                <span style={{ fontSize: 20, fontWeight: 800, color: theme.accent }}>{h.priceLabel}</span>
                {tripData && <div style={{ fontSize: 11, color: theme.muted }}>≈ ₹{(h.price * tripData.days).toLocaleString()} total</div>}
              </div>
              <div>
                <div style={{ fontSize: 12, color: theme.muted }}>{h.distance} away</div>
                <button style={{ ...S.btn("primary"), padding: "8px 16px", fontSize: 12, marginTop: 4 }}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RestaurantsPage() {
  const [cuisine, setCuisine] = useState("All");
  const cuisines = ["All", "South Indian", "North Indian", "Chettinad", "Multi-cuisine / Veg", "Street Food"];
  const filtered = cuisine === "All" ? DB.restaurants : DB.restaurants.filter(r => r.cuisine === cuisine);

  return (
    <div style={S.section}>
      <h2 style={S.sectionTitle}>🍽️ Nearby Restaurants</h2>
      <p style={S.sectionSub}>Detected near your location • Sorted by rating</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {cuisines.map(c => (
          <button key={c} onClick={() => setCuisine(c)} style={{ ...S.navBtn(cuisine === c), border: `1px solid ${cuisine === c ? theme.accent : theme.cardBorder}`, borderRadius: 20, padding: "7px 16px", fontSize: 13 }}>
            {c}
          </button>
        ))}
      </div>
      <div style={S.grid(3)}>
        {filtered.map(r => (
          <div key={r.id} style={{ ...S.card(), cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.teal; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: 36 }}>{r.image}</span>
              <span style={{ fontWeight: 800, fontSize: 16, color: r.price.length === 1 ? theme.success : r.price.length === 2 ? theme.teal : theme.accent }}>{r.price}</span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{r.name}</h3>
            <p style={{ color: theme.muted, fontSize: 13, marginBottom: 8 }}>{r.cuisine}</p>
            <StarRating n={r.rating} />
            <div style={{ marginTop: 10, padding: "8px", background: "#0d1424", borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: theme.muted }}>🌟 Specialty</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{r.specialty}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 12, color: theme.muted }}>
              <span>📍 {r.distance}</span>
              <span>⏰ {r.hours}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoutesPage({ tripData }) {
  const [selected, setSelected] = useState(1);
  return (
    <div style={S.section}>
      <h2 style={S.sectionTitle}>🗺️ Route Suggestions</h2>
      <p style={S.sectionSub}>AI-powered routes to avoid traffic • Real-time analysis</p>
      <MapVisual />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 20 }}>
        {DB.routes.map(r => (
          <div key={r.id} onClick={() => setSelected(r.id)} style={{ ...S.card(), cursor: "pointer", borderColor: selected === r.id ? r.color : theme.cardBorder, transition: "all 0.2s", transform: selected === r.id ? "scale(1.02)" : "scale(1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</h3>
              <span style={{ ...S.badge(r.color), fontSize: 11 }}>{r.status.toUpperCase()}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["⏱️ Duration", r.duration], ["📏 Distance", r.distance], ["🚦 Traffic", r.traffic]].map(([label, val]) => (
                <div key={label} style={{ padding: "10px", background: "#0d1424", borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: theme.muted }}>{label}</div>
                  <div style={{ fontWeight: 700, marginTop: 2, color: label.includes("Traffic") ? r.color : theme.text }}>{val}</div>
                </div>
              ))}
            </div>
            {selected === r.id && (
              <div style={{ marginTop: 12, padding: "10px", background: `${r.color}15`, borderRadius: 8, fontSize: 13, color: r.color, fontWeight: 600 }}>
                ✓ Selected Route — Navigate Now
              </div>
            )}
          </div>
        ))}
      </div>
      {tripData && (
        <div style={{ ...S.card(), marginTop: 24, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 30 }}>🚗</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Your Trip Summary</div>
            <div style={{ color: theme.muted, fontSize: 14 }}>{tripData.days} days • {tripData.companions} traveler{tripData.companions > 1 ? "s" : ""} • {tripData.transport}</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 12, color: theme.muted }}>Estimated fuel cost</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: theme.accent }}>₹{(tripData.days * 450 * (tripData.transport === "car" ? 1.5 : 0.8)).toFixed(0)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function SpotsPage({ tripData }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Spiritual", "Nature", "Theme Park", "Wellness", "Family"];
  const filtered = category === "All" ? DB.spots : DB.spots.filter(s => s.category === category);

  return (
    <div style={S.section}>
      <h2 style={S.sectionTitle}>🌟 Tourist Spots</h2>
      <p style={S.sectionSub}>Recommended places to visit around Coimbatore</p>
      <MapVisual spots={DB.spots} />
      <div style={{ display: "flex", gap: 8, margin: "20px 0", flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ ...S.navBtn(category === c), border: `1px solid ${category === c ? theme.accent : theme.cardBorder}`, borderRadius: 20, padding: "7px 16px", fontSize: 13 }}>
            {c}
          </button>
        ))}
      </div>
      <div style={S.grid(3)}>
        {filtered.map(s => (
          <div key={s.id} style={{ ...S.card(), cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.purple; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>{s.image}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, flex: 1, marginRight: 8 }}>{s.name}</h3>
              <span style={S.badge(theme.purple)}>{s.category}</span>
            </div>
            <p style={{ color: theme.muted, fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>{s.description}</p>
            <StarRating n={s.rating} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
              {[["📍", s.distance], ["⏱️", s.duration], ["🕐", s.bestTime]].map(([icon, val]) => (
                <div key={icon} style={S.tag}>{icon} {val}</div>
              ))}
            </div>
            <button style={{ ...S.btn("outline"), width: "100%", marginTop: 12, padding: "10px" }}>Add to Itinerary</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ user, tripData }) {
  const totalHotelCost = tripData ? Math.round(DB.hotels[1].price * tripData.days * tripData.companions * 0.6) : 0;
  const stats = [
    { icon: "📅", label: "Trip Duration", value: tripData ? `${tripData.days} Days` : "Not set", color: theme.accent },
    { icon: "👥", label: "Companions", value: tripData ? `${tripData.companions} Person${tripData.companions > 1 ? "s" : ""}` : "Not set", color: theme.teal },
    { icon: "🚗", label: "Transport", value: tripData ? tripData.transport.toUpperCase() : "Not set", color: theme.purple },
    { icon: "💰", label: "Est. Budget", value: tripData ? `₹${totalHotelCost.toLocaleString()}` : "—", color: theme.success },
  ];
  return (
    <div style={S.section}>
      <div style={{ ...S.card(), marginBottom: 24, display: "flex", alignItems: "center", gap: 20, padding: "24px 28px" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, color: "#000" }}>{user.avatar}</div>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Welcome back, {user.name}! 👋</h2>
          <p style={{ margin: 0, color: theme.muted, fontSize: 14 }}>{tripData ? `Your ${tripData.days}-day trip is planned 🎉` : "Ready to plan your next adventure?"}</p>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 12, color: theme.muted }}>📍 Detected Location</div>
          <div style={{ fontWeight: 700 }}>Coimbatore, TN</div>
        </div>
      </div>
      {tripData ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
            {stats.map(s => (
              <div key={s.label} style={{ ...S.card(), textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ ...S.card(), marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📍 Live Map Overview</h3>
            <MapVisual spots={DB.spots} hotels={DB.hotels} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={S.card()}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🏆 Top Recommended Spots</h3>
              {DB.spots.slice(0, 3).map(s => (
                <div key={s.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${theme.cardBorder}` }}>
                  <span style={{ fontSize: 24 }}>{s.image}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: theme.muted }}>{s.distance} • {s.duration}</div>
                  </div>
                  <StarRating n={s.rating} />
                </div>
              ))}
            </div>
            <div style={S.card()}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🚦 Traffic Status</h3>
              {DB.routes.map(r => (
                <div key={r.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${theme.cardBorder}` }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: theme.muted }}>{r.distance} • {r.duration}</div>
                  </div>
                  <span style={S.badge(r.color)}>{r.traffic}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🗺️</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>No trip planned yet</h3>
          <p style={{ color: theme.muted, marginBottom: 24 }}>Go to "Plan Trip" to set up your travel details and get personalized recommendations</p>
        </div>
      )}
    </div>
  );
}

function AdminPanel({ onBack }) {
  const [tab, setTab] = useState("hotels");
  const tabs = [{ id: "hotels", label: "🏨 Hotels", count: DB.hotels.length }, { id: "restaurants", label: "🍽️ Restaurants", count: DB.restaurants.length }, { id: "spots", label: "🌟 Spots", count: DB.spots.length }, { id: "users", label: "👥 Users", count: DB.users.length }];
  const dataMap = { hotels: DB.hotels, restaurants: DB.restaurants, spots: DB.spots, users: DB.users };
  const data = dataMap[tab];

  return (
    <div style={S.section}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <button onClick={onBack} style={{ ...S.btn("outline"), padding: "8px 14px" }}>← Back</button>
        <div>
          <h2 style={{ ...S.sectionTitle, marginBottom: 0 }}>⚙️ Admin Panel</h2>
          <p style={{ color: theme.muted, fontSize: 13, margin: 0 }}>Manage tourism data</p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <span style={S.badge(theme.danger)}>ADMIN ACCESS</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ ...S.navBtn(tab === t.id), border: `1px solid ${tab === t.id ? theme.accent : theme.cardBorder}`, borderRadius: 10, padding: "10px 18px" }}>
            {t.label} <span style={{ marginLeft: 6, padding: "2px 8px", borderRadius: 10, background: tab === t.id ? "rgba(0,0,0,0.3)" : theme.cardBorder, fontSize: 12 }}>{t.count}</span>
          </button>
        ))}
      </div>
      <div style={S.card()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16 }}>{tabs.find(t => t.id === tab)?.label} ({data.length} records)</h3>
          <button style={{ ...S.btn("primary"), padding: "8px 16px", fontSize: 13 }}>+ Add New</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${theme.cardBorder}` }}>
                {data[0] && Object.keys(data[0]).slice(0, 5).map(k => (
                  <th key={k} style={{ padding: "10px 12px", textAlign: "left", color: theme.muted, fontWeight: 600, textTransform: "uppercase", fontSize: 11, letterSpacing: "0.5px" }}>{k}</th>
                ))}
                <th style={{ padding: "10px 12px", color: theme.muted, fontWeight: 600, textTransform: "uppercase", fontSize: 11 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
                  {Object.values(row).slice(0, 5).map((val, j) => (
                    <td key={j} style={{ padding: "12px 12px", color: j === 0 ? theme.muted : theme.text }}>
                      {typeof val === "number" && j > 0 ? <span style={{ color: theme.accent, fontWeight: 600 }}>{val}</span> : String(val).slice(0, 30)}
                    </td>
                  ))}
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ ...S.btn("outline"), padding: "5px 12px", fontSize: 12 }}>Edit</button>
                      <button style={{ ...S.btn("primary"), padding: "5px 12px", fontSize: 12, background: theme.danger }}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [tripData, setTripData] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const navItems = [
    { id: "dashboard", label: "🏠 Dashboard" },
    { id: "plan", label: "✈️ Plan Trip" },
    { id: "hotels", label: "🏨 Hotels" },
    { id: "restaurants", label: "🍽️ Restaurants" },
    { id: "routes", label: "🗺️ Routes" },
    { id: "spots", label: "🌟 Spots" },
  ];

  const handleLogin = (u) => { setUser(u); setPage("dashboard"); };
  const handlePlan = (data) => { setTripData(data); setPage("dashboard"); };

  if (!user) return (
    <div style={S.app}>
      <div style={S.glowOrb("rgba(245,158,11,1)", "-10%", "60%")} />
      <div style={S.glowOrb("rgba(20,184,166,1)", "60%", "-5%")} />
      <div style={S.glowOrb("rgba(139,92,246,1)", "30%", "80%", 200)} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...S.nav, justifyContent: "center" }}>
          <div style={S.logo}>🧭 Connecto</div>
        </div>
        <div style={S.heroSection}>
          <h1 style={S.heroTitle}>
            <span style={{ color: theme.text }}>Explore the World</span><br />
            <span style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.teal})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Smarter & Faster</span>
          </h1>
          <p style={S.heroSub}>AI-powered tourist guidance. Real hotels, restaurants, routes & spots — all in one place.</p>
        </div>
        <LoginPage onLogin={handleLogin} onRegister={handleLogin} />
      </div>
    </div>
  );

  if (showAdmin) return (
    <div style={S.app}>
      <div style={S.glowOrb("rgba(239,68,68,1)", "-10%", "70%", 200)} />
      <div style={{ position: "relative", zIndex: 1, paddingTop: 24 }}>
        <AdminPanel onBack={() => setShowAdmin(false)} />
      </div>
    </div>
  );

  return (
    <div style={S.app}>
      <div style={S.glowOrb("rgba(245,158,11,1)", "-10%", "60%")} />
      <div style={S.glowOrb("rgba(20,184,166,1)", "70%", "-5%")} />
      <div style={S.glowOrb("rgba(139,92,246,1)", "40%", "85%", 200)} />

      <nav style={S.nav}>
        <div style={S.logo}>🧭 Connecto</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={S.navBtn(page === n.id)}>{n.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setShowAdmin(true)} style={{ ...S.btn("outline"), padding: "7px 14px", fontSize: 12 }}>⚙️ Admin</button>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "#000", cursor: "pointer" }} onClick={() => setUser(null)}>
            {user.avatar}
          </div>
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1, paddingTop: 32 }}>
        {page === "dashboard" && <Dashboard user={user} tripData={tripData} />}
        {page === "plan" && <TripPlanner onPlan={handlePlan} />}
        {page === "hotels" && <HotelsPage tripData={tripData} />}
        {page === "restaurants" && <RestaurantsPage />}
        {page === "routes" && <RoutesPage tripData={tripData} />}
        {page === "spots" && <SpotsPage tripData={tripData} />}
      </main>

      <footer style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "32px 24px", borderTop: `1px solid ${theme.cardBorder}`, color: theme.muted, fontSize: 13 }}>
        <span style={{ color: theme.accent, fontWeight: 700 }}>🧭 Connecto</span> — AI Tourist Guidance System &nbsp;•&nbsp; Prototype v1.0 &nbsp;•&nbsp; Built for Coimbatore, TN
      </footer>
    </div>
  );
}
