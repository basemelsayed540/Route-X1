// Localized content for the data that lives in limousineData.ts (routes and fleet),
// plus EGP -> USD price conversion for the non-Arabic languages.
//
// Arabic stays the source of truth in limousineData.ts. For every other language the text is
// looked up here by item id. If the admin edited an item's text in the admin panel, that edit is
// kept as-is (we only replace text that still equals the original default).

import type { Language } from "./translations";
import { POPULAR_ROUTES, initialAppState } from "./limousineData";
import type { Car, RoutePreset } from "./limousineData";

/**
 * Exchange rate used to show prices in US dollars on the English / Chinese / Russian pages.
 * 1 USD = EGP_PER_USD Egyptian pounds. Update this single number when the rate moves.
 * (Last set from the mid-market rate of about 53.97 EGP per USD, rounded.)
 */
export const EGP_PER_USD = 54;

type Foreign = Exclude<Language, "ar">;

interface RouteText {
  name: string;
  from: string;
  to: string;
  highlight: string;
}

interface CarText {
  name: string;
  category: string;
  features: string[];
}

const ROUTE_TEXT: Record<Foreign, Record<string, RouteText>> = {
  en: {
    "alex-cairo": {
      name: "Alexandria ↔ Cairo",
      from: "Alexandria",
      to: "Cairo (Downtown / Giza)",
      highlight: "Fast, direct trip between the Bride of the Mediterranean and Egypt's capital"
    },
    cai: {
      name: "Alexandria ↔ Cairo International Airport",
      from: "Alexandria",
      to: "Cairo International Airport (CAI) – Terminal 1/2/3",
      highlight: "Direct transfer with meet & greet inside the airport terminals"
    },
    spx: {
      name: "Alexandria ↔ Sphinx International Airport",
      from: "Alexandria",
      to: "Sphinx International Airport (Desert Road gate / Zayed & 6th of October)",
      highlight: "Closest to the western side, the Giza Pyramids and Sheikh Zayed"
    },
    hbe: {
      name: "Alexandria ↔ Borg El Arab International Airport",
      from: "Alexandria (Smouha / Downtown)",
      to: "Borg El Arab International Airport (HBE)",
      highlight: "Arrivals-hall pickup and fast drop-off with no waiting"
    },
    dbb: {
      name: "Alexandria ↔ El Alamein International Airport",
      from: "Alexandria",
      to: "El Alamein International Airport (DBB)",
      highlight: "The preferred airport for North Coast trips and New Alamein"
    },
    marassi: {
      name: "Alexandria ↔ North Coast",
      from: "Alexandria",
      to: "North Coast (Marassi / Marina / Hacienda)",
      highlight: "Refined summer transfers without the stress of driving"
    },
    "cairo-east": {
      name: "Alexandria ↔ New Cairo & Fifth Settlement",
      from: "Alexandria",
      to: "New Cairo / Fifth Settlement",
      highlight: "Transfers for companies and upscale residential areas in the Fifth Settlement"
    }
  },
  zh: {
    "alex-cairo": {
      name: "亚历山大 ↔ 开罗",
      from: "亚历山大",
      to: "开罗（市中心 / 吉萨）",
      highlight: "往返地中海新娘与埃及首都之间的快速直达行程"
    },
    cai: {
      name: "亚历山大 ↔ 开罗国际机场",
      from: "亚历山大",
      to: "开罗国际机场 (CAI) – 1/2/3 号航站楼",
      highlight: "直达接送，航站楼内提供迎送服务"
    },
    spx: {
      name: "亚历山大 ↔ 狮身人面像国际机场",
      from: "亚历山大",
      to: "狮身人面像国际机场（沙漠公路入口 / 扎耶德城与十月六日城）",
      highlight: "最靠近西部地区、吉萨金字塔和谢赫扎耶德"
    },
    hbe: {
      name: "亚历山大 ↔ 博格阿拉伯国际机场",
      from: "亚历山大（斯穆哈 / 市中心）",
      to: "博格阿拉伯国际机场 (HBE)",
      highlight: "抵达大厅接机，快速送达，无需等待"
    },
    dbb: {
      name: "亚历山大 ↔ 阿拉曼国际机场",
      from: "亚历山大",
      to: "阿拉曼国际机场 (DBB)",
      highlight: "北部海岸与新阿拉曼行程的首选机场"
    },
    marassi: {
      name: "亚历山大 ↔ 北部海岸",
      from: "亚历山大",
      to: "北部海岸（马拉西 / 玛丽娜 / 哈西恩达）",
      highlight: "尊享度假出行，无需自己驾驶的辛劳"
    },
    "cairo-east": {
      name: "亚历山大 ↔ 新开罗与第五居住区",
      from: "亚历山大",
      to: "新开罗 / 第五居住区",
      highlight: "接送企业客户及第五居住区高端住宅区"
    }
  },
  ru: {
    "alex-cairo": {
      name: "Александрия ↔ Каир",
      from: "Александрия",
      to: "Каир (центр / Гиза)",
      highlight: "Быстрая прямая поездка между жемчужиной Средиземноморья и столицей Египта"
    },
    cai: {
      name: "Александрия ↔ Международный аэропорт Каира",
      from: "Александрия",
      to: "Международный аэропорт Каира (CAI) – терминалы 1/2/3",
      highlight: "Прямой трансфер со встречей и проводами в терминалах аэропорта"
    },
    spx: {
      name: "Александрия ↔ Международный аэропорт Сфинкс",
      from: "Александрия",
      to: "Международный аэропорт Сфинкс (выезд на Пустынное шоссе / Шейх-Зайед и 6 Октября)",
      highlight: "Ближе всего к западной части города, пирамидам Гизы и Шейх-Зайеду"
    },
    hbe: {
      name: "Александрия ↔ Международный аэропорт Борг-эль-Араб",
      from: "Александрия (Смуха / центр)",
      to: "Международный аэропорт Борг-эль-Араб (HBE)",
      highlight: "Встреча в зале прилёта и быстрая доставка без ожидания"
    },
    dbb: {
      name: "Александрия ↔ Международный аэропорт Эль-Аламейн",
      from: "Александрия",
      to: "Международный аэропорт Эль-Аламейн (DBB)",
      highlight: "Любимый аэропорт для поездок на Северное побережье и в Новый Аламейн"
    },
    marassi: {
      name: "Александрия ↔ Северное побережье",
      from: "Александрия",
      to: "Северное побережье (Мараси / Марина / Асьенда)",
      highlight: "Комфортные летние поездки без усталости за рулём"
    },
    "cairo-east": {
      name: "Александрия ↔ Новый Каир и Пятый квартал",
      from: "Александрия",
      to: "Новый Каир / Пятый квартал",
      highlight: "Трансферы для компаний и престижных жилых районов Пятого квартала"
    }
  }
};

