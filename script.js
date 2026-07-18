// ---------- Header scroll state ----------
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
    if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
  });
});

// ---------- Contact form ----------
const contactForm = document.getElementById('contactForm');
const formMessages = {
  en: 'Thank you \u2014 your request has been received. We will contact you shortly.',
  it: 'Grazie \u2014 la tua richiesta \u00e8 stata ricevuta. Ti contatteremo a breve.'
};
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert(formMessages[currentLang]);
});

// ---------- Translations ----------
const translations = {
  it: {
    // New Navbar Keys (Added 'nav.logo' key here!)
    'nav.logo': 'Meguid Translation',
    'nav.home': 'Home page',
    'nav.sworn': 'Traduzioni Giurate',
    'nav.legal': 'Traduzioni Legali',
    'nav.contact': 'Contatti',
    'nav.languages': 'Lingue',
    'nav.call': 'CHIAMA',

    // Hero Section (Refined copy, no ISO mention)
    'hero.eyebrow': 'Traduzioni con Valore Legale',
    'hero.headline': 'AGENZIA DI TRADUZIONI GIURATE CON VALORE LEGALE IN ITALIA E ALL\u2019ESTERO',
    'hero.sub': 'Siamo Traduttori Ufficiali iscritti all\u2019Albo del Tribunale di Milano, abilitati alla traduzione e legalizzazione di documenti per uso legale e Consolare, Privato e Societario, validi su tutto il territorio nazionale e all\u2019estero.',
    'hero.authorized': 'Il nostro ufficio \u00e8 a Milano in Via Giuseppe Prina, 15 (Arco della Pace).',
    'hero.ctaQuote': 'PREVENTIVO RAPIDO',
    'hero.ctaCall': 'Chiama: 800 960827',

    // Quick Stats/Timelines (ISO reference removed)
    'hero.stat1': 'Traduzioni Certificate',
    'hero.stat2': 'Traduzioni Giurate / Asseverate',
    'hero.stat3': 'Apostille Aja urgenti',
    'hero.stat4': 'Lingue coperte',

    // About/Main Body Section
    'about.eyebrow': 'UFFICIO TRADUZIONI PROFESSIONALI A MILANO',
    'about.p1': 'L\u2019 Agenzia di Traduzioni TRADUX \u00ae \u00e8 specializzata nella Traduzione Giurata, Asseverazione e Legalizzazione di Atti Giudiziari, anche per Notifica all\u2019Estero, di qualsivoglia natura e complessit\u00e0. Traduzione giurata di sentenze di divorzio, atti di citazione, decreti ingiuntivi. Traduzione di Procure e Atti notarili da e per l\u2019Estero.',
    'about.p2': 'Gestiamo progetti di Traduzione di Documenti Legali, Atti Giudiziari e Notarili, Certificati e Titoli di Studio rilasciati in Italia o all\'estero. Traduzione di Visure Camerali, Bilanci e di ogni documento di carattere societario. Siamo specializzati nella Traduzione e Legalizzazione di Documenti per la partecipazione a Gare d\'appalto estere. Traduzioni Tecniche e di Manuali. Traduzioni Scientifiche e Mediche.',
    'about.urgent': 'TRADUZIONI URGENTI disponibili su Whatsapp',
    'about.quote_title': 'CONTATTACI PER UN PREVENTIVO RAPIDO GRATUITO',

    // Delivery timelines (ISO reference removed)
    'time.cert': 'Traduzioni Certificate in 12 ore',
    'time.sworn': 'Traduzioni Giurate / Asseverate anche in 48 ore',
    'time.apostille': 'Apostille Aja urgenti in 2 giorni',
    'time.guarantee': 'Agenzia con Garanzia di Qualit\u00e0',
    'transcription.eyebrow': 'Trascrizioni e Perizie Giurate',
    'transcription.h2': 'PERIZIA DI TRASCRIZIONE E REGISTRAZIONE AUDIO A MILANO',
    'transcription.sub': 'Servizio professionale di sbobinatura e trascrizione legale. Operiamo in italiano e in tutte le principali combinazioni linguistiche estere.',
    'transcription.card1.h': 'Accuratezza & Competenza',
    'transcription.card1.p': 'Trascrivere con fedelt\u00e0 assoluta una traccia audio o video richiede una sensibilit\u00e0 linguistica straordinaria e una profonda competenza tecnica.',
    'transcription.card2.h': 'Valore Legale in Tribunale',
    'transcription.card2.p': 'Asseverare una trascrizione come Perizia Giurata comporta precise responsabilit\u00e0 civili e penali. Meguid Translation sottoscrive formalmente ogni documento redatto, assumendosene la piena responsabilit\u00e0 legale.',
    'transcription.card3.h': 'Riservatezza Assoluta',
    'transcription.card3.p': 'Rilasciamo un Accordo di Riservatezza (NDA) vincolante per garantire la massima tutela, segretezza e cura nel trattamento dei vostri dati sensibili e file audio.',
    'legal.eyebrow': 'Servizio Traduzioni Legali e Giuridiche',
    'legal.h2': 'TRADUZIONE DOCUMENTI LEGALI A MILANO',
    'legal.p1': 'L\u2019Agenzia di Traduzioni Meguid Translation \u00e8 specializzata nella Traduzione Giurata, Asseverazione e Legalizzazione di Atti Giudiziari in tutte le combinazioni linguistiche, provenienti dall\u2019Estero e per la Notifica di Atti all\u2019Estero, di qualsivoglia natura e complessit\u00e0.',
    'legal.p2': 'Siamo specializzati nella traduzione giurata e legalizzazione di sentenze di divorzio, atti di citazione, decreti ingiuntivi e di ogni atto e documento societario. Gestiamo inoltre con massima perizia la traduzione di procure, testamenti e atti notarili da e per l\u2019estero.',
    'legal.ctu_title': 'I Nostri Traduttori CTU',
    'legal.ctu_desc': 'I nostri traduttori, iscritti all\u2019Albo CTU del Tribunale di Milano, sono professionisti con studi linguistici e giuridici avanzati ed una lunga esperienza sul campo, pronti a tradurre atti complessi in qualsiasi lingua.',
    'legal.office_title': 'IL NOSTRO UFFICIO \u00c8 A MILANO:',
    'legal.office_address': 'Via Giuseppe Prina, 15 (Arco della Pace).',
    'legal.time_title': 'I nostri tempi di consegna',
    'legal.time1_title': 'Traduzioni Certificate Ufficiali',
    'legal.time1_desc': 'Consegna rapida garantita entro 12 ore.',
    'legal.time2_title': 'Traduzioni Giurate / Asseverate',
    'legal.time2_desc': 'Asseverazione formale in tribunale anche in 48 ore.',
    'legal.time3_title': 'Apostille Aja Urgenti',
    'legal.time3_desc': 'Pratiche di legalizzazione e Apostille gestite in 2 giorni.',
    'legal.wa_text': 'TRADUZIONI URGENTI disponibili su Whatsapp',
    'legal.quote_text': 'CONTATTACI PER UN PREVENTIVO RAPIDO GRATUITO',
    'about.h2': 'Un ufficio autorizzato, pienamente responsabile di ci\u00f2 che firma',
    'about.stat1': 'Lingue supportate',
    'about.stat2': 'Documenti certificati',
    'about.stat3': 'Consegna traduzioni certificate',
    'about.stat4': 'Gestione riservata e firmata'
  },
  en: {
    // New Navbar Keys (Added 'nav.logo' key here!)
    'nav.logo': 'Meguid Translation',
    'nav.home': 'Home page',
    'nav.sworn': 'Sworn Translations',
    'nav.legal': 'Legal Translations',
    'nav.contact': 'Contact Us',
    'nav.languages': 'Languages',
    'nav.call': 'CALL US',

    'legal.eyebrow': 'Legal and Judicial Translation Services',
    'legal.h2': 'LEGAL DOCUMENT TRANSLATIONS IN MILAN',
    'legal.p1': 'Meguid Translation agency specializes in Sworn Translations, Court Filings, and Legalizations of judicial documents in all language combinations, including cross-border notification filings of any nature and complexity.',
    'legal.p2': 'We are specialized in sworn translation and legalization of divorce decrees, summonses, injunctions, and all corporate records. We also handle powers of attorney, wills, and notary deeds to and from abroad with exceptional accuracy.',
    'legal.ctu_title': 'Our Court-Appointed Translators (CTU)',
    'legal.ctu_desc': 'Our translators, registered with the Court of Milan (CTU), are experts with advanced legal and linguistic qualifications and extensive industry experience, capable of translating complex documents into any language.',
    'legal.office_title': 'OUR OFFICE IS IN MILAN:',
    'legal.office_address': 'Via Giuseppe Prina, 15 (Arco della Pace).',
    'legal.time_title': 'Our Delivery Times',
    'legal.time1_title': 'Official Certified Translations',
    'legal.time1_desc': 'Guaranteed swift turnaround within 12 hours.',
    'legal.time2_title': 'Sworn & Certified Court Translations',
    'legal.time2_desc': 'Formal court filings finalized within 48 hours.',
    'legal.time3_title': 'Urgent Hague Apostille',
    'legal.time3_desc': 'Legalization and Apostille processing completed in 2 days.',
    'legal.wa_text': 'URGENT TRANSLATIONS available on Whatsapp',
    'legal.quote_text': 'CONTACT US FOR A FREE QUICK QUOTE',

    // Hero Section
    'hero.eyebrow': 'Translations with Legal Value',
    'hero.headline': 'SWORN TRANSLATION AGENCY WITH LEGAL VALUE IN ITALY AND ABROAD',
    'hero.sub': 'We are Official Translators registered with the Court of Milan, authorized for the translation and legalization of documents for legal, Consular, Private, and Corporate use, valid nationwide and abroad.',
    'hero.authorized': 'Our office is in Milan at Via Giuseppe Prina, 15 (Arco della Pace).',
    'hero.ctaQuote': 'QUICK QUOTE',
    'hero.ctaCall': 'Call: 800 960827',

    // Quick Stats/Timelines
    'hero.stat1': 'Certified Translations',
    'hero.stat2': 'Sworn / Certified Translations',
    'hero.stat3': 'Urgent Apostille Hague',
    'hero.stat4': 'Languages covered',

    // About/Main Body Section
    'about.eyebrow': 'PROFESSIONAL TRANSLATION OFFICE IN MILAN',
    'about.p1': 'The TRADUX \u00ae Translation Agency specializes in Sworn Translations, Court Filings, and Legalization of Court Records, including international service of process, of any nature and complexity. Sworn translation of divorce decrees, summonses, and injunctions. Translation of Powers of Attorney and notary deeds to and from abroad.',
    'about.p2': 'We manage translation projects for Legal Documents, Judicial and Notarial Acts, Certificates, and Degrees issued in Italy or abroad. Translation of Chamber of Commerce profiles, Financial Statements, and all corporate documents. We specialize in the Translation and Legalization of Documents for participation in foreign tenders. Technical and Manual Translations. Scientific and Medical Translations.',
    'about.urgent': 'URGENT TRANSLATIONS available on Whatsapp',
    'about.quote_title': 'CONTACT US FOR A FREE QUICK QUOTE',

    // Delivery timelines
    'time.cert': 'Certified Translations in 12 hours',
    'time.sworn': 'Sworn / Certified Translations in 48 hours',
    'time.apostille': 'Urgent Hague Apostille in 2 days',
    'time.guarantee': 'Agency with Quality Guarantee',
    'transcription.eyebrow': 'Sworn Transcriptions & Expert Reports',
    'transcription.h2': 'AUDIO RECORDING TRANSCRIPTION & COURT EXPERTISE IN MILAN',
    'transcription.sub': 'Professional audio-to-text legal transcription and court certification. Available in Italian and all major foreign languages.',
    'transcription.card1.h': 'Accuracy & Linguistic Expertise',
    'transcription.card1.p': 'Transcribing an audio or video track with absolute fidelity demands exceptional linguistic sensitivity and deep technical domain expertise.',
    'transcription.card2.h': 'Legal Value in Court',
    'transcription.card2.p': 'Certifying an audio transcript as a Sworn Expert Report carries substantial civil and criminal liabilities. Meguid Translation formally signs off on every transcript, assuming full legal responsibility for its execution.',
    'transcription.card3.h': 'Non-Disclosure Guarantee',
    'transcription.card3.p': 'We issue a legally binding Non-Disclosure Agreement (NDA) to guarantee the highest level of protection, confidentiality, and care in processing your sensitive media assets.',
    'about.h2': 'An authorized office, fully responsible for what it signs',
    'about.stat1': 'Languages supported',
    'about.stat2': 'Documents certified',
    'about.stat3': 'Certified translation delivery',
    'about.stat4': 'Confidential, signed handling'
  }
};

