import type { Lang } from "./i18n";

type L<T> = Record<Lang, T>;

export interface PolicySection { h: string; p: string }
export interface Policy { title: string; updated: string; intro: string; sections: PolicySection[] }

export const COOKIE_TEXTS: L<{
  text: string; accept: string; decline: string; customize: string; policy: string;
  panelTitle: string; panelIntro: string; save: string; on: string; off: string; required: string;
  cats: { k: "necessary" | "analytics" | "marketing"; t: string; d: string }[];
  fabLabel: string;
}> = {
  EN: {
    text: "We use cookies to improve your experience and analyse traffic.", accept: "Accept all", decline: "Decline", customize: "Customize", policy: "Privacy Policy",
    panelTitle: "Cookie preferences", panelIntro: "Choose which cookies we may use. You can change these anytime.", save: "Save preferences", on: "On", off: "Off", required: "Always on",
    cats: [
      { k: "necessary", t: "Strictly necessary", d: "Essential for the site to function. These can't be switched off." },
      { k: "analytics", t: "Analytics", d: "Help us understand how the site is used so we can improve it." },
      { k: "marketing", t: "Marketing", d: "Used to personalise content and measure campaign performance." },
    ],
    fabLabel: "Cookie settings",
  },
  ES: {
    text: "Usamos cookies para mejorar tu experiencia y analizar el tráfico.", accept: "Aceptar todas", decline: "Rechazar", customize: "Personalizar", policy: "Política de privacidad",
    panelTitle: "Preferencias de cookies", panelIntro: "Elige qué cookies podemos usar. Puedes cambiarlo cuando quieras.", save: "Guardar preferencias", on: "Sí", off: "No", required: "Siempre activas",
    cats: [
      { k: "necessary", t: "Estrictamente necesarias", d: "Esenciales para que el sitio funcione. No se pueden desactivar." },
      { k: "analytics", t: "Analíticas", d: "Nos ayudan a entender cómo se usa el sitio para mejorarlo." },
      { k: "marketing", t: "Marketing", d: "Se usan para personalizar contenido y medir campañas." },
    ],
    fabLabel: "Configuración de cookies",
  },
  PT: {
    text: "Usamos cookies para melhorar a sua experiência e analisar o tráfego.", accept: "Aceitar todas", decline: "Recusar", customize: "Personalizar", policy: "Política de privacidade",
    panelTitle: "Preferências de cookies", panelIntro: "Escolha quais cookies podemos usar. Pode alterar quando quiser.", save: "Guardar preferências", on: "Sim", off: "Não", required: "Sempre ativas",
    cats: [
      { k: "necessary", t: "Estritamente necessárias", d: "Essenciais para o site funcionar. Não podem ser desativadas." },
      { k: "analytics", t: "Analíticas", d: "Ajudam-nos a entender como o site é usado para o melhorar." },
      { k: "marketing", t: "Marketing", d: "Usadas para personalizar conteúdo e medir campanhas." },
    ],
    fabLabel: "Configurações de cookies",
  },
  IT: {
    text: "Usiamo i cookie per migliorare la tua esperienza e analizzare il traffico.", accept: "Accetta tutti", decline: "Rifiuta", customize: "Personalizza", policy: "Informativa privacy",
    panelTitle: "Preferenze cookie", panelIntro: "Scegli quali cookie possiamo usare. Puoi modificarle quando vuoi.", save: "Salva preferenze", on: "Sì", off: "No", required: "Sempre attivi",
    cats: [
      { k: "necessary", t: "Strettamente necessari", d: "Essenziali per il funzionamento del sito. Non disattivabili." },
      { k: "analytics", t: "Analitici", d: "Ci aiutano a capire come viene usato il sito per migliorarlo." },
      { k: "marketing", t: "Marketing", d: "Usati per personalizzare i contenuti e misurare le campagne." },
    ],
    fabLabel: "Impostazioni cookie",
  },
};

