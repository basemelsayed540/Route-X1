// Multilingual translations for Route X Limousine
// Supported: Arabic ('ar'), English ('en'), Chinese ('zh'), Russian ('ru')

export type Language = "ar" | "en" | "zh" | "ru";

export interface TranslationDict {
  brandTitle: string;
  brandTagline: string;
  taglineLatin: string;
  nav: {
    services: string;
    fleet: string;
    routes: string;
    book: string;
    contact: string;
    directWa: string;
    admin: string;
  };
  hero: {
    kicker: string;
    titleStart: string;
    titleHighlight: string;
    desc: string;
    bookBtn: string;
    fleetBtn: string;
    airportsBtn: string;
    trust1: string;
    trust2: string;
    trust3: string;
    presidentialBadge: string;
    presidentialLocation: string;
    presidentialTitle: string;
  };
  cashback: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    desc: string;
    cta: string;
    inquiryMsg: string;
  };
  routes: {
    kicker: string;
    title: string;
    desc: string;
    calcNow: string;
    fromPrefix: string;
    approxKm: string;
    items: {
      id: string;
      name: string;
      from: string;
      to: string;
      approxKm: number;
      highlight: string;
    }[];
  };
  services: {
    kicker: string;
    title: string;
    desc: string;
    uniformChauffeur: string;
    items: {
      id: string;
      title: string;
      desc: string;
    }[];
  };
  fleet: {
    kicker: string;
    title: string;
    desc: string;
    selectedBadge: string;
    paxCapacity: string;
    upTo: string;
    passengers: string;
    bagCapacity: string;
    maxBags: string;
    unlimitedBags: string;
    pricePerKm: string;
    currencyPerKm: string;
    onBooking: string;
    selectCarBtn: string;
  };
  amenities: {
    kicker: string;
    title: string;
    desc: string;
    items: {
      id: string;
      title: string;
      desc: string;
    }[];
  };
  gallery: {
    kicker: string;
    title: string;
    desc: string;
    interiorTag: string;
    interiorTitle: string;
    airportTag: string;
    airportTitle: string;
  };
  booking: {
    badge: string;
    title: string;
    desc: string;
    tripTypeLabel: string;
    tripTypes: {
      oneway: string;
      roundtrip: string;
      hourly: string;
    };
    clientInfoTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phoneAltLabel: string;
    optional: string;
    routeTitle: string;
    routeNotice: string;
    openMap: string;
    fromLabel: string;
    fromPlaceholder: string;
    coordsDetected: string;
    viaLabel: string;
    viaPlaceholder: string;
    toLabel: string;
    toPlaceholder: string;
    distanceLabel: string;
    kmUnit: string;
    openDirectionsBtn: string;
    enterLocationsNotice: string;
    paxLuggageTitle: string;
    paxLabel: string;
    bagsLabel: string;
    allocatedCarLabel: string;
    capacityUpTo: string;
    baseKmPrice: string;
    customKmPrice: string;
    estimatedCostLabel: string;
    enterKmNotice: string;
    currency: string;
    paxWarning: string;
    bagWarning: string;
    scheduleTitle: string;
    dateLabel: string;
    timeLabel: string;
    flightNumberLabel: string;
    flightNumberPlaceholder: string;
    flightNumberHint: string;
    meetGreetTitle: string;
    meetGreetDesc: string;
    amenitiesTitle: string;
    sendWaBtn: string;
    copySummaryBtn: string;
    copiedNotice: string;
    waNotice: string;
    validationMissing: string;
  };
  reviews: {
    kicker: string;
    title: string;
    desc: string;
    items: {
      name: string;
      role: string;
      comment: string;
      trip: string;
    }[];
  };
  faq: {
    kicker: string;
    title: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  contact: {
    kicker: string;
    title: string;
    desc: string;
    mainWaBadge: string;
    mainWaTitle: string;
    secWa1Title: string;
    secWa2Title: string;
    emailTitle: string;
    emailSub: string;
    fbTitle: string;
    addressTitle: string;
    openWa: string;
    copyNumber: string;
    copied: string;
    sendEmail: string;
    visitPage: string;
    viewMap: string;
  };
  footer: {
    brand: string;
    rights: string;
    address: string;
    adminLink: string;
  };
  admin: {
    loginTitle: string;
    setupTitle: string;
    loginDesc: string;
    setupDesc: string;
    phoneLabel: string;
    pwLabel: string;
    loginBtn: string;
    setupBtn: string;
    dashTitle: string;
    logout: string;
    waSettingLabel: string;
    carsSectionTitle: string;
    addCar: string;
    colName: string;
    colMaxPax: string;
    colPrice: string;
    colBags: string;
    resetBtn: string;
    saveBtn: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  ar: {
    brandTitle: "Route X Limousine",
    brandTagline: "خدمة ليموزين فاخرة في الإسكندرية وجميع مطارات ومحافظات مصر",
    taglineLatin: "Limousine & Airport Chauffeur Service · Alexandria, Egypt",
    nav: {
      services: "الخدمات",
      fleet: "الأسعار والأسطول",
      routes: "المسارات والمطارات",
      book: "احجز مشوارك",
      contact: "تواصل معنا",
      directWa: "واتساب مباشر",
      admin: "لوحة الإدارة"
    },
    hero: {
      kicker: "Limousine & Airport Chauffeur Service · Alexandria, Egypt",
      titleStart: "راحة وأمان وفخامة في ",
      titleHighlight: "كل مشوار ليموزين",
      desc: "لو بتدور على مشوار مريح وآمن وبمستوى فندقي فائق، Route X اختيارك الأول. أسطول سيارات حديثة ومعقمة ومكيفة، وسائقين محترفين بزي رسمي كامل، والتزام دقيق بالمواعيد من وإلى جميع مطارات ومحافظات مصر.",
      bookBtn: "احجز مشوارك الآن",
      fleetBtn: "استعراض الأسطول والأسعار",
      airportsBtn: "مطارات مصر السريعة",
      trust1: "سيارات معقمة وسائقين بزي رسمي",
      trust2: "دقة متناهية 24/7 دون تأخير",
      trust3: "كاش باك 10% على كل رحلة",
      presidentialBadge: "الأسطول الرئاسي الفاخر",
      presidentialLocation: "الإسكندرية · مطارات مصر",
      presidentialTitle: "خدمة كبار الشخصيات ورجال الأعمال"
    },
    cashback: {
      badge: "عرض خاص",
      titleStart: "عرض خاص: اسأل عن كاش باك ",
      titleHighlight: "10%",
      titleEnd: " على رحلتك",
      desc: "تواصل معنا عبر واتساب الآن للاستفادة من خصم الكاش باك الفوري لحجوزات المطارات والسفر بين المحافظات.",
      cta: "استفسر عن الكاش باك",
      inquiryMsg: "السلام عليكم، عايز أعرف تفاصيل عرض الكاش باك 10% لرحلتي مع Route X"
    },
    routes: {
      kicker: "مسارات سريعة للمطارات والمحافظات",
      title: "المسارات الأكثر طلباً وحساب المسافة الفوري",
      desc: "اضغط على أي مطار أو وجهة وسنقوم بملء خانات الانطلاق والوصول والمسافة التقريبية تلقائياً لحساب التكلفة الفورية.",
      calcNow: "احسب السعر الآن",
      fromPrefix: "من ",
      approxKm: "كم تقريبياً",
      items: [
        {
          id: "hbe",
          name: "مطار برج العرب الدولي (HBE)",
          from: "الإسكندرية (سموحة / وسط البلد)",
          to: "مطار برج العرب الدولي",
          approxKm: 50,
          highlight: "استقبال صالة الوصول والتوصيل السريع"
        },
        {
          id: "cai",
          name: "مطار القاهرة الدولي (CAI)",
          from: "الإسكندرية",
          to: "مطار القاهرة الدولي - صالة 1/2/3",
          approxKm: 220,
          highlight: "سفر مباشر عبر الطريق الصحراوي الممهد"
        },
        {
          id: "spx",
          name: "مطار سفنكس الدولي (SPX)",
          from: "الإسكندرية",
          to: "مطار سفنكس الدولي (بوابة الصحراوي)",
          approxKm: 195,
          highlight: "أقرب للمنطقة الغربية وأهرامات الجيزة"
        },
        {
          id: "dbb",
          name: "مطار العلمين الدولي (DBB)",
          from: "الإسكندرية",
          to: "مطار العلمين الدولي",
          approxKm: 135,
          highlight: "المطار المفضل لرحلات الساحل الشمالي والعلمين الجديدة"
        },
        {
          id: "marassi",
          name: "الساحل الشمالي (مراسي / مارينا / هاسيندا)",
          from: "الإسكندرية",
          to: "الساحل الشمالي - مراسي / مارينا",
          approxKm: 140,
          highlight: "تنقل مصيفي راقٍ بدون إجهاد القيادة"
        },
        {
          id: "cairo-east",
          name: "القاهرة الجديدة والتجمع الخامس",
          from: "الإسكندرية",
          to: "القاهرة الجديدة / التجمع الخامس",
          approxKm: 245,
          highlight: "توصيل للشركات والمناطق السكنية الراقية"
        }
      ]
    },
    services: {
      kicker: "ما نقدمه لك",
      title: "خدمات ليموزين متكاملة لجميع المناسبات",
      desc: "سواء كنت مسافراً بمفردك في رحلة عمل، أو تستقبل ضيوفاً مهمين، أو تنتقل مع عائلتك.",
      uniformChauffeur: "سائق خاص بزي رسمي",
      items: [
        {
          id: "s1",
          title: "توصيل من وإلى جميع المطارات",
          desc: "استقبال VIP من أول وصولك لحد ما توصل لوجهتك في أتم راحة وهدوء مع متابعة مواعيد الطيران المباشرة ولافتة استقبال باسمك."
        },
        {
          id: "s2",
          title: "مشاوير داخل المحافظة",
          desc: "تنقل مريح وفاخر داخل الإسكندرية بسيارات حديثة ومكيفة وسائقين محترفين بزي رسمي والتزام بالمسارات السلسة."
        },
        {
          id: "s3",
          title: "مشاوير وسفر خارج المحافظة",
          desc: "رحلات وسفر بين المحافظات (القاهرة، الساحل الشمالي، العلمين، مطروح، الغردقة، طنطا) بأمان كامل وسلاسة تامة."
        },
        {
          id: "s4",
          title: "شغل أو سفر أو خروجة",
          desc: "مشوار يليق بيك في أي مناسبة، من اجتماعات العمل ومقابلات الـ VIP لحد المناسبات والخروجات العائلية الفاخرة."
        }
      ]
    },
    fleet: {
      kicker: "أسطول Route X",
      title: "أسطول السيارات وأسعار الكيلومتر",
      desc: "الحساب الشفاف بالكيلومتر الفعلي، والسيارة المناسبة تتحدد وفقاً لعدد الأفراد وحجم الأمتعة.",
      selectedBadge: "المختارة",
      paxCapacity: "سعة الركاب:",
      upTo: "حتى ",
      passengers: " أفراد",
      bagCapacity: "سعة الحقائب:",
      maxBags: "حد أقصى ",
      unlimitedBags: "بدون تحديد حقائب",
      pricePerKm: "سعر الكيلو:",
      currencyPerKm: "جنيه / كم",
      onBooking: "يتحدد عند الحجز",
      selectCarBtn: "اختر هذه السيارة"
    },
    amenities: {
      kicker: "معايير الضيافة والفخامة",
      title: "تجهيزات مجانية في كل رحلة ليموزين",
      desc: "كل تفصيلة محسوبة لراحتك التامة، لتبدأ رحلتك مسترخياً وكأنك في مقصورتك الخاصة.",
      items: [
        {
          id: "water",
          title: "مياه معدنية باردة وضيافة",
          desc: "زجاجات مياه شرب معقمة ومناديل مبللة مجانًا في كل رحلة"
        },
        {
          id: "chargers",
          title: "شواحن سريعة لجميع الأجهزة",
          desc: "كابلات شحن متعددة تناسب جميع هواتف آيفون وأندرويد"
        },
        {
          id: "wifi",
          title: "واي فاي Wi-Fi بالسيارة",
          desc: "إنترنت سريع يتيح لك متابعة أعمالك وتصفح هاتفك في الطريق"
        },
        {
          id: "quiet",
          title: "رحلة هادئة مخصصة للعمل (Quiet Ride)",
          desc: "سائق ملتزم بأقصى درجات الهدوء والتركيز حسب رغبتك"
        },
        {
          id: "meet",
          title: "استقبال باللافتة في المطار",
          desc: "السائق ينتظرك في صالة الوصول حاملاً لافتة باسمك لسرعة اللقاء"
        },
        {
          id: "air",
          title: "تكييف نقي ومناخ مخصص",
          desc: "التحكم في درجة برودة التكييف حسب راحتك الشخصية"
        }
      ]
    },
    gallery: {
      kicker: "معرض الصور الواقعي",
      title: "المقصورة الفاخرة والاستقبال الرئاسي",
      desc: "شاهد الفخامة بنفسك: استقبال VIP في المطار ومقصورة مجهزة بأعلى مواصفات الرفاهية.",
      interiorTag: "المقصورة التنفيذية",
      interiorTitle: "مقاعد جلدية مريحة وإضاءة سقف هادئة مع طاولة ضيافة",
      airportTag: "استقبال صالات المطار",
      airportTitle: "انتظار دقيق أمام صالات الوصول لجميع مطارات الجمهورية"
    },
    booking: {
      badge: "حاسبة الأسعار الذكية والحجز المباشر",
      title: "احجز رحلتك الفاخرة الآن",
      desc: "املأ بيانات الرحلة وسيتم حساب التكلفة التقريبية وتجهيز رسالة واتساب رسمية منسقة لتأكيد الحجز فوراً مع فريق خدمة العملاء.",
      tripTypeLabel: "نوع الرحلة المطلوب",
      tripTypes: {
        oneway: "ذهاب فقط",
        roundtrip: "ذهاب وعودة (خصم)",
        hourly: "بالساعة / يوم كامل"
      },
      clientInfoTitle: "بيانات العميل والتواصل",
      nameLabel: "اسم العميل بالكامل",
      namePlaceholder: "مثال: د. أحمد رفعت",
      phoneLabel: "رقم الهاتف (واتساب)",
      phoneAltLabel: "رقم هاتف بديل",
      optional: "(اختياري)",
      routeTitle: "المسار ونقاط الرحلة",
      routeNotice: "يمكنك لصق رابط مشاركة خرائط جوجل أو الإحداثيات لدقة متناهية",
      openMap: "فتح الخريطة",
      fromLabel: "نقطة الانطلاق (مكان التجمع)",
      fromPlaceholder: "مثال: سموحة، الإسكندرية أو رابط الموقع",
      coordsDetected: "✓ تم التعرف على إحداثيات الموقع بدقة عالية",
      viaLabel: "نقطة إضافية / محطة في الطريق",
      viaPlaceholder: "مثال: استلام صديق أو مستندات في الطريق",
      toLabel: "وجهة الوصول النهائية",
      toPlaceholder: "مثال: مطار برج العرب أو مطار القاهرة الدولي",
      distanceLabel: "المسافة التقريبية بالكيلومتر (لحساب السعر الفوري)",
      kmUnit: "كم (KM)",
      openDirectionsBtn: "عرض المسار الدقيق والمسافة على جوجل مابس",
      enterLocationsNotice: "اكتب نقطة الانطلاق والوصول لحساب المسار",
      paxLuggageTitle: "الأفراد والأمتعة واختيار السيارة",
      paxLabel: "عدد الأفراد (الركاب)",
      bagsLabel: "عدد الحقائب والأمتعة",
      allocatedCarLabel: "السيارة المخصصة لطلبك",
      capacityUpTo: "سعة حتى ",
      baseKmPrice: "سعر الكيلو الأساسي: ",
      customKmPrice: "سعر الكيلو مخصص ويتحدد عند تأكيد المشوار",
      estimatedCostLabel: "التكلفة التقريبية المقدرة:",
      enterKmNotice: "اكتب المسافة بالكيلومتر لإظهار السعر",
      currency: "جنيه مصري",
      paxWarning: "العدد يتجاوز أكبر سيارة لدينا. يرجى التواصل معنا على واتساب لترتيب سيارتين أو موكب خاص.",
      bagWarning: "عدد الحقائب أكبر من سعة السيارة المختارة. ننصح باختيار فئة أعلى مثل الفان العائلي.",
      scheduleTitle: "تاريخ وموعد الرحلة وتتبع الطيران",
      dateLabel: "تاريخ الرحلة",
      timeLabel: "ساعة الانطلاق المطلوبة",
      flightNumberLabel: "رقم الرحلة الجوية (في حال استقبال المطار)",
      flightNumberPlaceholder: "مثال: MS 800 أو EK 927",
      flightNumberHint: "نقوم بمتابعة موعد الهبوط لتفادي أي انتظار في حال تأخر الطائرة",
      meetGreetTitle: "خدمة الاستقبال باللافتة (Meet & Greet)",
      meetGreetDesc: "السائق ينتظرك بصالة الوصول بلافتة تحمل اسمك",
      amenitiesTitle: "خيارات الراحة والضيافة في السيارة (مجانية)",
      sendWaBtn: "إرسال الطلب فوراً عبر واتساب",
      copySummaryBtn: "نسخ ملخص الحجز",
      copiedNotice: "تم نسخ نص الحجز!",
      waNotice: "* الزر يفتح تطبيق واتساب برسالة جاهزة ومنسقة بالكامل. يتم تأكيد الحجز فور رد فريق العمل وإرسال بيانات السائق ورقم السيارة.",
      validationMissing: "برجاء استكمال البيانات المطلوبة أولاً: "
    },
    reviews: {
      kicker: "آراء العملاء",
      title: "ثقة كبار الشخصيات ورجال الأعمال",
      desc: "نفخر بتقديم خدماتنا لمئات المسافرين والشركات والعائلات في مصر وخارجها.",
      items: [
        {
          name: "د. طارق المنشاوي",
          role: "أستاذ جامعي ومستشار أعمال",
          comment: "من أفضل خدمات الليموزين في مصر بلا مبالغة. التزام بالدقيقة في مطار برج العرب، والسيارة في منتهى النظافة والهدوء. اعتمدت عليهم في كل سفرياتي القادمة.",
          trip: "الإسكندرية ↔ مطار برج العرب"
        },
        {
          name: "أ. ميار الشريف",
          role: "مديرة علاقات عامة بشركة بترول",
          comment: "استقبال احترافي جداً لوفد أجنبي قادم لمطار القاهرة وتم نقلهم للإسكندرية بكل راحة وفخامة. السائق كان في قمة التهذيب بالبدلة الرسمية.",
          trip: "مطار القاهرة ↔ الإسكندرية"
        },
        {
          name: "م. حسام البحيري",
          role: "رائد أعمال",
          comment: "خدمة الكاش باك حقيقية وحساب الكيلومتر عادل جداً بدون أي مبالغة أو رسوم خفية. الراحة والأمان في طريق الساحل كانت ممتازة.",
          trip: "الإسكندرية ↔ مراسي الساحل الشمالي"
        }
      ]
    },
    faq: {
      kicker: "الأسئلة الشائعة",
      title: "كل ما تود معرفته عن خدمة ليموزين Route X",
      items: [
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
      ]
    },
    contact: {
      kicker: "قنوات الاتصال المباشرة",
      title: "تواصل مع Route X Limousine",
      desc: "مكتب الحجوزات مفتوح على مدار 24 ساعة يومياً لخدمتكم في الإسكندرية وجميع محافظات مصر.",
      mainWaBadge: "الخط الرئيسي 24/7",
      mainWaTitle: "واتساب الحجوزات الفورية",
      secWa1Title: "واتساب وخدمة العملاء",
      secWa2Title: "واتساب (رقم ثانٍ)",
      emailTitle: "البريد الإلكتروني",
      emailSub: "للمراسلات والعقود والشركات",
      fbTitle: "صفحتنا الرسمية على فيسبوك",
      addressTitle: "العنوان الجغرافي",
      openWa: "فتح واتساب",
      copyNumber: "نسخ الرقم",
      copied: "تم النسخ",
      sendEmail: "إرسال بريد",
      visitPage: "زيارة الصفحة",
      viewMap: "الموقع على الخريطة"
    },
    footer: {
      brand: "Route X Limousine Service",
      rights: "جميع الحقوق محفوظة © 2026",
      address: "الإسكندرية، مصر 21613",
      adminLink: "إدارة الموقع"
    },
    admin: {
      loginTitle: "تسجيل دخول لوحة الإدارة",
      setupTitle: "إنشاء حساب مدير Route X",
      loginDesc: "أدخل رقم الهاتف وكلمة المرور لتعديل الأسعار والسيارات والخدمات.",
      setupDesc: "هذا أول دخول للوحة الإدارة. قم بتعيين رقم الهاتف وكلمة مرور للمدير.",
      phoneLabel: "رقم الهاتف",
      pwLabel: "كلمة المرور",
      loginBtn: "دخول لوحة التحكم",
      setupBtn: "إنشاء الحساب والمتابعة",
      dashTitle: "لوحة تحكم الأسعار والأسطول",
      logout: "تسجيل الخروج",
      waSettingLabel: "رقم واتساب استلام الحجوزات",
      carsSectionTitle: "السيارات وأسعار الكيلو",
      addCar: "إضافة سيارة",
      colName: "اسم الفئة",
      colMaxPax: "أقصى ركاب",
      colPrice: "سعر الكيلو (جنيه)",
      colBags: "حد الحقائب",
      resetBtn: "تراجع",
      saveBtn: "حفظ ونشر التعديلات"
    }
  },

  en: {
    brandTitle: "Route X Limousine",
    brandTagline: "Luxury Limousine & Airport Transfer in Alexandria & Egypt",
    taglineLatin: "Limousine & Airport Chauffeur Service · Alexandria, Egypt",
    nav: {
      services: "Services",
      fleet: "Fleet & Pricing",
      routes: "Airports & Routes",
      book: "Book a Ride",
      contact: "Contact",
      directWa: "WhatsApp Now",
      admin: "Admin"
    },
    hero: {
      kicker: "Limousine & Airport Chauffeur Service · Alexandria, Egypt",
      titleStart: "Comfort, Safety & Luxury in ",
      titleHighlight: "Every Executive Ride",
      desc: "For dependable, premium chauffeur mobility across Egypt, Route X is your premier choice. Modern sterilized fleet, suited professional chauffeurs, and punctuality 24/7 across all Egyptian airports and intercity routes.",
      bookBtn: "Book Your Ride Now",
      fleetBtn: "Explore Fleet & Rates",
      airportsBtn: "Quick Airport Routes",
      trust1: "Sterilized vehicles & uniformed drivers",
      trust2: "Punctuality guaranteed 24/7",
      trust3: "10% Cashback on every trip",
      presidentialBadge: "Presidential Luxury Fleet",
      presidentialLocation: "Alexandria · Egyptian Airports",
      presidentialTitle: "VIP & Executive Chauffeur Service"
    },
    cashback: {
      badge: "Special Offer",
      titleStart: "Special Offer: Ask about ",
      titleHighlight: "10% Cashback",
      titleEnd: " on your trip",
      desc: "Contact us via WhatsApp now to claim your immediate cashback voucher for airport and intercity transfers.",
      cta: "Inquire on WhatsApp",
      inquiryMsg: "Hello, I would like to inquire about the 10% Cashback promotion for my trip with Route X"
    },
    routes: {
      kicker: "Fast Airport & Intercity Routes",
      title: "Popular Destinations & Instant Distance Calculator",
      desc: "Select any airport or city to automatically calculate exact distance, car recommendation, and instant estimated fare.",
      calcNow: "Calculate Fare",
      fromPrefix: "From ",
      approxKm: "km approx.",
      items: [
        {
          id: "hbe",
          name: "Borg El Arab International Airport (HBE)",
          from: "Alexandria (Smouha / Downtown)",
          to: "Borg El Arab International Airport",
          approxKm: 50,
          highlight: "Arrival hall meet & greet with express terminal exit"
        },
        {
          id: "cai",
          name: "Cairo International Airport (CAI)",
          from: "Alexandria",
          to: "Cairo International Airport - Terminals 1/2/3",
          approxKm: 220,
          highlight: "Smooth express highway journey with rest stop options"
        },
        {
          id: "spx",
          name: "Sphinx International Airport (SPX)",
          from: "Alexandria",
          to: "Sphinx International Airport (Desert Highway)",
          approxKm: 195,
          highlight: "Closest airport to West Cairo & Giza Pyramids"
        },
        {
          id: "dbb",
          name: "El Alamein International Airport (DBB)",
          from: "Alexandria",
          to: "El Alamein International Airport",
          approxKm: 135,
          highlight: "Preferred gate for North Coast & New Alamein City"
        },
        {
          id: "marassi",
          name: "North Coast (Marassi / Marina / Hacienda)",
          from: "Alexandria",
          to: "North Coast - Marassi / Marina",
          approxKm: 140,
          highlight: "Luxury resort transit without driving fatigue"
        },
        {
          id: "cairo-east",
          name: "New Cairo & 5th Settlement",
          from: "Alexandria",
          to: "New Cairo / 5th Settlement",
          approxKm: 245,
          highlight: "Direct transfer to corporate hubs & residential compounds"
        }
      ]
    },
    services: {
      kicker: "What We Offer",
      title: "Comprehensive Limousine Services for Every Occasion",
      desc: "Whether traveling solo on executive business, welcoming VIP delegations, or holidaying with family.",
      uniformChauffeur: "Suited private chauffeur",
      items: [
        {
          id: "s1",
          title: "All Egyptian Airports Transfer",
          desc: "VIP arrival reception from landing to your destination with live flight tracking and personalized name board."
        },
        {
          id: "s2",
          title: "Intra-City Alexandria Rides",
          desc: "Comfortable, climate-controlled rides inside Alexandria with professional chauffeurs and optimal route planning."
        },
        {
          id: "s3",
          title: "Intercity & Nationwide Travel",
          desc: "Safe long-distance travel to Cairo, North Coast, Matrouh, Hurghada, Sharm El Sheikh, and Tanta."
        },
        {
          id: "s4",
          title: "Business, Events & Leisure",
          desc: "Elegance for every occasion: executive boardroom meetings, conferences, weddings, and premium family tours."
        }
      ]
    },
    fleet: {
      kicker: "Route X Fleet",
      title: "Vehicle Fleet & Transparent Per-Km Rates",
      desc: "Transparent per-kilometer billing with vehicles calibrated to your party size and luggage requirements.",
      selectedBadge: "Selected",
      paxCapacity: "Passenger capacity:",
      upTo: "Up to ",
      passengers: " passengers",
      bagCapacity: "Luggage capacity:",
      maxBags: "Max ",
      unlimitedBags: "Unlimited luggage",
      pricePerKm: "Rate per km:",
      currencyPerKm: "EGP / km",
      onBooking: "Quoted upon request",
      selectCarBtn: "Select This Vehicle"
    },
    amenities: {
      kicker: "Hospitality & Luxury Standards",
      title: "Complimentary Amenities on Every Ride",
      desc: "Every detail tuned for your comfort, ensuring your journey begins relaxed in your private cabin.",
      items: [
        {
          id: "water",
          title: "Chilled Mineral Water & Refreshments",
          desc: "Complimentary chilled water bottles and refreshing wet wipes in every ride"
        },
        {
          id: "chargers",
          title: "Universal Fast Chargers",
          desc: "Multi-head cables for iPhone Lightning, USB-C, and micro-USB"
        },
        {
          id: "wifi",
          title: "High-Speed Onboard Wi-Fi",
          desc: "Seamless connectivity to work or stream on the road"
        },
        {
          id: "quiet",
          title: "Quiet Executive Ride Option",
          desc: "Discreet chauffeur focused on road safety without interruptions"
        },
        {
          id: "meet",
          title: "Airport Meet & Greet Sign",
          desc: "Chauffeur waits inside the arrival hall holding your custom name sign"
        },
        {
          id: "air",
          title: "Dual-Zone Climate Control",
          desc: "Independent temperature settings adjusted to your preference"
        }
      ]
    },
    gallery: {
      kicker: "Real Showcase Gallery",
      title: "Executive Cabin & Presidential Airport Welcomes",
      desc: "Witness the luxury: VIP airport tarmac pickup and supple leather interior craftsmanship.",
      interiorTag: "Executive Cabin",
      interiorTitle: "Cognac leather seating, starlight ambient ceiling & work tray",
      airportTag: "Airport Arrivals",
      airportTitle: "Punctual curb & terminal pickup at all Egyptian airports"
    },
    booking: {
      badge: "Smart Fare Calculator & Booking",
      title: "Book Your Luxury Chauffeur Now",
      desc: "Fill in your itinerary details to compute live estimated costs and produce a formatted WhatsApp reservation message.",
      tripTypeLabel: "Select Trip Type",
      tripTypes: {
        oneway: "One Way",
        roundtrip: "Round Trip (Discount)",
        hourly: "Hourly / Full Day"
      },
      clientInfoTitle: "Client Details & Contact",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Dr. Ahmed Refaat",
      phoneLabel: "Phone Number (WhatsApp)",
      phoneAltLabel: "Alternative Phone",
      optional: "(Optional)",
      routeTitle: "Itinerary & Route Points",
      routeNotice: "Paste Google Maps share link, coordinates, or street address",
      openMap: "Open Map",
      fromLabel: "Pickup Location",
      fromPlaceholder: "e.g. Smouha, Alexandria or Maps Link",
      coordsDetected: "✓ Exact GPS coordinates detected",
      viaLabel: "Optional Stopover / Waypoint",
      viaPlaceholder: "e.g. Pickup guest or document on the way",
      toLabel: "Drop-off Destination",
      toPlaceholder: "e.g. Borg El Arab Airport or Cairo Airport",
      distanceLabel: "Approximate Distance in KM (for instant fare)",
      kmUnit: "KM",
      openDirectionsBtn: "View Exact Route & Distance on Google Maps",
      enterLocationsNotice: "Enter pickup and drop-off to view directions",
      paxLuggageTitle: "Passengers, Luggage & Vehicle Selection",
      paxLabel: "Number of Passengers",
      bagsLabel: "Luggage Count",
      allocatedCarLabel: "Recommended Vehicle",
      capacityUpTo: "Capacity up to ",
      baseKmPrice: "Base rate per km: ",
      customKmPrice: "Custom rate quoted upon reservation",
      estimatedCostLabel: "Estimated Total Fare:",
      enterKmNotice: "Enter distance in KM to view price",
      currency: "EGP",
      paxWarning: "Passenger count exceeds our largest single vehicle. Please WhatsApp us to arrange multiple cars or a VIP convoy.",
      bagWarning: "Luggage count exceeds this car's trunk limit. We recommend a larger category such as Family Van.",
      scheduleTitle: "Date, Time & Flight Tracking",
      dateLabel: "Pickup Date",
      timeLabel: "Pickup Time",
      flightNumberLabel: "Flight Number (for airport arrivals)",
      flightNumberPlaceholder: "e.g. MS 800 or EK 927",
      flightNumberHint: "We monitor live landing times to eliminate waiting fees if delayed",
      meetGreetTitle: "Meet & Greet Name Board Service",
      meetGreetDesc: "Chauffeur waits inside the arrival hall with your personalized name board",
      amenitiesTitle: "Complimentary In-Car Amenities",
      sendWaBtn: "Send Booking via WhatsApp",
      copySummaryBtn: "Copy Itinerary Summary",
      copiedNotice: "Copied to clipboard!",
      waNotice: "* Clicking opens WhatsApp with a pre-formatted message. Confirmation and driver contact details follow immediately.",
      validationMissing: "Please complete required fields: "
    },
    reviews: {
      kicker: "Client Testimonials",
      title: "Trusted by Corporate Executives & Travelers",
      desc: "Proudly serving hundreds of executives, diplomats, and international travelers across Egypt.",
      items: [
        {
          name: "Dr. Tarek El-Minshawi",
          role: "University Professor & Business Consultant",
          comment: "Undeniably one of the premier limousine services in Egypt. Punctual to the minute at Borg El Arab Airport, pristine car, and seamless driving. My trusted choice for all flights.",
          trip: "Alexandria ↔ Borg El Arab Airport"
        },
        {
          name: "Mayar El-Sherif",
          role: "PR Director, Energy Sector",
          comment: "Impeccable reception for our visiting European delegation from Cairo Airport to Alexandria. The chauffeur was sharply suited, courteous, and bilingual.",
          trip: "Cairo Airport ↔ Alexandria"
        },
        {
          name: "Hossam El-Beheiry",
          role: "Tech Entrepreneur",
          comment: "Transparent per-km pricing with zero surprise surcharges. The 10% cashback was promptly credited, and the North Coast transit was peaceful.",
          trip: "Alexandria ↔ Marassi, North Coast"
        }
      ]
    },
    faq: {
      kicker: "Frequently Asked Questions",
      title: "Everything You Need to Know About Route X Limousine",
      items: [
        {
          q: "How is the trip price calculated at Route X?",
          a: "Billing is based transparently on exact distance in kilometers and the chosen vehicle tier. Total fare is quoted in advance with zero hidden fees."
        },
        {
          q: "Does the fare include toll gates and airport fees?",
          a: "All quotes clearly outline vehicle, fuel, suited chauffeur, and applicable highway toll gates or waiting periods according to your plan."
        },
        {
          q: "What happens if my incoming flight is delayed?",
          a: "No stress. Providing your flight number allows our dispatch team to track live ATC landing schedules so your chauffeur is ready precisely when you clear customs."
        },
        {
          q: "Which payment methods are accepted?",
          a: "We offer multiple convenient payment options: Cash to the chauffeur, InstaPay, Vodafone Cash, or direct bank transfer."
        },
        {
          q: "Can I book a chauffeur for a full day or multi-city tour?",
          a: "Yes, we provide dedicated daily chauffeur packages for executives, weddings, diplomatic delegations, and coastal tours."
        }
      ]
    },
    contact: {
      kicker: "Direct Contact Lines",
      title: "Get in Touch with Route X Limousine",
      desc: "Our reservation desk is at your service 24 hours a day, 7 days a week across Alexandria and Egypt.",
      mainWaBadge: "Primary Line 24/7",
      mainWaTitle: "Instant WhatsApp Bookings",
      secWa1Title: "WhatsApp & Customer Support",
      secWa2Title: "Secondary WhatsApp Line",
      emailTitle: "Official Email",
      emailSub: "For corporate contracts and inquiries",
      fbTitle: "Official Facebook Page",
      addressTitle: "Headquarters Address",
      openWa: "Open WhatsApp",
      copyNumber: "Copy",
      copied: "Copied",
      sendEmail: "Send Email",
      visitPage: "Visit Page",
      viewMap: "View on Map"
    },
    footer: {
      brand: "Route X Limousine Service",
      rights: "All Rights Reserved © 2026",
      address: "Alexandria, Egypt 21613",
      adminLink: "Admin Dashboard"
    },
    admin: {
      loginTitle: "Admin Portal Sign-In",
      setupTitle: "Create Route X Admin Credentials",
      loginDesc: "Enter phone number and password to modify rates, fleet, and services.",
      setupDesc: "Initial setup: define administrative phone and secure password.",
      phoneLabel: "Phone Number",
      pwLabel: "Password",
      loginBtn: "Enter Dashboard",
      setupBtn: "Save & Continue",
      dashTitle: "Fleet & Rates Management Dashboard",
      logout: "Sign Out",
      waSettingLabel: "WhatsApp Receiving Number",
      carsSectionTitle: "Vehicles & Kilometer Rates",
      addCar: "Add Vehicle",
      colName: "Vehicle Name",
      colMaxPax: "Max Pax",
      colPrice: "Rate / Km (EGP)",
      colBags: "Bag Limit",
      resetBtn: "Reset",
      saveBtn: "Save & Publish"
    }
  },

  zh: {
    brandTitle: "Route X 豪华礼宾车",
    brandTagline: "亚历山大及全埃及尊享机场接送与商务包车服务",
    taglineLatin: "Limousine & Airport Chauffeur Service · Alexandria, Egypt",
    nav: {
      services: "专属服务",
      fleet: "尊贵车队",
      routes: "机场路线",
      book: "即刻预订",
      contact: "联系我们",
      directWa: "WhatsApp咨询",
      admin: "后台管理"
    },
    hero: {
      kicker: "Limousine & Airport Chauffeur Service · Alexandria, Egypt",
      titleStart: "尊贵、安全与奢华尽在 ",
      titleHighlight: "每一次专车出行",
      desc: "如果您在埃及寻求安心舒适且具五星级水准的专车出行，Route X 是您的首选。现代化豪华消毒车队、着正装的专业专职司机、24/7 全天候守时准点往返埃及各机场及各省城市。",
      bookBtn: "立即预订行程",
      fleetBtn: "浏览车队与价目",
      airportsBtn: "埃及主要机场路线",
      trust1: "每日深度消毒车辆 · 统一正装司机",
      trust2: "24/7 全天候精准守时无忧接送",
      trust3: "每单尊享 10% 返现优惠",
      presidentialBadge: "总统级尊享车队",
      presidentialLocation: "亚历山大 · 埃及各大机场",
      presidentialTitle: "贵宾与商务政要专属接待"
    },
    cashback: {
      badge: "特别礼遇",
      titleStart: "限时礼遇：咨询享受行程 ",
      titleHighlight: "10% 返现",
      titleEnd: " 优惠",
      desc: "立即通过 WhatsApp 联系客服，领取机场接送及省际包车专属即时返现。",
      cta: "WhatsApp 咨询返现",
      inquiryMsg: "您好，我想咨询 Route X 专车出行的 10% 返现活动详情"
    },
    routes: {
      kicker: "快捷省际与机场专线",
      title: "热门目的地与即时距离计价器",
      desc: "点击任意机场或城市，系统将自动填充出发地、目的地与参考里程，并即时计算估算费用。",
      calcNow: "立即测算费用",
      fromPrefix: "出发自 ",
      approxKm: "公里（约）",
      items: [
        {
          id: "hbe",
          name: "博格埃尔阿拉伯国际机场 (HBE)",
          from: "亚历山大市中心 / 斯穆哈区",
          to: "博格埃尔阿拉伯国际机场",
          approxKm: 50,
          highlight: "到达大厅举牌接机，航站楼快速通行"
        },
        {
          id: "cai",
          name: "开罗国际机场 (CAI)",
          from: "亚历山大",
          to: "开罗国际机场 1/2/3 号航站楼",
          approxKm: 220,
          highlight: "走沙漠高速直达开罗，配备高端服务区休息安排"
        },
        {
          id: "spx",
          name: "狮身人面像国际机场 (SPX)",
          from: "亚历山大",
          to: "狮身人面像国际机场（开罗西区）",
          approxKm: 195,
          highlight: "靠近西开罗、十月六日城与吉萨金字塔群"
        },
        {
          id: "dbb",
          name: "阿拉曼国际机场 (DBB)",
          from: "亚历山大",
          to: "阿拉曼国际机场",
          approxKm: 135,
          highlight: "前往新阿拉曼城与地中海北海岸度假胜地之首选"
        },
        {
          id: "marassi",
          name: "北部地中海海岸（Marassi / Marina 度假区）",
          from: "亚历山大",
          to: "北部海岸 Marassi / Marina",
          approxKm: 140,
          highlight: "尊享度假旅程，免除自驾疲劳"
        },
        {
          id: "cairo-east",
          name: "新开罗及第五聚居区 (New Cairo)",
          from: "亚历山大",
          to: "新开罗 / 第五聚居区",
          approxKm: 245,
          highlight: "直达高端商务中心、使馆区及高端社区"
        }
      ]
    },
    services: {
      kicker: "尊享服务",
      title: "全方位豪华商务礼宾车出行方案",
      desc: "无论您是独自商务出差、接待重要外宾，还是与家人尊享度假时光。",
      uniformChauffeur: "正装专职私人司机",
      items: [
        {
          id: "s1",
          title: "埃及各大机场 VIP 接送机",
          desc: "从降落到目的地全程尊享贵宾待遇，实时追踪航班时刻并在出站口举牌致意。"
        },
        {
          id: "s2",
          title: "亚历山大市内奢华包车",
          desc: "空调豪华专车舒适穿行亚历山大，正装司机谙熟最优路线，保障静谧高效。"
        },
        {
          id: "s3",
          title: "省际长途与商务穿梭",
          desc: "安全舒适连通开罗、北部海岸、马特鲁、沙姆沙伊赫、赫尔格达及坦塔等城市。"
        },
        {
          id: "s4",
          title: "商务会议、重要活动与私享出游",
          desc: "彰显尊崇身份：无论高规格商务会晤、跨国论坛，还是高品质家庭包车游览。"
        }
      ]
    },
    fleet: {
      kicker: "Route X 顶级车队",
      title: "车型阵容与透明按公里计费",
      desc: "按实际里程透明收费，依据乘车人数与行李件数匹配最舒适的座驾。",
      selectedBadge: "当前选择",
      paxCapacity: "乘客座位：",
      upTo: "最多 ",
      passengers: " 位乘客",
      bagCapacity: "行李容量：",
      maxBags: "上限 ",
      unlimitedBags: "行李不限量",
      pricePerKm: "单价：",
      currencyPerKm: "埃镑 / 公里",
      onBooking: "预订时单独核价",
      selectCarBtn: "选择此车型"
    },
    amenities: {
      kicker: "五星级车内礼遇",
      title: "每次专车出行均享车内免费尊享礼遇",
      desc: "精心雕琢每个细节，让您置身专属移动客舱，尽享惬意。",
      items: [
        {
          id: "water",
          title: "冰镇矿泉水与消毒湿巾",
          desc: "车内免费提供密封消毒矿泉水与高端清爽湿巾"
        },
        {
          id: "chargers",
          title: "全机型高速快充接口",
          desc: "适配苹果 Lightning、Type-C 及全系列安卓手机"
        },
        {
          id: "wifi",
          title: "车载高速无线 Wi-Fi",
          desc: "车内高速网络覆盖，途中随时处理公务或娱乐"
        },
        {
          id: "quiet",
          title: "商务静音专车（Quiet Ride）",
          desc: "司机全程保持专注礼貌，为您提供静谧私密空间"
        },
        {
          id: "meet",
          title: "机场接机专属姓名举牌",
          desc: "到达大厅司机手持客户姓名指示牌迎候，指引直达专车"
        },
        {
          id: "air",
          title: "独立双区恒温净风空调",
          desc: "根据个人偏好调节温度与风速，尊享清新空气"
        }
      ]
    },
    gallery: {
      kicker: "实景影像展廊",
      title: "尊荣客舱与总统级机场迎送",
      desc: "亲眼鉴证奢华品质：机场专属迎宾与手工真皮静谧内饰。",
      interiorTag: "行政贵宾客舱",
      interiorTitle: "棕色豪华真皮行政座椅、星空顶氛围灯与办公托盘",
      airportTag: "机场专属接送",
      airportTitle: "全埃及机场航站楼到达层精准迎候"
    },
    booking: {
      badge: "智能行程计算与快捷预订",
      title: "即刻预订您的专属奢华座驾",
      desc: "填写行程信息，系统将自动核算预估里程与参考价格，并生成正规 WhatsApp 确认信息与客服即时对接。",
      tripTypeLabel: "行程类型",
      tripTypes: {
        oneway: "单程接送",
        roundtrip: "往返行程（享折扣）",
        hourly: "按小时 / 全天包车"
      },
      clientInfoTitle: "乘车人信息与联系方式",
      nameLabel: "乘车人全名",
      namePlaceholder: "例如：陈先生 / Dr. Ahmed",
      phoneLabel: "联系电话（WhatsApp）",
      phoneAltLabel: "备用电话",
      optional: "（选填）",
      routeTitle: "行程路线与地点",
      routeNotice: "可直接粘贴谷歌地图分享链接、经纬度或地址名称",
      openMap: "在地图中打开",
      fromLabel: "出发地点（上车点）",
      fromPlaceholder: "例如：亚历山大 Smouha 区或地图链接",
      coordsDetected: "✓ 已精准识别高精度地图坐标",
      viaLabel: "途中经停点 / 附加停靠",
      viaPlaceholder: "例如：途中接送随行人员或取文件",
      toLabel: "目的地（下车点）",
      toPlaceholder: "例如：博格埃尔阿拉伯机场 或 开罗国际机场",
      distanceLabel: "预估行程距离（公里，用于实时计价）",
      kmUnit: "公里 (KM)",
      openDirectionsBtn: "在谷歌地图查看精准路线与车程",
      enterLocationsNotice: "输入出发地与目的地后可预览导航路线",
      paxLuggageTitle: "乘客人数、行李件数与车型推荐",
      paxLabel: "乘客人数",
      bagsLabel: "行李件数",
      allocatedCarLabel: "为您匹配的推荐车型",
      capacityUpTo: "荷载最多 ",
      baseKmPrice: "基准里程单价：",
      customKmPrice: "该车型价格在确认行程时另行确定",
      estimatedCostLabel: "预估行程参考总价：",
      enterKmNotice: "输入公里数即可查看参考价格",
      currency: "埃及镑 (EGP)",
      paxWarning: "人数超出单车最大容量，请通过 WhatsApp 联系我们安排多台车辆或 VIP 车队。",
      bagWarning: "行李数量超出该车后备箱限额，建议升级至家庭大空间商务车。",
      scheduleTitle: "用车日期、时间与航班追踪",
      dateLabel: "用车日期",
      timeLabel: "出发时间",
      flightNumberLabel: "航班号（机场接机时填写）",
      flightNumberPlaceholder: "例如：MS 800 或 EK 927",
      flightNumberHint: "系统自动追踪航班着陆状态，因延误导致的等待不收取额外费用",
      meetGreetTitle: "到达大厅举牌迎候服务 (Meet & Greet)",
      meetGreetDesc: "专属司机在行李提取后的到达口手持您的姓名牌迎候",
      amenitiesTitle: "免费车内尊享配置",
      sendWaBtn: "通过 WhatsApp 立即发送订单",
      copySummaryBtn: "复制行程单摘要",
      copiedNotice: "已复制到剪贴板！",
      waNotice: "* 点击将自动打开 WhatsApp 并附带排版完整的预约文本。客服团队将即刻确认并提供司机信息及车牌。",
      validationMissing: "请补充以下必填信息： "
    },
    reviews: {
      kicker: "贵宾评价",
      title: "跨国企业高管与政要的信赖之选",
      desc: "已为数百位驻埃外交官、商务高管及国际高端旅客提供高水准服务。",
      items: [
        {
          name: "塔里克·明沙维 博士",
          role: "大学教授兼商业顾问",
          comment: "毫不夸张地说，这是埃及最具水准的礼宾车服务之一。博格埃尔阿拉伯机场接机准点至分钟，车内极为整洁安静，之后的所有行程我都会指定 Route X。",
          trip: "亚历山大 ↔ 博格埃尔阿拉伯机场"
        },
        {
          name: "玛雅尔·谢里夫",
          role: "能源企业公关总监",
          comment: "为从开罗抵亚的欧洲专家考察团安排接送，整个接待极为专业。司机西装革履，彬彬有礼，外宾赞不绝口。",
          trip: "开罗机场 ↔ 亚历山大"
        },
        {
          name: "霍萨姆·贝海里",
          role: "科技创业者",
          comment: "公里数透明计价，没有任何隐形加价。10% 的返现优惠真实有效，往返北海岸的高速行驶体验无比惬意平稳。",
          trip: "亚历山大 ↔ 北海岸 Marassi 度假区"
        }
      ]
    },
    faq: {
      kicker: "常见疑问",
      title: "关于 Route X 专车出行的所有细节",
      items: [
        {
          q: "Route X 是如何计算行程费用的？",
          a: "费用基于公里数与所选车型完全透明结算，出发前提前核算一口价，杜绝任何隐性收费。"
        },
        {
          q: "价格是否包含高速过路费和机场停车费？",
          a: "报价清晰涵盖专职司机、燃油、空调车辆及主要高速通行税费，特殊要求均在确认前清晰列明。"
        },
        {
          q: "如果我的航班延误，司机会在机场等待吗？",
          a: "绝对会。提供航班号后，我们调度团队将实时监控航管降落动态，无论延误多久，司机都会准时迎候。"
        },
        {
          q: "支持哪些付款方式？",
          a: "我们提供多种便捷结算方式：行程结束后现金支付给司机、InstaPay、Vodafone Cash 或直接银行转账。"
        },
        {
          q: "是否支持全天包车或跨城市多日游？",
          a: "支持。我们为商务考察、重要会议、婚礼活动及高定旅游提供专属日包车与私人专职司机服务。"
        }
      ]
    },
    contact: {
      kicker: "直接联系方式",
      title: "联系 Route X 豪华礼宾团队",
      desc: "预订中心 24 小时全天候守候，竭诚为您在亚历山大及全埃及提供尊崇出行保障。",
      mainWaBadge: "主线 24/7",
      mainWaTitle: "WhatsApp 即时预约专线",
      secWa1Title: "客服与 WhatsApp 备用专线",
      secWa2Title: "第二 WhatsApp 服务号",
      emailTitle: "官方电子邮箱",
      emailSub: "商务合作、企业合同及大客户预订",
      fbTitle: "官方 Facebook 专页",
      addressTitle: "总部地理位置",
      openWa: "打开 WhatsApp",
      copyNumber: "复制号码",
      copied: "已复制",
      sendEmail: "发送邮件",
      visitPage: "浏览主页",
      viewMap: "地图定位"
    },
    footer: {
      brand: "Route X Limousine Service",
      rights: "版权所有 © 2026",
      address: "埃及 · 亚历山大 21613",
      adminLink: "后台管理"
    },
    admin: {
      loginTitle: "管理员入口登录",
      setupTitle: "创建 Route X 管理员凭证",
      loginDesc: "输入手机号与密码以管理价目、车队及服务内容。",
      setupDesc: "首次使用：请设置管理手机号码与安全密码。",
      phoneLabel: "手机号码",
      pwLabel: "访问密码",
      loginBtn: "进入管理后台",
      setupBtn: "保存并继续",
      dashTitle: "车队与费率管理控制台",
      logout: "退出登录",
      waSettingLabel: "接收订单的 WhatsApp 号码",
      carsSectionTitle: "车辆分类与每公里单价",
      addCar: "新增车型",
      colName: "车型名称",
      colMaxPax: "最大载客",
      colPrice: "每公里单价 (埃镑)",
      colBags: "行李件数上限",
      resetBtn: "重置",
      saveBtn: "保存并应用"
    }
  },

  ru: {
    brandTitle: "Route X Limousine",
    brandTagline: "Элитный лимузин-сервис и трансферы в Александрии и по всему Египту",
    taglineLatin: "Limousine & Airport Chauffeur Service · Alexandria, Egypt",
    nav: {
      services: "Услуги",
      fleet: "Автопарк и тарифы",
      routes: "Аэропорты и маршруты",
      book: "Забронировать",
      contact: "Контакты",
      directWa: "WhatsApp",
      admin: "Кабинет"
    },
    hero: {
      kicker: "Limousine & Airport Chauffeur Service · Alexandria, Egypt",
      titleStart: "Комфорт, безопасность и роскошь в ",
      titleHighlight: "каждой VIP-поездке",
      desc: "Если вы ищете премиальный трансфер пятизвездочного уровня в Египте, Route X — ваш лучший выбор. Современный парк стерильных кондиционированных авто, учтивые водители в строгих костюмах и точность 24/7 во всех аэропортах и городах Египта.",
      bookBtn: "Забронировать поездку",
      fleetBtn: "Автопарк и цены",
      airportsBtn: "Трансферы в аэропорты",
      trust1: "Стерильные автомобили и водители в костюмах",
      trust2: "Идеальная пунктуальность 24/7",
      trust3: "10% кэшбэк на каждую поездку",
      presidentialBadge: "Президентский автопарк",
      presidentialLocation: "Александрия · Аэропорты Египта",
      presidentialTitle: "VIP-сервис для деловых людей"
    },
    cashback: {
      badge: "Спецпредложение",
      titleStart: "Спецпредложение: получите ",
      titleHighlight: "10% кэшбэк",
      titleEnd: " за поездку",
      desc: "Напишите нам в WhatsApp прямо сейчас, чтобы активировать моментальный кэшбэк на поездки в аэропорт и междугородние трансферы.",
      cta: "Узнать о кэшбэке",
      inquiryMsg: "Здравствуйте! Хочу узнать подробнее об акции с 10% кэшбэком на трансфер Route X."
    },
    routes: {
      kicker: "Быстрые маршруты в аэропорты",
      title: "Популярные направления и мгновенный расчет расстояния",
      desc: "Нажмите на любой аэропорт или курорт, и система автоматически рассчитает точное расстояние и ориентировочную стоимость.",
      calcNow: "Рассчитать тариф",
      fromPrefix: "Из: ",
      approxKm: "км (прим.)",
      items: [
        {
          id: "hbe",
          name: "Международный аэропорт Борг-эль-Араб (HBE)",
          from: "Александрия (Смуха / Центр)",
          to: "Аэропорт Борг-эль-Араб",
          approxKm: 50,
          highlight: "Встреча с табличкой в зале прилета и экспресс-выезд"
        },
        {
          id: "cai",
          name: "Международный аэропорт Каира (CAI)",
          from: "Александрия",
          to: "Аэропорт Каира - Терминалы 1/2/3",
          approxKm: 220,
          highlight: "Прямой трансфер по скоростной трассе с комфортными остановками"
        },
        {
          id: "spx",
          name: "Международный аэропорт Сфинкс (SPX)",
          from: "Александрия",
          to: "Аэропорт Сфинкс (Западный Каир)",
          approxKm: 195,
          highlight: "Ближайший аэропорт к пирамидам Гизы и 6 Октября"
        },
        {
          id: "dbb",
          name: "Международный аэропорт Эль-Аламейн (DBB)",
          from: "Александрия",
          to: "Аэропорт Эль-Аламейн",
          approxKm: 135,
          highlight: "Главный аэропорт для курортов Северного побережья"
        },
        {
          id: "marassi",
          name: "Северное побережье (Марасси / Марина / Гасиенда)",
          from: "Александрия",
          to: "Северное побережье - Marassi / Marina",
          approxKm: 140,
          highlight: "Премиальный отдых без усталости за рулем"
        },
        {
          id: "cairo-east",
          name: "Новый Каир и 5-й Сетлмент",
          from: "Александрия",
          to: "Новый Каир / 5th Settlement",
          approxKm: 245,
          highlight: "Прямой трансфер в дипломатические и деловые кварталы"
        }
      ]
    },
    services: {
      kicker: "Наши услуги",
      title: "Полный спектр VIP-перевозок для любого повода",
      desc: "Для деловых визитов, трансферов делегаций, свадебных кортежей или семейного отдыха.",
      uniformChauffeur: "Личный водитель в костюме",
      items: [
        {
          id: "s1",
          title: "Трансфер во все аэропорты Египта",
          desc: "VIP-встреча с персональной табличкой, отслеживание времени рейса и бережная доставка багажа."
        },
        {
          id: "s2",
          title: "Поездки по Александрии",
          desc: "Комфортное передвижение по городу в прохладном салоне с вежливым водителем."
        },
        {
          id: "s3",
          title: "Междугородние поездки по Египту",
          desc: "Безопасные рейсы в Каир, Северное побережье, Эль-Аламейн, Матрух, Хургаду, Шарм-эль-Шейх."
        },
        {
          id: "s4",
          title: "Бизнес, мероприятия и отдых",
          desc: "Соответствие вашему статусу: деловые переговоры, дипломатические встречи и элитные семейные выезды."
        }
      ]
    },
    fleet: {
      kicker: "Автопарк Route X",
      title: "Модели автомобилей и прозрачные тарифы за километр",
      desc: "Оплата строго по километражу, автомобиль подбирается под количество пассажиров и багаж.",
      selectedBadge: "Выбран",
      paxCapacity: "Вместимость пассажиров:",
      upTo: "До ",
      passengers: " человек",
      bagCapacity: "Вместимость багажа:",
      maxBags: "Макс. ",
      unlimitedBags: "Без ограничений",
      pricePerKm: "Тариф за км:",
      currencyPerKm: "EGP / км",
      onBooking: "По запросу",
      selectCarBtn: "Выбрать этот авто"
    },
    amenities: {
      kicker: "Стандарты гостеприимства",
      title: "Бесплатные опции в каждой поездке",
      desc: "Каждая деталь продумана для вашего абсолютного расслабления в салоне бизнес-класса.",
      items: [
        {
          id: "water",
          title: "Охлажденная минеральная вода и салфетки",
          desc: "Бутилированная питьевая вода и влажные салфетки бесплатно в каждом рейсе"
        },
        {
          id: "chargers",
          title: "Быстрые зарядные устройства",
          desc: "Универсальные разъемы для iPhone, Type-C и Android"
        },
        {
          id: "wifi",
          title: "Скоростной Wi-Fi в автомобиле",
          desc: "Надежный интернет в пути для работы или связи"
        },
        {
          id: "quiet",
          title: "Режим тишины в поездке (Quiet Ride)",
          desc: "Водитель соблюдает полную тишину для вашей сосредоточенной работы или сна"
        },
        {
          id: "meet",
          title: "Встреча с именной табличкой в аэропорту",
          desc: "Водитель ждет в зале прилета сразу после выхода из зоны багажа"
        },
        {
          id: "air",
          title: "Климат-контроль по вашему выбору",
          desc: "Индивидуальная настройка кондиционера под комфортную вам температуру"
        }
      ]
    },
    gallery: {
      kicker: "Реальные фото",
      title: "Интерьер бизнес-класса и встреча в аэропорту",
      desc: "Оцените атмосферу: безупречный салон из мягкой кожи и персональная подача к терминалу.",
      interiorTag: "Представительский салон",
      interiorTitle: "Кожаные кресла, звездное небо на потолке и столик для работы",
      airportTag: "Встречи в аэропорту",
      airportTitle: "Точная подача к терминалам прибытия по всему Египту"
    },
    booking: {
      badge: "Калькулятор тарифа и бронирование",
      title: "Забронируйте поездку прямо сейчас",
      desc: "Заполните данные поездки: система рассчитает примерную стоимость и сформирует официальное сообщение в WhatsApp.",
      tripTypeLabel: "Тип поездки",
      tripTypes: {
        oneway: "В одну сторону",
        roundtrip: "Туда и обратно (скидка)",
        hourly: "Аренда с водителем на день"
      },
      clientInfoTitle: "Контактные данные пассажира",
      nameLabel: "ФИО пассажира",
      namePlaceholder: "Например: Dr. Ahmed / Иван Смирнов",
      phoneLabel: "Номер телефона (WhatsApp)",
      phoneAltLabel: "Дополнительный номер",
      optional: "(необязательно)",
      routeTitle: "Маршрут и точки поездки",
      routeNotice: "Можно вставить ссылку Google Maps, координаты или текстовый адрес",
      openMap: "Открыть карту",
      fromLabel: "Точка отправления (посадка)",
      fromPlaceholder: "Например: Александрия, Смуха или ссылка на карту",
      coordsDetected: "✓ Точные GPS-координаты успешно определены",
      viaLabel: "Промежуточная остановка в пути",
      viaPlaceholder: "Например: забрать коллегу или заехать по адресу",
      toLabel: "Точка назначения (высадка)",
      toPlaceholder: "Например: Аэропорт Борг-эль-Араб или Аэропорт Каира",
      distanceLabel: "Примерное расстояние в км (для моментального расчета)",
      kmUnit: "км (KM)",
      openDirectionsBtn: "Посмотреть маршрут и километраж на Google Maps",
      enterLocationsNotice: "Укажите точки отправления и прибытия для просмотра маршрута",
      paxLuggageTitle: "Пассажиры, багаж и подбор авто",
      paxLabel: "Количество пассажиров",
      bagsLabel: "Количество чемоданов",
      allocatedCarLabel: "Рекомендуемый класс авто",
      capacityUpTo: "Вместимость до ",
      baseKmPrice: "Базовый тариф за км: ",
      customKmPrice: "Тариф рассчитывается индивидуально",
      estimatedCostLabel: "Ориентировочная стоимость поездки:",
      enterKmNotice: "Введите километраж для расчета стоимости",
      currency: "EGP (егип. фунтов)",
      paxWarning: "Количество пассажиров превышает вместимость одного авто. Свяжитесь с нами в WhatsApp для подачи двух машин или микроавтобуса.",
      bagWarning: "Количество багажа превышает объем багажника. Рекомендуем выбрать минивэн или семейный миниавтобус.",
      scheduleTitle: "Дата, время и рейс",
      dateLabel: "Дата поездки",
      timeLabel: "Время отправления",
      flightNumberLabel: "Номер рейса (при встрече в аэропорту)",
      flightNumberPlaceholder: "Например: MS 800 или SU 400",
      flightNumberHint: "Мы следим за фактическим временем посадки, ожидание при задержке рейса бесплатно",
      meetGreetTitle: "Услуга встречи с табличкой (Meet & Greet)",
      meetGreetDesc: "Водитель ожидает в терминале с табличкой с вашим именем",
      amenitiesTitle: "Бесплатные удобства в салоне",
      sendWaBtn: "Отправить заказ через WhatsApp",
      copySummaryBtn: "Скопировать детали заказа",
      copiedNotice: "Скопировано в буфер обмена!",
      waNotice: "* Кнопка откроет диалог в WhatsApp с уже готовым текстом заказа. Менеджер сразу подтвердит бронь и отправит контакты водителя.",
      validationMissing: "Пожалуйста, заполните обязательные поля: "
    },
    reviews: {
      kicker: "Отзывы клиентов",
      title: "Доверие руководителей и путешественников",
      desc: "Обслуживаем сотни дипломатов, топ-менеджеров и туристов со всего мира.",
      items: [
        {
          name: "Д-р Тарек Эль-Миншави",
          role: "Профессор и бизнес-консультант",
          comment: "Без преувеличения, один из лучших лимузин-сервисов в Египте. Минута в минуту в аэропорту Борг-эль-Араб, безупречная чистота и плавный ход. Доверяю им все свои рейсы.",
          trip: "Александрия ↔ Аэропорт Борг-эль-Араб"
        },
        {
          name: "Майяр Эль-Шериф",
          role: "PR-директор энергетической компании",
          comment: "Идеально организованный трансфер для европейских партнеров из Каира в Александрию. Водитель был в безукоризненном костюме, очень вежлив и профессионален.",
          trip: "Аэропорт Каира ↔ Александрия"
        },
        {
          name: "Хоссам Эль-Бехейри",
          role: "Технологический предприниматель",
          comment: "Честная оплата по километражу без скрытых наценок. Кэшбэк 10% начислили сразу, а поездка на Северное побережье прошла в абсолютном спокойствии.",
          trip: "Александрия ↔ Марасси (Северное побережье)"
        }
      ]
    },
    faq: {
      kicker: "Частые вопросы",
      title: "Все о заказе лимузина в Route X",
      items: [
        {
          q: "Как рассчитывается стоимость поездки в Route X?",
          a: "Расчет строится прозрачно на основе километров и класса выбранного автомобиля. Цена фиксируется заранее до выезда."
        },
        {
          q: "Включены ли в тариф платные дороги и сборы?",
          a: "Все условия оговариваются заранее: в стоимость входит автомобиль, бензин, услуги водителя и основные дорожные сборы."
        },
        {
          q: "Что, если самолет задерживается?",
          a: "Никаких проблем. Указав номер рейса, вы позволяете диспетчеру отслеживать статус борта онлайн, и водитель приедет точно к посадке."
        },
        {
          q: "Какие способы оплаты доступны?",
          a: "Наличными водителю, переводом через InstaPay, Vodafone Cash или прямым банковским переводом."
        },
        {
          q: "Можно ли заказать авто с водителем на целый день?",
          a: "Да, мы предоставляем услугу личного водителя на день для деловых поездок, свадеб и экскурсий по индивидуальным тарифам."
        }
      ]
    },
    contact: {
      kicker: "Прямые контакты",
      title: "Свяжитесь с Route X Limousine",
      desc: "Диспетчерская служба работает круглосуточно 24/7 по всей Александрии и Египту.",
      mainWaBadge: "Основная линия 24/7",
      mainWaTitle: "Срочное бронирование в WhatsApp",
      secWa1Title: "WhatsApp и служба поддержки",
      secWa2Title: "Второй номер WhatsApp",
      emailTitle: "Электронная почта",
      emailSub: "Для корпоративных договоров и счетов",
      fbTitle: "Официальная страница Facebook",
      addressTitle: "Физический адрес офиса",
      openWa: "Написать в WhatsApp",
      copyNumber: "Скопировать",
      copied: "Скопировано",
      sendEmail: "Написать письмо",
      visitPage: "Перейти на страницу",
      viewMap: "Показать на карте"
    },
    footer: {
      brand: "Route X Limousine Service",
      rights: "Все права защищены © 2026",
      address: "Александрия, Египет 21613",
      adminLink: "Панель управления"
    },
    admin: {
      loginTitle: "Вход в панель управления",
      setupTitle: "Создание учетной записи администратора",
      loginDesc: "Введите номер телефона и пароль для редактирования тарифов и автопарка.",
      setupDesc: "Первый вход: укажите номер телефона и пароль администратора.",
      phoneLabel: "Номер телефона",
      pwLabel: "Пароль",
      loginBtn: "Войти в кабинет",
      setupBtn: "Сохранить и продолжить",
      dashTitle: "Управление автопарком и тарифами",
      logout: "Выйти",
      waSettingLabel: "Номер WhatsApp для приема заказов",
      carsSectionTitle: "Классы автомобилей и тариф за км",
      addCar: "Добавить автомобиль",
      colName: "Название класса",
      colMaxPax: "Макс. пассажиров",
      colPrice: "Тариф / км (EGP)",
      colBags: "Лимит багажа",
      resetBtn: "Сбросить",
      saveBtn: "Сохранить и применить"
    }
  }
};