// ---------- Language switching ----------
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
  });
}

// FIX: this used to run immediately, before the bottom-sheet's language
// buttons existed in the DOM (the <script> tag sits before that markup in
// the HTML). Wrapping it in DOMContentLoaded ensures ALL [data-lang-btn]
// elements on the page - desktop toggle, drawer toggle, and bottom-sheet
// toggle - are present before we attach listeners to them.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang-btn')));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  // Function to toggle drawer open state
  const toggleDrawer = () => {
    mobileDrawer.classList.toggle("open");
    drawerOverlay.classList.toggle("open");
    burgerBtn.classList.toggle("active");
  };

  // Click events
  if (burgerBtn) burgerBtn.addEventListener("click", toggleDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", toggleDrawer);

  // Close drawer automatically when clicking on any mobile navigation links
  const drawerLinks = mobileDrawer.querySelectorAll("a");
  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileDrawer.classList.remove("open");
      drawerOverlay.classList.remove("open");
      burgerBtn.classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("bottomMenuBtn");
  const closeBtn = document.getElementById("sheetCloseBtn");
  const sheet = document.getElementById("bottomSheet");
  const overlay = document.getElementById("sheetOverlay");
  const sheetLinks = document.querySelectorAll(".sheet-content a");

  function openSheet() {
    sheet.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeSheet() {
    sheet.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // Enable scroll
  }

  // Open & Close bindings
  if (openBtn) openBtn.addEventListener("click", openSheet);
  if (closeBtn) closeBtn.addEventListener("click", closeSheet);
  if (overlay) overlay.addEventListener("click", closeSheet);

  // Auto-close sheet when any link inside it is clicked
  sheetLinks.forEach(link => {
    link.addEventListener("click", closeSheet);
  });
});