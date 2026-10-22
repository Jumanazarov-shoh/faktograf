/**
 * FaktorGraf - Sintetik Demo Ma'lumotlar To'plami
 * 
 * DIQQAT: Ushbu ma'lumotlar haqiqiy kompaniyalar yoki real tijorat ma'lumotlari emas.
 * Ular platformaning tahlil, vizualizatsiya va anderrayting mexanizmini
 * ko'rsatish uchun yaratilgan 100% sintetik (demo) namunalardir.
 */

const SYNTHETIC_DATASETS = {
  case1: {
    id: "case1",
    title: "Agro-Sanoat Ta'minot MChJ",
    subtitle: "Barqaror ta'minotchi ssenariysi (Chakana savdo va logistika)",
    typeBadge: "Sintetik Demo #1",
    fileLabel: "ehf_q3_2024_pilot.xlsx",
    stir: "301 294 821",
    totalTurnover: "1 480 000 000 UZS",
    totalTurnoverNum: 1480000000,
    invoiceCount: 42,
    dateRange: "2024-05-01 — 2024-09-30 (5 oy)",
    eligibleInvoicesShare: "86%",
    eligibleInvoicesCount: 36,
    flaggedInvoicesCount: 6,
    recommendedLimit: "760 000 000 UZS",
    recommendedLimitNum: 760000000,
    concentrationStatus: "O'rtacha konsentratsiya (Eng yirik debitor: 58%)",
    dataQualityScore: "94% (Fayl sintaksisi va ustunlar to'liqligi)",
    evidenceCoverageScore: "Sintetik demo farazi: 78% (Mustaqil tashqi reyestr ulanmagan; ko'rsatkich shartli olingan)",
    summaryDescription: "Yetkazib beruvchi 3 ta asosiy xaridor bilan ishlaydi. Aloqalar yo'nalishi bir tomonlama, aylanma barqaror. Asosiy e'tibor yagona xaridor ulushini (58%) risk siyosatiga moslashtirishga qaratiladi.",
    
    // Hero preview selected invoice
    heroSelectedInvoice: {
      id: "EHF-2024-8841",
      buyer: "Korzinka Tarmog‘i MChJ",
      sum: "125 000 000 UZS",
      dueDate: "45 kun (DSO proxy: 38 kun)",
      statusText: "Yaroqli (Eligible)",
      statusClass: "badge-status-eligible",
      checkNote: "Sintetik demo farazi: qabul dalolatnomasi bor deb hisoblangan (qarshi EHF yo‘q)"
    },

    // Hero preview waterfall
    heroWaterfall: [
      { label: "1. Jami tahlil qilingan EHF:", amount: "1 480 000 000 UZS", type: "base" },
      { label: "2. Kechikayotgan fakturalar chegirishi:", amount: "-170 000 000 UZS", type: "deduct" },
      { label: "3. Debitor konsentratsiya filtri (maks. 50%):", amount: "-360 000 000 UZS", type: "deduct" },
      { label: "4. Standart avans ulushi (80%):", amount: "760 000 000 UZS", type: "subtotal" },
      { label: "Tavsiya etilgan dastlabki limit:", amount: "760 000 000 UZS", type: "final" }
    ],

    // Nodes for Supply Chain Graph
    graph: {
      nodes: [
        { id: "supplier", label: "Agro-Sanoat Ta'minot MChJ", type: "supplier", stir: "301294821", role: "Yetkazib beruvchi (Bosh subyekt)", volume: "1.48 mlrd UZS", x: 260, y: 190, status: "active" },
        { id: "buyer1", label: "Korzinka Tarmog'i MChJ", type: "buyer", stir: "200492110", role: "Yirik supermarket tarmog'i", volume: "860 mln UZS (58%)", x: 620, y: 80, status: "eligible", dso: "38 kun" },
        { id: "buyer2", label: "Baraka Logistics XK", type: "buyer", stir: "305118944", role: "Distribyutor & logistika", volume: "380 mln UZS (26%)", x: 650, y: 200, status: "eligible", dso: "28 kun" },
        { id: "buyer3", label: "Voha Distribution MChJ", type: "buyer", stir: "309441203", role: "Hududiy ulgurji xaridor", volume: "240 mln UZS (16%)", x: 610, y: 320, status: "review", dso: "62 kun" }
      ],
      edges: [
        { from: "supplier", to: "buyer1", label: "860M UZS (22 ta EHF)", status: "normal", avgPayment: "38 kun", cycle: false, reciprocal: false },
        { from: "supplier", to: "buyer2", label: "380M UZS (14 ta EHF)", status: "normal", avgPayment: "28 kun", cycle: false, reciprocal: false },
        { from: "supplier", to: "buyer3", label: "240M UZS (6 ta EHF)", status: "warning", avgPayment: "62 kun (Kechikish)", cycle: false, reciprocal: false }
      ]
    },

    // Transaction Patterns
    patterns: [
      {
        id: "p1",
        title: "Yopiq sikl (Closed Loop)",
        status: "passed",
        statusText: "Aniqlanmadi (0)",
        badgeClass: "badge-status-eligible",
        description: "A -> B -> C -> A ko'rinishidagi yopiq tovar yoki to'lov sikllari topilmadi. Oqimlar bir tomonlama."
      },
      {
        id: "p2",
        title: "O'zaro savdo (Reciprocal Trade)",
        status: "passed",
        statusText: "Aniqlanmadi (0)",
        badgeClass: "badge-status-eligible",
        description: "Xaridorlar tomonidan yetkazib beruvchi nomiga qarshi-EHF hisob-fakturalar aniqlanmadi."
      },
      {
        id: "p3",
        title: "Dublikat va o'xshash invoice'lar",
        status: "attention",
        statusText: "1 ta tekshiruv signali",
        badgeClass: "badge-status-review",
        description: "Voha Distribution bo'yicha 1 ta EHF sanasi va summasi o'xshash takrorlanish belgisi qayd etildi (inson ko'rigi talab)."
      },
      {
        id: "p4",
        title: "Xaridor konsentratsiyasi",
        status: "warning",
        statusText: "58% (E'tibor talab)",
        badgeClass: "badge-status-review",
        description: "Eng yirik debitor (Korzinka Tarmog'i) aylanmaning 58% ini tashkil qiladi. Bitta debitorga ajratiladigan limit normasi tatbiq etildi."
      }
    ],

    // Explainable Limit Waterfall steps (Matematik jihatdan 100% izchil)
    // 1 480M - 170M = 1 310M; 1 310M - 360M = 950M; 950M * 80% = 760M UZS.
    limitWaterfall: [
      { step: "1. Jami tahlil qilingan EHF aylanmasi", amount: "1 480 000 000 UZS", impact: "Boshlang'ich baza", type: "base" },
      { step: "2. Muddati o'tgan yoki kechikayotgan EHF'larni chiqarish", amount: "-170 000 000 UZS", impact: "Voha Distribution bo'yicha kechikayotgan 4 ta EHF", type: "deduct" },
      { step: "3. To'lov kutilayotgan yaroqli portfel", amount: "1 310 000 000 UZS", impact: "Kechikishlardan tozalangan baza (1 480M - 170M)", type: "subtotal" },
      { step: "4. Yagona debitor konsentratsiya filtri (maks. 50%)", amount: "-360 000 000 UZS", impact: "Korzinka ulushi normaga moslashtirildi (1 310M - 360M = 950M)", type: "deduct" },
      { step: "5. Standart factoring avans koeffitsienti (80%)", amount: "760 000 000 UZS", impact: "950M UZS bazaning 80% qismi", type: "subtotal" },
      { step: "6. Tavsiya etilgan dastlabki limit", amount: "760 000 000 UZS", impact: "Matematik jihatdan to'liq mos keluvchi dastlabki taklif", type: "final" }
    ],

    whyLimitNotHigher: [
      "Korzinka Tarmog'i aylanmasi 860M bo'lsa-da, bitta xaridorda risk to'planmasligi uchun konsentratsiya filtri orqali 360M UZS chegirildi.",
      "Voha Distribution bo'yicha to'lov muddati 62 kunga cho'zilgan 170M UZS lik fakturalar dastlabki bazadan chiqarildi.",
      "Tashqi bank va soliq integratsiyalari ulanmagani sababli, limit faqat yuklangan sintetik demo EHF ma'lumotlari asosida konservativ 80% avans bilan chegaralandi."
    ],

    // Sample Invoices (Manbalar sintetik demo farazi deb aniq ko'rsatilgan)
    sampleInvoices: [
      { id: "EHF-2024-8841", buyer: "Korzinka Tarmog'i MChJ", sum: "125 000 000 UZS", date: "2024-09-15", status: "Yaroqli", statusClass: "status-success", check: "Muddati: 45 kun. Sintetik demo farazi: tovar qabul dalolatnomasi bor deb hisoblangan." },
      { id: "EHF-2024-8890", buyer: "Korzinka Tarmog'i MChJ", sum: "94 500 000 UZS", date: "2024-09-22", status: "Yaroqli", statusClass: "status-success", check: "Muddati: 45 kun. Sintetik demo farazi: tovar yetkazib berilganligi simulyatsiya qilingan (ETTYX ulanmagan)." },
      { id: "EHF-2024-7712", buyer: "Baraka Logistics XK", sum: "78 000 000 UZS", date: "2024-09-18", status: "Yaroqli", statusClass: "status-success", check: "Muddati: 30 kun. Sintetik demo farazi: o'tgan fakturalar o'z vaqtida yopilgan deb qabul qilingan (bank ko'chirmasi ulanmagan)." },
      { id: "EHF-2024-6501", buyer: "Voha Distribution MChJ", sum: "65 000 000 UZS", date: "2024-08-05", status: "Ko'rik talab", statusClass: "status-warning", check: "To'lov muddati 22 kunga kechikmoqda. Anderrayter izohi va muddat tekshiruvi talab." },
      { id: "EHF-2024-6502", buyer: "Voha Distribution MChJ", sum: "65 000 000 UZS", date: "2024-08-06", status: "O'xshash dublikat", statusClass: "status-danger", check: "EHF-6501 bilan summa va tovar o'xshash. Texnik takrorlanish belgisi (inson ko'rigi zarur)." }
    ],

    // Stress testing ssenariylari
    stressScenarios: {
      base: {
        heading: "Baza holati: Standart to‘lov shartlari",
        detail: "Xaridorlar to‘lov muddatlari shartnoma oralig‘ida (28-45 kun).",
        capacityVal: "100% (760M UZS)",
        capacityColor: "var(--accent-forest)"
      },
      delay: {
        heading: "Shok 1: Asosiy debitor (Korzinka) to‘lovining 30 kunga kechikishi",
        detail: "To‘lov muddati 38 kundan 68 kunga cho‘ziladi; aylanma tezligi pasayishi limit sig‘imini qisqartiradi.",
        capacityVal: "-35% (~494M UZS)",
        capacityColor: "var(--status-review-text)"
      },
      exit: {
        heading: "Shok 2: Yagona yirik debitorni (58% ulush) yo‘qotish ssenariysi",
        detail: "58% aylanma to‘xtaydi; portfel faqat kichik xaridorlar hisobiga cheklanadi.",
        capacityVal: "-58% (~319M UZS)",
        capacityColor: "var(--status-flag-text)"
      }
    }
  },

  case2: {
    id: "case2",
    title: "Tekstil Eksport Servis MChJ",
    subtitle: "Murakkab zanjir ssenariysi (O'zaro savdo va tarmoq sikli signallari)",
    typeBadge: "Sintetik Demo #2",
    fileLabel: "ehf_textile_2024_pilot.xlsx",
    stir: "308 119 204",
    totalTurnover: "2 350 000 000 UZS",
    totalTurnoverNum: 2350000000,
    invoiceCount: 68,
    dateRange: "2024-04-01 — 2024-09-30 (6 oy)",
    eligibleInvoicesShare: "32%",
    eligibleInvoicesCount: 22,
    flaggedInvoicesCount: 46,
    recommendedLimit: "600 000 000 UZS",
    recommendedLimitNum: 600000000,
    concentrationStatus: "O'zaro savdo (Reciprocal) va siklik aloqalar aniqlandi",
    dataQualityScore: "88% (Fayl sintaksisi to'g'ri, yozuvlar mavjud)",
    evidenceCoverageScore: "Sintetik demo farazi: 52% (Qarshi tomon fakturalari tekshiruvda; reyestrlar ulanmagan)",
    summaryDescription: "EHF oqimlarida o'zaro savdo (Ipak Yo'li bilan 210M qarshi EHF) hamda aylanma sikl (Namangan Ip-Yigiruv) aniqlangan. Ushbu xatarlar sababli limit faqat yagona mustaqil xaridor — Toshkent Kiyim Savdo aylanmasi bo'yicha hisoblandi.",
    
    // Hero preview selected invoice
    heroSelectedInvoice: {
      id: "EHF-TXT-0911",
      buyer: "Toshkent Kiyim Savdo MChJ",
      sum: "180 000 000 UZS",
      dueDate: "30 kun (DSO proxy: 32 kun)",
      statusText: "Yaroqli (Eligible)",
      statusClass: "badge-status-eligible",
      checkNote: "Sintetik demo farazi: mustaqil xaridor, tovar yetkazilgan deb hisoblangan (sikllar yo‘q)"
    },

    // Hero preview waterfall (Case 2)
    heroWaterfall: [
      { label: "1. Jami tahlil qilingan EHF:", amount: "2 350 000 000 UZS", type: "base" },
      { label: "2. O‘zaro savdo signali (Ipak Yo‘li):", amount: "-920 000 000 UZS", type: "deduct" },
      { label: "3. Yopiq sikl signali (Namangan Ip-Yigiruv):", amount: "-680 000 000 UZS", type: "deduct" },
      { label: "4. Sof mustaqil portfel (Toshkent Kiyim Savdo):", amount: "750 000 000 UZS", type: "subtotal" },
      { label: "Tavsiya etilgan dastlabki limit (80%):", amount: "600 000 000 UZS", type: "final" }
    ],

    graph: {
      nodes: [
        { id: "supplier", label: "Tekstil Eksport Servis MChJ", type: "supplier", stir: "308119204", role: "Yetkazib beruvchi (Bosh subyekt)", volume: "2.35 mlrd UZS", x: 260, y: 190, status: "active" },
        { id: "buyer1", label: "Ipak Yo'li Fabrika MChJ", type: "buyer", stir: "201884321", role: "O'zaro savdo aniqlangan hamkor", volume: "920 mln UZS (O'zaro 210M)", x: 620, y: 80, status: "danger", dso: "45 kun" },
        { id: "buyer2", label: "Namangan Ip-Yigiruv MChJ", type: "buyer", stir: "302778109", role: "Siklik zanjir qatnashchisi", volume: "680 mln UZS", x: 650, y: 220, status: "warning", dso: "50 kun" },
        { id: "buyer3", label: "Toshkent Kiyim Savdo MChJ", type: "buyer", stir: "307449012", role: "Mustaqil chakana distribyutor", volume: "750 mln UZS", x: 610, y: 340, status: "eligible", dso: "32 kun" }
      ],
      edges: [
        { from: "supplier", to: "buyer1", label: "920M UZS (Asosiy oqim)", status: "danger", avgPayment: "45 kun", cycle: false, reciprocal: true },
        { from: "buyer1", to: "supplier", label: "210M UZS (Qarshi EHF!)", status: "danger", avgPayment: "O'zaro hisob-kitob", cycle: false, reciprocal: true },
        { from: "supplier", to: "buyer2", label: "680M UZS", status: "warning", avgPayment: "50 kun", cycle: true, reciprocal: false },
        { from: "buyer2", to: "buyer1", label: "340M UZS (3-zveno)", status: "warning", avgPayment: "Sikl signali", cycle: true, reciprocal: false },
        { from: "supplier", to: "buyer3", label: "750M UZS (Mustaqil)", status: "normal", avgPayment: "32 kun", cycle: false, reciprocal: false }
      ]
    },

    patterns: [
      {
        id: "p1",
        title: "Yopiq sikl (Closed Loop)",
        status: "danger",
        statusText: "1 ta zanjir aniqlandi (A -> B -> C)",
        badgeClass: "badge-status-flag",
        description: "Tekstil Eksport -> Namangan Ip-Yigiruv -> Ipak Yo'li yo'nalishida aylanma hisob-faktura oqimi mavjud (tovar harakati auditi zarur)."
      },
      {
        id: "p2",
        title: "O'zaro savdo (Reciprocal Trade)",
        status: "danger",
        statusText: "Aniqlangan (210 mln UZS qarshi EHF)",
        badgeClass: "badge-status-flag",
        description: "Ipak Yo'li Fabrika MChJ yetkazib beruvchiga 210 mln so'mlik teskari hisob-faktura yozgan. O'zaro hisob-kitob (vzaimozachot) xavfi sababli bu xaridor chiqarildi."
      },
      {
        id: "p3",
        title: "Dublikat va o'xshash invoice'lar",
        status: "passed",
        statusText: "Aniqlanmadi (0)",
        badgeClass: "badge-status-eligible",
        description: "To'g'ridan-to'g'ri dublikat yoki takroriy raqamli EHF hisob-fakturalar aniqlanmadi."
      },
      {
        id: "p4",
        title: "Xaridor konsentratsiyasi",
        status: "passed",
        statusText: "39% (Normada)",
        badgeClass: "badge-status-eligible",
        description: "Boshlang'ich EHF aylanmasida hech bir debitor 40% dan oshmaydi, biroq xatarli debitorlar chiqarilgach yagona mustaqil xaridor qoladi."
      }
    ],

    // Explainable Limit Waterfall steps (Matematik jihatdan 100% izchil va aniq)
    // 2 350M - 920M (Ipak Yo'li) - 680M (Namangan) = 750M (Faqat Toshkent Kiyim Savdo).
    // 750M * 80% = 600 000 000 UZS.
    limitWaterfall: [
      { step: "1. Jami tahlil qilingan EHF aylanmasi", amount: "2 350 000 000 UZS", impact: "Boshlang'ich baza (3 ta xaridor)", type: "base" },
      { step: "2. O'zaro savdo signali: Ipak Yo'li portfelini chiqarish", amount: "-920 000 000 UZS", impact: "210M qarshi EHF va offset xatari sababli to'liq chiqarildi", type: "deduct" },
      { step: "3. Yopiq sikl signali: Namangan Ip-Yigiruv aylanmasini muzlatish", amount: "-680 000 000 UZS", impact: "3 tomonlama sikl auditi yakunlanguncha to'liq to'xtatildi", type: "deduct" },
      { step: "4. Sof mustaqil yaroqli portfel (Faqat Toshkent Kiyim Savdo)", amount: "750 000 000 UZS", impact: "Faqat shubhasiz uchinchi mustaqil debitor (2 350M - 920M - 680M)", type: "subtotal" },
      { step: "5. Standart avans koeffitsienti (80%)", amount: "600 000 000 UZS", impact: "Mustaqil 750M UZS aylanmaga 80% avans qo'llanildi", type: "subtotal" },
      { step: "6. Tavsiya etilgan dastlabki limit", amount: "600 000 000 UZS", impact: "Faqat mustaqil distribyutor portfeli bo'yicha yakuniy taklif", type: "final" }
    ],

    whyLimitNotHigher: [
      "Ipak Yo'li Fabrika MChJ bilan 210M UZS lik qarshi EHF aniqlangani sababli, ushbu xaridorning butun 920M UZS aylanmasi o'zaro hisob-kitob (vzaimozachot) xavfi tufayli chiqarildi.",
      "Namangan Ip-Yigiruv MChJ zanjirida aylanma sikl signali topilgani sababli 680M UZS shartnoma auditi yakunlanguncha to'liq muzlatildi.",
      "Dastlabki limit faqat hech qanday shubha uyg'otmagan mustaqil xaridor — Toshkent Kiyim Savdo (750M UZS) portfeli bo'yicha 80% avans bilan hisoblandi (600M UZS)."
    ],

    sampleInvoices: [
      { id: "EHF-TXT-0911", buyer: "Toshkent Kiyim Savdo MChJ", sum: "180 000 000 UZS", date: "2024-09-12", status: "Yaroqli", statusClass: "status-success", check: "Mustaqil xaridor. Sintetik demo farazi: yetkazib berish tasdiqlangan deb olingan (30 kun to'lov)." },
      { id: "EHF-TXT-0914", buyer: "Toshkent Kiyim Savdo MChJ", sum: "140 000 000 UZS", date: "2024-09-20", status: "Yaroqli", statusClass: "status-success", check: "Muddati: 35 kun. Shubhali belgilar yo'q (mustaqil savdo oqimi)." },
      { id: "EHF-TXT-0850", buyer: "Ipak Yo'li Fabrika MChJ", sum: "210 000 000 UZS", date: "2024-08-15", status: "O'zaro savdo signali", statusClass: "status-danger", check: "Qarshi-EHF aniqlangan. O'zaro hisob-kitob (vzaimozachot) xavfi sababli factoring uchun qabul qilinmadi." },
      { id: "EHF-TXT-0792", buyer: "Namangan Ip-Yigiruv MChJ", sum: "340 000 000 UZS", date: "2024-07-28", status: "Sikl tekshiruvi", statusClass: "status-warning", check: "Zanjirli hisob-faktura. Shartnoma va tovar harakati auditi talab etiladi." }
    ],

    // Stress testing ssenariylari (Case 2)
    stressScenarios: {
      base: {
        heading: "Baza holati: Faqat mustaqil distribyutor portfeli",
        detail: "Limit faqat toza debitor (Toshkent Kiyim Savdo) portfeli asosida 600M UZS qilib belgilangan.",
        capacityVal: "100% (600M UZS)",
        capacityColor: "var(--accent-forest)"
      },
      delay: {
        heading: "Shok 1: Mustaqil distribyutordan to‘lov 30 kunga kechikishi",
        detail: "Qolgan yagona ishonchli debitor ham to‘lovni kechiktirsa, aylanma likvidligi -25% ga kamayadi.",
        capacityVal: "-25% (~450M UZS)",
        capacityColor: "var(--status-review-text)"
      },
      exit: {
        heading: "Shok 2: Mustaqil xaridor chiqishi yoki buyurtmani to‘xtatishi",
        detail: "Boshqa xaridorlar o‘zaro savdo va sikl tufayli muzlatilgani sababli yaroqli limit to‘liq 0 gacha tushadi.",
        capacityVal: "-100% (0 UZS - muzlatilgan portfel)",
        capacityColor: "var(--status-flag-text)"
      }
    }
  }
};

window.SYNTHETIC_DATASETS = SYNTHETIC_DATASETS;