const CAR_TEXT: Record<Foreign, Record<string, CarText>> = {
  en: {
    c1: {
      name: "Luxury Sedan",
      category: "Executive Class",
      features: [
        "Dual-zone luxury A/C",
        "Comfortable, soundproof seats",
        "Phone chargers for all devices",
        "Water & VIP hospitality"
      ]
    },
    c2: {
      name: "Mini Van",
      category: "Family & Business Class",
      features: [
        "Comfortable for up to 6 passengers",
        "Generous legroom",
        "Separate rear A/C",
        "Free Wi-Fi"
      ]
    },
    c3: {
      name: "Large Family Van",
      category: "Travel & Group Class",
      features: [
        "Unlimited luggage space",
        "Airline-style seats for long trips",
        "Multiple chargers",
        "Entertainment screen"
      ]
    },
    c4: {
      name: "VIP HiAce (Toyota HiAce)",
      category: "Delegations & Major Trips Class",
      features: [
        "Up to 14 passengers in full comfort",
        "Huge space for large luggage",
        "Full central A/C",
        "Custom price by agreement"
      ]
    }
  },
  zh: {
    c1: {
      name: "豪华轿车",
      category: "行政级",
      features: ["双区豪华空调", "舒适隔音座椅", "适用所有设备的手机充电器", "瓶装水及贵宾招待"]
    },
    c2: {
      name: "迷你厢型车",
      category: "家庭与商务级",
      features: ["舒适容纳最多 6 位乘客", "宽敞的腿部空间", "独立后排空调", "免费无线网络"]
    },
    c3: {
      name: "大型家庭厢型车",
      category: "旅行与团体级",
      features: ["行李空间不限", "适合长途的航空式座椅", "多个充电接口", "娱乐显示屏"]
    },
    c4: {
      name: "贵宾 HiAce（丰田 HiAce）",
      category: "代表团与大型行程级",
      features: ["最多 14 位乘客，全程舒适", "可容纳大件行李的超大空间", "全车中央空调", "价格另行协商"]
    }
  },
  ru: {
    c1: {
      name: "Люксовый седан",
      category: "Бизнес-класс",
      features: [
        "Двухзонный климат-контроль",
        "Удобные кресла с шумоизоляцией",
        "Зарядки для всех устройств",
        "Вода и VIP-гостеприимство"
      ]
    },
    c2: {
      name: "Минивэн",
      category: "Семейный и деловой класс",
      features: [
        "Комфортно до 6 пассажиров",
        "Просторно для ног",
        "Отдельный кондиционер сзади",
        "Бесплатный Wi-Fi"
      ]
    },
    c3: {
      name: "Большой семейный вэн",
      category: "Класс для путешествий и групп",
      features: [
        "Неограниченное место для багажа",
        "Кресла как в самолёте для дальних поездок",
        "Несколько зарядных устройств",
        "Развлекательный экран"
      ]
    },
    c4: {
      name: "VIP HiAce (Toyota HiAce)",
      category: "Класс для делегаций и крупных поездок",
      features: [
        "До 14 пассажиров с полным комфортом",
        "Огромное пространство для крупного багажа",
        "Центральный кондиционер",
        "Цена по договорённости"
      ]
    }
  }
};

