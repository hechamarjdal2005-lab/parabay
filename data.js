/* ==========================================================================
   Green Para Bay — Product & Content Data
   --------------------------------------------------------------------------
   Everything below is intentionally plain and easy to edit.
   To add / update a product, just add or edit an object in PRODUCTS.
   To change a category, edit CATEGORIES.
   Prices are Moroccan Dirhams (MAD / DH).
   Images use Unsplash placeholders — replace the `img` value with your own
   photo path (e.g. "images/prosopi.jpg") when you are ready.
   ========================================================================== */

const BRAND = {
  name: "Green Para Bay",
  tagline: "Santé • Beauté • Bien-être à M'diq",
  taglineLong: "Votre parapharmacie de proximité sur la côte méditerranéenne",
  owner: "Imane Errouahe",
  role: "Pharmacienne",
  address: "Av. Moussa Ibn Noussair, M'diq 93200",
  addressFull: "Av. Moussa Ibn Noussair, M'diq 93200, Maroc",
  region: "M'diq, Côte méditerranéenne, Maroc",
  phone: "06 41 38 19 10",
  phoneRaw: "212641381910",
  whatsapp: "https://wa.me/212641381910",
  instagram: "https://instagram.com/green_para_bay",
  instagramHandle: "green_para_bay",
  email: "contact@greenparabay.ma",
  mapsEmbed:
    "https://www.google.com/maps?q=Av.%20Moussa%20Ibn%20Noussair%2C%20M%27diq%2093200%2C%20Morocco&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Av.+Moussa+Ibn+Noussair,+M%27diq+93200,+Morocco",
  hours: [
    { day: "Lundi – Vendredi", time: "09:00 – 20:00" },
    { day: "Samedi", time: "09:00 – 20:00" },
    { day: "Dimanche", time: "10:00 – 13:00" }
  ]
};

const CATEGORIES = [
  {
    id: "visage",
    name: "Soins Visage & Solaire",
    short: "Visage & Solaire",
    icon: "sun",
    desc: "Crèmes hydratantes, sérums, protections solaires et soins ciblés visage.",
    brands: "Eucerin · Ecladerm · Nuxe"
  },
  {
    id: "cheveux",
    name: "Cheveux & Soins Capillaires",
    short: "Cheveux",
    icon: "leaf",
    desc: "Shampoings, après-shampoings, masques et soins du cuir chevelu.",
    brands: "Klorane · Eucerin"
  },
  {
    id: "bien-etre",
    name: "Bien-être & Compléments",
    short: "Bien-être",
    icon: "heart",
    desc: "Vitamines, sels reminéralisants, aides au sommeil et tonique énergie.",
    brands: "Compléments · Extraits végétaux"
  },
  {
    id: "hygiene",
    name: "Hygiène & Soins Corps",
    short: "Hygiène & Corps",
    icon: "droplet",
    desc: "Hygiène quotidienne, soins du corps, deodorants et protection.",
    brands: "Klorane · Eucerin"
  },
  {
    id: "bebe",
    name: "Maman & Bébé",
    short: "Maman & Bébé",
    icon: "baby",
    desc: "Soins douceur pour bébé et la future maman — conseils adaptés aux parents.",
    brands: "Mustela · Eucerin Baby"
  }
];

