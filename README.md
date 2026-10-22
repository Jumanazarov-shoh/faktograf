# FaktorGraf — B2B SaaS Minimal Marketing Sayti

**FaktorGraf** — O‘zbekistonda elektron hisob-fakturalar (EHF) asosida ta’minot zanjiri munosabatlarini tahlil qiluvchi va factoring bo‘yicha tushuntiriladigan dastlabki qarorlarni taqdim etuvchi B2B SaaS platformasi uchun tayyorlangan vazmin, aniq va professional marketing sayti.

> **Asosiy xabar:**  
> *“EHF ma’lumotlaridan tushuntiriladigan factoring tahliligacha.”*

---

## 🏛️ Dizayn Yo‘nalishi va Estetika

Sayt an’anaviy startup shablonlari yoki ko‘zga tashlanuvchi neon gradientlardan xoli bo‘lib, **jiddiy moliyaviy tadqiqot nashri** va **amaliy risk tahlili ish maydoni (workbench)** uyg‘unligida yaratilgan:

- **Ranglar tizimi:** Iliq oq / neytral fon (`#FBFBF9`), chuqur siyoh va to‘q ko‘k rangdagi matn (`#121824`), vazmin o‘rmon yashili aksenti (`#0F4C3A`).
- **Tipografika:** Aniq iyerarxiyali Inter shrifti; sanalar, summalar, STIR va ID kodlari uchun ixcham monospaced uslub (`JetBrains Mono`).
- **Haqiqiy mahsulot tushunchalari:** Ta’minot zanjiri grafigi, tanlangan hisob-faktura (invoice), yaroqlilik reyestri, deduksiya zanjiri (waterfall), narxlash kalkulyatori va rasmiy Decision Memo namunasi.
- **Sintetik demo belgisi:** Barcha ko‘rgazmali ma’lumotlar `Sintetik demo` deb aniq belgilangan.

---

## 📌 Sayt Bo‘limlari

1. **Header:** FaktorGraf logotipi (`B2B SaaS • Pilot`), “Platforma”, “Qanday ishlaydi”, “Kimlar uchun”, “Ishonchlilik”, “FAQ” havolalari hamda **“Demo uchun uchrashuv belgilash”** tugmasi.
2. **Hero:** O‘zbek tilidagi aniq sarlavha, qisqa tavsif, **“Demo so‘rash”** va **“Platformani ko‘rish”** harakatlari hamda haqqoniy mahsulot preview oynasi (graf, tanlangan invoice, dastlabki limit hisobi).
3. **Qanday ishlaydi (3 aniq qadam):**
   - *01 / EHF fayli modeli (Demo prototip)* (CSV, JSON, XLSX ma’lumotlar sxemasi namoyishi).
   - *02 / Ma’lumot sifati va signallarni ko‘rib chiqish* (Supplier → Buyers aloqalari, o‘zaro savdo va sikl signallari).
   - *03 / Yaroqlilik va dastlabki limitni o‘rganish* (Hisob-faktura yaroqliligi, tushuntiriladigan limit va narxlash ssenariysi).
4. **Platforma imkoniyatlari (Turli xil maketlar):**
   - Ta’minot zanjiri grafigi (SVG) va interaktiv tugun inspektori (klaviatura orqali boshqariladigan).
   - Hisob-fakturalar yaroqliligi (Invoice Eligibility) reyestri.
   - Tushuntiriladigan dastlabki limit (Waterfall) va *“Nega limit yuqoriroq emas?”* tushuntirishi (100% matematik izchil).
   - Risk Pasporti: Format sifati va sintetik demo farazlariga asoslangan mustaqil dalillar qamrovi.
   - Narxlash kalkulyatori (Avans, rezerv, davr xarajati, sof to‘lov formulalari va reaktiv APR).
   - Network stress ssenariysi (Tarmoq shoki simulyatsiyasi, capacity proxy).
   - Decision Memo va lokal audit izi (ssenariy tanloviga qarab sinxron yangilanadi).
5. **Kimlar uchun (Ikki alohida guruh):**
   - *Banklar va factoring tashkilotlari:* Anderrayter, risk jamoalari va auditorlar uchun qora qutisiz tahlil.
   - *Yetkazib beruvchilar va KO‘B:* Factoring imkoniyatini oldindan baholash va xarajatlarni aniq bilish.
6. **Ishonchlilik va Nazorat:**
   - Dastlabki tahlil yakuniy kredit qarori emasligi.
   - Shubhali patternlar firibgarlik (fraud) tasdig‘i emasligi.
   - Tashqi xizmatlar holati jadvali: **EHF lokal tahlili** — `Demo prototipi (Sintetik namoyish)`, **ETTYX**, **Bank tranzaksiyalari**, **Soliq/Kompaniyalar reyestri** va **E-imzo** — barchasi ochiqchasiga `Ulanmagan` deb belgilangan.
7. **FAQ (Ko‘p so‘raladigan savollar):**
   - Fayllar, tahlil natijasi, limit taklifi, patternlar va integratsiyalar bo‘yicha 5 ta aniq savol-javob.
8. **Demo So‘rov Bo‘limi:**
   - Sarlavha: **“FaktorGraf’ni demo rejimida ko‘rib chiqing.”**
   - Form maydonlari: Ism-familiya, Kompaniya nomi, Ishchi email, Lavozim, Qiziqtirgan yo‘nalish, Qisqa xabar (to‘liq inline validatsiya bilan).
   - Tugma: **“Demo so‘rov namunasini shakllantirish”**.
   - Shaffof demo xabari va mijoz brauzerida hosil qilinadigan JSON namuna ko‘rinishi (hech qanday serverga yuborilmaydi).
9. **Footer:**
   - Huquqiy eslatma (2026-yil), namuna kontaktlar (`info@faktograf.uz (namuna)`, `+998 (71) 000-00-00 (namuna)`).

---

## 💻 Loyihani Ishga Tushirish

Hech qanday qo‘shimcha kutubxona yoki kompilyatsiya talab etilmaydi:

```powershell
# Brauzerda ochish:
# index.html faylini ikki marta bosing yoki lokal serverda ishga tushiring:
python -m http.server 3000
```
Brauzer manzili: `http://localhost:3000`