const DEFAULT_ROUTES: Record<string, RoutePreset> = Object.fromEntries(
  POPULAR_ROUTES.map((r) => [r.id, r])
);
const DEFAULT_CARS: Record<string, Car> = Object.fromEntries(
  initialAppState.cars.map((c) => [c.id, c])
);

type RouteField = keyof RouteText;

/** Text of one route field in a language (Arabic = the stored text, kept if admin-edited). */
export function routeField(route: RoutePreset, field: RouteField, lang: Language): string {
  if (lang === "ar") return route[field];
  const original = DEFAULT_ROUTES[route.id];
  const translated = ROUTE_TEXT[lang]?.[route.id]?.[field];
  // Replace only text that is still the untouched Arabic default; keep admin edits.
  if (original && translated && route[field] === original[field]) return translated;
  return route[field];
}

export function localizeRoute(route: RoutePreset, lang: Language): RoutePreset {
  if (lang === "ar") return route;
  return {
    ...route,
    name: routeField(route, "name", lang),
    from: routeField(route, "from", lang),
    to: routeField(route, "to", lang),
    highlight: routeField(route, "highlight", lang)
  };
}

/** Every language's version of a route's from/to text (used to recognise a preset in the form). */
export function routeFieldVariants(route: RoutePreset, field: "from" | "to"): string[] {
  const langs: Language[] = ["ar", "en", "zh", "ru"];
  return langs.map((l) => routeField(route, field, l).trim().toLowerCase());
}

export function localizeCar(car: Car, lang: Language): Car {
  if (lang === "ar") return car;
  const original = DEFAULT_CARS[car.id];
  const tr = CAR_TEXT[lang]?.[car.id];
  if (!original || !tr) return car;
  const sameFeatures =
    JSON.stringify(car.features ?? []) === JSON.stringify(original.features ?? []);
  return {
    ...car,
    name: car.name === original.name ? tr.name : car.name,
    category: car.category === original.category ? tr.category : car.category,
    features: sameFeatures ? tr.features : car.features
  };
}

// ---------------------------------------------------------------------------
// Prices
// ---------------------------------------------------------------------------

export const FIXED_PRICE_LABEL: Record<Language, string> = {
  ar: "سعر محدد ثابت",
  en: "Fixed price",
  zh: "固定价格",
  ru: "Фиксированная цена"
};

export const PER_KM_UNIT_USD: Record<Foreign, string> = {
  en: "/ km",
  zh: "/ 公里",
  ru: "/ км"
};

const BILLED_IN_EGP: Record<Foreign, (egp: string) => string> = {
  en: (egp) => `Billed in EGP: ${egp} EGP (1 USD ≈ ${EGP_PER_USD} EGP)`,
  zh: (egp) => `以埃镑结算：${egp} EGP（1 美元 ≈ ${EGP_PER_USD} EGP）`,
  ru: (egp) => `Оплата в египетских фунтах: ${egp} EGP (1 USD ≈ ${EGP_PER_USD} EGP)`
};

export function billedInEgpNote(egp: number, lang: Language): string {
  if (lang === "ar") return "";
  return BILLED_IN_EGP[lang](String(Math.round(egp)));
}

export function egpToUsd(egp: number): number {
  return egp / EGP_PER_USD;
}

export interface MoneyParts {
  /** The number to show, already formatted (e.g. "1500" or "$32"). */
  amount: string;
  /** Currency label to show next to it ("ج.م" for Arabic, empty for dollars since the $ is in the amount). */
  unit: string;
}

/** Whole-unit price: Egyptian pounds in Arabic, whole US dollars everywhere else. */
export function money(egp: number, lang: Language): MoneyParts {
  if (lang === "ar") return { amount: String(Math.round(egp)), unit: "ج.م" };
  return { amount: `$${Math.max(1, Math.round(egpToUsd(egp)))}`, unit: "" };
}

/** Per-km rate: keeps decimals (6.5 EGP/km -> $0.12/km). */
export function moneyPerKm(egpPerKm: number, lang: Language): string {
  if (lang === "ar") return String(+egpPerKm.toFixed(2));
  return `$${egpToUsd(egpPerKm).toFixed(2)}`;
}

// ---------------------------------------------------------------------------
// Contact address (default text only; an admin-edited address is shown as typed)
// ---------------------------------------------------------------------------

const ADDRESS_TEXT: Record<Foreign, string> = {
  en: "Alexandria, Egypt 21613",
  zh: "埃及亚历山大 21613",
  ru: "Александрия, Египет, 21613"
};

export function localizeAddress(address: string, lang: Language): string {
  if (lang === "ar") return address;
  return address === initialAppState.settings.address ? ADDRESS_TEXT[lang] : address;
}
