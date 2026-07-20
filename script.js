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

// URL of the Google Apps Script Web App that appends rows to the Sheet.
// Must be deployed with "Execute as: Me" and "Who has access: Anyone".
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz6EGb8QA_OoF5x0JIwFm31-07botiUEhLF4a2kN-VEhIYVNOxQi3xyXLz7cwkQw4oo/exec';

const formMessages = {
  en: 'Thank you \u2014 your request has been received. We will contact you shortly.',
  it: 'Grazie \u2014 la tua richiesta \u00e8 stata ricevuta. Ti contatteremo a breve.'
};

const formErrorMessages = {
  en: 'Something went wrong sending your request. Please try again or contact us on WhatsApp.',
  it: 'Si \u00e8 verificato un errore nell\u2019invio della richiesta. Riprova o contattaci su WhatsApp.'
};

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : null;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = currentLang === 'it' ? 'Invio in corso...' : 'Sending...';
  }

  // Collect every field on the form that has a name="" attribute.
  const formData = new FormData(contactForm);
  formData.append('lang', currentLang);
  formData.append('submittedAt', new Date().toISOString());
  formData.append('page', window.location.href);

  const params = new URLSearchParams();
  formData.forEach((value, key) => params.append(key, value));

  // Apps Script web apps don't return CORS headers for simple fetch reads,
  // so we send as a standard form POST and treat "no network error" as success.
  fetch(SHEET_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    body: params
  })
    .then(() => {
      alert(formMessages[currentLang]);
      contactForm.reset();
    })
    .catch((err) => {
      console.error('Contact form submission failed:', err);
      alert(formErrorMessages[currentLang]);
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
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
    'hero.authorized': 'Il nostro ufficio \u00e8 a Milano .',
    'hero.ctaQuote': 'PREVENTIVO RAPIDO',
    'hero.ctaCall': 'Chiama: 800 960827',

    // Quick Stats/Timelines (ISO reference removed)
    'hero.stat1': 'Traduzioni Certificate',
    'hero.stat2': 'Traduzioni Giurate / Asseverate',
    'hero.stat3': 'Apostille Aja urgenti',
    'hero.stat4': 'Lingue coperte',

    // About/Main Body Section
    'about.eyebrow': 'UFFICIO TRADUZIONI PROFESSIONALI A MILANO',
    'about.p1': 'L\u2019 Agenzia di Traduzioni Meguid  \u00e8 specializzata nella Traduzione Giurata, Asseverazione e Legalizzazione di Atti Giudiziari, anche per Notifica all\u2019Estero, di qualsivoglia natura e complessit\u00e0. Traduzione giurata di sentenze di divorzio, atti di citazione, decreti ingiuntivi. Traduzione di Procure e Atti notarili da e per l\u2019Estero.',
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
    'about.strong1': 'Molteplici',
    'about.stat1': 'Lingue supportate',
    'about.stat2': 'Documenti certificati',
    'about.stat3': 'Consegna traduzioni certificate',
    'about.stat4': 'Gestione riservata e firmata',

    // Nav (missing key)
    'nav.services': 'Servizi',

    // Hero WhatsApp CTA
    'hero.ctaWhatsapp': 'Contattaci su WhatsApp',

    // Services section
    'services.eyebrow': 'I Nostri Servizi',
    'services.h2': 'Traduzione certificata per ogni documento ufficiale',
    'services.p': 'Siamo autorizzati a tradurre e certificare documenti di qualsiasi natura e complessit\u00e0 \u2014 validi presso le autorit\u00e0 italiane e accettati all\u2019estero.',
    'services.s1.h': 'Traduzione Certificata',
    'services.s1.p': 'Traduzione certificata di documenti civili \u2014 certificati di nascita, matrimonio e morte, copie di documenti d\u2019identit\u00e0 e passaporto \u2014 accettata da uffici governativi, ambasciate e consolati.',
    'services.s2.h': 'Traduzione Legale',
    'services.s2.p': 'Traduzione giurata e certificata di contratti, sentenze, procure e atti notarili, valida per procedimenti legali in Italia e all\u2019estero.',
    'services.s3.h': 'Traduzione Medica',
    'services.s3.p': 'Traduzione certificata di referti medici, prescrizioni, lettere di dimissione e documentazione clinica, gestita con la massima riservatezza.',
    'services.s4.h': 'Traduzione Tecnica',
    'services.s4.p': 'Traduzione di manuali tecnici, schede prodotto e documentazione ingegneristica per il settore industriale e manifatturiero.',
    'services.s5.h': 'Traduzione Commerciale',
    'services.s5.p': 'Traduzione certificata di bilanci, visure camerali, statuti societari e documentazione di gara per aziende locali e internazionali.',
    'services.s6.h': 'Traduzione Accademica',
    'services.s6.p': 'Traduzione certificata e legalizzazione di diplomi, pagelle e titoli accademici per l\u2019ammissione universitaria e le pratiche visto.',
    'services.s7.h': 'Localizzazione di Siti Web',
    'services.s7.p': 'Localizzazione completa di siti web e piattaforme digitali, adattata linguisticamente e culturalmente a ciascun mercato di riferimento.',
    'services.s8.h': 'Revisione di Documenti',
    'services.s8.p': 'Revisione e correzione professionale di traduzioni esistenti per garantirne l\u2019accuratezza legale, tecnica e linguistica.',

    // Languages section
    'languages.eyebrow': 'Lingue',
    'languages.h2': 'Traduzione autorizzata, da e verso ogni lingua principale',
    'languages.arabic': 'Arabo',
    'languages.english': 'Inglese',
    'languages.italian': 'Italiano',

    // Why Choose Us section
    'why.eyebrow': 'Perch\u00e9 Sceglierci',
    'why.h2': 'Piena responsabilit\u00e0 legale su ogni documento che firmiamo',
    'why.p': 'Che si tratti di un singolo certificato o di un intero fascicolo legale, ogni documento \u00e8 gestito secondo lo stesso standard autorizzato.',
    'why.c1.h': 'Certificato e Firmato Legalmente',
    'why.c1.p': 'Ogni traduzione viene verificata rispetto alla terminologia di origine e rilasciata con una dichiarazione firmata di accuratezza.',
    'why.c2.h': 'Tempi di Consegna Garantiti',
    'why.c2.p': 'Traduzioni certificate in 12 ore, traduzioni giurate/legali in 48 ore, apostille e legalizzazione urgenti in 2 giorni.',
    'why.c3.h': 'Riservatezza Firmata',
    'why.c3.p': 'Ogni progetto \u00e8 coperto da un impegno di riservatezza firmato a tutela dei dati sensibili e dei documenti personali.',
    'why.c4.h': 'Prezzi Trasparenti',
    'why.c4.p': 'Prezzi fissi per documento, confermati per iscritto prima dell\u2019inizio dei lavori \u2014 nessun costo nascosto.',
    'why.c5.h': 'Traduttori Autorizzati',
    'why.c5.p': 'Linguisti registrati e specializzati nella materia eseguono e firmano ogni traduzione \u2014 mai solo traduzione automatica.',
    'why.c6.h': 'Assistenza Diretta',
    'why.c6.p': 'Supporto diretto via WhatsApp, telefono ed email per tutto il progetto, dal preventivo alla consegna.',

    // Contact section
    'contact.eyebrow': 'Contattaci',
    'contact.h2': 'Richiedi un preventivo rapido e senza impegno',
    'contact.name': 'Nome Completo',
    'contact.namePh': 'Il tuo nome',
    'contact.phone': 'Telefono',
    'contact.email': 'Email',
    'contact.service': 'Servizio Richiesto',
    'contact.opt1': 'Traduzione Certificata',
    'contact.opt2': 'Traduzione Legale',
    'contact.opt3': 'Traduzione Medica',
    'contact.opt4': 'Traduzione Tecnica',
    'contact.opt5': 'Traduzione Commerciale',
    'contact.opt6': 'Traduzione Accademica',
    'contact.opt7': 'Localizzazione di Siti Web',
    'contact.opt8': 'Revisione di Documenti',
    'contact.message': 'Messaggio',
    'contact.messagePh': 'Raccontaci del tuo documento...',
    'contact.send': 'Invia Richiesta',
    'contact.Translation@ahmedguda.it': 'Email',
    'contact.hoursLabel': 'Orario di Lavoro',
    'contact.hoursValue': 'Sab\u2013Gio, 10:00 \u2013 20:00',

    // Footer
    'footer.desc': 'Un ufficio di traduzione autorizzato, registrato per la traduzione certificata e giurata di documenti ufficiali, legali, medici, commerciali, tecnici e accademici',
    'footer.quickLinks': 'Link Rapidi',
    'footer.aboutUs': 'Chi Siamo',
    'footer.services': 'Servizi',
    'footer.copyright': '\u00a9 2026 Meguid Translation. Tutti i diritti riservati.',
    'footer.tagline': 'Certificato. Firmato. Legalmente Responsabile.'
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
    'about.p1': 'The Meguid \u00ae Translation Agency specializes in Sworn Translations, Court Filings, and Legalization of Court Records, including international service of process, of any nature and complexity. Sworn translation of divorce decrees, summonses, and injunctions. Translation of Powers of Attorney and notary deeds to and from abroad.',
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
    'about.stat4': 'Confidential, signed handling',

    // Nav (missing key)
    'nav.services': 'Services',

    // Hero WhatsApp CTA
    'hero.ctaWhatsapp': 'Contact on WhatsApp',

    // Services section
    'services.eyebrow': 'Our Services',
    'services.h2': 'Certified translation for every official document',
    'services.p': 'We are authorized to translate and certify documents of any nature and complexity \u2014 valid before Egyptian authorities and accepted abroad.',
    'services.s1.h': 'Certified Translation',
    'services.s1.p': 'Certified translation of civil documents \u2014 birth, marriage, and death certificates, ID and passport copies \u2014 accepted by government offices, embassies, and consulates.',
    'services.s2.h': 'Legal Translation',
    'services.s2.p': 'Sworn and certified translation of contracts, court rulings, powers of attorney, and notarial deeds, valid for legal proceedings in Egypt and abroad.',
    'services.s3.h': 'Medical Translation',
    'services.s3.p': 'Certified translation of medical reports, prescriptions, discharge summaries, and clinical documentation, handled under strict confidentiality.',
    'services.s4.h': 'Technical Translation',
    'services.s4.p': 'Translation of technical manuals, product specifications, and engineering documentation across industrial and manufacturing sectors.',
    'services.s5.h': 'Business Translation',
    'services.s5.p': 'Certified translation of financial statements, commercial registers, company bylaws, and tender documentation for local and international business.',
    'services.s6.h': 'Academic Translation',
    'services.s6.p': 'Certified translation and legalization of diplomas, transcripts, and academic records for university admission and visa applications.',
    'services.s7.h': 'Website Localization',
    'services.s7.p': 'Full localization of websites and digital platforms, adapted linguistically and culturally for each target market.',
    'services.s8.h': 'Document Proofreading',
    'services.s8.p': 'Professional review and correction of existing translations for legal, technical, and linguistic accuracy.',

    // Languages section
    'languages.eyebrow': 'Languages',
    'languages.h2': 'Authorized translation, to and from every major language',
    'languages.arabic': 'Arabic',
    'languages.english': 'English',
    'languages.italian': 'Italian',

    // Why Choose Us section
    'why.eyebrow': 'Why Choose Us',
    'why.h2': 'Full legal responsibility, on every document we sign',
    'why.p': 'Whether it is a single certificate or a complete legal case file, every document is handled to the same authorized standard.',
    'why.c1.h': 'Certified & Legally Signed',
    'why.c1.p': 'Every translation is checked against source terminology and issued with a signed declaration of accuracy.',
    'why.c2.h': 'Guaranteed Delivery Times',
    'why.c2.p': 'Certified translations in 12 hours, sworn/legal translations in 48 hours, urgent apostille and legalization in 2 days.',
    'why.c3.h': 'Signed Confidentiality',
    'why.c3.p': 'Every project is covered by a signed confidentiality undertaking protecting sensitive data and personal documents.',
    'why.c4.h': 'Transparent Pricing',
    'why.c4.p': 'Fixed, per-document pricing confirmed in writing before any work begins \u2014 no hidden fees.',
    'why.c5.h': 'Authorized Translators',
    'why.c5.p': 'Registered, subject-specialist linguists carry out and sign every translation \u2014 never machine translation alone.',
    'why.c6.h': 'Direct Support',
    'why.c6.p': 'Direct WhatsApp, phone, and email support throughout your project, from quotation to delivery.',

    // Contact section
    'contact.eyebrow': 'Get in Touch',
    'contact.h2': 'Request a quick, no-obligation quote',
    'contact.name': 'Full Name',
    'contact.namePh': 'Your name',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.service': 'Service Required',
    'contact.opt1': 'Certified Translation',
    'contact.opt2': 'Legal Translation',
    'contact.opt3': 'Medical Translation',
    'contact.opt4': 'Technical Translation',
    'contact.opt5': 'Business Translation',
    'contact.opt6': 'Academic Translation',
    'contact.opt7': 'Website Localization',
    'contact.opt8': 'Document Proofreading',
    'contact.message': 'Message',
    'contact.messagePh': 'Tell us about your document...',
    'contact.send': 'Send Request',
    'contact.Translation@ahmedguda.it': 'Email',
    'contact.hoursLabel': 'Working Hours',
    'contact.hoursValue': 'Sat\u2013Thu, 10:00 AM \u2013 8:00 PM',

    // Footer
    'footer.desc': 'An authorized translation office, registered for certified and sworn translation of official, legal, medical, business, technical, and academic documents',
    'footer.quickLinks': 'Quick Links',
    'footer.aboutUs': 'About Us',
    'footer.services': 'Services',
    'footer.copyright': '\u00a9 2026 Meguid Translation. All rights reserved.',
    'footer.tagline': 'Certified. Signed. Legally Responsible.'
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