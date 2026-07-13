export type Lang = "EN" | "ES" | "PT" | "IT";

export const LANGS: Lang[] = ["EN", "ES", "PT", "IT"];
export const LANG_NAMES: Record<Lang, string> = { EN: "English", ES: "Español", PT: "Português", IT: "Italiano" };

export interface HeroSlide { k: string; t: string; s: string }
export interface Work {
  client: string; year: string; title: string; tags: string; sector: string;
  img: string | null; summary: string; challenge: string; approach: string; outcome: string; quote: string;
}
export interface Insight { cat: string; read: string; title: string; excerpt: string }
export interface Service { title: string; desc: string }
export interface Value { title: string; desc: string }
export interface Stat { n: string; l: string }

export interface Translation {
  nav: { work: string; ideas: string; about: string; services: string; contact: string };
  hero: HeroSlide[];
  workKicker: string; workTitle: string; axisLabel: string; viewCase: string;
  goWorksTitle: string; goWorksCta: string; goWorksHint: string;
  works: Work[];
  aboutKicker: string; aboutTitle: string; aboutBody: string;
  stats: Stat[];
  ideasKicker: string; ideasTitle: string; readMore: string;
  insights: Insight[];
  services: Service[];
  values: Value[];
  ui: {
    backToTop: string; overviewH: string; viewProject: string; nextProject: string;
    client: string; year: string; services: string; sector: string; location: string;
    challengeH: string; approachH: string; outcomeH: string;
    portfolioKicker: string; portfolioTitle: string; worksIntro: string; ideasSub: string;
    servicesKicker: string; servicesTitle: string; servicesIntro: string; aboutPageKicker: string;
    valuesH: string; teamH: string; formTitle: string; fName: string; fEmail: string; fMsg: string;
    fSend: string; fThanks: string; reachH: string; followH: string; visitH: string; mapNote: string;
  };
  footKicker: string; footTitle: string; email: string; emailHref: string;
  footCols: { head: string; items: string[] }[];
  rights: string;
}

