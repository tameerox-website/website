import { Hammer, Droplet, Layers, Box, Truck, Package, LayoutGrid, Award, HardHat, Cog } from 'lucide-react';

export const iconMap = {
  Hammer,
  Droplet,
  Layers,
  Box,
  Truck,
  Package,
  LayoutGrid,
  Award,
  HardHat,
  Cog
};

// Services Data with High-End Imagery
export const services = [
  {
    id: 1,
    title: "All Types of Construction Works",
    slug: "construction-works",
    iconName: "Hammer",
    description: "Residential, commercial, and industrial builds with structural integrity.",
    fullDescription: "We specialize in comprehensive construction services for residential, commercial, and industrial projects. From initial groundwork to final delivery, our team ensures every structure is built to lasting standards using high-quality materials and precision engineering. We handle the entire lifecycle of the build, ensuring compliance with Qatar construction standards.",
    scope: [
      "Residential, Commercial & Industrial Construction",
      "Structural Works (Foundations, Columns, Beams & Slabs)",
      "Excavation & Earthworks",
      "RCC Works (Reinforced Concrete)",
      "Block & Masonry Works",
      "Plastering (Internal & External)",
      "Steel Fixing & Formwork",
      "Finishing, Renovation & Maintenance Works",
      "Site Supervision & Project Execution"
    ],
    image: "/assets/service-construction.png",
    projectTypes: ["Residential Villas", "Commercial Towers", "Industrial Warehouses"],
    uniqueSellingPoints: [
      "Turnkey solutions from design to delivery",
      "Strict adherence to QCS 2014 standards",
      "Experienced project managers",
      "Safety-first approach"
    ]
  },
  {
    id: 2,
    title: "Waterproofing Works",
    slug: "waterproofing-works",
    iconName: "Droplet",
    description: "Certified waterproofing for roofs, basements, and wet areas.",
    fullDescription: "Protect your property from water damage with our specialized waterproofing solutions. We offer a full range of systems tailored to Qatar's climate and building requirements, ensuring long-term leakage protection for every part of your building envelope.",
    scope: [
      "Roof Waterproofing (Concrete & Metal Roofs)",
      "Basement Waterproofing",
      "Toilet & Bathroom Waterproofing",
      "Kitchen Waterproofing",
      "Balcony & Terrace Waterproofing",
      "Swimming Pool Waterproofing",
      "Water Tank Waterproofing (Underground & Overhead)",
      "Expansion Joint Waterproofing",
      "Retaining Wall Waterproofing",
      "Bituminous Membrane & Torch-Applied Systems",
      "Liquid Applied (PU / Acrylic) & Cementitious Systems",
      "Injection Grouting (PU / Epoxy) & Protective Screeds"
    ],
    image: "/assets/service-waterproofing-detail.png",
    projectTypes: ["Residential Roofs", "Basements", "Swimming Pools", "Water Tanks"],
    uniqueSellingPoints: [
      "Certified applicators for major brands",
      "Up to 25-year warranty on systems",
      "Leaks detected and fixed permanently",
      "Advanced injection grouting technology"
    ]
  },
  {
    id: 3,
    title: "Steel Shuttering & Concrete",
    slug: "steel-shuttering-concrete",
    iconName: "Layers",
    description: "Expert formwork and concrete pouring for robust structures.",
    fullDescription: "Our team provides professional steel shuttering and concrete pouring services, ensuring precise formwork and high-strength concrete structures for all types of building projects. We use modular systems for speed and accuracy.",
    scope: [
      "Steel Formwork Installation",
      "Concrete Pouring & Curing",
      "Reinforced Concrete Structures",
      "Retaining Walls",
      "Column & Beam Casting",
      "Slab Shuttering"
    ],
    image: "/assets/service-concrete.png",
    projectTypes: ["High-Rise Buildings", "Commercial Complexes", "Infrastructure"],
    uniqueSellingPoints: [
      "Precision formwork for fair-faced concrete",
      "High-speed construction cycles",
      "Reduced wastage and high efficiency",
      "Structural integrity guaranteed"
    ]
  },
  {
    id: 4,
    title: "Interlock Installation",
    slug: "interlock-installation",
    iconName: "LayoutGrid",
    description: "Durable and aesthetic interlock paving for driveways and walkways.",
    fullDescription: "Enhance your exterior spaces with our high-quality interlock installation services. We design and install durable pathways, driveways, and parking areas using premium paver blocks in various patterns and colors.",
    scope: [
      "Driveways & Walkways",
      "Parking Lots & Public Spaces",
      "Pattern Design & Edge Restraints",
      "Sub-base Preparation",
      "Kerbstone Installation",
      "Hardscaping"
    ],
    image: "/assets/service-interlock-paving.png",
    projectTypes: ["Villas", "Public Parks", "Commercial Entrances", "Parking Lots"],
    uniqueSellingPoints: [
      "Wide variety of patterns and colors",
      "Perfect leveling and compaction",
      "Long-lasting durability under traffic",
      "Quick installation and repair"
    ]
  },
  {
    id: 5,
    title: "Backfilling Works",
    slug: "backfilling-works",
    iconName: "Truck",
    description: "Site preparation and backfilling with certified materials.",
    fullDescription: "Proper backfilling is crucial for structural stability. We provide professional earthworks and backfilling using approved materials, ensuring correct compaction and leveling for foundations and landscapes. We handle projects of all scales.",
    scope: [
      "Foundation Backfilling",
      "Site Grading & Leveling",
      "Soil Compaction",
      "Material Supply & Transport",
      "Excavation Removal",
      "Site Clearance"
    ],
    image: "/assets/service-earthworks.png",
    projectTypes: ["Construction Sites", "Roadworks", "Land Reclamation"],
    uniqueSellingPoints: [
      "Certified fill materials used",
      "Heavy machinery fleet available",
      "Strict compaction testing and reporting",
      "Timely execution for schedule adherence"
    ]
  },
  {
    id: 6,
    title: "Material Supply",
    slug: "material-supply",
    iconName: "Package",
    description: "Sourcing and supply of high-quality construction materials.",
    fullDescription: "We supply a wide range of construction materials aimed at contractors and developers. Our extensive network ensures you get the best quality materials at competitive prices, delivered on time to your site.",
    scope: [
      "Aggregates & Sand",
      "Cement & Steel",
      "Building Blocks",
      "Finishing Materials",
      "Plumbing & Electrical Supplies",
      "Tools & Safety Gear"
    ],
    image: "/assets/service-material-supply-site.png",
    projectTypes: ["Contractors", "Developers", "Private Builders"],
    uniqueSellingPoints: [
      "Reliable delivery network",
      "Competitive wholesale pricing",
      "Quality tested materials",
      "One-stop shop for site needs"
    ]
  },
  {
    id: 7,
    title: "Gypsum Board Works",
    slug: "gypsum-board-works",
    iconName: "Box",
    description: "Modern false ceilings, partitions, and decorative finishes.",
    fullDescription: "Transform your interiors with our expert gypsum board works. We create stunning false ceilings, durable partitions, and intricate decorative elements that enhance the aesthetic of any space. From simple flat ceilings to complex multi-level designs.",
    scope: [
      "False Ceilings & Bulkheads",
      "Drywall Partitions",
      "Decorative Cornices",
      "Soundproofing Solutions",
      "Hidden Lighting Grooves",
      "Media Walls"
    ],
    image: "/assets/service-gypsum-ceiling.png",
    projectTypes: ["Offices", "Luxury Villas", "Showrooms", "Apartments"],
    uniqueSellingPoints: [
      "Seamless finishing",
      "Creative lighting integration",
      "Fire-rated and moisture-resistant options",
      "Fast and clean installation"
    ]
  },
  {
    id: 8,
    title: "Tile & Marble Works",
    slug: "tile-marble-works",
    iconName: "LayoutGrid",
    description: "Precision installation of ceramic, porcelain, marble, and granite.",
    fullDescription: "Our skilled craftsmen deliver flawless tile and marble installation for floors, walls, and countertops. We handle all types of stone and tile, ensuring perfect alignment, leveling, and durable finishing. We specialize in book-matching and complex patterns.",
    scope: [
      "Ceramic & Porcelain Tiling",
      "Marble & Granite Installation",
      "Floor & Wall Cladding",
      "Precision Cutting & Polishing",
      "Kitchen Countertops",
      "Bathroom Vanities"
    ],
    image: "/assets/service-tiling-marble.png",
    projectTypes: ["Hotels", "Residences", "Commercial Lobbies", "Bathrooms"],
    uniqueSellingPoints: [
      "Laser-leveled installation",
      "Zero-lippage guarantee",
      "Expert stone cutting and polishing",
      "Premium adhesive and grouting materials"
    ]
  },
  {
    id: 9,
    title: "Fit-Out Works",
    slug: "fit-out-works",
    iconName: "Cog",
    description: "Turnkey interior fit-outs for offices and commercial spaces.",
    fullDescription: "We provide end-to-end fit-out solutions, taking your space from shell and core to a fully functional and furnished environment. Our services cover everything from MEP to final joinery, ensuring a cohesive and high-quality finish.",
    scope: [
      "Office & Commercial Fit-Outs",
      "Interior Design Implementation",
      "MEP Coordination",
      "Joinery & Carpentry",
      "Flooring & Ceilings",
      "Glass Partitions"
    ],
    image: "/assets/service-fitout-office.png",
    projectTypes: ["Corporate Offices", "Retail Stores", "Restaurants", "Clinics"],
    uniqueSellingPoints: [
      "Single point of contact for all trades",
      "Design-and-build capability",
      "Strict timeline management",
      "High-end finishing details"
    ]
  },
  {
    id: 10,
    title: "Structural & RCC Works",
    slug: "structural-rcc-works",
    iconName: "HardHat",
    description: "Heavy-duty structural engineering and reinforced concrete works.",
    fullDescription: "Our core expertise lies in heavy structural works. We execute complex RCC projects with strict adherence to engineering standards and safety regulations, ensuring the skeleton of your building is rock solid. We handle foundations, substructures, and superstructures.",
    scope: [
      "Foundation Systems",
      "Beams, Columns, & Slabs",
      "Structural Repairs",
      "Load-bearing Structures",
      "Retaining Walls",
      "Water Tanks"
    ],
    image: "/assets/service-structural.png",
    projectTypes: ["Megaprojects", "Industrial Plants", "Bridges/Culverts"],
    uniqueSellingPoints: [
      "Experienced structural engineers",
      "Advanced formwork systems",
      "Rigorous quality control",
      "Capacity for large concrete pours"
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Luxury Villa Construction",
    category: "Construction",
    status: "Completed",
    client: "Mr. Ahmed Al-Thani",
    year: "2023",
    duration: "14 Months",
    tags: ["Residential", "Turnkey", "Premium"],
    image: "/assets/hero-projects.png", // Modern Villa match
    description: "Complete structural and finishing works for a private villa in Pearl Qatar.",
    caseStudyLink: "/projects/luxury-villa"
  },
  {
    id: 2,
    title: "Commercial Roof Waterproofing",
    category: "Waterproofing",
    status: "Completed",
    client: "Doha Business Center",
    year: "2022",
    duration: "3 Weeks",
    tags: ["Commercial", "Maintenance", "Roofing"],
    image: "/assets/service-waterproofing.png", // Roof detail
    description: "Application of bituminous membrane system for a commercial complex roof.",
    caseStudyLink: ""
  },
  {
    id: 3,
    title: "Office Fit-Out West Bay",
    category: "Fit-Out",
    status: "Ongoing",
    client: "Tech Solutions Qatar",
    year: "2024",
    duration: "Ongoing",
    tags: ["Office", "Interior", "Modern"],
    image: "/assets/service-interior.png", // Modern Office
    description: "Modern open-plan office fit-out including glass partitions and custom flooring.",
    caseStudyLink: ""
  },
  {
    id: 4,
    title: "Industrial Warehouse Flooring",
    category: "Structural",
    status: "Completed",
    client: "Logistics Pro LLC",
    year: "2023",
    duration: "2 Months",
    tags: ["Industrial", "Flooring", "Heavy Duty"],
    image: "/assets/hero-services.png", // Industrial interior match
    description: "High-grade RCC flooring and structural columns for a logistics warehouse.",
    caseStudyLink: ""
  },
  {
    id: 5,
    title: "Residential Landscaping",
    category: "Construction",
    status: "Upcoming",
    client: "Al Rayyan Compound",
    year: "2024",
    duration: "Pending",
    tags: ["Landscape", "Pavers", "Outdoor"],
    image: "/assets/service-landscape.png", // Outdoor paving
    description: "Interlock paving and boundary wall construction for a residential compound.",
    caseStudyLink: ""
  },
  {
    id: 6,
    title: "Basement Waterproofing",
    category: "Waterproofing",
    status: "On Hold",
    client: "Private Developer",
    year: "2024",
    duration: "Stopped",
    tags: ["Remedial", "Injection", "Basement"],
    image: "/assets/hero-home.png", // Construction underground fallback
    description: "Injection grouting and protective coatings for a flooded deep basement.",
    caseStudyLink: ""
  }
];
