// Route X Limousine Data & State

export interface Car {
  id: string;
  name: string;
  maxPax: number;
  pricePerKm: number | null;
  bagLimit: number | null;
  features?: string[];
  category?: string;
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  iconName?: string;
}

export interface AdminCredentials {
  phone: string;
  salt: string;
  hash: string;
}

// Popular Airport & Intercity Quick Presets
export interface RoutePreset {
  id: string;
  name: string;
  category: "airport" | "coastal" | "city";
  from: string;
  to: string;
  approxKm: number;
  highlight: string;
  price: number;
  imageKey?: "cairoHighway" | "cairoAirport" | "sphinxAirport" | "borgElArab" | "heroLuxury" | "interiorLuxury";
}

export interface AppState {
  v: number;
  settings: {
    whatsapp: string;
    phone1: string;
    phone2: string;
    email: string;
    facebook: string;
    facebookName: string;
    address: string;
  };
  admin: AdminCredentials | null;
  cars: Car[];
  services: Service[];
  routes: RoutePreset[];
}

export const POPULAR_ROUTES: RoutePreset[] = [
  {
    id: "alex-cairo",
    name: "من الإسكندرية إلى القاهرة أو العكس",
    category: "city",
    from: "الإسكندرية",
    to: "القاهرة (وسط البلد / الجيزة)",
    approxKm: 220,
    price: 1500,
    highlight: "سفر مباشر وسريع بين عروس البحر وعاصمة مصر",
    imageKey: "cairoHighway"
  },
  {
    id: "cai",
    name: "من الإسكندرية إلى مطار القاهرة الدولي أو العكس",
    category: "airport",
    from: "الإسكندرية",
    to: "مطار القاهرة الدولي (CAI) - صالة 1/2/3",
    approxKm: 220,
    price: 1600,
    highlight: "سفر مباشر مع استقبال وتوديع بصالات المطار",
    imageKey: "cairoAirport"
  },
  {
    id: "spx",
    name: "من الإسكندرية إلى مطار سفنكس الدولي أو العكس",
    category: "airport",
    from: "الإسكندرية",
    to: "مطار سفنكس الدولي (بوابة الصحراوي / زايد وأكتوبر)",
    approxKm: 195,
    price: 1500,
    highlight: "أقرب للمنطقة الغربية وأهرامات الجيزة والشيخ زايد",
    imageKey: "sphinxAirport"
  },
  {
    id: "hbe",
    name: "من الإسكندرية إلى مطار برج العرب الدولي أو العكس",
    category: "airport",
    from: "الإسكندرية (سموحة / وسط البلد)",
    to: "مطار برج العرب الدولي (HBE)",
    approxKm: 50,
    price: 700,
    highlight: "استقبال صالة الوصول والتوصيل السريع دون انتظار",
    imageKey: "borgElArab"
  },
  {
    id: "dbb",
    name: "من الإسكندرية إلى مطار العلمين الدولي أو العكس",
    category: "airport",
    from: "الإسكندرية",
    to: "مطار العلمين الدولي (DBB)",
    approxKm: 135,
    price: 1200,
    highlight: "المطار المفضل لرحلات الساحل الشمالي والعلمين الجديدة",
    imageKey: "heroLuxury"
  },
  {
    id: "marassi",
    name: "من الإسكندرية إلى الساحل الشمالي أو العكس",
    category: "coastal",
    from: "الإسكندرية",
    to: "الساحل الشمالي (مراسي / مارينا / هاسيندا)",
    approxKm: 140,
    price: 1100,
    highlight: "تنقل مصيفي راقٍ بدون إجهاد القيادة",
    imageKey: "interiorLuxury"
  },
  {
    id: "cairo-east",
    name: "من الإسكندرية إلى القاهرة الجديدة والتجمع الخامس أو العكس",
    category: "city",
    from: "الإسكندرية",
    to: "القاهرة الجديدة / التجمع الخامس",
    approxKm: 245,
    price: 1750,
    highlight: "توصيل للشركات والمناطق السكنية الراقية بالتجمع",
    imageKey: "cairoHighway"
  }
];

