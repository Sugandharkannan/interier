export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface RoomDetails {
  id: string;
  name: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  materials: string[];
  budget: string;
  duration: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  area: string;
  client: string;
  budget: string;
  location: string;
  duration: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  gallery: string[];
  tag: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  textureUrl: string;
  properties: string[];
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export const services: Service[] = [
  {
    id: "residential",
    title: "Luxury Residential",
    description: "Bespoke home interiors designed to reflect your personality and style.",
    features: ["Space Planning", "Custom Furniture", "Lighting Design", "Artwork Curation"],
  },
  {
    id: "commercial",
    title: "High-End Commercial",
    description: "Inspiring business spaces designed for client engagement and workflow efficiency.",
    features: ["Branding Integration", "Ergonomic Layouts", "Acoustic Solutions", "Smart Tech Integration"],
  },
  {
    id: "villa",
    title: "Private Villa Design",
    description: "Grand estates crafted with timeless elegance, blending indoor and outdoor living.",
    features: ["Landscape Integration", "Grand Foyers", "Home Automation", "Bespoke Lighting Installations"],
  },
  {
    id: "3d-visualization",
    title: "3D Visualization & VR",
    description: "Hyper-realistic visualizations and walkthroughs before execution begins.",
    features: ["360° VR Walkthroughs", "Photorealistic Renders", "Material Simulation", "Interactive Blueprints"],
  },
  {
    id: "lighting-design",
    title: "Architectural Lighting",
    description: "Crafting ambient, task, and accent lighting plans to enhance space depth.",
    features: ["Smart Controls", "Energy Efficiency", "Custom Luminaires", "Daylight Integration"],
  },
  {
    id: "furniture-planning",
    title: "Bespoke Furniture",
    description: "Curated and custom-designed furniture pieces tailored to fit your specific spaces.",
    features: ["Material Sourcing", "Ergonomic Crafting", "Luxury Finishes", "Timeless Aesthetics"],
  },
];

export const roomsData: RoomDetails[] = [
  {
    id: "living",
    name: "Living Room",
    description: "A sanctuary of comfort featuring glass-wood harmony and recessed soft lighting.",
    beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    materials: ["Italian Marble", "European Oak", "Brushed Brass", "Velvet Fabric"],
    budget: "$65,000",
    duration: "6 Weeks",
  },
  {
    id: "bedroom",
    name: "Master Bedroom",
    description: "Elegant minimalist master suite focusing on warm textures and floating structures.",
    beforeImg: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    materials: ["Bouclé Fabric", "Smoked Walnut", "Satin Brass", "Frosted Glass"],
    budget: "$42,000",
    duration: "4 Weeks",
  },
  {
    id: "kitchen",
    name: "Gourmet Kitchen",
    description: "State-of-the-art culinary workspace combining marble countertops with sleek integrated storage.",
    beforeImg: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    materials: ["Carrara Quartzite", "Matte Charcoal Lacquer", "Stainless Steel", "Indirect LED Panels"],
    budget: "$78,000",
    duration: "8 Weeks",
  },
  {
    id: "office",
    name: "Executive Office",
    description: "Sophisticated workspace designed with acoustically treated panels and smart desk features.",
    beforeImg: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    materials: ["Acoustic Slat Panels", "Nappa Leather", "Anodized Aluminum", "Tempered Glass"],
    budget: "$30,000",
    duration: "3 Weeks",
  },
  {
    id: "bathroom",
    name: "Spa Sanctuary",
    description: "A wellness-focused bathroom featuring an open-concept rain shower and stone tiling.",
    beforeImg: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    materials: ["Basalt Stone", "Polished Chrome", "Cedar Wood Wood-slats", "Waterproof Plaster"],
    budget: "$35,000",
    duration: "4 Weeks",
  },
];

export const projects: Project[] = [
  {
    id: "lumina-penthouse",
    title: "Lumina Penthouse",
    category: "Minimal",
    area: "3,200 sqft",
    client: "Evelyn Sterling",
    budget: "$250,000",
    location: "Manhattan, NY",
    duration: "16 Weeks",
    description: "A sky-high minimalist retreat using neutral color palettes and hidden lighting arrays to celebrate the city silhouette.",
    beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    ],
    tag: "Awwwards Nominee",
  },
  {
    id: "monolith-villa",
    title: "The Monolith Villa",
    category: "Luxury",
    area: "6,500 sqft",
    client: "Arthur Vance",
    budget: "$720,000",
    location: "Beverly Hills, CA",
    duration: "24 Weeks",
    description: "Striking architectural angles meet natural organic textures in this sweeping multi-generational private villa.",
    beforeImg: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    ],
    tag: "Best Villa Project 2025",
  },
  {
    id: "apex-office",
    title: "Apex Creative Hub",
    category: "Industrial",
    area: "12,000 sqft",
    client: "Apex Tech Labs",
    budget: "$450,000",
    location: "Austin, TX",
    duration: "18 Weeks",
    description: "An industrial brick warehouse refitted into a collaborative technological laboratory showcasing raw iron and glass structures.",
    beforeImg: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
    ],
    tag: "Design For Workspace Gold Award",
  },
  {
    id: "kyoto-residence",
    title: "Kyoto Retreat",
    category: "Japanese",
    area: "2,100 sqft",
    client: "Kenji Tanaka",
    budget: "$180,000",
    location: "Kyoto, Japan",
    duration: "12 Weeks",
    description: "A deeply peaceful sanctuary embodying Japandi minimalism with shoji-like dynamic panels and custom low-height furnishings.",
    beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    afterImg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    tag: "Japandi Excellence 2026",
  },
];