const BRANDS_LIST = [
  { name: "Eucerin", note: "Dermo-cosmétique", logo: "EU" },
  { name: "Vichy", note: "Peaux sensibles", logo: "VI" },
  { name: "Klorane", note: "Soins végétaux", logo: "KL" },
  { name: "Nuxe", note: "Soins sensoriels", logo: "NX" },
  { name: "Ecladerm", note: "Innovation dermo-cosmétique", logo: "EC" },
  { name: "Avène", note: "Eau thermale", logo: "AV" },
  { name: "Bioderma", note: "Dermatologie", logo: "BD" },
  { name: "Mustela", note: "Maternité & bébé", logo: "MU" }
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Eucerin Aquaporin Active Crème Hydratante Visage",
    shortName: "Eucerin Aquaporin Active Crème",
    brand: "Eucerin",
    category: "visage",
    price: 320,
    oldPrice: 385,
    promo: true,
    rating: 5,
    desc: "Hydratation 24h, fini frais. Le geste hydratant quotidien à M'diq, été compris.",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p2",
    name: "Eucerin Sun Oil Control Gel SPF 50+",
    shortName: "Eucerin Sun Oil Control SPF 50+",
    brand: "Eucerin",
    category: "visage",
    price: 285,
    oldPrice: null,
    promo: false,
    rating: 5,
    desc: "Texture gel ultralégère, sans effet gras. Indispensable pour le soleil de la Méditerranée.",
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p3",
    name: "Klorane Shampoing à l'Avoine & Saponine",
    shortName: "Klorane Shampoing Avoine",
    brand: "Klorane",
    category: "cheveux",
    price: 175,
    oldPrice: 210,
    promo: true,
    rating: 4,
    desc: "Cheveux doux et brillants, lavage doux pour toute la famille.",
    img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p4",
    name: "Ecladerm Sérum Éclat Vitamine C 10%",
    shortName: "Ecladerm Sérum Vitamine C 10%",
    brand: "Ecladerm",
    category: "visage",
    price: 495,
    oldPrice: 580,
    promo: true,
    rating: 5,
    desc: "Unifiant et éclat, pour un teint lumineux en quelques semaines.",
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p5",
    name: "Nuxe Huile Prodigieuse Riche",
    shortName: "Nuxe Huile Prodigieuse",
    brand: "Nuxe",
    category: "hygiene",
    price: 340,
    oldPrice: null,
    promo: false,
    rating: 5,
    desc: "Nutrition intense, parfum subtil. Le soin sensoriel de fin de journée.",
    img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p6",
    name: "Vichy Eau Thermale Tolerance Spray 300ml",
    shortName: "Vichy Eau Thermale",
    brand: "Vichy",
    category: "visage",
    price: 225,
    oldPrice: null,
    promo: false,
    rating: 5,
    desc: "Apaise, rafraîchit, tonifie. À garder au frais pour l'été à M'diq.",
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p7",
    name: "Eucerin Anti-Age Crème de Jour Fermeté",
    shortName: "Eucerin Anti-Age Jour",
    brand: "Eucerin",
    category: "visage",
    price: 395,
    oldPrice: 460,
    promo: true,
    rating: 5,
    desc: "Rides et fermeté, texture riche et confortable toute la journée.",
    img: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p8",
    name: "Klorane Masque Papaye & Argile Douceur",
    shortName: "Klorane Masque Papaye",
    brand: "Klorane",
    category: "cheveux",
    price: 210,
    oldPrice: null,
    promo: false,
    rating: 4,
    desc: "Exfolie et nourrit en 5 minutes. Le masque de la semaine.",
    img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p9",
    name: "Magnésium + Vitamine B6 Fatigue & Stress",
    shortName: "Magnésium + Vitamine B6",
    brand: "Green Para Bay",
    category: "bien-etre",
    price: 165,
    oldPrice: 195,
    promo: true,
    rating: 5,
    desc: "Formule du pharmacien pour les périodes de fatigue passagère.",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p10",
    name: "Vitamine D3 Gouttes – Immunité & Os",
    shortName: "Vitamine D3 Gouttes",
    brand: "Green Para Bay",
    category: "bien-etre",
    price: 130,
    oldPrice: null,
    promo: false,
    rating: 4,
    desc: "Le complément essentiel quand le soleil manque, dos de la côte.",
    img: "https://images.unsplash.com/photo-1550572017-edd951aa8f41?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p11",
    name: "Eucerin Crème Anti-Démangeaisons Apaisante",
    shortName: "Eucerin Crème Apaisante",
    brand: "Eucerin",
    category: "hygiene",
    price: 245,
    oldPrice: 290,
    promo: true,
    rating: 5,
    desc: "Pour les peaux réactives et sensibles. Conseil pharmacien inclus.",
    img: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p12",
    name: "Klorane Lait Corporel Sève de Papier",
    shortName: "Klorane Lait Corporel",
    brand: "Klorane",
    category: "hygiene",
    price: 155,
    oldPrice: null,
    promo: false,
    rating: 4,
    desc: "Toucher soyeux, absorption rapide. Pour toute la famille.",
    img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p13",
    name: "Mustela Gel Corps & Cheveux Bébé",
    shortName: "Mustela Gel Bébé",
    brand: "Mustela",
    category: "bebe",
    price: 190,
    oldPrice: 225,
    promo: true,
    rating: 5,
    desc: "Sans rinçage, dès le premier jour. Pour la peau fragile des newborns.",
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p14",
    name: "Eucerin Baby Lait Corps & Visage Douceur",
    shortName: "Eucerin Baby Lait Douceur",
    brand: "Eucerin",
    category: "bebe",
    price: 205,
    oldPrice: null,
    promo: false,
    rating: 5,
    desc: "Formule douce testée sous contrôle dermatologique, dès la naissance.",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p15",
    name: "Nuxe Masque du Rêve Nuage Intense",
    shortName: "Nuxe Masque du Rêve",
    brand: "Nuxe",
    category: "bien-etre",
    price: 295,
    oldPrice: 340,
    promo: true,
    rating: 5,
    desc: "Rituel bien-être du soir, 10 minutes de rien. Spa à la maison.",
    img: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p16",
    name: "Ecladerm Crème Hydratante Visage 24H",
    shortName: "Ecladerm Crème Hydratante",
    brand: "Ecladerm",
    category: "visage",
    price: 265,
    oldPrice: null,
    promo: false,
    rating: 4,
    desc: "Texture fondante, effet confort immédiat. Le produit star du mois.",
    img: "https://images.unsplash.com/photo-1627384113683-5bd7a7a5d2b0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p17",
    name: "Mousse Nettoyante Douce Visage & Corps",
    shortName: "Mousse Nettoyante Douce",
    brand: "Green Para Bay",
    category: "hygiene",
    price: 110,
    oldPrice: null,
    promo: false,
    rating: 4,
    desc: "pH respecté, sans sulfate. Le duo parfait avec l'eau thermale Vichy.",
    img: "https://images.unsplash.com/photo-1607006483225-1a56bd2fdbfa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p18",
    name: "Klorane Eau Fraîche Pointes Séchez",
    shortName: "Klorane Eau Fraîche Pointes",
    brand: "Klorane",
    category: "cheveux",
    price: 145,
    oldPrice: 175,
    promo: true,
    rating: 4,
    desc: "Ravive les pointes sèches et la brillance. Spray sans rinçage.",
    img: "https://images.unsplash.com/photo-1502750461432-5cce8f0e6b28?auto=format&fit=crop&w=600&q=80"
  }
];