export const AUDIT_TEXTS: L<{
  title: string; intro: string; empty: string; on: string; off: string;
  actions: Record<string, string>; cats: { analytics: string; marketing: string };
}> = {
  EN: { title: "Consent audit log", intro: "A record of the cookie choices made in this browser.", empty: "No consent activity recorded yet.", on: "On", off: "Off", actions: { accept_all: "Accepted all", decline_all: "Declined all", custom: "Saved preferences" }, cats: { analytics: "Analytics", marketing: "Marketing" } },
  ES: { title: "Registro de consentimiento", intro: "Un registro de las decisiones de cookies tomadas en este navegador.", empty: "Aún no hay actividad de consentimiento registrada.", on: "Sí", off: "No", actions: { accept_all: "Aceptó todas", decline_all: "Rechazó todas", custom: "Guardó preferencias" }, cats: { analytics: "Analíticas", marketing: "Marketing" } },
  PT: { title: "Registo de consentimento", intro: "Um registo das escolhas de cookies feitas neste navegador.", empty: "Ainda não há atividade de consentimento registada.", on: "Sim", off: "Não", actions: { accept_all: "Aceitou todas", decline_all: "Recusou todas", custom: "Guardou preferências" }, cats: { analytics: "Analíticas", marketing: "Marketing" } },
  IT: { title: "Registro dei consensi", intro: "Un registro delle scelte sui cookie fatte in questo browser.", empty: "Nessuna attività di consenso registrata.", on: "Sì", off: "No", actions: { accept_all: "Accettati tutti", decline_all: "Rifiutati tutti", custom: "Preferenze salvate" }, cats: { analytics: "Analitici", marketing: "Marketing" } },
};

export const EXPIRY_TEXTS: L<{ active: string; expired: string; renew: string; none: string }> = {
  EN: { active: "Your current consent is valid until", expired: "Your previous choices have expired — please review them.", renew: "Renew consent", none: "No active consent — cookies beyond strictly necessary are blocked." },
  ES: { active: "Tu consentimiento actual es válido hasta el", expired: "Tus elecciones anteriores han caducado — por favor revísalas.", renew: "Renovar consentimiento", none: "Sin consentimiento activo — se bloquean las cookies no esenciales." },
  PT: { active: "O seu consentimento atual é válido até", expired: "As suas escolhas anteriores expiraram — por favor reveja-as.", renew: "Renovar consentimento", none: "Sem consentimento ativo — os cookies não essenciais são bloqueados." },
  IT: { active: "Il tuo consenso attuale è valido fino al", expired: "Le tue scelte precedenti sono scadute — ti invitiamo a rivederle.", renew: "Rinnova il consenso", none: "Nessun consenso attivo — i cookie non essenziali sono bloccati." },
};

