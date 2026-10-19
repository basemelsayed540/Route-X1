/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Car,
  Plane,
  Compass,
  Route as RouteIcon,
  Briefcase,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  Facebook,
  MapPin,
  Calendar,
  Clock,
  Users,
  Luggage,
  Sparkles,
  Wifi,
  Zap,
  VolumeX,
  UserCheck,
  Wind,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Settings,
  X,
  AlertCircle,
  Plus,
  Trash2,
  RotateCcw,
  Navigation,
  ArrowLeft,
  ArrowRight,
  Moon,
  Sun,
  Award,
  Globe
} from "lucide-react";
import {
  initialAppState,
  VIP_AMENITIES,
  AppState,
  Car as CarType,
  RoutePreset,
  POPULAR_ROUTES
} from "./data/limousineData";
import { TRANSLATIONS, Language, TranslationDict } from "./data/translations";
import { IMAGES } from "./data/images";
import { Limousine3DShowcase } from "./components/Limousine3DShowcase";
import {
  localizeRoute,
  localizeCar,
  localizeAddress,
  routeFieldVariants,
  money,
  moneyPerKm,
  egpToUsd,
  billedInEgpNote,
  FIXED_PRICE_LABEL,
  PER_KM_UNIT_USD
} from "./data/localized";

// Helper to guarantee numbers are always in English (Western Latin) digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
// Mounts its children only once the section scrolls near the viewport,
// so the WebGL scene is not created (and does not drain battery) for nothing.
function MountWhenVisible({ children, minHeight = 520 }: { children: React.ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : null}
    </div>
  );
}

function toEnglishDigits(s: string | number): string {
  return String(s == null ? "" : s)
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/٫/g, ".");
}

function normPhone(s: string): string {
  let d = toEnglishDigits(s).replace(/\D/g, "");
  if (d.indexOf("20") === 0 && d.length === 12) d = "0" + d.slice(2);
  if (d.length === 10 && d.charAt(0) === "1") d = "0" + d;
  return d;
}

function validPhone(p: string): boolean {
  return /^01[0125]\d{8}$/.test(p);
}

function intlPhone(local: string): string {
  const clean = normPhone(local);
  return "20" + clean.slice(1);
}

function fmtNum(n: number): string {
  return toEnglishDigits(String(+(+n).toFixed(2)));
}

function pad(n: number): string {
  return (n < 10 ? "0" : "") + n;
}

const MAPS_RE = /(maps\.app\.goo\.gl|goo\.gl\/maps|google\.[a-z.]+\/maps|maps\.google\.)/i;

interface ParsedLocation {
  kind: "empty" | "pin" | "link" | "text";
  text: string;
  url?: string;
  pair?: string;
  link?: string;
}

function parseLoc(raw: string): ParsedLocation {
  const v = toEnglishDigits(raw || "").trim();
  if (!v) return { kind: "empty", text: "" };

  const u = v.match(/https?:\/\/[^\s]+/);
  const url = u && MAPS_RE.test(u[0]) ? u[0] : undefined;

  const mc = v.match(/(-?\d{1,2}\.\d{3,})\s*[,\u060C]\s*(-?\d{1,3}\.\d{3,})/);
  if (mc) {
    const lat = parseFloat(mc[1]);
    const lng = parseFloat(mc[2]);
    if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      return {
        kind: "pin",
        text: v,
        url,
        pair: `${mc[1]},${mc[2]}`,
        link: `https://www.google.com/maps/search/?api=1&query=${mc[1]},${mc[2]}`
      };
    }
  }

  if (url) return { kind: "link", text: v, url };
  return { kind: "text", text: v };
}