export const materials: Material[] = [
  {
    id: "marble",
    name: "Calacatta Gold Marble",
    description: "Premium white Italian marble characterized by bold, gold-tinted structural veins.",
    textureUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80",
    properties: ["High Gloss Finish", "Stain Resistant Treated", "Heat Proof", "Custom Inlay Ready"],
    color: "#e6e1d7",
  },
  {
    id: "walnut",
    name: "Smoked American Walnut",
    description: "Rich, deeply textured chocolate brown hardwood offering superb structural resilience.",
    textureUrl: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80",
    properties: ["Matte Satin Sealing", "Sustainably Forested", "Grain Aligned Jointing", "Eco-Friendly Waxing"],
    color: "#5b4033",
  },
  {
    id: "brass",
    name: "Brushed Champagne Brass",
    description: "Warm, hand-brushed metallic accents that catch indirect light with absolute softness.",
    textureUrl: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80",
    properties: ["Oxidation Proof", "Fingerprint-Free Finish", "Subtle Refractive Mirroring", "Recyclable Alloy"],
    color: "#c5a059",
  },
  {
    id: "glass",
    name: "Ribbed Fluted Glass",
    description: "Textured privacy glass panels that filter light into elongated, dreamlike rays.",
    textureUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    properties: ["Tempered Shatterproof", "Acoustic Dampening", "Soft Diffusion Index", "Custom Frame Fit"],
    color: "#8FA3A6",
  },
];

export const team: TeamMember[] = [
  {
    id: "designer-1",
    name: "Eleanor Vance",
    role: "Founding Principal & Creative Director",
    experience: "18+ Years Experience",
    specialization: "Luxury Residential & Concept Direction",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Eleanor's architecture philosophy merges modern scale with warm materials, crafting spaces that feel grand yet intensely personal.",
  },
  {
    id: "designer-2",
    name: "Marcus Dupont",
    role: "Technical Design Director",
    experience: "12+ Years Experience",
    specialization: "3D Visualisation, VR & Material Sourcing",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    bio: "Marcus commands the design technology and structural drafting, ensuring that complex parametric elements compile flawlessly in real space.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Silent Geometry of Minimal Spaces",
    category: "Minimalism",
    date: "July 12, 2026",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
    readTime: "5 min read",
    excerpt: "How aligning hidden cabinets with wall margins generates visual tranquility and reduces cognitive overload in master suites.",
  },
  {
    id: "post-2",
    title: "Curating Ambient Illumination: Beyond Downlights",
    category: "Lighting Design",
    date: "June 28, 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    readTime: "8 min read",
    excerpt: "A comprehensive look at using floor washers and linear vertical light shafts to expand residential room limits.",
  },
];

export const faqs = [
  {
    question: "What is your project development process?",
    answer: "Our workflow starts with an extensive discovery session to draft spatial needs, followed by a digital interactive moodboard phase. We then construct detailed 3D blueprints and VR environments for your review, and coordinate custom fabrication and construction end-to-end.",
  },
  {
    question: "Do you supply international interior consulting?",
    answer: "Yes, we handle premium villa designs and commercial developments globally. Using virtual walkthroughs and material boards sent straight to client offices, we collaborate effectively regardless of geographic distance.",
  },
  {
    question: "What is your average timeline for luxury projects?",
    answer: "Residential renovations usually span 12 to 18 weeks. Bespoke estate designs and commercial workspaces can range between 6 and 10 months from initial design conceptualization to handoff.",
  },
];