export const COOKIE_POLICY: L<Policy> = {
  EN: {
    title: "Cookie Policy", updated: "Last updated: July 2026",
    intro: "This policy explains how Andale uses cookies and similar technologies on this website, and the choices you have.",
    sections: [
      { h: "What are cookies?", p: "Cookies are small text files placed on your device when you visit a website. They help the site work, remember your preferences, and give us insight into how the site is used." },
      { h: "How we use them", p: "We use cookies to keep the site running, to remember your language and consent choices, and — only with your permission — to measure traffic and improve our content." },
      { h: "Categories we use", p: "Strictly necessary cookies keep the site functional and cannot be turned off. Analytics cookies help us understand usage. Marketing cookies personalise content and measure campaigns. You control analytics and marketing." },
      { h: "Managing your choices", p: "You can accept, decline, or fine-tune each category at any time from the “Cookie settings” link in the footer. Clearing your browser storage will reset your choices." },
      { h: "Third parties", p: "Some cookies may be set by trusted third parties, such as our embedded map and scheduling tools. These are only loaded when relevant." },
      { h: "Contact", p: "Questions about this policy? Write to hello@weareandale.com and we'll be glad to help." },
    ],
  },
  ES: {
    title: "Política de Cookies", updated: "Última actualización: julio 2026",
    intro: "Esta política explica cómo Andale usa cookies y tecnologías similares en este sitio web, y las opciones que tienes.",
    sections: [
      { h: "¿Qué son las cookies?", p: "Las cookies son pequeños archivos de texto que se guardan en tu dispositivo al visitar un sitio. Ayudan a que funcione, recuerdan tus preferencias y nos dan información sobre cómo se usa." },
      { h: "Cómo las usamos", p: "Usamos cookies para mantener el sitio en funcionamiento, recordar tu idioma y tu consentimiento y —solo con tu permiso— medir el tráfico y mejorar nuestro contenido." },
      { h: "Categorías que usamos", p: "Las estrictamente necesarias mantienen el sitio operativo y no se pueden desactivar. Las analíticas nos ayudan a entender el uso. Las de marketing personalizan contenido y miden campañas. Tú controlas analíticas y marketing." },
      { h: "Gestionar tus opciones", p: "Puedes aceptar, rechazar o ajustar cada categoría cuando quieras desde el enlace «Configuración de cookies» del pie de página. Borrar el almacenamiento del navegador reiniciará tus elecciones." },
      { h: "Terceros", p: "Algunas cookies pueden ser establecidas por terceros de confianza, como el mapa incrustado y las herramientas de agenda. Solo se cargan cuando corresponde." },
      { h: "Contacto", p: "¿Dudas sobre esta política? Escríbenos a hello@weareandale.com y con gusto te ayudamos." },
    ],
  },
  PT: {
    title: "Política de Cookies", updated: "Última atualização: julho de 2026",
    intro: "Esta política explica como a Andale usa cookies e tecnologias semelhantes neste site e as escolhas que você tem.",
    sections: [
      { h: "O que são cookies?", p: "Cookies são pequenos arquivos de texto guardados no seu dispositivo ao visitar um site. Ajudam o site a funcionar, lembram as suas preferências e nos dão informações sobre o uso." },
      { h: "Como os usamos", p: "Usamos cookies para manter o site funcionando, lembrar o seu idioma e consentimento e — apenas com a sua permissão — medir o tráfego e melhorar o conteúdo." },
      { h: "Categorias que usamos", p: "As estritamente necessárias mantêm o site funcional e não podem ser desativadas. As analíticas ajudam a entender o uso. As de marketing personalizam conteúdo e medem campanhas. Você controla analíticas e marketing." },
      { h: "Gerir as suas escolhas", p: "Pode aceitar, recusar ou ajustar cada categoria a qualquer momento pelo link “Configurações de cookies” no rodapé. Limpar o armazenamento do navegador redefine as suas escolhas." },
      { h: "Terceiros", p: "Alguns cookies podem ser definidos por terceiros confiáveis, como o mapa incorporado e as ferramentas de agendamento. Só são carregados quando relevante." },
      { h: "Contato", p: "Dúvidas sobre esta política? Escreva para hello@weareandale.com e teremos prazer em ajudar." },
    ],
  },
  IT: {
    title: "Informativa sui Cookie", updated: "Ultimo aggiornamento: luglio 2026",
    intro: "Questa informativa spiega come Andale utilizza i cookie e tecnologie simili su questo sito e le scelte a tua disposizione.",
    sections: [
      { h: "Cosa sono i cookie?", p: "I cookie sono piccoli file di testo salvati sul tuo dispositivo quando visiti un sito. Aiutano il sito a funzionare, ricordano le tue preferenze e ci danno informazioni sull'uso." },
      { h: "Come li usiamo", p: "Usiamo i cookie per far funzionare il sito, ricordare la lingua e il consenso e — solo con il tuo permesso — misurare il traffico e migliorare i contenuti." },
      { h: "Categorie che usiamo", p: "Quelli strettamente necessari mantengono il sito funzionante e non possono essere disattivati. Gli analitici aiutano a capire l'uso. Quelli di marketing personalizzano i contenuti e misurano le campagne. Tu controlli analitici e marketing." },
      { h: "Gestire le tue scelte", p: "Puoi accettare, rifiutare o regolare ogni categoria in qualsiasi momento dal link “Impostazioni cookie” nel footer. Cancellare la memoria del browser reimposterà le tue scelte." },
      { h: "Terze parti", p: "Alcuni cookie possono essere impostati da terze parti affidabili, come la mappa incorporata e gli strumenti di prenotazione. Vengono caricati solo quando pertinenti." },
      { h: "Contatto", p: "Domande su questa informativa? Scrivi a hello@weareandale.com e saremo lieti di aiutarti." },
    ],
  },
};