export const I18N: Record<Lang, Translation> = {
  EN: {
    nav: { work: "Work", ideas: "Ideas", about: "About", services: "Expertise", contact: "Contact" },
    hero: [
      { k: "Branding & Strategy", t: "We build brands that mean something.", s: "An independent studio shaping identities, narratives and experiences for companies with ambition." },
      { k: "Identity Systems", t: "Clarity is the ultimate sophistication.", s: "Strategy-led design systems, built to scale across every surface and every screen." },
      { k: "Since 2014", t: "Ideas worth the attention they earn.", s: "Ninety brands. Four continents. One obsession with craft that never blinks." },
    ],
    workKicker: "01 — Selected Work", workTitle: "Case studies", axisLabel: "Horizontal", viewCase: "View case",
    goWorksTitle: "See the full portfolio", goWorksCta: "Go to Works", goWorksHint: "Keep scrolling",
    works: [
      { client: "Polylepis", year: "2025", title: "A travel brand that speaks in cities", tags: "Rebranding · Campaign", sector: "Travel", img: "/uploads/polylepis.png", summary: "Rebrand and campaign for an adventure-travel agency that sells destinations as feelings.", challenge: "Polylepis needed a rebrand to sharpen its proposition and stand out in travel.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "New York is unique. Tokyo is energy." },
      { client: "Dillo", year: "2025", title: "Technology that gives everyone a voice", tags: "Branding", sector: "Technology", img: null, summary: "Branding for a startup that gives a voice to deaf and speech-impaired people.", challenge: "Dillo needed a brand identity to sharpen its proposition and stand out in technology.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "Everyone deserves to be heard." },
      { client: "Punto Íntimo", year: "2024", title: "Intimacy, without the blush", tags: "Rebranding", sector: "Retail", img: null, summary: "A rebrand for a lingerie and intimate-wellness boutique — tasteful and free of taboos.", challenge: "Punto Íntimo needed a rebrand to sharpen its proposition and stand out in retail.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "Confidence, beautifully packaged." },
      { client: "Casa Capo", year: "2024", title: "Sandwiches with an author's signature", tags: "Branding", sector: "Food & Drink", img: "/uploads/casacapo.png", summary: "Brand and identity for an artisan sandwich house built on great bread.", challenge: "Casa Capo needed a brand identity to sharpen its proposition and stand out in food & drink.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "Good bread deserved a great name." },
      { client: "Vera & Adela", year: "2024", title: "The corner pizzeria, reimagined", tags: "Naming · Branding", sector: "Food & Drink", img: null, summary: "Naming and identity for a neighbourhood pizzeria with corner-shop soul.", challenge: "Vera & Adela needed naming and identity to sharpen its proposition and stand out in food & drink.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "Two names, one neighbourhood table." },
      { client: "Wansoft", year: "2023", title: "Software with a human face", tags: "Branding", sector: "Technology", img: null, summary: "Brand identity for a software company that makes the complex feel simple.", challenge: "Wansoft needed a brand identity to sharpen its proposition and stand out in technology.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "We made the complex feel simple." },
      { client: "Bosque Geométrico", year: "2025", title: "Where nature becomes geometry", tags: "Rebranding · Packaging", sector: "Hospitality", img: null, summary: "Rebrand and packaging for a boutique hotel where nature turns to geometry.", challenge: "Bosque Geométrico needed a rebrand and packaging to sharpen its proposition and stand out in hospitality.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "Nature, drawn in clean lines." },
      { client: "San Pietro", year: "2023", title: "An Italian table, quietly timeless", tags: "Rebranding · Packaging", sector: "Restaurant", img: "/uploads/sanpietro.png", summary: "Rebrand and packaging for a neighbourhood Italian restaurant with old-world warmth.", challenge: "San Pietro needed a rebrand and packaging to sharpen its proposition and stand out in restaurant.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "Tradition, served with a modern hand." },
      { client: "Sonre Smile Hub", year: "2025", title: "A friendlier kind of care", tags: "Naming · Branding", sector: "Healthcare", img: "/uploads/smileshub.png", summary: "Naming and identity for a dental clinic that makes care feel friendly.", challenge: "Sonre Smile Hub needed naming and identity to sharpen its proposition and stand out in healthcare.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "We turned a logo into a smile." },
      { client: "Barbale", year: "2024", title: "The field, made modern", tags: "Rebranding", sector: "Agribusiness", img: null, summary: "A rebrand for an agribusiness modernising the field without losing its roots.", challenge: "Barbale needed a rebrand to sharpen its proposition and stand out in agribusiness.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "The roots stayed. Everything else grew." },
      { client: "Bosk", year: "2023", title: "Wood, shaped by hand", tags: "Branding · Website", sector: "Product", img: null, summary: "Branding and website for handmade wooden utensils, with workshop warmth.", challenge: "Bosk needed brand and website to sharpen its proposition and stand out in product.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "Made by hand, built to last." },
      { client: "Polígono Córdoba", year: "2024", title: "Industry, built for what's next", tags: "Rebranding · Website", sector: "Industrial", img: null, summary: "Rebrand and website for an industrial park attracting the companies of the future.", challenge: "Polígono Córdoba needed a rebrand and website to sharpen its proposition and stand out in industrial.", approach: "We defined positioning, a visual system and a tone of voice, applied consistently across every touchpoint.", outcome: "A clear, recognisable brand, ready to grow.", quote: "Where industry meets the future." },
    ],
    aboutKicker: "02 — Manifesto", aboutTitle: "We don't decorate businesses. We define them.",
    aboutBody: "Branding is not a logo. It is the sum of every decision a company makes — and the story people tell when you're not in the room. We work at that intersection of strategy and craft, where meaning is made.",
    stats: [{ n: "90+", l: "Brands shaped" }, { n: "4", l: "Continents" }, { n: "12", l: "Years, independent" }],
    ideasKicker: "03 — Ideas & Insights", ideasTitle: "Thinking out loud", readMore: "Read the piece",
    insights: [
      { cat: "Strategy", read: "6 min", title: "The quiet power of restraint", excerpt: "Why the strongest brands are defined as much by what they refuse to say as by what they claim." },
      { cat: "Culture", read: "4 min", title: "Your brand is a verb, not a noun", excerpt: "Identity is no longer something you own. It is something you do, repeatedly, in public." },
      { cat: "Craft", read: "5 min", title: "Typography as a business decision", excerpt: "The typeface you choose is a promise about how carefully you intend to treat everything else." },
    ],
    services: [
      { title: "Brand Strategy", desc: "Positioning, architecture and the story that holds it all together." },
      { title: "Identity Design", desc: "Logos, systems and the visual language that carries a brand everywhere." },
      { title: "Naming & Verbal", desc: "Names, voice and messaging that sound like no one else." },
      { title: "Digital & Web", desc: "Sites and products designed to move as well as they look." },
      { title: "Marketing & Social", desc: "Campaigns and a social presence that turn attention into demand." },
      { title: "Packaging", desc: "Structures and surfaces that earn a place in someone's hands." },
      { title: "Content & Editorial", desc: "Editorial, photography and content that keep a brand talking." },
    ],
    values: [
      { title: "Strategy first", desc: "We earn the right to design by understanding the business." },
      { title: "Craft obsessed", desc: "The last 5% is where a brand becomes unforgettable." },
      { title: "Built to last", desc: "We design systems, not trends — made to outlive the launch." },
    ],
    ui: {
      backToTop: "Back to top", overviewH: "Overview", viewProject: "View project", nextProject: "Next project",
      client: "Client", year: "Year", services: "Services", sector: "Sector", location: "Location",
      challengeH: "The challenge", approachH: "Our approach", outcomeH: "The outcome",
      portfolioKicker: "Portfolio", portfolioTitle: "Selected work",
      worksIntro: "A selection of brands we've shaped — strategy, identity and everything in between.",
      ideasSub: "Notes on branding, strategy and the craft of making meaning.",
      servicesKicker: "What we do", servicesTitle: "Expertise",
      servicesIntro: "One obsession across every discipline: building brands that mean something.",
      aboutPageKicker: "The studio", valuesH: "What we believe", teamH: "The team",
      formTitle: "Start a project", fName: "Name", fEmail: "Email", fMsg: "Tell us about it",
      fSend: "Send message", fThanks: "Thanks — we'll be in touch shortly.",
      reachH: "Reach us", followH: "Follow", visitH: "Visit us", mapNote: "E. Bodereau 7491 · X5018 Córdoba",
    },
    footKicker: "Let's work together", footTitle: "Let's talk.", email: "hello@weareandale.com", emailHref: "mailto:hello@weareandale.com",
    footCols: [
      { head: "Contact", items: ["hello@weareandale.com", "+54 9 3492 567"] },
      { head: "Social", items: ["Instagram", "LinkedIn", "Behance"] },
      { head: "Offices", items: ["E. Bodereau 7491", "X5018 Córdoba"] },
      { head: "Legal", items: ["Privacy", "Terms", "Cookies"] },
    ],
    rights: "© Studio 2026 — All rights reserved",
  },
  ES: {
    nav: { work: "Trabajo", ideas: "Ideas", about: "Nosotros", services: "Expertise", contact: "Contacto" },
    hero: [
      { k: "Branding & Estrategia", t: "Construimos marcas que significan algo.", s: "Un estudio independiente que da forma a identidades, relatos y experiencias para empresas con ambición." },
      { k: "Sistemas de Identidad", t: "La claridad es la máxima sofisticación.", s: "Sistemas de diseño guiados por la estrategia, listos para escalar en cada superficie." },
      { k: "Desde 2014", t: "Ideas que merecen la atención que reciben.", s: "Noventa marcas. Cuatro continentes. Una obsesión por el oficio que no parpadea." },
    ],
    workKicker: "01 — Trabajo Seleccionado", workTitle: "Casos", axisLabel: "Horizontal", viewCase: "Ver caso",
    goWorksTitle: "Mira el portfolio completo", goWorksCta: "Ir a Works", goWorksHint: "Sigue bajando",
    works: [
      { client: "Polylepis", year: "2025", title: "Una marca de viajes que habla en ciudades", tags: "Rebranding · Campaña", sector: "Viajes", img: "/uploads/polylepis.png", summary: "Rebranding y campaña para una agencia de viajes de aventura que vende destinos como sensaciones.", challenge: "Polylepis necesitaba un rebranding que ordenara su propuesta y destacara en viajes.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "New York is unique. Tokyo is energy." },
      { client: "Dillo", year: "2025", title: "Tecnología que le da voz a todos", tags: "Branding", sector: "Tecnología", img: null, summary: "Branding para una startup que le da voz a las personas sordas y con dificultades del habla.", challenge: "Dillo necesitaba una identidad de marca que ordenara su propuesta y destacara en tecnología.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "Todos merecen ser escuchados." },
      { client: "Punto Íntimo", year: "2024", title: "Intimidad, sin sonrojarse", tags: "Rebranding", sector: "Retail", img: null, summary: "Rebranding para una boutique de lencería y bienestar íntimo, con elegancia y sin tabúes.", challenge: "Punto Íntimo necesitaba un rebranding que ordenara su propuesta y destacara en retail.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "Confianza, bellamente envuelta." },
      { client: "Casa Capo", year: "2024", title: "Entrepanes con firma de autor", tags: "Branding", sector: "Gastronomía", img: "/uploads/casacapo.png", summary: "Marca e identidad para una casa de entrepanes artesanales construida sobre el buen pan.", challenge: "Casa Capo necesitaba una identidad de marca que ordenara su propuesta y destacara en gastronomía.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "El buen pan merecía un gran nombre." },
      { client: "Vera & Adela", year: "2024", title: "La pizzería de la esquina, reimaginada", tags: "Naming · Branding", sector: "Gastronomía", img: null, summary: "Naming e identidad para una pizzería de barrio con alma de esquina.", challenge: "Vera & Adela necesitaba naming e identidad que ordenara su propuesta y destacara en gastronomía.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "Dos nombres, una mesa de barrio." },
      { client: "Wansoft", year: "2023", title: "Software con rostro humano", tags: "Branding", sector: "Tecnología", img: null, summary: "Identidad de marca para una empresa de software que hace lo complejo simple.", challenge: "Wansoft necesitaba una identidad de marca que ordenara su propuesta y destacara en tecnología.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "Hicimos simple lo complejo." },
      { client: "Bosque Geométrico", year: "2025", title: "Donde la naturaleza se vuelve geometría", tags: "Rebranding · Packaging", sector: "Hotelería", img: null, summary: "Rebranding y packaging para un hotel boutique donde la naturaleza se vuelve geometría.", challenge: "Bosque Geométrico necesitaba un rebranding y packaging que ordenara su propuesta y destacara en hotelería.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "Naturaleza, dibujada en líneas limpias." },
      { client: "San Pietro", year: "2023", title: "Una mesa italiana, serenamente atemporal", tags: "Rebranding · Packaging", sector: "Restaurante", img: "/uploads/sanpietro.png", summary: "Rebranding y packaging para un restaurante italiano de barrio con calidez de antaño.", challenge: "San Pietro necesitaba un rebranding y packaging que ordenara su propuesta y destacara en restaurante.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "La tradición, servida con mano moderna." },
      { client: "Sonre Smile Hub", year: "2025", title: "Un cuidado más amable", tags: "Naming · Branding", sector: "Salud", img: "/uploads/smileshub.png", summary: "Naming e identidad para una clínica odontológica que hace del cuidado algo amable.", challenge: "Sonre Smile Hub necesitaba naming e identidad que ordenara su propuesta y destacara en salud.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "Convertimos un logo en una sonrisa." },
      { client: "Barbale", year: "2024", title: "El campo, hecho moderno", tags: "Rebranding", sector: "Agroindustria", img: null, summary: "Rebranding para una agroindustria que moderniza el campo sin perder su raíz.", challenge: "Barbale necesitaba un rebranding que ordenara su propuesta y destacara en agroindustria.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "La raíz quedó. Todo lo demás creció." },
      { client: "Bosk", year: "2023", title: "Madera, moldeada a mano", tags: "Branding · Website", sector: "Producto", img: null, summary: "Branding y sitio web para utensilios de madera hechos a mano, con calidez de taller.", challenge: "Bosk necesitaba una marca y sitio web que ordenara su propuesta y destacara en producto.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "Hecho a mano, para durar." },
      { client: "Polígono Córdoba", year: "2024", title: "Industria, lista para lo que viene", tags: "Rebranding · Website", sector: "Industrial", img: null, summary: "Rebranding y sitio web para un polígono industrial que atrae a las empresas del futuro.", challenge: "Polígono Córdoba necesitaba un rebranding y sitio web que ordenara su propuesta y destacara en industrial.", approach: "Definimos posicionamiento, sistema visual y tono de voz, aplicados con coherencia en cada punto de contacto.", outcome: "Una marca clara y reconocible, lista para crecer.", quote: "Donde la industria se encuentra con el futuro." },
    ],
    aboutKicker: "02 — Manifiesto", aboutTitle: "No decoramos empresas. Las definimos.",
    aboutBody: "El branding no es un logo. Es la suma de cada decisión que toma una empresa — y la historia que la gente cuenta cuando no estás en la sala. Trabajamos en esa intersección entre estrategia y oficio, donde nace el significado.",
    stats: [{ n: "90+", l: "Marcas creadas" }, { n: "4", l: "Continentes" }, { n: "12", l: "Años, independientes" }],
    ideasKicker: "03 — Ideas & Insights", ideasTitle: "Pensando en voz alta", readMore: "Leer el artículo",
    insights: [
      { cat: "Estrategia", read: "6 min", title: "El poder silencioso de la contención", excerpt: "Por qué las marcas más fuertes se definen tanto por lo que callan como por lo que afirman." },
      { cat: "Cultura", read: "4 min", title: "Tu marca es un verbo, no un sustantivo", excerpt: "La identidad ya no es algo que posees. Es algo que haces, repetidamente, en público." },
      { cat: "Oficio", read: "5 min", title: "La tipografía es una decisión de negocio", excerpt: "La tipografía que eliges es una promesa sobre el cuidado con el que tratarás todo lo demás." },
    ],
    services: [
      { title: "Estrategia de Marca", desc: "Posicionamiento, arquitectura y el relato que lo sostiene todo." },
      { title: "Diseño de Identidad", desc: "Logos, sistemas y el lenguaje visual que lleva la marca a todas partes." },
      { title: "Naming & Verbal", desc: "Nombres, voz y mensajes que no suenan como nadie más." },
      { title: "Digital & Web", desc: "Webs y productos diseñados para moverse tan bien como se ven." },
      { title: "Marketing & Social", desc: "Campañas y presencia social que convierten la atención en demanda." },
      { title: "Packaging", desc: "Estructuras y superficies que se ganan un lugar en las manos." },
      { title: "Content & Editorial", desc: "Editorial, fotografía y contenido que mantienen la conversación viva." },
    ],
    values: [
      { title: "Estrategia primero", desc: "Nos ganamos el derecho a diseñar entendiendo el negocio." },
      { title: "Obsesión por el oficio", desc: "El último 5% es donde una marca se vuelve inolvidable." },
      { title: "Hecho para durar", desc: "Diseñamos sistemas, no tendencias — pensados para sobrevivir al lanzamiento." },
    ],
    ui: {
      backToTop: "Volver arriba", overviewH: "Resumen", viewProject: "Ver proyecto", nextProject: "Siguiente proyecto",
      client: "Cliente", year: "Año", services: "Servicios", sector: "Sector", location: "Ubicación",
      challengeH: "El reto", approachH: "Nuestro enfoque", outcomeH: "El resultado",
      portfolioKicker: "Portfolio", portfolioTitle: "Trabajo seleccionado",
      worksIntro: "Una selección de marcas que hemos moldeado — estrategia, identidad y todo lo que hay en medio.",
      ideasSub: "Notas sobre branding, estrategia y el oficio de crear significado.",
      servicesKicker: "Qué hacemos", servicesTitle: "Expertise",
      servicesIntro: "Una obsesión en cada disciplina: construir marcas que signifiquen algo.",
      aboutPageKicker: "El estudio", valuesH: "En qué creemos", teamH: "El equipo",
      formTitle: "Empecemos un proyecto", fName: "Nombre", fEmail: "Email", fMsg: "Cuéntanos",
      fSend: "Enviar mensaje", fThanks: "Gracias — te contactaremos pronto.",
      reachH: "Contacto", followH: "Redes", visitH: "Visítanos", mapNote: "E. Bodereau 7491 · X5018 Córdoba",
    },
    footKicker: "Trabajemos juntos", footTitle: "Hablemos.", email: "hello@weareandale.com", emailHref: "mailto:hello@weareandale.com",
    footCols: [
      { head: "Contacto", items: ["hello@weareandale.com", "+54 9 3492 567"] },
      { head: "Redes", items: ["Instagram", "LinkedIn", "Behance"] },
      { head: "Oficinas", items: ["E. Bodereau 7491", "X5018 Córdoba"] },
      { head: "Legal", items: ["Privacidad", "Términos", "Cookies"] },
    ],
    rights: "© Studio 2026 — Todos los derechos reservados",
  },
  PT: {
    nav: { work: "Trabalho", ideas: "Ideias", about: "Sobre", services: "Expertise", contact: "Contacto" },
    hero: [
      { k: "Branding & Estratégia", t: "Construímos marcas que significam algo.", s: "Um estúdio independente que dá forma a identidades, narrativas e experiências para empresas com ambição." },
      { k: "Sistemas de Identidade", t: "A clareza é a sofisticação máxima.", s: "Sistemas de design guiados pela estratégia, prontos para escalar em cada superfície." },
      { k: "Desde 2014", t: "Ideias que merecem a atenção que recebem.", s: "Noventa marcas. Quatro continentes. Uma obsessão pelo ofício que não pisca." },
    ],
    workKicker: "01 — Trabalho Selecionado", workTitle: "Casos", axisLabel: "Horizontal", viewCase: "Ver caso",
    goWorksTitle: "Veja o portfólio completo", goWorksCta: "Ir para Works", goWorksHint: "Continue descendo",
    works: [
      { client: "Polylepis", year: "2025", title: "Uma marca de viagens que fala em cidades", tags: "Rebranding · Campanha", sector: "Viagens", img: "/uploads/polylepis.png", summary: "Rebranding e campanha para uma agência de viagens de aventura que vende destinos como sensações.", challenge: "Polylepis precisava de um rebranding para afinar a sua proposta e destacar-se em viagens.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "New York is unique. Tokyo is energy." },
      { client: "Dillo", year: "2025", title: "Tecnologia que dá voz a todos", tags: "Branding", sector: "Tecnologia", img: null, summary: "Branding para uma startup que dá voz a pessoas surdas e com dificuldades de fala.", challenge: "Dillo precisava de uma identidade de marca para afinar a sua proposta e destacar-se em tecnologia.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "Todos merecem ser ouvidos." },
      { client: "Punto Íntimo", year: "2024", title: "Intimidade, sem corar", tags: "Rebranding", sector: "Retail", img: null, summary: "Rebranding para uma boutique de lingerie e bem-estar íntimo, com elegância e sem tabus.", challenge: "Punto Íntimo precisava de um rebranding para afinar a sua proposta e destacar-se em retail.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "Confiança, lindamente embalada." },
      { client: "Casa Capo", year: "2024", title: "Sanduíches com assinatura de autor", tags: "Branding", sector: "Gastronomia", img: "/uploads/casacapo.png", summary: "Marca e identidade para uma casa de sanduíches artesanais construída sobre o bom pão.", challenge: "Casa Capo precisava de uma identidade de marca para afinar a sua proposta e destacar-se em gastronomia.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "O bom pão merecia um grande nome." },
      { client: "Vera & Adela", year: "2024", title: "A pizzaria da esquina, reimaginada", tags: "Naming · Branding", sector: "Gastronomia", img: null, summary: "Naming e identidade para uma pizzaria de bairro com alma de esquina.", challenge: "Vera & Adela precisava de naming e identidade para afinar a sua proposta e destacar-se em gastronomia.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "Dois nomes, uma mesa de bairro." },
      { client: "Wansoft", year: "2023", title: "Software com rosto humano", tags: "Branding", sector: "Tecnologia", img: null, summary: "Identidade de marca para uma empresa de software que torna o complexo simples.", challenge: "Wansoft precisava de uma identidade de marca para afinar a sua proposta e destacar-se em tecnologia.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "Tornámos o complexo simples." },
      { client: "Bosque Geométrico", year: "2025", title: "Onde a natureza vira geometria", tags: "Rebranding · Packaging", sector: "Hotelaria", img: null, summary: "Rebranding e packaging para um hotel boutique onde a natureza vira geometria.", challenge: "Bosque Geométrico precisava de um rebranding e packaging para afinar a sua proposta e destacar-se em hotelaria.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "Natureza, desenhada em linhas limpas." },
      { client: "San Pietro", year: "2023", title: "Uma mesa italiana, serenamente atemporal", tags: "Rebranding · Packaging", sector: "Restaurante", img: "/uploads/sanpietro.png", summary: "Rebranding e packaging para um restaurante italiano de bairro com calor de antigamente.", challenge: "San Pietro precisava de um rebranding e packaging para afinar a sua proposta e destacar-se em restaurante.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "A tradição, servida com mão moderna." },
      { client: "Sonre Smile Hub", year: "2025", title: "Um cuidado mais amável", tags: "Naming · Branding", sector: "Saúde", img: "/uploads/smileshub.png", summary: "Naming e identidade para uma clínica odontológica que torna o cuidado amável.", challenge: "Sonre Smile Hub precisava de naming e identidade para afinar a sua proposta e destacar-se em saúde.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "Transformámos um logo num sorriso." },
      { client: "Barbale", year: "2024", title: "O campo, feito moderno", tags: "Rebranding", sector: "Agroindústria", img: null, summary: "Rebranding para uma agroindústria que moderniza o campo sem perder a raiz.", challenge: "Barbale precisava de um rebranding para afinar a sua proposta e destacar-se em agroindústria.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "A raiz ficou. Tudo o resto cresceu." },
      { client: "Bosk", year: "2023", title: "Madeira, moldada à mão", tags: "Branding · Website", sector: "Produto", img: null, summary: "Branding e site para utensílios de madeira feitos à mão, com calor de oficina.", challenge: "Bosk precisava de uma marca e site para afinar a sua proposta e destacar-se em produto.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "Feito à mão, para durar." },
      { client: "Polígono Córdoba", year: "2024", title: "Indústria, pronta para o futuro", tags: "Rebranding · Website", sector: "Industrial", img: null, summary: "Rebranding e site para um polígono industrial que atrai as empresas do futuro.", challenge: "Polígono Córdoba precisava de um rebranding e site para afinar a sua proposta e destacar-se em industrial.", approach: "Definimos posicionamento, sistema visual e tom de voz, aplicados com coerência em cada ponto de contacto.", outcome: "Uma marca clara e reconhecível, pronta para crescer.", quote: "Onde a indústria encontra o futuro." },
    ],
    aboutKicker: "02 — Manifesto", aboutTitle: "Não decoramos empresas. Nós as definimos.",
    aboutBody: "Branding não é um logótipo. É a soma de cada decisão que uma empresa toma — e a história que as pessoas contam quando você não está na sala. Trabalhamos nessa interseção entre estratégia e ofício, onde nasce o significado.",
    stats: [{ n: "90+", l: "Marcas criadas" }, { n: "4", l: "Continentes" }, { n: "12", l: "Anos, independentes" }],
    ideasKicker: "03 — Ideias & Insights", ideasTitle: "Pensando em voz alta", readMore: "Ler o artigo",
    insights: [
      { cat: "Estratégia", read: "6 min", title: "O poder silencioso da contenção", excerpt: "Porque as marcas mais fortes definem-se tanto pelo que calam como pelo que afirmam." },
      { cat: "Cultura", read: "4 min", title: "A sua marca é um verbo, não um substantivo", excerpt: "A identidade já não é algo que se possui. É algo que se faz, repetidamente, em público." },
      { cat: "Ofício", read: "5 min", title: "A tipografia é uma decisão de negócio", excerpt: "A tipografia que escolhe é uma promessa sobre o cuidado com que tratará tudo o resto." },
    ],
    services: [
      { title: "Estratégia de Marca", desc: "Posicionamento, arquitetura e a narrativa que sustenta tudo." },
      { title: "Design de Identidade", desc: "Logótipos, sistemas e a linguagem visual que leva a marca a todo o lado." },
      { title: "Naming & Verbal", desc: "Nomes, voz e mensagens que não soam como mais ninguém." },
      { title: "Digital & Web", desc: "Sites e produtos desenhados para se mover tão bem como parecem." },
      { title: "Marketing & Social", desc: "Campanhas e presença social que transformam atenção em procura." },
      { title: "Packaging", desc: "Estruturas e superfícies que merecem um lugar nas mãos." },
      { title: "Content & Editorial", desc: "Editorial, fotografia e conteúdo que mantêm a marca a falar." },
    ],
    values: [
      { title: "Estratégia primeiro", desc: "Ganhamos o direito de desenhar entendendo o negócio." },
      { title: "Obsessão pelo ofício", desc: "Os últimos 5% são onde uma marca se torna inesquecível." },
      { title: "Feito para durar", desc: "Desenhamos sistemas, não tendências — feitos para sobreviver ao lançamento." },
    ],
    ui: {
      backToTop: "Voltar ao topo", overviewH: "Resumo", viewProject: "Ver projeto", nextProject: "Próximo projeto",
      client: "Cliente", year: "Ano", services: "Serviços", sector: "Setor", location: "Localização",
      challengeH: "O desafio", approachH: "A nossa abordagem", outcomeH: "O resultado",
      portfolioKicker: "Portfólio", portfolioTitle: "Trabalho selecionado",
      worksIntro: "Uma seleção de marcas que moldámos — estratégia, identidade e tudo o que há no meio.",
      ideasSub: "Notas sobre branding, estratégia e o ofício de criar significado.",
      servicesKicker: "O que fazemos", servicesTitle: "Expertise",
      servicesIntro: "Uma obsessão em cada disciplina: construir marcas que signifiquem algo.",
      aboutPageKicker: "O estúdio", valuesH: "No que acreditamos", teamH: "A equipa",
      formTitle: "Comecemos um projeto", fName: "Nome", fEmail: "Email", fMsg: "Conte-nos",
      fSend: "Enviar mensagem", fThanks: "Obrigado — entraremos em contacto em breve.",
      reachH: "Contacto", followH: "Redes", visitH: "Visite-nos", mapNote: "E. Bodereau 7491 · X5018 Córdoba",
    },
    footKicker: "Vamos trabalhar juntos", footTitle: "Vamos falar.", email: "hello@weareandale.com", emailHref: "mailto:hello@weareandale.com",
    footCols: [
      { head: "Contacto", items: ["hello@weareandale.com", "+54 9 3492 567"] },
      { head: "Redes", items: ["Instagram", "LinkedIn", "Behance"] },
      { head: "Escritórios", items: ["E. Bodereau 7491", "X5018 Córdoba"] },
      { head: "Legal", items: ["Privacidade", "Termos", "Cookies"] },
    ],
    rights: "© Studio 2026 — Todos os direitos reservados",
  },
  IT: {
    nav: { work: "Lavori", ideas: "Idee", about: "Studio", services: "Expertise", contact: "Contatti" },
    hero: [
      { k: "Branding & Strategia", t: "Costruiamo marchi che significano qualcosa.", s: "Uno studio indipendente che dà forma a identità, narrazioni ed esperienze per aziende con ambizione." },
      { k: "Sistemi di Identità", t: "La chiarezza è la sofisticazione suprema.", s: "Sistemi di design guidati dalla strategia, pronti a scalare su ogni superficie." },
      { k: "Dal 2014", t: "Idee che meritano l'attenzione che ricevono.", s: "Novanta marchi. Quattro continenti. Un'ossessione per il mestiere che non batte ciglio." },
    ],
    workKicker: "01 — Lavori Selezionati", workTitle: "Casi studio", axisLabel: "Orizzontale", viewCase: "Vedi caso",
    goWorksTitle: "Guarda il portfolio completo", goWorksCta: "Vai a Works", goWorksHint: "Continua a scorrere",
    works: [
      { client: "Polylepis", year: "2025", title: "Un brand di viaggi che parla in città", tags: "Rebranding · Campagna", sector: "Viaggi", img: "/uploads/polylepis.png", summary: "Rebranding e campagna per un'agenzia di viaggi d'avventura che vende destinazioni come sensazioni.", challenge: "Polylepis aveva bisogno di un rebranding per affinare la propria proposta e distinguersi in viaggi.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "New York is unique. Tokyo is energy." },
      { client: "Dillo", year: "2025", title: "Tecnologia che dà voce a tutti", tags: "Branding", sector: "Tecnologia", img: null, summary: "Branding per una startup che dà voce alle persone sorde e con difficoltà di linguaggio.", challenge: "Dillo aveva bisogno di un'identità di marca per affinare la propria proposta e distinguersi in tecnologia.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Tutti meritano di essere ascoltati." },
      { client: "Punto Íntimo", year: "2024", title: "Intimità, senza arrossire", tags: "Rebranding", sector: "Retail", img: null, summary: "Rebranding per una boutique di lingerie e benessere intimo, elegante e senza tabù.", challenge: "Punto Íntimo aveva bisogno di un rebranding per affinare la propria proposta e distinguersi in retail.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Fiducia, splendidamente confezionata." },
      { client: "Casa Capo", year: "2024", title: "Panini con firma d'autore", tags: "Branding", sector: "Gastronomia", img: "/uploads/casacapo.png", summary: "Marchio e identità per una casa di panini artigianali costruita sul buon pane.", challenge: "Casa Capo aveva bisogno di un'identità di marca per affinare la propria proposta e distinguersi in gastronomia.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Il buon pane meritava un gran nome." },
      { client: "Vera & Adela", year: "2024", title: "La pizzeria d'angolo, reimmaginata", tags: "Naming · Branding", sector: "Gastronomia", img: null, summary: "Naming e identità per una pizzeria di quartiere con l'anima d'angolo.", challenge: "Vera & Adela aveva bisogno di naming e identità per affinare la propria proposta e distinguersi in gastronomia.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Due nomi, una tavola di quartiere." },
      { client: "Wansoft", year: "2023", title: "Software con un volto umano", tags: "Branding", sector: "Tecnologia", img: null, summary: "Identità di marca per un'azienda di software che rende semplice il complesso.", challenge: "Wansoft aveva bisogno di un'identità di marca per affinare la propria proposta e distinguersi in tecnologia.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Abbiamo reso semplice il complesso." },
      { client: "Bosque Geométrico", year: "2025", title: "Dove la natura diventa geometria", tags: "Rebranding · Packaging", sector: "Ospitalità", img: null, summary: "Rebranding e packaging per un boutique hotel dove la natura diventa geometria.", challenge: "Bosque Geométrico aveva bisogno di un rebranding e packaging per affinare la propria proposta e distinguersi in ospitalità.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Natura, disegnata in linee pulite." },
      { client: "San Pietro", year: "2023", title: "Una tavola italiana, silenziosamente senza tempo", tags: "Rebranding · Packaging", sector: "Ristorante", img: "/uploads/sanpietro.png", summary: "Rebranding e packaging per un ristorante italiano di quartiere con il calore di una volta.", challenge: "San Pietro aveva bisogno di un rebranding e packaging per affinare la propria proposta e distinguersi in ristorante.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "La tradizione, servita con mano moderna." },
      { client: "Sonre Smile Hub", year: "2025", title: "Un modo più gentile di prendersi cura", tags: "Naming · Branding", sector: "Sanità", img: "/uploads/smileshub.png", summary: "Naming e identità per una clinica odontoiatrica che rende gentile la cura.", challenge: "Sonre Smile Hub aveva bisogno di naming e identità per affinare la propria proposta e distinguersi in sanità.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Abbiamo trasformato un logo in un sorriso." },
      { client: "Barbale", year: "2024", title: "Il campo, reso moderno", tags: "Rebranding", sector: "Agroindustria", img: null, summary: "Rebranding per un'agroindustria che modernizza il campo senza perdere le radici.", challenge: "Barbale aveva bisogno di un rebranding per affinare la propria proposta e distinguersi in agroindustria.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Le radici sono rimaste. Tutto il resto è cresciuto." },
      { client: "Bosk", year: "2023", title: "Legno, modellato a mano", tags: "Branding · Website", sector: "Prodotto", img: null, summary: "Branding e sito web per utensili di legno fatti a mano, con calore d'artigianato.", challenge: "Bosk aveva bisogno di un marchio e sito web per affinare la propria proposta e distinguersi in prodotto.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Fatto a mano, per durare." },
      { client: "Polígono Córdoba", year: "2024", title: "Industria, pronta per il futuro", tags: "Rebranding · Website", sector: "Industriale", img: null, summary: "Rebranding e sito web per un polo industriale che attrae le aziende del futuro.", challenge: "Polígono Córdoba aveva bisogno di un rebranding e sito web per affinare la propria proposta e distinguersi in industriale.", approach: "Abbiamo definito posizionamento, sistema visivo e tono di voce, applicati con coerenza in ogni punto di contatto.", outcome: "Un marchio chiaro e riconoscibile, pronto a crescere.", quote: "Dove l'industria incontra il futuro." },
    ],
    aboutKicker: "02 — Manifesto", aboutTitle: "Non decoriamo le aziende. Le definiamo.",
    aboutBody: "Il branding non è un logo. È la somma di ogni decisione che un'azienda prende — e la storia che le persone raccontano quando non sei nella stanza. Lavoriamo in quell'intersezione tra strategia e mestiere, dove nasce il significato.",
    stats: [{ n: "90+", l: "Marchi creati" }, { n: "4", l: "Continenti" }, { n: "12", l: "Anni, indipendenti" }],
    ideasKicker: "03 — Idee & Insights", ideasTitle: "Pensando ad alta voce", readMore: "Leggi l'articolo",
    insights: [
      { cat: "Strategia", read: "6 min", title: "Il potere silenzioso della sobrietà", excerpt: "Perché i marchi più forti si definiscono tanto per ciò che tacciono quanto per ciò che affermano." },
      { cat: "Cultura", read: "4 min", title: "Il tuo marchio è un verbo, non un nome", excerpt: "L'identità non è più qualcosa che possiedi. È qualcosa che fai, ripetutamente, in pubblico." },
      { cat: "Mestiere", read: "5 min", title: "La tipografia è una decisione di business", excerpt: "Il carattere che scegli è una promessa su quanta cura riserverai a tutto il resto." },
    ],
    services: [
      { title: "Strategia di Marca", desc: "Posizionamento, architettura e la storia che tiene tutto insieme." },
      { title: "Design dell'Identità", desc: "Logo, sistemi e il linguaggio visivo che porta il brand ovunque." },
      { title: "Naming & Verbal", desc: "Nomi, voce e messaggi che non suonano come nessun altro." },
      { title: "Digital & Web", desc: "Siti e prodotti progettati per muoversi bene quanto appaiono." },
      { title: "Marketing & Social", desc: "Campagne e presenza social che trasformano l'attenzione in domanda." },
      { title: "Packaging", desc: "Strutture e superfici che si guadagnano un posto tra le mani." },
      { title: "Content & Editorial", desc: "Editoriale, fotografia e contenuti che tengono viva la marca." },
    ],
    values: [
      { title: "Prima la strategia", desc: "Ci guadagniamo il diritto di progettare capendo il business." },
      { title: "Ossessione per il mestiere", desc: "L'ultimo 5% è dove un brand diventa indimenticabile." },
      { title: "Fatto per durare", desc: "Progettiamo sistemi, non tendenze — pensati per sopravvivere al lancio." },
    ],
    ui: {
      backToTop: "Torna su", overviewH: "Panoramica", viewProject: "Vedi progetto", nextProject: "Progetto successivo",
      client: "Cliente", year: "Anno", services: "Servizi", sector: "Settore", location: "Luogo",
      challengeH: "La sfida", approachH: "Il nostro approccio", outcomeH: "Il risultato",
      portfolioKicker: "Portfolio", portfolioTitle: "Lavori selezionati",
      worksIntro: "Una selezione di marchi che abbiamo plasmato — strategia, identità e tutto ciò che sta nel mezzo.",
      ideasSub: "Note su branding, strategia e il mestiere di creare significato.",
      servicesKicker: "Cosa facciamo", servicesTitle: "Expertise",
      servicesIntro: "Un'ossessione in ogni disciplina: costruire marchi che significano qualcosa.",
      aboutPageKicker: "Lo studio", valuesH: "In cosa crediamo", teamH: "Il team",
      formTitle: "Iniziamo un progetto", fName: "Nome", fEmail: "Email", fMsg: "Raccontaci",
      fSend: "Invia messaggio", fThanks: "Grazie — ti contatteremo a breve.",
      reachH: "Contatti", followH: "Social", visitH: "Vieni a trovarci", mapNote: "E. Bodereau 7491 · X5018 Córdoba",
    },
    footKicker: "Lavoriamo insieme", footTitle: "Parliamone.", email: "hello@weareandale.com", emailHref: "mailto:hello@weareandale.com",
    footCols: [
      { head: "Contatti", items: ["hello@weareandale.com", "+54 9 3492 567"] },
      { head: "Social", items: ["Instagram", "LinkedIn", "Behance"] },
      { head: "Sedi", items: ["E. Bodereau 7491", "X5018 Córdoba"] },
      { head: "Legale", items: ["Privacy", "Termini", "Cookie"] },
    ],
    rights: "© Studio 2026 — Tutti i diritti riservati",
  },
};

/* ---- Per-language auxiliary strings (ported 1:1 from the design component) ---- */

type L<T> = Record<Lang, T>;

export const STRINGS: {
  scrollLabel: L<string>;
  watchFilm: L<string>;
  approachKicker: L<string>;
  studioQuote: L<string>;
  studioLead: L<string>;
  mapHint: L<string>;
  skipLabel: L<string>;
  moreWorksLabel: L<string>;
  caseCountWord: L<string>;
  principlesWord: L<string>;
  numbersLabel: L<string>;
  cookiePolicyBack: L<string>;
  ctaTxt: L<{ book: string; write: string }>;
  studioLabels: L<{ intro: string; clients: string; recognition: string; ctaTitle: string; cta: string }>;
  servicesLead: L<string>;
  servicesPhilo: L<{ k: string; t: string; b: string }>;
  notFound: L<{ code: string; title: string; body: string; home: string; work: string }>;
  mapConsent: L<{ title: string; body: string; btn: string }>;
  approach: L<{ t: string; d: string }[]>;
  deliverables: L<string[][]>;
  a11y: L<{ primary: string; menu: string; menuDialog: string; closeMenu: string; themeToDark: string; themeToLight: string; lang: string; main: string; prev: string; next: string; loading: string }>;
  legalLinks: L<{ cookies: string; privacy: string; terms: string }>;
} = {
  scrollLabel: { EN: "Scroll", ES: "Desliza", PT: "Deslize", IT: "Scorri" },
  watchFilm: { EN: "Watch the film", ES: "Ver el film", PT: "Ver o filme", IT: "Guarda il film" },
  approachKicker: { EN: "How we work", ES: "Cómo trabajamos", PT: "Como trabalhamos", IT: "Come lavoriamo" },
  studioQuote: {
    EN: "Strategy you can see. Brands you can feel.",
    ES: "Estrategia que se ve. Marcas que se sienten.",
    PT: "Estratégia que se vê. Marcas que se sentem.",
    IT: "Strategia che si vede. Marchi che si sentono.",
  },
  studioLead: {
    EN: "Independent branding and strategy studio for brands that want to mean something.",
    ES: "Estudio independiente de branding y estrategia para marcas que quieren significar algo.",
    PT: "Estúdio independente de branding e estratégia para marcas que querem significar algo.",
    IT: "Studio indipendente di branding e strategia per marchi che vogliono significare qualcosa.",
  },
  mapHint: {
    EN: "Click to interact with the map",
    ES: "Haz clic para interactuar con el mapa",
    PT: "Clique para interagir com o mapa",
    IT: "Clicca per interagire con la mappa",
  },
  skipLabel: { EN: "Skip to content", ES: "Saltar al contenido", PT: "Ir para o conteúdo", IT: "Vai al contenuto" },
  moreWorksLabel: { EN: "More projects", ES: "Más proyectos", PT: "Mais projetos", IT: "Altri progetti" },
  caseCountWord: { EN: "case studies", ES: "casos", PT: "casos", IT: "casi" },
  principlesWord: { EN: "principles", ES: "principios", PT: "princípios", IT: "principi" },
  numbersLabel: { EN: "By the numbers", ES: "En números", PT: "Em números", IT: "In numeri" },
  cookiePolicyBack: { EN: "Back to home", ES: "Volver al inicio", PT: "Voltar ao início", IT: "Torna alla home" },
  ctaTxt: {
    EN: { book: "Book a meeting", write: "Write us" },
    ES: { book: "Agendar una reunión", write: "Escríbenos" },
    PT: { book: "Marcar uma reunião", write: "Escreva-nos" },
    IT: { book: "Prenota una riunione", write: "Scrivici" },
  },
  studioLabels: {
    EN: { intro: "The studio", clients: "Selected clients", recognition: "Recognition", ctaTitle: "Have a project in mind?", cta: "Start a project" },
    ES: { intro: "El estudio", clients: "Clientes seleccionados", recognition: "Reconocimientos", ctaTitle: "¿Tienes un proyecto en mente?", cta: "Empezar un proyecto" },
    PT: { intro: "O estúdio", clients: "Clientes selecionados", recognition: "Reconhecimentos", ctaTitle: "Tem um projeto em mente?", cta: "Começar um projeto" },
    IT: { intro: "Lo studio", clients: "Clienti selezionati", recognition: "Riconoscimenti", ctaTitle: "Hai un progetto in mente?", cta: "Inizia un progetto" },
  },
  servicesLead: {
    EN: "One team across strategy and design — built around the questions that move a brand forward.",
    ES: "Un solo equipo entre estrategia y diseño — en torno a las preguntas que hacen avanzar una marca.",
    PT: "Uma só equipa entre estratégia e design — em torno das perguntas que fazem uma marca avançar.",
    IT: "Un unico team tra strategia e design — attorno alle domande che fanno avanzare un marchio.",
  },
  servicesPhilo: {
    EN: { k: "How we think", t: "Strategy and craft, never one without the other.", b: "A brand only works when the idea and the execution pull in the same direction. We keep strategy, design and words under one roof so the thinking survives contact with the real world — on a shelf, on a screen, in a room." },
    ES: { k: "Cómo pensamos", t: "Estrategia y oficio, nunca uno sin el otro.", b: "Una marca solo funciona cuando la idea y la ejecución tiran en la misma dirección. Mantenemos estrategia, diseño y palabras bajo un mismo techo para que el pensamiento sobreviva al contacto con el mundo real — en una góndola, en una pantalla, en una sala." },
    PT: { k: "Como pensamos", t: "Estratégia e ofício, nunca um sem o outro.", b: "Uma marca só funciona quando a ideia e a execução puxam na mesma direção. Mantemos estratégia, design e palavras sob o mesmo teto para que o pensamento sobreviva ao contacto com o mundo real — numa prateleira, num ecrã, numa sala." },
    IT: { k: "Come pensiamo", t: "Strategia e mestiere, mai l'uno senza l'altro.", b: "Un marchio funziona solo quando l'idea e l'esecuzione vanno nella stessa direzione. Teniamo strategia, design e parole sotto lo stesso tetto perché il pensiero sopravviva al contatto con il mondo reale — su uno scaffale, su uno schermo, in una stanza." },
  },
  notFound: {
    EN: { code: "Error 404", title: "This page flew away.", body: "The page you're looking for doesn't exist or has moved. Let's get you back on track.", home: "Back to home", work: "See our work" },
    ES: { code: "Error 404", title: "Esta página salió volando.", body: "La página que buscas no existe o se ha movido. Volvamos al camino.", home: "Volver al inicio", work: "Ver nuestro trabajo" },
    PT: { code: "Erro 404", title: "Esta página voou para longe.", body: "A página que procura não existe ou foi movida. Vamos recolocá-lo no caminho.", home: "Voltar ao início", work: "Ver o nosso trabalho" },
    IT: { code: "Errore 404", title: "Questa pagina è volata via.", body: "La pagina che cerchi non esiste o è stata spostata. Torniamo sulla strada giusta.", home: "Torna alla home", work: "Guarda i nostri lavori" },
  },
  mapConsent: {
    EN: { title: "Map blocked by your cookie settings", body: "This map is loaded by a third party. Enable marketing cookies to view it.", btn: "Cookie settings" },
    ES: { title: "Mapa bloqueado por tu configuración de cookies", body: "Este mapa lo carga un tercero. Activa las cookies de marketing para verlo.", btn: "Configuración de cookies" },
    PT: { title: "Mapa bloqueado pelas suas configurações de cookies", body: "Este mapa é carregado por terceiros. Ative os cookies de marketing para vê-lo.", btn: "Configurações de cookies" },
    IT: { title: "Mappa bloccata dalle tue impostazioni cookie", body: "Questa mappa è caricata da terze parti. Abilita i cookie di marketing per vederla.", btn: "Impostazioni cookie" },
  },
  approach: {
    EN: [
      { t: "Discover", d: "We dig into the business, the market and the people before a single pixel." },
      { t: "Define", d: "Strategy, positioning and the story everything else hangs on." },
      { t: "Design", d: "Systems, identity and craft — built to scale and made to last." },
    ],
    ES: [
      { t: "Descubrir", d: "Investigamos el negocio, el mercado y las personas antes de un solo píxel." },
      { t: "Definir", d: "Estrategia, posicionamiento y el relato del que cuelga todo lo demás." },
      { t: "Diseñar", d: "Sistemas, identidad y oficio — hechos para escalar y para durar." },
    ],
    PT: [
      { t: "Descobrir", d: "Investigamos o negócio, o mercado e as pessoas antes de um único pixel." },
      { t: "Definir", d: "Estratégia, posicionamento e a narrativa da qual tudo o resto depende." },
      { t: "Desenhar", d: "Sistemas, identidade e ofício — feitos para escalar e para durar." },
    ],
    IT: [
      { t: "Scoprire", d: "Studiamo il business, il mercato e le persone prima di un solo pixel." },
      { t: "Definire", d: "Strategia, posizionamento e la storia da cui dipende tutto il resto." },
      { t: "Disegnare", d: "Sistemi, identità e mestiere — fatti per scalare e per durare." },
    ],
  },
  deliverables: {
    EN: [["Positioning", "Architecture", "Naming brief"], ["Logo systems", "Type & color", "Guidelines"], ["Naming", "Tone of voice", "Messaging"], ["UX/UI", "Websites", "Design systems"], ["Social systems", "Campaigns", "Content"], ["Structure", "Labels", "Art direction"], ["Editorial", "Photography", "Art direction"]],
    ES: [["Posicionamiento", "Arquitectura", "Brief de naming"], ["Sistemas de logo", "Tipografía y color", "Guías"], ["Naming", "Tono de voz", "Mensajes"], ["UX/UI", "Sitios web", "Design systems"], ["Sistemas sociales", "Campañas", "Contenido"], ["Estructura", "Etiquetas", "Dirección de arte"], ["Editorial", "Fotografía", "Dirección de arte"]],
    PT: [["Posicionamento", "Arquitetura", "Brief de naming"], ["Sistemas de logo", "Tipografia e cor", "Guias"], ["Naming", "Tom de voz", "Mensagens"], ["UX/UI", "Sites", "Design systems"], ["Sistemas sociais", "Campanhas", "Conteúdo"], ["Estrutura", "Etiquetas", "Direção de arte"], ["Editorial", "Fotografia", "Direção de arte"]],
    IT: [["Posizionamento", "Architettura", "Brief di naming"], ["Sistemi di logo", "Tipografia e colore", "Linee guida"], ["Naming", "Tono di voce", "Messaggi"], ["UX/UI", "Siti web", "Design system"], ["Sistemi social", "Campagne", "Contenuti"], ["Struttura", "Etichette", "Direzione artistica"], ["Editoriale", "Fotografia", "Direzione artistica"]],
  },
  a11y: {
    EN: { primary: "Primary", menu: "Open menu", menuDialog: "Site menu", closeMenu: "Close menu", themeToDark: "Switch to dark mode", themeToLight: "Switch to light mode", lang: "Select language", main: "Main content", prev: "Previous", next: "Next", loading: "Loading" },
    ES: { primary: "Principal", menu: "Abrir menú", menuDialog: "Menú del sitio", closeMenu: "Cerrar menú", themeToDark: "Cambiar a modo oscuro", themeToLight: "Cambiar a modo claro", lang: "Seleccionar idioma", main: "Contenido principal", prev: "Anterior", next: "Siguiente", loading: "Cargando" },
    PT: { primary: "Principal", menu: "Abrir menu", menuDialog: "Menu do site", closeMenu: "Fechar menu", themeToDark: "Mudar para modo escuro", themeToLight: "Mudar para modo claro", lang: "Selecionar idioma", main: "Conteúdo principal", prev: "Anterior", next: "Próximo", loading: "Carregando" },
    IT: { primary: "Principale", menu: "Apri menu", menuDialog: "Menu del sito", closeMenu: "Chiudi menu", themeToDark: "Passa alla modalità scura", themeToLight: "Passa alla modalità chiara", lang: "Seleziona lingua", main: "Contenuto principale", prev: "Precedente", next: "Successivo", loading: "Caricamento" },
  },
  legalLinks: {
    EN: { cookies: "Cookie Policy", privacy: "Privacy Policy", terms: "Terms of Service" },
    ES: { cookies: "Política de cookies", privacy: "Política de privacidad", terms: "Términos del servicio" },
    PT: { cookies: "Política de cookies", privacy: "Política de privacidade", terms: "Termos de serviço" },
    IT: { cookies: "Informativa cookie", privacy: "Informativa privacy", terms: "Termini di servizio" },
  },
};

/* ---- Team (roles/bios localised, names/photos shared) ---- */

export const TEAM_MEMBERS = [
  { name: "Jimena Moyano", img: "/uploads/jime-1.webp" },
  { name: "Fernando Ambordt", img: "/uploads/fer-1.webp" },
  { name: "Milagros Guasco", img: "/uploads/mili-1.webp" },
  { name: "Valentina Richardson", img: "/uploads/vale-1.webp" },
  { name: "Catalina Gabellieri", img: "/uploads/cata-1.webp" },
  { name: "Manuel Moyano Palacio", img: "/uploads/manu-1.webp" },
];

export const TEAM_ROLES: L<{ role: string; bio: string }[]> = {
  EN: [
    { role: "Co-founder & CEO", bio: "Leads strategy and the studio's direction. Twelve years turning business questions into brands with a point of view." },
    { role: "Co-founder & Art Director", bio: "Shapes the visual language of every project — from the first sketch to the final system. Obsessed with craft and detail." },
    { role: "Account Executive", bio: "Keeps projects moving and clients close. The bridge between what a brand needs and what the studio makes." },
    { role: "Graphic Designer & Photographer", bio: "Designs and shoots. Brings a photographer's eye to identity systems and a designer's rigor to every frame." },
    { role: "Graphic Designer", bio: "Turns strategy into layouts, type and motion. Fluent in systems that scale across every touchpoint." },
    { role: "Creative Copywriter", bio: "Finds the words a brand can own. Names, tone and messaging that sound like no one else." },
  ],
  ES: [
    { role: "Cofundadora y CEO", bio: "Lidera la estrategia y la dirección del estudio. Doce años convirtiendo preguntas de negocio en marcas con punto de vista." },
    { role: "Cofundador y Director de Arte", bio: "Da forma al lenguaje visual de cada proyecto — del primer boceto al sistema final. Obsesionado con el oficio y el detalle." },
    { role: "Ejecutiva de Cuentas", bio: "Mantiene los proyectos en marcha y a los clientes cerca. El puente entre lo que una marca necesita y lo que el estudio hace." },
    { role: "Diseñadora Gráfica y Fotógrafa", bio: "Diseña y fotografía. Aporta ojo de fotógrafa a los sistemas de identidad y rigor de diseñadora a cada toma." },
    { role: "Diseñadora Gráfica", bio: "Convierte la estrategia en composiciones, tipografía y movimiento. Fluida en sistemas que escalan en cada punto de contacto." },
    { role: "Copywriter Creativo", bio: "Encuentra las palabras que una marca puede hacer suyas. Nombres, tono y mensajes que no suenan como nadie más." },
  ],
  PT: [
    { role: "Cofundadora e CEO", bio: "Lidera a estratégia e a direção do estúdio. Doze anos a transformar perguntas de negócio em marcas com ponto de vista." },
    { role: "Cofundador e Diretor de Arte", bio: "Molda a linguagem visual de cada projeto — do primeiro esboço ao sistema final. Obcecado com o ofício e o detalhe." },
    { role: "Executiva de Contas", bio: "Mantém os projetos em andamento e os clientes por perto. A ponte entre o que uma marca precisa e o que o estúdio faz." },
    { role: "Designer Gráfica e Fotógrafa", bio: "Desenha e fotografa. Traz olhar de fotógrafa aos sistemas de identidade e rigor de designer a cada enquadramento." },
    { role: "Designer Gráfica", bio: "Transforma estratégia em layouts, tipografia e movimento. Fluente em sistemas que escalam em cada ponto de contacto." },
    { role: "Copywriter Criativo", bio: "Encontra as palavras que uma marca pode fazer suas. Nomes, tom e mensagens que não soam como mais ninguém." },
  ],
  IT: [
    { role: "Cofondatrice e CEO", bio: "Guida la strategia e la direzione dello studio. Dodici anni a trasformare domande di business in marchi con un punto di vista." },
    { role: "Cofondatore e Art Director", bio: "Plasma il linguaggio visivo di ogni progetto — dal primo schizzo al sistema finale. Ossessionato dal mestiere e dal dettaglio." },
    { role: "Account Executive", bio: "Tiene i progetti in movimento e i clienti vicini. Il ponte tra ciò di cui un marchio ha bisogno e ciò che lo studio crea." },
    { role: "Graphic Designer e Fotografa", bio: "Disegna e fotografa. Porta l'occhio di una fotografa ai sistemi di identità e il rigore di una designer a ogni scatto." },
    { role: "Graphic Designer", bio: "Trasforma la strategia in layout, tipografia e movimento. Fluente in sistemi che scalano su ogni touchpoint." },
    { role: "Copywriter Creativo", bio: "Trova le parole che un marchio può far sue. Nomi, tono e messaggi che non suonano come nessun altro." },
  ],
};

export const DT_LOCALE: Record<Lang, string> = { EN: "en-GB", ES: "es-AR", PT: "pt-BR", IT: "it-IT" };

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "EN";
  try {
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (const l of langs) {
      const code = (l || "").slice(0, 2).toUpperCase();
      if ((LANGS as string[]).includes(code)) return code as Lang;
    }
  } catch {
    /* fall through */
  }
  return "EN";
}