export default function App() {
  // App state with local persistence
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem("route_x_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.routes || !parsed.routes.length || typeof parsed.routes[0].price !== "number") {
          parsed.routes = initialAppState.routes;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialAppState;
  });

  const [selectedRoutePresetId, setSelectedRoutePresetId] = useState<string | null>(null);

  // Language state
  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem("rx_lang") as Language;
      if (savedLang === "ar" || savedLang === "en" || savedLang === "zh" || savedLang === "ru") {
        return savedLang;
      }
    } catch (e) {
      console.error(e);
    }
    return "ar";
  });

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Theme state
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const t = localStorage.getItem("rx_theme");
      if (t === "light" || t === "dark") return t;
    } catch (e) {
      console.error(e);
    }
    return "dark";
  });

  // Header scroll detection
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Active translation dictionary
  const t: TranslationDict = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  const isRTL = lang === "ar";

  // Sync language to document element
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    try {
      localStorage.setItem("rx_lang", lang);
    } catch (e) {
      console.error(e);
    }
  }, [lang, isRTL]);

  // Sync theme to DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    try {
      localStorage.setItem("rx_theme", theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Admin and modal states
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPhone, setAdminPhone] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminEditDraft, setAdminEditDraft] = useState<AppState>(appState);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Booking Form State
  const [tripType, setTripType] = useState<"oneway" | "roundtrip" | "hourly">("oneway");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [fromLoc, setFromLoc] = useState("");
  const [viaLoc, setViaLoc] = useState("");
  const [toLoc, setToLoc] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [paxCount, setPaxCount] = useState("2");
  const [bagsCount, setBagsCount] = useState("1");
  const [pickupDate, setPickupDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  });
  const [pickupTime, setPickupTime] = useState("10:00");
  const [flightNumber, setFlightNumber] = useState("");
  const [needMeetAndGreet, setNeedMeetAndGreet] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "water",
    "chargers",
    "air"
  ]);
  const [formValidationMsg, setFormValidationMsg] = useState("");
  const [selectedCarCategory, setSelectedCarCategory] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("route_x_state", JSON.stringify(appState));
    } catch (e) {
      console.error(e);
    }
  }, [appState]);

  // Sorted cars by capacity
  const sortedCars = useMemo(() => {
    return [...appState.cars].map((c) => localizeCar(c, lang)).sort((a, b) => a.maxPax - b.maxPax);
  }, [appState.cars, lang]);

  const maxPaxInFleet = useMemo(() => {
    return sortedCars.length ? sortedCars[sortedCars.length - 1].maxPax : 14;
  }, [sortedCars]);

  // Pick suitable car automatically or manually selected
  const activeCar = useMemo(() => {
    const paxNum = parseInt(toEnglishDigits(paxCount)) || 0;
    if (selectedCarCategory) {
      const match = sortedCars.find((c) => c.id === selectedCarCategory);
      if (match) return match;
    }
    for (const c of sortedCars) {
      if (paxNum <= c.maxPax) return c;
    }
    return sortedCars[sortedCars.length - 1] || null;
  }, [paxCount, sortedCars, selectedCarCategory]);

  // Bag warning & pax capacity check
  const carWarning = useMemo(() => {
    const paxNum = parseInt(toEnglishDigits(paxCount)) || 0;
    const bagsNum = parseInt(toEnglishDigits(bagsCount)) || 0;

    if (paxNum > maxPaxInFleet) {
      return t.booking.paxWarning;
    }
    if (activeCar && activeCar.bagLimit !== null && bagsNum > activeCar.bagLimit) {
      return t.booking.bagWarning;
    }
    return "";
  }, [paxCount, bagsCount, activeCar, maxPaxInFleet, t]);

  // Matching Preset Route
  const rawRoutes = useMemo(
    () => (appState.routes && appState.routes.length > 0 ? appState.routes : POPULAR_ROUTES),
    [appState.routes]
  );
  // Same routes with name / from / to / highlight in the selected language
  const routeList = useMemo(() => rawRoutes.map((r) => localizeRoute(r, lang)), [rawRoutes, lang]);

  const matchingPreset = useMemo(() => {
    if (selectedRoutePresetId) {
      const found = rawRoutes.find((r) => r.id === selectedRoutePresetId);
      if (found) return found;
    }
    const f = fromLoc.trim().toLowerCase();
    const to = toLoc.trim().toLowerCase();
    return rawRoutes.find(
      (r) => routeFieldVariants(r, "from").includes(f) && routeFieldVariants(r, "to").includes(to)
    );
  }, [selectedRoutePresetId, rawRoutes, fromLoc, toLoc]);

  // When the language changes, translate the pickup / drop-off text if it came from a preset route
  useEffect(() => {
    const f = fromLoc.trim().toLowerCase();
    const to = toLoc.trim().toLowerCase();
    const route = rawRoutes.find(
      (r) => routeFieldVariants(r, "from").includes(f) && routeFieldVariants(r, "to").includes(to)
    );
    if (route) {
      const loc = localizeRoute(route, lang);
      setFromLoc(loc.from);
      setToLoc(loc.to);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Price helpers: Egyptian pounds in Arabic, US dollars in every other language
  const perKmText = (egp: number) =>
    toEnglishDigits(lang === "ar" ? fmtNum(egp) : moneyPerKm(egp, lang));
  const perKmUnit = lang === "ar" ? t.fleet.currencyPerKm : PER_KM_UNIT_USD[lang];

  // Estimated fare
  const estimatedFare = useMemo(() => {
    if (matchingPreset && typeof matchingPreset.price === "number" && matchingPreset.price > 0) {
      let total = matchingPreset.price;
      if (tripType === "roundtrip") {
        total = Math.round(total * 1.85);
      }
      return total;
    }

    const km = parseFloat(toEnglishDigits(distanceKm)) || 0;
    if (!activeCar || activeCar.pricePerKm === null || km <= 0) return null;

    let total = Math.round(km * activeCar.pricePerKm);
    if (tripType === "roundtrip") {
      total = Math.round(total * 1.85);
    }
    return total;
  }, [matchingPreset, distanceKm, activeCar, tripType]);

  // Parsed date with guaranteed English digits (0-9)
  const formattedDate = useMemo(() => {
    if (!pickupDate) return "";
    try {
      const parts = pickupDate.split("-");
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      const locale = lang === "ar" ? "ar-EG" : lang === "zh" ? "zh-CN" : lang === "ru" ? "ru-RU" : "en-US";
      const dayName = d.toLocaleDateString(locale, { weekday: "long" });
      const digitsFormatted = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
      return `${dayName} ${digitsFormatted}`;
    } catch {
      return pickupDate;
    }
  }, [pickupDate, lang]);

  // Parsed time with guaranteed English digits (0-9)
  const formattedTime = useMemo(() => {
    if (!pickupTime) return "";
    const p = pickupTime.split(":");
    if (p.length < 2) return pickupTime;
    const h = parseInt(p[0]);
    const suffix = lang === "ar" ? (h >= 12 ? "م" : "ص") : (h >= 12 ? "PM" : "AM");
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:${p[1]} ${suffix}`;
  }, [pickupTime, lang]);

  // Location maps parsing
  const parsedFrom = useMemo(() => parseLoc(fromLoc), [fromLoc]);
  const parsedVia = useMemo(() => parseLoc(viaLoc), [viaLoc]);
  const parsedTo = useMemo(() => parseLoc(toLoc), [toLoc]);

  // Google Directions link
  const googleDirectionsUrl = useMemo(() => {
    const o = parsedFrom.pair || parsedFrom.text;
    const d = parsedTo.pair || parsedTo.text;
    const w = parsedVia.pair || parsedVia.text;

    if (o && d && parsedVia.kind !== "link") {
      return `https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=${encodeURIComponent(
        o
      )}&destination=${encodeURIComponent(d)}${w ? `&waypoints=${encodeURIComponent(w)}` : ""}`;
    }
    return null;
  }, [parsedFrom, parsedTo, parsedVia]);

  // Build WhatsApp Message (Strictly formatted with English digits)
  const whatsAppUrl = useMemo(() => {
    const lines: string[] = [
      "✨ *Route X Limousine - Executive VIP Booking*",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `👤 *Name / الاسم:* ${name.trim() || "N/A"}`,
      `📞 *Phone / الهاتف:* ${phone.trim() || "N/A"}`
    ];

    if (phone2.trim()) {
      lines.push(`📱 *Alt Phone:* ${phone2.trim()}`);
    }

    const tripTypeTitle =
      tripType === "oneway"
        ? "One Way / ذهاب فقط"
        : tripType === "roundtrip"
        ? "Round Trip / ذهاب وعودة"
        : "Hourly & Daily Chauffeur / بالساعة ويوم كامل";
    lines.push(`🚘 *Trip Type:* ${tripTypeTitle}`);

    if (parsedFrom.url) {
      lines.push(`📍 *Pickup (Google Maps):* ${parsedFrom.url}`);
    } else {
      lines.push(`📍 *Pickup:* ${fromLoc.trim() || "N/A"}`);
    }

    if (viaLoc.trim()) {
      if (parsedVia.url) {
        lines.push(`➕ *Stopover (Google Maps):* ${parsedVia.url}`);
      } else {
        lines.push(`➕ *Stopover:* ${viaLoc.trim()}`);
      }
    }

    if (parsedTo.url) {
      lines.push(`🏁 *Drop-off (Google Maps):* ${parsedTo.url}`);
    } else {
      lines.push(`🏁 *Drop-off:* ${toLoc.trim() || "N/A"}`);
    }

    lines.push(`👥 *Passengers / الأفراد:* ${toEnglishDigits(paxCount || "1")}`);
    lines.push(`🧳 *Luggage / الحقائب:* ${toEnglishDigits(bagsCount || "0")}`);

    if (activeCar) {
      lines.push(`🚗 *Vehicle Category:* ${activeCar.name}`);
      if (activeCar.pricePerKm !== null) {
        lines.push(`💰 *Rate / Km:* ${toEnglishDigits(fmtNum(activeCar.pricePerKm))} EGP / km`);
      }
    }

    const km = parseFloat(toEnglishDigits(distanceKm));
    if (km && km > 0) {
      lines.push(`📏 *Approx Distance:* ${toEnglishDigits(fmtNum(km))} km`);
    }

    if (estimatedFare !== null) {
      lines.push(
        `💵 *Estimated Total Fare:* ${toEnglishDigits(estimatedFare)} EGP${
          lang !== "ar" ? ` (≈ $${Math.max(1, Math.round(egpToUsd(estimatedFare)))} USD)` : ""
        }`
      );
    }

    lines.push(`📅 *Date & Time:* ${formattedDate} - ${formattedTime}`);

    if (flightNumber.trim()) {
      lines.push(`✈️ *Flight Number:* ${flightNumber.trim()}`);
    }

    if (needMeetAndGreet) {
      lines.push(`🏷️ *Meet & Greet Sign:* YES (Customer Name Board)`);
    }

    if (selectedAmenities.length > 0) {
      const amLabels = selectedAmenities
        .map((id) => VIP_AMENITIES.find((a) => a.id === id)?.title)
        .filter(Boolean)
        .join(", ");
      lines.push(`🌟 *VIP Amenities:* ${amLabels}`);
    }

    lines.push(`⏱️ *ETA:* Determined upon route confirmation`);
    lines.push("━━━━━━━━━━━━━━━━━━━━━━");
    lines.push("Please confirm reservation and assign chauffeur details. Thank you.");

    const rawMsg = lines.join("\n");
    const num = intlPhone(appState.settings.whatsapp);
    return `https://wa.me/${num}?text=${encodeURIComponent(rawMsg)}`;
  }, [
    name,
    phone,
    phone2,
    tripType,
    fromLoc,
    viaLoc,
    toLoc,
    paxCount,
    bagsCount,
    activeCar,
    distanceKm,
    estimatedFare,
    formattedDate,
    formattedTime,
    flightNumber,
    needMeetAndGreet,
    selectedAmenities,
    parsedFrom,
    parsedVia,
    parsedTo,
    appState.settings.whatsapp,
    lang
  ]);

  // Apply quick route preset
  const handleApplyPreset = (preset: RoutePreset) => {
    setSelectedRoutePresetId(preset.id);
    setFromLoc(preset.from);
    setToLoc(preset.to);
    setDistanceKm(toEnglishDigits(String(preset.approxKm)));
    const formEl = document.getElementById("booking-section");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Copy to clipboard
  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  // Submit check
  const handleValidateForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const missing: string[] = [];
    if (!name.trim()) missing.push(t.booking.nameLabel);
    if (!phone.trim() || !validPhone(normPhone(phone))) missing.push(t.booking.phoneLabel);
    if (!fromLoc.trim()) missing.push(t.booking.fromLabel);
    if (!toLoc.trim()) missing.push(t.booking.toLabel);
    if (!pickupDate) missing.push(t.booking.dateLabel);
    if (!pickupTime) missing.push(t.booking.timeLabel);

    if (missing.length > 0) {
      e.preventDefault();
      setFormValidationMsg(`${t.booking.validationMissing} ${missing.join(", ")}.`);
      return;
    }
    setFormValidationMsg("");
  };

  // Admin login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");

    if (!appState.admin) {
      if (!adminPhone.trim() || !adminPassword.trim()) {
        setAdminError("Please fill both phone number and password.");
        return;
      }
      const updated: AppState = {
        ...appState,
        admin: {
          phone: adminPhone,
          salt: "local_salt",
          hash: adminPassword
        }
      };
      setAppState(updated);
      setAdminEditDraft(updated);
      setIsAdminLoggedIn(true);
      return;
    }

    if (
      adminPhone === appState.admin.phone &&
      adminPassword === appState.admin.hash
    ) {
      setAdminEditDraft(JSON.parse(JSON.stringify(appState)));
      setIsAdminLoggedIn(true);
    } else {
      setAdminError("Incorrect phone number or password.");
    }
  };

  // Open and sync admin modal
  const openAdminModal = () => {
    setAdminEditDraft(JSON.parse(JSON.stringify(appState)));
    setShowAdminModal(true);
  };

  // Save admin edits
  const handleSaveAdminEdits = () => {
    setAppState(adminEditDraft);
    setShowAdminModal(false);
  };

  // Language options configuration
  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: "ar", label: "العربية", flag: "🇪🇬" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "ru", label: "Русский", flag: "🇷🇺" }
  ];

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0];

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen relative overflow-x-clip transition-colors duration-300 font-sans"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)"
      }}
    >
      {/* Luxury Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] right-[-10%] w-[650px] h-[650px] ambient-glow-1 rounded-full blur-[100px] opacity-70" />
        <div className="absolute top-[35%] left-[-15%] w-[600px] h-[600px] ambient-glow-2 rounded-full blur-[120px] opacity-60" />
        <div className="absolute -bottom-[10%] right-[10%] w-[700px] h-[700px] ambient-glow-3 rounded-full blur-[110px] opacity-65" />
      </div>

      {/* 1. TOP BAR (Fixed at the top on scroll) */}
      <header
        className={`fixed top-0 inset-x-0 z-50 glass-panel border-b px-3 sm:px-8 transition-all duration-300 ${
          isScrolled
            ? "py-2.5 shadow-xl shadow-black/15 backdrop-blur-2xl"
            : "py-3.5 sm:py-4 backdrop-blur-xl"
        }`}
        style={{
          backgroundColor: isScrolled
            ? "var(--nav-bg)"
            : "var(--glass-panel-bg)",
          borderColor: "var(--glass-panel-border)"
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2.5 sm:gap-3 text-base sm:text-xl font-bold tracking-tight whitespace-nowrap shrink-0 group"
            style={{ color: "var(--fg-heading)" }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-500/40 p-0.5 shadow-lg shadow-amber-500/10 overflow-hidden flex items-center justify-center bg-black/20">
              <img
                src={IMAGES.logo}
                alt="Route X Limousine"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-['Cairo'] tracking-wide">
              Route <span className="text-amber-500">X</span> Limousine
            </span>
          </a>

          {/* Zone 2: Nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium" style={{ color: "var(--muted)" }}>
            <a
              href="#services"
              className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <a
              href="#fleet"
              className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.fleet}
            </a>
            <a
              href="#routes"
              className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.routes}
            </a>
            <a
              href="#booking-section"
              className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.book}
            </a>
            <a
              href="#contact"
              className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Controls (Language Selector, Theme Toggle, Admin, WhatsApp CTA) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Multilingual Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="h-9 px-2.5 sm:px-3 rounded-full glass-btn-ghost flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-sm transition-all"
                style={{ color: "var(--fg)" }}
                aria-label="Select Language"
              >
                <span className="text-sm">{currentLangObj.flag}</span>
                <span className="hidden sm:inline">{currentLangObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isLangMenuOpen && (
                <div
                  className="absolute top-full mt-2 w-36 rounded-2xl glass-panel shadow-2xl p-1.5 z-50 border border-[var(--border-color)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                  style={{
                    [isRTL ? "left" : "right"]: 0
                  }}
                >
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLang(opt.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl font-medium transition-all text-left cursor-pointer ${
                        lang === opt.code
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "hover:bg-white/10"
                      }`}
                      style={{
                        color: lang === opt.code ? "#080a0f" : "var(--fg)"
                      }}
                    >
                      <span className="text-sm">{opt.flag}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={theme === "dark" ? "Light Mode" : "Dark Mode"}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-btn-ghost flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              style={{ color: "var(--fg)" }}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              )}
            </button>

            {/* Admin Setting Button */}
            <button
              onClick={openAdminModal}
              aria-label="Admin Dashboard"
              title="Admin"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-btn-ghost flex items-center justify-center transition-colors hover:text-amber-500 cursor-pointer"
              style={{ color: "var(--muted)" }}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* WhatsApp CTA Button */}
            <a
              href={`https://wa.me/${intlPhone(appState.settings.whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full glass-btn-primary flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span className="hidden xs:inline">{t.nav.directWa}</span>
              <span className="xs:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="top" className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-start">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase font-['Cormorant_Garamond'] text-amber-600 dark:text-amber-300">
              <span>{t.hero.kicker}</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.25] text-balance font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {t.hero.titleStart}
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
              {t.hero.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#booking-section"
                className="px-7 py-3 rounded-full glass-btn-primary text-sm font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>{t.hero.bookBtn}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>

              <a
                href="#fleet"
                className="px-6 py-3 rounded-full glass-btn-ghost text-sm font-semibold"
                style={{ color: "var(--fg)" }}
              >
                {t.hero.fleetBtn}
              </a>

              <a
                href="#routes"
                className="px-5 py-3 rounded-full glass-btn-ghost text-sm font-medium text-amber-600 dark:text-amber-300 flex items-center gap-2"
              >
                <Plane className="w-4 h-4" />
                <span>{t.hero.airportsBtn}</span>
              </a>
            </div>

            {/* Trust highlights with English digits */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)] text-xs sm:text-sm" style={{ color: "var(--muted)" }}>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.hero.trust1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.hero.trust2}</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.hero.trust3}</span>
              </div>
            </div>
          </div>

          {/* Hero Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card-gold p-2 shadow-2xl">
              <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden">
                <img
                  src={IMAGES.heroLuxury}
                  alt="Route X Mercedes Luxury Limousine"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Removed dark background overlay behind text per user request */}
                <div className="absolute bottom-4 right-5 left-5 text-start pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-amber-400 font-extrabold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                      {t.hero.presidentialBadge}
                    </span>
                    <span className="text-xs text-slate-100 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                      {t.hero.presidentialLocation}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,1)] drop-shadow-[0_1px_3px_rgba(0,0,0,1)] font-['Cairo']">
                    {t.hero.presidentialTitle}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CASHBACK PROMOTIONAL BANNER */}
      <section className="relative z-10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl glass-card-gold p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-start">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-500 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold font-['Cairo']"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {t.cashback.titleStart}
                  <span className="text-amber-500 font-mono">{t.cashback.titleHighlight}</span>
                  {t.cashback.titleEnd}
                </h3>
                <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                  {t.cashback.desc}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${intlPhone(
                appState.settings.whatsapp
              )}?text=${encodeURIComponent(t.cashback.inquiryMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full glass-btn-primary text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t.cashback.cta}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. POPULAR ROUTES & AIRPORT PRESETS */}
      <section id="routes" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-8">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              {t.routes.kicker}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {t.routes.title}
            </h2>
            <p className="text-sm max-w-2xl mt-1.5" style={{ color: "var(--muted)" }}>
              {t.routes.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
            {routeList.map((route, idx) => {
              const carImg =
                (route.imageKey && (IMAGES as any)[route.imageKey]) ||
                (idx === 0
                  ? IMAGES.cairoHighway
                  : idx === 1
                  ? IMAGES.cairoAirport
                  : idx === 2
                  ? IMAGES.sphinxAirport
                  : idx === 3
                  ? IMAGES.borgElArab
                  : idx % 2 === 0
                  ? IMAGES.heroLuxury
                  : IMAGES.interiorLuxury);

              return (
                <div
                  key={route.id}
                  onClick={() => handleApplyPreset(route)}
                  className="group relative rounded-3xl overflow-hidden glass-card-gold shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-amber-500/20 flex flex-col justify-between text-start border border-amber-500/30 hover:border-amber-400 min-h-[380px]"
                >
                  {/* Luxury Car Background Image Wrapper */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={carImg}
                      alt={route.name}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 filter brightness-[0.72] group-hover:brightness-[0.85]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/30" />
                    <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  {/* Top Badges (Distance + Fixed Price Badge in Gold) */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-lg font-mono flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-amber-400" />
                      <span>{toEnglishDigits(route.approxKm)} {t.routes.approxKm}</span>
                    </span>

                    <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-tight shadow-lg shadow-amber-500/30 flex items-center gap-1">
                      <span>{toEnglishDigits(money(route.price, lang).amount)}</span>
                      {money(route.price, lang).unit && (
                        <span className="text-[11px] font-bold">{money(route.price, lang).unit}</span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Content & Booking Callout */}
                  <div className="relative z-10 p-5 pt-8 mt-auto flex flex-col justify-end">
                    <div className="mb-2">
                      <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider block drop-shadow">
                        {t.routes.fromPrefix} {route.from}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-['Cairo'] mt-0.5">
                        {route.name}
                      </h3>
                      <p className="text-xs text-slate-200 line-clamp-2 mt-1 drop-shadow leading-relaxed">
                        {route.highlight}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                      <span className="flex items-center gap-1.5">
                        <span>{t.routes.calcNow}</span>
                        {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </span>
                      <span className="text-[11px] text-slate-300 font-normal">{FIXED_PRICE_LABEL[lang]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section id="services" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-8">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              {t.services.kicker}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {t.services.title}
            </h2>
            <p className="text-sm max-w-2xl mt-1.5" style={{ color: "var(--muted)" }}>
              {t.services.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.services.items.map((svc) => (
              <div
                key={svc.id}
                className="p-6 rounded-2xl glass-card flex flex-col justify-between text-start"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-4">
                    {svc.id === "s1" && <Plane className="w-6 h-6" />}
                    {svc.id === "s2" && <Compass className="w-6 h-6" />}
                    {svc.id === "s3" && <RouteIcon className="w-6 h-6" />}
                    {svc.id === "s4" && <Briefcase className="w-6 h-6" />}
                  </div>
                  <h3
                    className="text-lg font-bold font-['Cairo'] mb-2"
                    style={{ color: "var(--fg-heading)" }}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{svc.desc}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
                  <span>{t.services.uniformChauffeur}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FLEET & PRICING SECTION */}
      <section id="fleet" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-8">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              {t.fleet.kicker}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {t.fleet.title}
            </h2>
            <p className="text-sm max-w-2xl mt-1.5" style={{ color: "var(--muted)" }}>
              {t.fleet.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sortedCars.map((car) => {
              const isSelected = activeCar?.id === car.id;
              return (
                <div
                  key={car.id}
                  onClick={() => setSelectedCarCategory(car.id)}
                  className={`p-6 rounded-2xl glass-card cursor-pointer text-start transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10 shadow-xl shadow-amber-500/15 ring-2 ring-amber-500/40"
                      : "hover:border-amber-500/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "var(--badge-bg)", color: "var(--badge-text)" }}>
                        {car.category || "Limousine VIP"}
                      </span>
                      {isSelected && (
                        <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.fleet.selectedBadge}</span>
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-lg font-bold font-['Cairo'] mb-2"
                      style={{ color: "var(--fg-heading)" }}
                    >
                      {car.name}
                    </h3>

                    {/* Capacity Specs with English digits */}
                    <div className="flex flex-col gap-2 py-3 border-y border-[var(--border-color)] text-xs">
                      <div className="flex items-center justify-between">
                        <span style={{ color: "var(--muted)" }}>{t.fleet.paxCapacity}</span>
                        <span className="font-semibold flex items-center gap-1" style={{ color: "var(--fg-heading)" }}>
                          <Users className="w-3.5 h-3.5 text-amber-500" />
                          <span>{t.fleet.upTo}<strong className="font-mono">{toEnglishDigits(car.maxPax)}</strong>{t.fleet.passengers}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: "var(--muted)" }}>{t.fleet.bagCapacity}</span>
                        <span className="font-semibold flex items-center gap-1" style={{ color: "var(--fg-heading)" }}>
                          <Luggage className="w-3.5 h-3.5 text-amber-500" />
                          <span>
                            {car.bagLimit !== null
                              ? `${t.fleet.maxBags} ${toEnglishDigits(car.bagLimit)}`
                              : t.fleet.unlimitedBags}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Features list */}
                    {car.features && (
                      <ul className="mt-3 space-y-1.5 text-xs" style={{ color: "var(--muted)" }}>
                        {car.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6 pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs" style={{ color: "var(--muted)" }}>{t.fleet.pricePerKm}</span>
                      {car.pricePerKm !== null ? (
                        <div className="text-end">
                          <span className="text-2xl font-black text-amber-500 font-['Cairo'] font-mono tabular-nums">
                            {perKmText(car.pricePerKm)}
                          </span>
                          <span className="text-xs mx-1" style={{ color: "var(--muted)" }}>{perKmUnit}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                          {t.fleet.onBooking}
                        </span>
                      )}
                    </div>

                    <a
                      href="#booking-section"
                      className="mt-4 block w-full py-2.5 text-center text-xs font-bold rounded-xl glass-btn-primary"
                    >
                      {t.fleet.selectCarBtn}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. VIP AMENITIES & IN-CAR COMFORT */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl glass-card-gold">
            <div className="text-start mb-8">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
                {t.amenities.kicker}
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
                style={{ color: "var(--fg-heading)" }}
              >
                {t.amenities.title}
              </h2>
              <p className="text-sm max-w-2xl mt-1.5" style={{ color: "var(--muted)" }}>
                {t.amenities.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.amenities.items.map((am) => (
                <div
                  key={am.id}
                  className="p-5 rounded-2xl glass-card flex items-start gap-4 text-start"
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                    {am.id === "water" && <Sparkles className="w-5 h-5" />}
                    {am.id === "chargers" && <Zap className="w-5 h-5" />}
                    {am.id === "wifi" && <Wifi className="w-5 h-5" />}
                    {am.id === "quiet" && <VolumeX className="w-5 h-5" />}
                    {am.id === "meet" && <UserCheck className="w-5 h-5" />}
                    {am.id === "air" && <Wind className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3
                      className="text-sm font-bold font-['Cairo']"
                      style={{ color: "var(--fg-heading)" }}
                    >
                      {am.title}
                    </h3>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>{am.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. GALLERY SHOWCASE */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-8">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              {t.gallery.kicker}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {t.gallery.title}
            </h2>
            <p className="text-sm max-w-2xl mt-1.5" style={{ color: "var(--muted)" }}>
              {t.gallery.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden glass-card p-2">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                <img
                  src={IMAGES.interiorLuxury}
                  alt="Route X Luxury Limousine Interior"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-start">
                  <span className="text-xs text-amber-400 font-semibold">{t.gallery.interiorTag}</span>
                  <h4 className="text-base font-bold text-white">
                    {t.gallery.interiorTitle}
                  </h4>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden glass-card p-2">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                <img
                  src={IMAGES.heroLuxury}
                  alt="Route X Airport VIP Transfer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-start">
                  <span className="text-xs text-amber-400 font-semibold">{t.gallery.airportTag}</span>
                  <h4 className="text-base font-bold text-white">
                    {t.gallery.airportTitle}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8b. INTERACTIVE 3D LIMOUSINE STUDIO */}
      <section id="studio-3d" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-8">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              3D STUDIO
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {{
                ar: "استعرض الليموزين بزاوية 360°",
                en: "Explore the Limousine in 360°",
                zh: "360° 全方位欣赏豪华轿车",
                ru: "Рассмотрите лимузин на 360°"
              }[lang]}
            </h2>
            <p className="text-sm max-w-2xl mt-1.5" style={{ color: "var(--muted)" }}>
              {{
                ar: "اسحب للدوران، غيّر لون الطلاء، وبدّل زوايا الرؤية.",
                en: "Drag to rotate, change the paint colour and switch camera angles.",
                zh: "拖动旋转，更换车身颜色，切换不同视角。",
                ru: "Перетаскивайте для вращения, меняйте цвет кузова и ракурс."
              }[lang]}
            </p>
          </div>
          <MountWhenVisible minHeight={520}>
            <Limousine3DShowcase lang={lang} />
          </MountWhenVisible>
        </div>
      </section>

      {/* 9. INTERACTIVE BOOKING FORM */}
      <section
        id="booking-section"
        className="relative z-10 py-12 sm:py-20 px-4 sm:px-8 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl glass-panel p-6 sm:p-10 shadow-2xl">
            {/* Form Header */}
            <div className="text-start mb-8 pb-6 border-b border-[var(--border-color)]">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.booking.badge}</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold font-['Cairo']"
                style={{ color: "var(--fg-heading)" }}
              >
                {t.booking.title}
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                {t.booking.desc}
              </p>
            </div>

            {/* Trip Type Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold mb-2 text-start" style={{ color: "var(--fg-heading)" }}>
                {t.booking.tripTypeLabel}
              </label>
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl glass-input">
                <button
                  type="button"
                  onClick={() => setTripType("oneway")}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                    tripType === "oneway"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "hover:text-amber-500"
                  }`}
                  style={{
                    color: tripType === "oneway" ? "#080a0f" : "var(--fg)"
                  }}
                >
                  {t.booking.tripTypes.oneway}
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("roundtrip")}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                    tripType === "roundtrip"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "hover:text-amber-500"
                  }`}
                  style={{
                    color: tripType === "roundtrip" ? "#080a0f" : "var(--fg)"
                  }}
                >
                  {t.booking.tripTypes.roundtrip}
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("hourly")}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                    tripType === "hourly"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "hover:text-amber-500"
                  }`}
                  style={{
                    color: tripType === "hourly" ? "#080a0f" : "var(--fg)"
                  }}
                >
                  {t.booking.tripTypes.hourly}
                </button>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 text-start">
              {/* Section 1: Client Info */}
              <div>
                <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{t.booking.clientInfoTitle}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                      {t.booking.nameLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.booking.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start"
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                      {t.booking.phoneLabel} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(toEnglishDigits(e.target.value))}
                      placeholder="01xxxxxxxxx"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                      {t.booking.phoneAltLabel} <span className="text-slate-500">{t.booking.optional}</span>
                    </label>
                    <input
                      type="tel"
                      value={phone2}
                      onChange={(e) => setPhone2(toEnglishDigits(e.target.value))}
                      placeholder="01xxxxxxxxx"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Route & Map Coordinates */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t.booking.routeTitle}</span>
                  </h3>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {t.booking.routeNotice}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* From */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs" style={{ color: "var(--muted)" }}>
                        {t.booking.fromLabel} <span className="text-rose-500">*</span>
                      </label>
                      <a
                        href={
                          parsedFrom.url ||
                          parsedFrom.link ||
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            fromLoc || "Alexandria"
                          )}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{t.booking.openMap}</span>
                      </a>
                    </div>
                    <input
                      type="text"
                      value={fromLoc}
                      onChange={(e) => setFromLoc(e.target.value)}
                      placeholder={t.booking.fromPlaceholder}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start"
                    />
                    {parsedFrom.kind === "pin" && (
                      <p className="text-[11px] text-emerald-500 mt-1">
                        {t.booking.coordsDetected}
                      </p>
                    )}
                  </div>

                  {/* Via (Waypoint) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs" style={{ color: "var(--muted)" }}>
                        {t.booking.viaLabel}
                      </label>
                      <span className="text-xs text-slate-500">{t.booking.optional}</span>
                    </div>
                    <input
                      type="text"
                      value={viaLoc}
                      onChange={(e) => setViaLoc(e.target.value)}
                      placeholder={t.booking.viaPlaceholder}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start"
                    />
                  </div>

                  {/* To */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs" style={{ color: "var(--muted)" }}>
                        {t.booking.toLabel} <span className="text-rose-500">*</span>
                      </label>
                      <a
                        href={
                          parsedTo.url ||
                          parsedTo.link ||
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            toLoc || "Borg El Arab Airport"
                          )}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{t.booking.openMap}</span>
                      </a>
                    </div>
                    <input
                      type="text"
                      value={toLoc}
                      onChange={(e) => setToLoc(e.target.value)}
                      placeholder={t.booking.toPlaceholder}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start"
                    />
                  </div>

                  {/* Distance in KM with strictly English digits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                        {t.booking.distanceLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={distanceKm}
                          onChange={(e) => setDistanceKm(toEnglishDigits(e.target.value))}
                          placeholder="50"
                          dir="ltr"
                          className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start pl-14 font-semibold font-mono"
                        />
                        <span className="absolute left-4 top-3.5 text-xs text-slate-400 font-mono">
                          {t.booking.kmUnit}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-end">
                      {googleDirectionsUrl ? (
                        <a
                          href={googleDirectionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-4 rounded-xl glass-btn-ghost text-xs font-semibold text-center flex items-center justify-center gap-2 text-amber-600 dark:text-amber-300"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>{t.booking.openDirectionsBtn}</span>
                        </a>
                      ) : (
                        <div
                          className="w-full py-3 px-4 rounded-xl border text-xs text-center flex items-center justify-center gap-2"
                          style={{
                            background: "var(--badge-bg)",
                            borderColor: "var(--border-subtle)",
                            color: "var(--muted)"
                          }}
                        >
                          <Navigation className="w-4 h-4" />
                          <span>{t.booking.enterLocationsNotice}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Passengers, Bags & Automatic Car Selection */}
              <div>
                <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                  <Luggage className="w-4 h-4" />
                  <span>{t.booking.paxLuggageTitle}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                      {t.booking.paxLabel}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="25"
                      value={paxCount}
                      onChange={(e) => setPaxCount(toEnglishDigits(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start font-semibold font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                      {t.booking.bagsLabel}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={bagsCount}
                      onChange={(e) => setBagsCount(toEnglishDigits(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start font-semibold font-mono"
                    />
                  </div>
                </div>

                {/* Car Recommendation & Live Fare Calculator Card */}
                {activeCar && (
                  <div className="mt-4 p-5 rounded-2xl glass-card-gold text-start">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-amber-600 dark:text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-500/15">
                            {t.booking.allocatedCarLabel}
                          </span>
                          <span className="text-xs" style={{ color: "var(--muted)" }}>
                            ({t.booking.capacityUpTo} <strong className="font-mono">{toEnglishDigits(activeCar.maxPax)}</strong>)
                          </span>
                        </div>
                        <h4
                          className="text-lg font-bold mt-1 font-['Cairo']"
                          style={{ color: "var(--fg-heading)" }}
                        >
                          {activeCar.name}
                        </h4>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                          {activeCar.pricePerKm !== null
                            ? `${t.booking.baseKmPrice} ${perKmText(activeCar.pricePerKm)} ${perKmUnit}`
                            : t.booking.customKmPrice}
                        </p>
                      </div>

                      {/* Fare display with strictly English numerals */}
                      <div
                        className="text-start sm:text-end w-full sm:w-auto p-3.5 rounded-xl border border-[var(--border-color)]"
                        style={{ background: "var(--inner-box-bg)" }}
                      >
                        <span className="text-[11px] block" style={{ color: "var(--muted)" }}>
                          {t.booking.estimatedCostLabel}
                        </span>
                        {estimatedFare !== null ? (
                          <>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-2xl font-black text-amber-500 tabular-nums font-mono">
                                {toEnglishDigits(lang === "ar" ? String(estimatedFare) : money(estimatedFare, lang).amount)}
                              </span>
                              <span className="text-xs" style={{ color: "var(--muted)" }}>
                                {lang === "ar" ? t.booking.currency : "USD"}
                              </span>
                            </div>
                            {lang !== "ar" && (
                              <span className="text-[10px] block mt-1" style={{ color: "var(--muted)" }}>
                                {billedInEgpNote(estimatedFare, lang)}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs font-medium mt-1 block" style={{ color: "var(--muted)" }}>
                            {t.booking.enterKmNotice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Warning if any */}
                    {carWarning && (
                      <div className="mt-3.5 p-3 rounded-xl bg-amber-500/15 border border-amber-500/35 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{carWarning}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Section 4: Date, Time & Flight Details */}
              <div>
                <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{t.booking.scheduleTitle}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                      {t.booking.dateLabel} <span className="text-amber-500 font-semibold font-mono">{toEnglishDigits(formattedDate)}</span>
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                      {t.booking.timeLabel} <span className="text-amber-500 font-semibold font-mono">{toEnglishDigits(formattedTime)}</span>
                    </label>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start font-mono"
                    />
                  </div>
                </div>

                {/* Flight Number & VIP Meet & Greet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                      {t.booking.flightNumberLabel}
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(toEnglishDigits(e.target.value))}
                      placeholder={t.booking.flightNumberPlaceholder}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start uppercase font-mono"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {t.booking.flightNumberHint}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center">
                    <label className="flex items-center gap-3 p-3.5 rounded-xl glass-input cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={needMeetAndGreet}
                        onChange={(e) => setNeedMeetAndGreet(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                      />
                      <div className="text-start">
                        <span
                          className="text-xs sm:text-sm font-semibold block"
                          style={{ color: "var(--fg-heading)" }}
                        >
                          {t.booking.meetGreetTitle}
                        </span>
                        <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                          {t.booking.meetGreetDesc}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 5: VIP In-Car Amenities Selection */}
              <div>
                <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.booking.amenitiesTitle}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {t.amenities.items.map((am) => {
                    const isChecked = selectedAmenities.includes(am.id);
                    return (
                      <button
                        type="button"
                        key={am.id}
                        onClick={() => {
                          setSelectedAmenities((prev) =>
                            prev.includes(am.id)
                              ? prev.filter((id) => id !== am.id)
                              : [...prev, am.id]
                          );
                        }}
                        className={`p-3 rounded-xl border text-start transition-all flex items-center gap-2.5 text-xs cursor-pointer ${
                          isChecked
                            ? "bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300 font-bold"
                            : "glass-input text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            isChecked ? "text-amber-500" : "text-slate-400"
                          }`}
                        />
                        <span className="font-medium line-clamp-1">{am.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Validation error message */}
              {formValidationMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formValidationMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={whatsAppUrl}
                  onClick={handleValidateForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-4 px-8 rounded-full glass-btn-primary text-base font-bold flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20 text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{t.booking.sendWaBtn}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      decodeURIComponent(whatsAppUrl.split("text=")[1] || "")
                    );
                    setCopiedKey("booking_summary");
                    setTimeout(() => setCopiedKey(null), 2000);
                  }}
                  className="w-full sm:w-auto py-4 px-6 rounded-full glass-btn-ghost text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedKey === "booking_summary" ? t.booking.copiedNotice : t.booking.copySummaryBtn}</span>
                </button>
              </div>

              <p className="text-[11px] text-center mt-2" style={{ color: "var(--muted)" }}>
                {t.booking.waNotice}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 10. CLIENT REVIEWS & TRUST */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-8">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              {t.reviews.kicker}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {t.reviews.title}
            </h2>
            <p className="text-sm max-w-2xl mt-1.5" style={{ color: "var(--muted)" }}>
              {t.reviews.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.reviews.items.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card flex flex-col justify-between text-start"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed italic" style={{ color: "var(--fg)" }}>
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                  <h4
                    className="text-sm font-bold"
                    style={{ color: "var(--fg-heading)" }}
                  >
                    {rev.name}
                  </h4>
                  <span className="text-xs block" style={{ color: "var(--muted)" }}>{rev.role}</span>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block mt-1">{rev.trip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-start mb-8">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              {t.faq.kicker}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {t.faq.title}
            </h2>
          </div>

          <div className="space-y-3 text-start">
            {t.faq.items.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-card overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base hover:text-amber-500 transition-colors cursor-pointer"
                    style={{ color: "var(--fg-heading)" }}
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t border-[var(--border-subtle)]" style={{ color: "var(--muted)" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. CONTACT CARDS & DIRECT HOTLINES */}
      <section id="contact" className="relative z-10 py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-10">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
              {t.contact.kicker}
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold mt-1 font-['Cairo']"
              style={{ color: "var(--fg-heading)" }}
            >
              {t.contact.title}
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              {t.contact.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Primary WhatsApp with English numerals */}
            <div className="p-6 rounded-2xl glass-card-gold flex flex-col justify-between text-start">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono">
                    {t.contact.mainWaBadge}
                  </span>
                  <MessageCircle className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-xs block" style={{ color: "var(--muted)" }}>{t.contact.mainWaTitle}</span>
                <span
                  dir="ltr"
                  className="text-xl font-bold mt-1 block font-mono tracking-wider"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {toEnglishDigits(appState.settings.whatsapp)}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center gap-2">
                <a
                  href={`https://wa.me/${intlPhone(appState.settings.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-bold rounded-xl glass-btn-primary"
                >
                  {t.contact.openWa}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyText(toEnglishDigits(appState.settings.whatsapp), "wa_main")}
                  className="p-2 rounded-xl glass-btn-ghost cursor-pointer"
                  title={t.contact.copyNumber}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Secondary Phone 1 */}
            <div className="p-6 rounded-2xl glass-card flex flex-col justify-between text-start">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{t.contact.secWa1Title}</span>
                  <Phone className="w-5 h-5 text-amber-500/80" />
                </div>
                <span className="text-xs block" style={{ color: "var(--muted)" }}>{t.contact.secWa1Title}</span>
                <span
                  dir="ltr"
                  className="text-xl font-bold mt-1 block font-mono tracking-wider"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {toEnglishDigits(appState.settings.phone1)}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center gap-2">
                <a
                  href={`https://wa.me/${intlPhone(appState.settings.phone1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-bold rounded-xl glass-btn-ghost"
                >
                  {t.contact.openWa}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyText(toEnglishDigits(appState.settings.phone1), "wa_sec1")}
                  className="p-2 rounded-xl glass-btn-ghost cursor-pointer"
                  title={t.contact.copyNumber}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Secondary Phone 2 */}
            <div className="p-6 rounded-2xl glass-card flex flex-col justify-between text-start">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{t.contact.secWa2Title}</span>
                  <Phone className="w-5 h-5 text-amber-500/80" />
                </div>
                <span className="text-xs block" style={{ color: "var(--muted)" }}>{t.contact.secWa2Title}</span>
                <span
                  dir="ltr"
                  className="text-xl font-bold mt-1 block font-mono tracking-wider"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {toEnglishDigits(appState.settings.phone2)}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center gap-2">
                <a
                  href={`https://wa.me/${intlPhone(appState.settings.phone2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-bold rounded-xl glass-btn-ghost"
                >
                  {t.contact.openWa}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyText(toEnglishDigits(appState.settings.phone2), "wa_sec2")}
                  className="p-2 rounded-xl glass-btn-ghost cursor-pointer"
                  title={t.contact.copyNumber}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl glass-card flex flex-col justify-between text-start">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{t.contact.emailTitle}</span>
                  <Mail className="w-5 h-5 text-amber-500/80" />
                </div>
                <span className="text-xs block" style={{ color: "var(--muted)" }}>{t.contact.emailSub}</span>
                <span
                  dir="ltr"
                  className="text-base font-bold mt-1 block break-all font-mono"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {appState.settings.email}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center gap-2">
                <a
                  href={`mailto:${appState.settings.email}`}
                  className="flex-1 py-2 text-center text-xs font-bold rounded-xl glass-btn-ghost"
                >
                  {t.contact.sendEmail}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyText(appState.settings.email, "email")}
                  className="p-2 rounded-xl glass-btn-ghost cursor-pointer"
                  title={t.contact.copyNumber}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Facebook */}
            <div className="p-6 rounded-2xl glass-card flex flex-col justify-between text-start">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{t.contact.fbTitle}</span>
                  <Facebook className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-xs block" style={{ color: "var(--muted)" }}>{t.contact.fbTitle}</span>
                <span
                  className="text-base font-bold mt-1 block"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {appState.settings.facebookName}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-color)]">
                <a
                  href={appState.settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center text-xs font-bold rounded-xl glass-btn-ghost"
                >
                  {t.contact.visitPage}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 rounded-2xl glass-card flex flex-col justify-between text-start">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{t.contact.addressTitle}</span>
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-xs block" style={{ color: "var(--muted)" }}>{t.contact.addressTitle}</span>
                <span
                  className="text-base font-bold mt-1 block"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {localizeAddress(appState.settings.address, lang)}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-color)]">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Alexandria+Egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center text-xs font-bold rounded-xl glass-btn-ghost"
                >
                  {t.contact.viewMap}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="relative z-10 border-t border-[var(--border-color)] glass-panel py-8 px-4 sm:px-8 text-center sm:text-start">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--muted)" }}>
          <div className="flex items-center gap-3">
            <span className="font-semibold" style={{ color: "var(--fg-heading)" }}>{t.footer.brand}</span>
            <span>·</span>
            <span>{t.footer.rights}</span>
            <span>·</span>
            <span>{t.footer.address}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-amber-500 transition-colors">
              {t.nav.services}
            </a>
            <a href="#fleet" className="hover:text-amber-500 transition-colors">
              {t.nav.fleet}
            </a>
            <a href="#booking-section" className="hover:text-amber-500 transition-colors">
              {t.nav.book}
            </a>
            <button
              onClick={openAdminModal}
              className="hover:text-amber-500 underline underline-offset-4 cursor-pointer"
            >
              {t.footer.adminLink}
            </button>
          </div>
        </div>
      </footer>

      {/* 14. ADMIN MANAGEMENT MODAL */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 text-start relative shadow-2xl">
            <button
              onClick={() => {
                setShowAdminModal(false);
                setIsAdminLoggedIn(false);
              }}
              className="absolute left-6 top-6 p-2 rounded-full glass-btn-ghost cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAdminLoggedIn ? (
              // Login / Setup Form
              <div>
                <h3
                  className="text-xl font-bold font-['Cairo'] mb-2"
                  style={{ color: "var(--fg-heading)" }}
                >
                  {appState.admin ? t.admin.loginTitle : t.admin.setupTitle}
                </h3>
                <p className="text-xs mb-6" style={{ color: "var(--muted)" }}>
                  {appState.admin ? t.admin.loginDesc : t.admin.setupDesc}
                </p>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs mb-1" style={{ color: "var(--muted)" }}>{t.admin.phoneLabel}</label>
                    <input
                      type="tel"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(toEnglishDigits(e.target.value))}
                      placeholder="01xxxxxxxxx"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1" style={{ color: "var(--muted)" }}>{t.admin.pwLabel}</label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm text-start font-mono"
                    />
                  </div>

                  {adminError && <p className="text-xs text-rose-500">{adminError}</p>}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl glass-btn-primary font-bold text-sm mt-4 cursor-pointer"
                  >
                    {appState.admin ? t.admin.loginBtn : t.admin.setupBtn}
                  </button>
                </form>
              </div>
            ) : (
              // Dashboard Edit Form
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                  <button
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="text-xs text-rose-500 hover:underline cursor-pointer"
                  >
                    {t.admin.logout}
                  </button>
                  <h3
                    className="text-xl font-bold font-['Cairo']"
                    style={{ color: "var(--fg-heading)" }}
                  >
                    {t.admin.dashTitle}
                  </h3>
                </div>

                {/* WhatsApp Setting */}
                <div>
                  <label className="block text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                    {t.admin.waSettingLabel}
                  </label>
                  <input
                    type="tel"
                    value={adminEditDraft.settings.whatsapp}
                    onChange={(e) =>
                      setAdminEditDraft({
                        ...adminEditDraft,
                        settings: { ...adminEditDraft.settings, whatsapp: toEnglishDigits(e.target.value) }
                      })
                    }
                    dir="ltr"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-start font-mono"
                  />
                </div>

                {/* Cars & Prices */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        const newCar: CarType = {
                          id: `c_${Date.now()}`,
                          name: "New Class",
                          maxPax: 4,
                          pricePerKm: 8,
                          bagLimit: 4
                        };
                        setAdminEditDraft({
                          ...adminEditDraft,
                          cars: [...adminEditDraft.cars, newCar]
                        });
                      }}
                      className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.admin.addCar}</span>
                    </button>
                    <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400">{t.admin.carsSectionTitle}</h4>
                  </div>

                  <div className="space-y-3">
                    {adminEditDraft.cars.map((car, idx) => (
                      <div
                        key={car.id}
                        className="p-3.5 rounded-xl glass-card grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                      >
                        <div className="sm:col-span-4">
                          <label className="text-[10px] block mb-1" style={{ color: "var(--muted)" }}>{t.admin.colName}</label>
                          <input
                            type="text"
                            value={car.name}
                            onChange={(e) => {
                              const updated = [...adminEditDraft.cars];
                              updated[idx].name = e.target.value;
                              setAdminEditDraft({ ...adminEditDraft, cars: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] block mb-1" style={{ color: "var(--muted)" }}>{t.admin.colMaxPax}</label>
                          <input
                            type="number"
                            value={car.maxPax}
                            onChange={(e) => {
                              const updated = [...adminEditDraft.cars];
                              updated[idx].maxPax = parseInt(toEnglishDigits(e.target.value)) || 1;
                              setAdminEditDraft({ ...adminEditDraft, cars: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs text-center font-mono"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="text-[10px] block mb-1" style={{ color: "var(--muted)" }}>{t.admin.colPrice}</label>
                          <input
                            type="number"
                            step="0.5"
                            value={car.pricePerKm ?? ""}
                            onChange={(e) => {
                              const updated = [...adminEditDraft.cars];
                              updated[idx].pricePerKm =
                                e.target.value === "" ? null : parseFloat(toEnglishDigits(e.target.value));
                              setAdminEditDraft({ ...adminEditDraft, cars: updated });
                            }}
                            placeholder="On Request"
                            className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs text-center font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] block mb-1" style={{ color: "var(--muted)" }}>{t.admin.colBags}</label>
                          <input
                            type="number"
                            value={car.bagLimit ?? ""}
                            onChange={(e) => {
                              const updated = [...adminEditDraft.cars];
                              updated[idx].bagLimit =
                                e.target.value === "" ? null : parseInt(toEnglishDigits(e.target.value));
                              setAdminEditDraft({ ...adminEditDraft, cars: updated });
                            }}
                            placeholder="Unlimited"
                            className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs text-center font-mono"
                          />
                        </div>

                        <div className="sm:col-span-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = adminEditDraft.cars.filter((_, i) => i !== idx);
                              setAdminEditDraft({ ...adminEditDraft, cars: updated });
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-600 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Routes & Fixed Prices Setting */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        const newRoute: RoutePreset = {
                          id: `r_${Date.now()}`,
                          name: "مسار جديد",
                          category: "city",
                          from: "الإسكندرية",
                          to: "وجهة جديدة",
                          approxKm: 100,
                          price: 1000,
                          highlight: "خدمة ليموزين VIP مباشرة"
                        };
                        setAdminEditDraft({
                          ...adminEditDraft,
                          routes: [...(adminEditDraft.routes || POPULAR_ROUTES), newRoute]
                        });
                      }}
                      className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === "ar" ? "إضافة مسار جديد" : "Add New Route"}</span>
                    </button>
                    <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400">
                      {lang === "ar" ? "أسعار وتعديل المسارات الأكثر طلباً (ج.م)" : "Fixed Route Prices (EGP)"}
                    </h4>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {(adminEditDraft.routes || POPULAR_ROUTES).map((route, rIdx) => (
                      <div
                        key={route.id}
                        className="p-3.5 rounded-xl glass-card grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                      >
                        <div className="sm:col-span-5">
                          <label className="text-[10px] block mb-1" style={{ color: "var(--muted)" }}>
                            {lang === "ar" ? "اسم المسار / الوجهة" : "Route Name"}
                          </label>
                          <input
                            type="text"
                            value={route.name}
                            onChange={(e) => {
                              const updated = [...(adminEditDraft.routes || POPULAR_ROUTES)];
                              updated[rIdx] = { ...updated[rIdx], name: e.target.value };
                              setAdminEditDraft({ ...adminEditDraft, routes: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="text-[10px] block mb-1 font-bold text-amber-500">
                            {lang === "ar" ? "السعر الثابت (ج.م)" : "Price (EGP)"}
                          </label>
                          <input
                            type="number"
                            value={route.price}
                            onChange={(e) => {
                              const updated = [...(adminEditDraft.routes || POPULAR_ROUTES)];
                              updated[rIdx] = {
                                ...updated[rIdx],
                                price: parseFloat(toEnglishDigits(e.target.value)) || 0
                              };
                              setAdminEditDraft({ ...adminEditDraft, routes: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs text-center font-mono font-bold text-amber-400"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="text-[10px] block mb-1" style={{ color: "var(--muted)" }}>
                            {lang === "ar" ? "المسافة (كم)" : "Approx Distance (km)"}
                          </label>
                          <input
                            type="number"
                            value={route.approxKm}
                            onChange={(e) => {
                              const updated = [...(adminEditDraft.routes || POPULAR_ROUTES)];
                              updated[rIdx] = {
                                ...updated[rIdx],
                                approxKm: parseInt(toEnglishDigits(e.target.value)) || 1
                              };
                              setAdminEditDraft({ ...adminEditDraft, routes: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs text-center font-mono"
                          />
                        </div>

                        <div className="sm:col-span-1 flex justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (adminEditDraft.routes || POPULAR_ROUTES).filter((_, i) => i !== rIdx);
                              setAdminEditDraft({ ...adminEditDraft, routes: updated });
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-600 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setAdminEditDraft(JSON.parse(JSON.stringify(appState)))}
                    className="px-4 py-2 rounded-xl glass-btn-ghost text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.admin.resetBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAdminEdits}
                    className="px-6 py-2.5 rounded-xl glass-btn-primary text-xs font-bold cursor-pointer"
                  >
                    {t.admin.saveBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