export const PRIVACY_POLICY: L<Policy> = {
  EN: {
    title: "Privacy Policy", updated: "Last updated: July 2026",
    intro: "This policy explains what personal data Andale collects, why we collect it, and the rights you have over it.",
    sections: [
      { h: "Who we are", p: "Andale is a branding and strategy studio based in Córdoba, Argentina. We are the controller of the personal data described in this policy." },
      { h: "Data we collect", p: "We collect what you send us through the contact form (name, email and your message), and — with your consent — anonymous usage data via analytics cookies." },
      { h: "How we use it", p: "We use your data to reply to enquiries, deliver our services, and improve the site. We never sell your personal data." },
      { h: "Legal basis", p: "We process contact data on the basis of your request and our legitimate interest in responding; analytics and marketing only on the basis of your consent." },
      { h: "Retention", p: "We keep enquiry data only as long as needed to handle your request and meet legal obligations, then delete it." },
      { h: "Your rights", p: "You may request access, correction, deletion or portability of your data, and object to processing, at any time by writing to us." },
      { h: "Contact", p: "For any privacy request, email hello@weareandale.com. You also have the right to complain to your local data protection authority." },
    ],
  },
  ES: {
    title: "Política de Privacidad", updated: "Última actualización: julio 2026",
    intro: "Esta política explica qué datos personales recopila Andale, por qué lo hacemos y los derechos que tienes sobre ellos.",
    sections: [
      { h: "Quiénes somos", p: "Andale es un estudio de branding y estrategia con sede en Córdoba, Argentina. Somos responsables del tratamiento de los datos descritos en esta política." },
      { h: "Datos que recopilamos", p: "Recopilamos lo que nos envías por el formulario de contacto (nombre, email y tu mensaje) y —con tu consentimiento— datos de uso anónimos mediante cookies analíticas." },
      { h: "Cómo los usamos", p: "Usamos tus datos para responder consultas, prestar nuestros servicios y mejorar el sitio. Nunca vendemos tus datos personales." },
      { h: "Base legal", p: "Tratamos los datos de contacto en base a tu solicitud y nuestro interés legítimo en responder; analíticas y marketing solo con tu consentimiento." },
      { h: "Conservación", p: "Conservamos los datos de las consultas solo el tiempo necesario para atender tu solicitud y cumplir obligaciones legales, y luego los eliminamos." },
      { h: "Tus derechos", p: "Puedes solicitar acceso, rectificación, supresión o portabilidad de tus datos, y oponerte al tratamiento, en cualquier momento escribiéndonos." },
      { h: "Contacto", p: "Para cualquier solicitud de privacidad, escribe a hello@weareandale.com. También tienes derecho a reclamar ante tu autoridad de protección de datos." },
    ],
  },
  PT: {
    title: "Política de Privacidade", updated: "Última atualização: julho de 2026",
    intro: "Esta política explica quais dados pessoais a Andale recolhe, por que os recolhemos e os direitos que você tem sobre eles.",
    sections: [
      { h: "Quem somos", p: "A Andale é um estúdio de branding e estratégia sediado em Córdoba, Argentina. Somos os responsáveis pelo tratamento dos dados descritos nesta política." },
      { h: "Dados que recolhemos", p: "Recolhemos o que você nos envia pelo formulário de contacto (nome, email e a sua mensagem) e — com o seu consentimento — dados de uso anónimos por cookies analíticos." },
      { h: "Como os usamos", p: "Usamos os seus dados para responder a pedidos, prestar os nossos serviços e melhorar o site. Nunca vendemos os seus dados pessoais." },
      { h: "Base legal", p: "Tratamos os dados de contacto com base no seu pedido e no nosso interesse legítimo em responder; analíticas e marketing apenas com o seu consentimento." },
      { h: "Conservação", p: "Guardamos os dados dos pedidos apenas pelo tempo necessário para tratar a sua solicitação e cumprir obrigações legais, depois eliminamos." },
      { h: "Os seus direitos", p: "Pode solicitar acesso, correção, eliminação ou portabilidade dos seus dados, e opor-se ao tratamento, a qualquer momento escrevendo-nos." },
      { h: "Contacto", p: "Para qualquer pedido de privacidade, escreva para hello@weareandale.com. Também tem o direito de reclamar junto da sua autoridade de proteção de dados." },
    ],
  },
  IT: {
    title: "Informativa sulla Privacy", updated: "Ultimo aggiornamento: luglio 2026",
    intro: "Questa informativa spiega quali dati personali Andale raccoglie, perché li raccogliamo e i diritti che hai su di essi.",
    sections: [
      { h: "Chi siamo", p: "Andale è uno studio di branding e strategia con sede a Córdoba, Argentina. Siamo il titolare del trattamento dei dati descritti in questa informativa." },
      { h: "Dati che raccogliamo", p: "Raccogliamo ciò che ci invii tramite il modulo di contatto (nome, email e il tuo messaggio) e — con il tuo consenso — dati d'uso anonimi tramite cookie analitici." },
      { h: "Come li usiamo", p: "Usiamo i tuoi dati per rispondere alle richieste, fornire i nostri servizi e migliorare il sito. Non vendiamo mai i tuoi dati personali." },
      { h: "Base giuridica", p: "Trattiamo i dati di contatto sulla base della tua richiesta e del nostro legittimo interesse a rispondere; analitici e marketing solo con il tuo consenso." },
      { h: "Conservazione", p: "Conserviamo i dati delle richieste solo per il tempo necessario a gestire la tua richiesta e adempiere agli obblighi di legge, poi li eliminiamo." },
      { h: "I tuoi diritti", p: "Puoi richiedere accesso, rettifica, cancellazione o portabilità dei tuoi dati, e opporti al trattamento, in qualsiasi momento scrivendoci." },
      { h: "Contatto", p: "Per qualsiasi richiesta sulla privacy, scrivi a hello@weareandale.com. Hai anche il diritto di presentare reclamo alla tua autorità per la protezione dei dati." },
    ],
  },
};