export const initialAppState: AppState = {
  v: 1,
  settings: {
    whatsapp: "01092358849",
    phone1: "01271610006",
    phone2: "0103 881 9449",
    email: "kironabil55@gmail.com",
    facebook: "https://www.facebook.com/share/1EqvkVx1hp/?mibextid=wwXIfr",
    facebookName: "Route x limousine",
    address: "الإسكندرية، مصر 21613"
  },
  admin: null,
  cars: [
    {
      id: "c1",
      name: "سيدان فاخرة (Sedan)",
      maxPax: 3,
      pricePerKm: 6.5,
      bagLimit: 3,
      category: "الفئة التنفيذية",
      features: ["تكييف فاخر مزدوج", "مقاعد مريحة وعازلة للصوت", "شاحن هاتف لجميع الأجهزة", "زجاجات مياه وضيافة VIP"]
    },
    {
      id: "c2",
      name: "ميني فان (Mini Van)",
      maxPax: 6,
      pricePerKm: 7.5,
      bagLimit: 3,
      category: "الفئة العائلية والعمل",
      features: ["سعة مريحة حتى 6 أفراد", "مساحة واسعة للأقدام", "تكييف خلفي منفصل", "واي فاي مجاني"]
    },
    {
      id: "c3",
      name: "فان عائلي كبير (Family Van)",
      maxPax: 9,
      pricePerKm: 11,
      bagLimit: null,
      category: "فئة السفر والمجموعات",
      features: ["سعة غير محدودة للحقائب", "كراسي طيارة مريحة للسفر الطويل", "شواحن متعددة", "شاشة عرض ترفيهية"]
    },
    {
      id: "c4",
      name: "هاي إس VIP (Toyota HiAce)",
      maxPax: 14,
      pricePerKm: null,
      bagLimit: null,
      category: "فئة الوفود والرحلات الكبرى",
      features: ["سعة حتى 14 فردًا بكامل الراحة", "مساحة هائلة للحقائب الكبيرة", "تكييف مركزي شامل", "سعر مخصص بالاتفاق"]
    }
  ],
  services: [
    {
      id: "s1",
      title: "توصيل من وإلى جميع المطارات",
      desc: "استقبال VIP من أول وصولك لحد ما توصل لوجهتك في أتم راحة وهدوء مع متابعة مواعيد الطيران المباشرة ولافتة استقبال باسمك.",
      iconName: "Plane"
    },
    {
      id: "s2",
      title: "مشاوير داخل المحافظة",
      desc: "تنقل مريح وفاخر داخل الإسكندرية بسيارات حديثة ومكيفة وسائقين محترفين بزي رسمي والتزام بالمسارات السلسة.",
      iconName: "Compass"
    },
    {
      id: "s3",
      title: "مشاوير وسفر خارج المحافظة",
      desc: "رحلات خارج المحافظة إلى القاهرة، الساحل الشمالي، مرسى مطروح، شرم الشيخ، الغردقة، طنطا مع أمان فائق وراحة الطريق.",
      iconName: "Route"
    },
    {
      id: "s4",
      title: "شغل أو سفر أو خروجة",
      desc: "مشوار يليق بيك في أي مناسبة، من مقابلات العمل والمؤتمرات لحد الخروجات المميزة والمناسبات العائلية الفاخرة.",
      iconName: "Briefcase"
    }
  ],
  routes: POPULAR_ROUTES
};