const TESTIMONIALS = [
  {
    name: "Salma B.",
    location: "M'diq",
    rating: 5,
    text: "Imane m'a conseillé exactement le bon sérum pour ma peau réactive. En trois semaines ma peau est transformée. On sent qu'on parle à une pharmacienne, pas à un vendeur."
  },
  {
    name: "Youssef A.",
    location: "M'diq",
    rating: 5,
    text: "Commandé par WhatsApp un dimanche soir, livré le lendemain matin. Simple, rapide, et on m'a envoyé un message pour vérifier que tout allait bien. Service au top."
  },
  {
    name: "Nadia E.",
    location: "Oued Laou",
    rating: 5,
    text: "Les conseils de la parapharmacienne sont d'une grande qualité. Elle a compris mon problème de cheveux en deux questions. Je ne vais plus ailleurs."
  },
  {
    name: "Khadija M.",
    location: "M'diq",
    rating: 5,
    text: "Enfin une parapharmacie de quartier qui propose vraiment des conseils. Les promotions sont bona fide et on est bien accueillis. Je recommande les yeux fermés."
  }
];

const INSTAGRAM_POSTS = [
  {
    type: "shelf",
    caption: "Le rayon solaire est arrivé ☀️",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    tag: "Nouveau"
  },
  {
    type: "product",
    caption: "Promotion Eucerin Aquaporin",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
    tag: "Promo"
  },
  {
    type: "coast",
    caption: "M'diq, la Méditerranée en septembre",
    img: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=600&q=80",
    tag: "M'diq"
  },
  {
    type: "product",
    caption: "Nouveau sérum Éclat Ecladerm",
    img: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=600&q=80",
    tag: "Nouveau"
  },
  {
    type: "shelf",
    caption: "Les essentiels du rayon bébé",
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80",
    tag: "Bébé"
  },
  {
    type: "pharmacy",
    caption: "Conseil du jour : la protection solaire",
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    tag: "Conseil"
  }
];

const STATS = [
  { value: 2705, suffix: "+", label: "Abonnés Instagram", icon: "instagram" },
  { value: 1200, suffix: "+", label: "Commandes livrées", icon: "truck" },
  { value: 5, suffix: " ans", label: "Au service de M'diq", icon: "heart" },
  { value: 18, suffix: "+", label: "Marques partenaires", icon: "star" }
];

const FAQ = [
  {
    q: "Faites-vous des livraisons à domicile ?",
    a: "Oui ! Nous livrons en main propre à M'diq et dans les communes alentour. Commandez simplement sur ce site, envoyez votre panier via WhatsApp, et nous confirmons le créneau de livraison avec vous."
  },
  {
    q: "Puis-je avoir un conseil personnalisé sur WhatsApp ?",
    a: "Bien sûr. Décrivez votre besoin (type de peau, problème, routine actuelle…) et Imane, pharmacienne, vous répond avec des conseils adaptés et les produits qu'elle recommande. C'est gratuit et sans engagement."
  },
  {
    q: "Les produits sont-ils authentiques ?",
    a: "Tous nos produits proviennent de distributeurs officiels. Vous authenticatez à l'ouverture et vous trouverez le lot gravé sur l'emballage."
  },
  {
    q: "Quels sont vos horaires ?",
    a: "Du lundi au samedi de 9h00 à 20h00, et le dimanche de 10h00 à 13h00. La commande par WhatsApp est disponible à tout moment, y compris en dehors de ces horaires."
  }
];

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */

/** Format a number as MAD, e.g. 320 -> "320 DH" */
function formatPrice(value) {
  return Number(value).toLocaleString("fr-MA", { maximumFractionDigits: 0 }) + " DH";
}

/** Get a product by its id */
function getProductById(id) {
  return PRODUCTS.find(function (p) {
    return p.id === id;
  });
}

/** Get a category object by its id */
function getCategoryById(id) {
  return CATEGORIES.find(function (c) {
    return c.id === id;
  });
}