export const TERMS_POLICY: L<Policy> = {
  EN: {
    title: "Terms of Service", updated: "Last updated: July 2026",
    intro: "These terms govern your use of the Andale website and the services we provide. By using this site you agree to them.",
    sections: [
      { h: "Using this site", p: "You may browse and use this website for lawful purposes only. You agree not to disrupt it, misuse it, or attempt to access areas you are not authorised to." },
      { h: "Intellectual property", p: "All content, design, and branding on this site belong to Andale or its clients and are protected by law. You may not reproduce or reuse it without written permission." },
      { h: "Our services", p: "Any engagement for design or strategy work is governed by a separate written agreement. This website does not itself constitute an offer or contract." },
      { h: "Content & submissions", p: "Anything you send us through the contact form must be accurate and yours to share. You remain responsible for the material you provide." },
      { h: "Disclaimer", p: "The site is provided “as is”. We work to keep it accurate and available but make no warranties and are not liable for indirect or incidental damages." },
      { h: "Changes", p: "We may update these terms from time to time. Continued use of the site after changes means you accept the revised terms." },
      { h: "Governing law", p: "These terms are governed by the laws of Argentina, and any dispute will be subject to the courts of Córdoba." },
      { h: "Contact", p: "Questions about these terms? Write to hello@weareandale.com." },
    ],
  },
  ES: {
    title: "Términos del Servicio", updated: "Última actualización: julio 2026",
    intro: "Estos términos regulan el uso del sitio web de Andale y los servicios que ofrecemos. Al usar este sitio, los aceptas.",
    sections: [
      { h: "Uso del sitio", p: "Puedes navegar y usar este sitio solo con fines lícitos. Aceptas no interrumpirlo, hacer un uso indebido ni intentar acceder a áreas no autorizadas." },
      { h: "Propiedad intelectual", p: "Todo el contenido, diseño y marca de este sitio pertenecen a Andale o a sus clientes y están protegidos por la ley. No puedes reproducirlo ni reutilizarlo sin permiso por escrito." },
      { h: "Nuestros servicios", p: "Cualquier contratación de trabajo de diseño o estrategia se rige por un acuerdo escrito aparte. Este sitio no constituye por sí mismo una oferta ni un contrato." },
      { h: "Contenido y envíos", p: "Todo lo que nos envíes por el formulario de contacto debe ser veraz y de tu propiedad. Eres responsable del material que proporcionas." },
      { h: "Exención de responsabilidad", p: "El sitio se ofrece “tal cual”. Procuramos mantenerlo preciso y disponible, pero no damos garantías ni respondemos por daños indirectos o incidentales." },
      { h: "Cambios", p: "Podemos actualizar estos términos ocasionalmente. El uso continuado del sitio tras los cambios implica que aceptas los términos revisados." },
      { h: "Ley aplicable", p: "Estos términos se rigen por las leyes de Argentina, y cualquier disputa se someterá a los tribunales de Córdoba." },
      { h: "Contacto", p: "¿Dudas sobre estos términos? Escribe a hello@weareandale.com." },
    ],
  },
  PT: {
    title: "Termos de Serviço", updated: "Última atualização: julho de 2026",
    intro: "Estes termos regem o uso do site da Andale e os serviços que prestamos. Ao usar este site, você os aceita.",
    sections: [
      { h: "Uso do site", p: "Pode navegar e usar este site apenas para fins lícitos. Concorda em não o perturbar, usar indevidamente ou tentar aceder a áreas não autorizadas." },
      { h: "Propriedade intelectual", p: "Todo o conteúdo, design e marca deste site pertencem à Andale ou aos seus clientes e são protegidos por lei. Não pode reproduzi-lo nem reutilizá-lo sem permissão por escrito." },
      { h: "Os nossos serviços", p: "Qualquer contratação de trabalho de design ou estratégia é regida por um acordo escrito separado. Este site não constitui por si só uma oferta ou contrato." },
      { h: "Conteúdo e envios", p: "Tudo o que nos enviar pelo formulário de contacto deve ser verdadeiro e seu. Você continua responsável pelo material que fornece." },
      { h: "Isenção de responsabilidade", p: "O site é fornecido “tal como está”. Trabalhamos para mantê-lo preciso e disponível, mas não damos garantias nem respondemos por danos indiretos ou incidentais." },
      { h: "Alterações", p: "Podemos atualizar estes termos periodicamente. O uso continuado do site após alterações significa que aceita os termos revistos." },
      { h: "Lei aplicável", p: "Estes termos são regidos pelas leis da Argentina, e qualquer litígio será submetido aos tribunais de Córdoba." },
      { h: "Contacto", p: "Dúvidas sobre estes termos? Escreva para hello@weareandale.com." },
    ],
  },
  IT: {
    title: "Termini di Servizio", updated: "Ultimo aggiornamento: luglio 2026",
    intro: "Questi termini regolano l'uso del sito Andale e dei servizi che offriamo. Utilizzando questo sito li accetti.",
    sections: [
      { h: "Uso del sito", p: "Puoi navigare e usare questo sito solo per scopi leciti. Accetti di non perturbarlo, usarlo in modo improprio o tentare di accedere ad aree non autorizzate." },
      { h: "Proprietà intellettuale", p: "Tutti i contenuti, il design e il brand di questo sito appartengono ad Andale o ai suoi clienti e sono protetti dalla legge. Non puoi riprodurli o riutilizzarli senza permesso scritto." },
      { h: "I nostri servizi", p: "Qualsiasi incarico di design o strategia è regolato da un accordo scritto separato. Questo sito non costituisce di per sé un'offerta o un contratto." },
      { h: "Contenuti e invii", p: "Tutto ciò che ci invii tramite il modulo di contatto deve essere veritiero e di tua proprietà. Resti responsabile del materiale che fornisci." },
      { h: "Esclusione di responsabilità", p: "Il sito è fornito “così com'è”. Lavoriamo per mantenerlo accurato e disponibile ma non forniamo garanzie e non siamo responsabili per danni indiretti o incidentali." },
      { h: "Modifiche", p: "Possiamo aggiornare questi termini di tanto in tanto. L'uso continuato del sito dopo le modifiche implica l'accettazione dei termini rivisti." },
      { h: "Legge applicabile", p: "Questi termini sono regolati dalle leggi dell'Argentina e ogni controversia sarà soggetta ai tribunali di Córdoba." },
      { h: "Contatto", p: "Domande su questi termini? Scrivi a hello@weareandale.com." },
    ],
  },
};