// VIP Amenities available
export const VIP_AMENITIES = [
  {
    id: "water",
    title: "مياه معدنية باردة وضيافة",
    desc: "زجاجات مياه شرب معقمة ومناديل مبللة مجانًا في كل رحلة",
    icon: "Sparkles"
  },
  {
    id: "chargers",
    title: "شواحن سريعة لجميع الأجهزة",
    desc: "كابلات شحن متعددة تناسب جميع هواتف آيفون وأندرويد",
    icon: "Zap"
  },
  {
    id: "wifi",
    title: "واي فاي Wi-Fi بالسيارة",
    desc: "إنترنت سريع يتيح لك متابعة أعمالك وتصفح هاتفك في الطريق",
    icon: "Wifi"
  },
  {
    id: "quiet",
    title: "رحلة هادئة مخصصة للعمل (Quiet Ride)",
    desc: "سائق ملتزم بأقصى درجات الهدوء والتركيز حسب رغبتك",
    icon: "VolumeX"
  },
  {
    id: "meet",
    title: "استقبال باللافتة في المطار",
    desc: "السائق ينتظرك في صالة الوصول حاملاً لافتة باسمك لسرعة اللقاء",
    icon: "UserCheck"
  },
  {
    id: "air",
    title: "تكييف نقي ومناخ مخصص",
    desc: "التحكم في درجة برودة التكييف حسب راحتك الشخصية",
    icon: "Wind"
  }
];

// VIP Client Reviews
export const VIP_REVIEWS = [
  {
    name: "د. طارق المنشاوي",
    role: "أستاذ جامعي ومستشار أعمال",
    comment: "من أفضل خدمات الليموزين في مصر بلا مبالغة. التزام بالدقيقة في مطار برج العرب، والسيارة في منتهى النظافة والهدوء. اعتمدت عليهم في كل سفرياتي القادمة.",
    trip: "الإسكندرية ↔ مطار برج العرب",
    rating: 5
  },
  {
    name: "أ. ميار الشريف",
    role: "مديرة علاقات عامة بشركة بترول",
    comment: "استقبال احترافي جداً لوفد أجنبي قادم لمطار القاهرة وتم نقلهم للإسكندرية بكل راحة وفخامة. السائق كان في قمة التهذيب بالبدلة الرسمية.",
    trip: "مطار القاهرة ↔ الإسكندرية",
    rating: 5
  },
  {
    name: "م. حسام البحيري",
    role: "رائد أعمال",
    comment: "خدمة الكاش باك حقيقية وحساب الكيلومتر عادل جداً بدون أي مبالغة أو رسوم خفية. الراحة والأمان في طريق الساحل كانت ممتازة.",
    trip: "الإسكندرية ↔ مراسي الساحل الشمالي",
    rating: 5
  }
];

// Frequently Asked Questions
export const FAQ_ITEMS = [
  {
    q: "إزاي بيتم حساب تكلفة الرحلة في Route X؟",
    a: "الحساب بيتم بشفافية تامة بناءً على المسافة بالكيلومتر ونوع السيارة المختارة حسب عدد الأفراد. التكلفة بتكون محددة وواضحة مسبقاً قبل التحرك وبدون أي رسوم خفية."
  },
  {
    q: "هل السعر شامل الكارتات ورسوم البوابات؟",
    a: "نعم، بنوضح لك كل تفاصيل الرحلة مقدماً، والخدمة بتشمل السائق المحترف والسيارة المكيفة والوقود، مع إمكانية توضيح أي رسوم بوابات أو انتظار حسب رغبتك."
  },
  {
    q: "لو ميعاد الطيارة اتأخر، هل السائق هيفضل مستنيني؟",
    a: "بكل تأكيد. بمجرد تزويدنا برقم الرحلة الجوية، بنتابع موعد هبوط الطائرة الفعلي لحظة بلحظة، والسائق بيكون في انتظارك بصالة الوصول بدون أي قلق."
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نوفر لك طرق دفع متعددة لراحتك: نقدًا (كاش) مع السائق، أو عبر إنستاباي (InstaPay)، فودافون كاش، أو التحويل البنكي المباشر."
  },
  {
    q: "هل يمكن حجز سيارة لرحلات متعددة أو يوم كامل؟",
    a: "نعم، نقدم خدمة السائق الخاص والسيارة لليوم الكامل لرجال الأعمال والمناسبات والرحلات العائلية بأسعار خاصة جداً."
  }
];
