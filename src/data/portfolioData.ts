export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  thumbnail: string;
  logo: string;
  scope: string[];
  description: {
    es: string;
    en: string;
  };
  details: {
    es: string[];
    en: string[];
  };
  images: string[];
  color: string;
}

export interface DisciplineNode {
  id: string;
  name: {
    es: string;
    en: string;
  };
  category: 'project' | 'discipline' | 'profile';
  projectId?: string;
  year?: string;
  color: string;
  image?: string;
  initialX: number; // percentage 0-100
  initialY: number; // percentage 0-100
  radius: number;   // px
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'raun',
    slug: 'revista-raun',
    title: 'Revista RAUN',
    subtitle: 'Diseño con Espíritu / Wabi-Sabi & Shibui',
    category: 'Diseño Editorial & Concepto',
    year: '2026',
    thumbnail: '/projects/raun/raun_page_01.jpg',
    logo: '/projects/raun/raun_page_01.jpg',
    color: '#C84B31',
    scope: [
      'Dirección Editorial',
      'Redacción de Ensayos',
      'Diseño Tipográfico',
      'Jerarquía Visual',
      'Maquetación Shibui'
    ],
    description: {
      es: 'Revista conceptual sobre "diseño con espíritu" donde el mito nórdico Raun (la prueba y el error como crisol del creador) dialoga con principios estéticos japoneses como Wabi-Sabi, Ma y Shibui. Un manifiesto de sobriedad y elegancia donde cada elemento tiene un propósito riguroso.',
      en: 'A conceptual publication exploring "design with spirit", fusing the Norse myth Raun (testing through adversity as the creator’s crucible) with Japanese aesthetic concepts like Wabi-Sabi, Ma, and Shibui. A masterclass in whitespace, restraint, and deliberate hierarchy.'
    },
    details: {
      es: [
        'Desarrollo conceptual completo y redacción de textos filosóficos.',
        'Tipografía editorial con dropcaps y doble columna balanceada.',
        'Exploración de la belleza de lo imperfecto y lo duradero (Shibui).',
        'Impresión conceptual y visualización digital.'
      ],
      en: [
        'Complete editorial concept and philosophical essay writing.',
        'Editorial typography with custom dropcaps and balanced double-column rhythm.',
        'Exploration of understated elegance and enduring beauty (Shibui).',
        'Physical print layouts and digital publication.'
      ]
    },
    images: [
      '/projects/raun/raun_page_01.jpg',
      '/projects/raun/raun_page_02.jpg',
      '/projects/raun/raun_page_03.jpg',
      '/projects/raun/raun_page_04.jpg',
      '/projects/raun/raun_page_05.jpg',
      '/projects/raun/raun_page_06.jpg',
      '/projects/raun/raun_page_07.jpg',
      '/projects/raun/raun_page_08.jpg'
    ]
  },
  {
    id: 'dolores',
    slug: 'dolores-veintimilla',
    title: 'Dolores Veintimilla',
    subtitle: 'Rescate Cultural & EPUB Interactivo',
    category: 'Investigación & Publicación Interactiva',
    year: '2026',
    thumbnail: '/projects/dolores/page_1.jpg',
    logo: '/projects/dolores/page_1.jpg',
    color: '#D4A373',
    scope: [
      'Investigación Histórica',
      'Libro Editorial',
      'EPUB con Música & Narración',
      'PDF Interactivo',
      'Tipografía Patrimonial'
    ],
    description: {
      es: 'Proyecto de titulación universitaria enfocado en el rescate cultural de la poetisa ecuatoriana Dolores Veintimilla como referente de los derechos humanos y del cuestionamiento a la injusticia social en el Quito histórico. Publicación editorial integral y EPUB interactivo multimedial.',
      en: 'University thesis project centered on the cultural revival of Ecuadorian poet Dolores Veintimilla as a pioneer of human rights and social justice critique. An interactive multimedia publication featuring archival typography and audio.'
    },
    details: {
      es: [
        'Libro de tesis de más de 130 páginas con rigor metodológico y de diseño.',
        'EPUB interactivo con sincronización de audio, música y tipografías incrustadas.',
        'Estructura accesible para jóvenes lectores de Quito.',
        'PDF interactivo con navegación no lineal.'
      ],
      en: [
        'Thesis book with over 130 pages of rigorous historical and visual craft.',
        'Interactive EPUB with synchronized narration, soundtrack, and embedded fonts.',
        'Accessible, engaging architecture tailored for contemporary young readers.',
        'Interactive PDF featuring non-linear chapter navigation.'
      ]
    },
    images: [
      '/projects/dolores/page_1.jpg',
      '/projects/dolores/page_2.jpg',
      '/projects/dolores/page_3.jpg',
      '/projects/dolores/page_4.jpg',
      '/projects/dolores/page_5.jpg',
      '/projects/dolores/page_6.jpg'
    ]
  },
  {
    id: 'ironwall',
    slug: 'ironwall',
    title: 'IronWall',
    subtitle: 'Identidad Corporativa & Redes Sociales',
    category: 'Branding & Social Media',
    year: '2026',
    thumbnail: '/projects/ironwall/post_1_ironwall.png',
    logo: '/projects/ironwall/parte_frontalpng.png',
    color: '#3A506B',
    scope: [
      'Manual de Marca',
      'Diseño de Tarjetas de Presentación',
      'Campaña Instagram en Carruseles',
      'Sistemas de Retícula'
    ],
    description: {
      es: 'Sistema integral de identidad corporativa para IronWall. Construcción de papelería sobria con acabados finos y dirección de arte en piezas de redes sociales basadas en grillas asimétricas, legibilidad geométrica y síntesis de marca.',
      en: 'Comprehensive corporate identity system for IronWall. Production of tactile business stationery and art direction for social media carousels driven by asymmetric grids, typographic clarity, and brand synthesis.'
    },
    details: {
      es: [
        'Tarjetas de presentación con especificación de corte y acabados.',
        'Posts secuenciales de Instagram optimizados para retención.',
        'Tipografía corporativa en variables Inter y Myriad.',
        'Guía de aplicaciones en formatos físicos y digitales.'
      ],
      en: [
        'Business card systems with precise print prep and finishing specs.',
        'Multi-slide Instagram story and carousel architectures for engagement.',
        'Corporate typography pairing variable font weights.',
        'Guidelines across physical packaging and digital communication.'
      ]
    },
    images: [
      '/projects/ironwall/post_1_ironwall.png',
      '/projects/ironwall/slide1.jpg',
      '/projects/ironwall/slide2.jpg',
      '/projects/ironwall/slide3.jpg',
      '/projects/ironwall/post3_ironwall_02062026.jpg'
    ]
  },
  {
    id: 'legionfit',
    slug: 'legionfit',
    title: 'LegionFit',
    subtitle: 'Imagotipo & Branding Deportivo',
    category: 'Diseño de Marca',
    year: '2025',
    thumbnail: '/projects/legionfit/plate_mockup.webp',
    logo: '/projects/legionfit/logo_badge.png',
    color: '#E63946',
    scope: [
      'Diseño de Logotipo',
      'Isotipo Geométrico',
      'Paleta de Alto Contraste',
      'Manual de Identidad'
    ],
    description: {
      es: 'Diseño de identidad visual para marca deportiva y de acondicionamiento físico. Construcción vectorial de símbolo potente, tipografía de fuerza y contraste cromático para indumentaria, señalética y plataformas online.',
      en: 'Visual identity and logo design for high-performance athletic and fitness brand. Dynamic geometric symbol crafting, assertive typography, and high-contrast color scheme engineered for apparel and digital platforms.'
    },
    details: {
      es: [
        'Retícula de construcción del isotipo y proporciones áureas.',
        'Adaptabilidad en formatos reducidos para merch e indumentaria.',
        'Variantes en positivo, negativo y monocromo.'
      ],
      en: [
        'Golden-ratio and geometric vector grid construction of the mark.',
        'High-density legibility across embroidered apparel and digital icons.',
        'Full monochromatic and inverted brand variations.'
      ]
    },
    images: [
      '/projects/legionfit/plate_mockup.webp',
      '/projects/legionfit/fire_mockup.webp',
      '/projects/legionfit/logo_badge.png',
      '/projects/legionfit/brand_sheet.webp'
    ]
  }
];

export interface CreativeDiscipline {
  id: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  tags: string[];
}

export const CREATIVE_DISCIPLINES: CreativeDiscipline[] = [
  {
    id: 'animacion-2d',
    title: { es: 'Animación 2D & Motion Graphics', en: '2D Animation & Motion Graphics' },
    subtitle: { es: 'Cinemática, Ritmo & Tipografía en Movimiento', en: 'Cinematics, Momentum & Kinetic Type' },
    description: {
      es: 'Diseño de movimiento y animación publicitaria. Creación de identidades dinámicas, intros cinemáticas, loops narrativos y motion typography en After Effects y Premiere Pro.',
      en: 'Broadcast motion design and narrative animation. Dynamic identity systems, cinematic title intros, seamless social loops, and kinetic typography in After Effects & Premiere Pro.'
    },
    tags: ['After Effects', 'Premiere Pro', 'Kinetic Typography', 'Loops Publicitarios', 'Storytelling Digital']
  },
  {
    id: 'animacion-3d',
    title: { es: 'Animación & Modelado 3D', en: '3D Animation & Modeling' },
    subtitle: { es: 'Composición Espacial & WebGL Interactivo', en: 'Spatial Composition & Interactive WebGL' },
    description: {
      es: 'Modelado tridimensional, iluminación cinematográfica, texturizado volumétrico y experiencias interactivas en tiempo real combinando Cinema 4D, zBrush y Spline 3D.',
      en: 'Volumetric 3D modeling, studio lighting, procedural shading, and real-time interactive experiences powered by Cinema 4D, zBrush, and Spline 3D.'
    },
    tags: ['Cinema 4D', 'Spline 3D', 'zBrush', 'Lighting & Shading', 'WebGL Interactivo']
  },
  {
    id: 'diseno-editorial',
    title: { es: 'Diseño Editorial & Publicaciones', en: 'Editorial Design & Publications' },
    subtitle: { es: 'Jerarquía Shibui & Tipografía de Autor', en: 'Shibui Hierarchy & Custom Typography' },
    description: {
      es: 'Maquetación de libros y revistas conceptuales de alta gama (Revista RAUN), publicaciones interactivas multimedia (EPUB/PDF como Dolores Veintimilla) y sistemas de retícula.',
      en: 'High-end conceptual book and magazine craft (RAUN Magazine), interactive multimedia digital publications (EPUB/PDF like Dolores Veintimilla), and asymmetric grid structures.'
    },
    tags: ['Adobe InDesign', 'Adobe Illustrator', 'EPUB Interactivo', 'Tipografía Patrimonial', 'Maquetación Shibui']
  },
  {
    id: 'direccion-arte',
    title: { es: 'Dirección de Arte & Branding', en: 'Art Direction & Branding' },
    subtitle: { es: 'Sistemas Visuales Rigurosos', en: 'Rigorous Visual Systems' },
    description: {
      es: 'Construcción integral de identidad corporativa (IronWall, LegionFit). Manuales de marca, proporciones áureas, papelería fina y dirección estética multiplataforma.',
      en: 'Complete brand identity architecture (IronWall, LegionFit). Standards manuals, golden-ratio marks, premium business stationery, and cross-platform art direction.'
    },
    tags: ['Manuales de Marca', 'Geometría Vectorial', 'Papelería Corporativa', 'Campañas Digitales']
  }
];

export const PHILOSOPHY_MANIFESTO = {
  es: {
    badge: 'Manifiesto de Autor & Filosofía',
    title: 'El Orden, la Mitología y el Espacio',
    paragraph1: 'Para mí, el diseño gráfico, la animación y motion graphics en After Effects, y la producción audiovisual son formas de ordenar el mundo visual. No se trata únicamente de estética o función superficial, sino de una expresión profunda del alma humana capaz de conectar el mito, la disciplina y la vida cotidiana. Como en el concepto nórdico Raun, cada proyecto es una prueba necesaria donde el error y la experimentación forjan la verdadera maestría.',
    paragraph2: 'Creo en la sobriedad del principio japonés Shibui: una elegancia silenciosa que no necesita adornos artificiosos para impactar, donde cada línea, peso tipográfico y vacío existe con un propósito deliberado. La tecnología y las herramientas digitales no reemplazan la intención creadora; potencian la precisión y la armonía de la obra.',
    hint: 'Arrastra los nodos interactivos para ceñir el texto a su contorno. Clic para ver caso de estudio. Pulsa Esc para restablecer.'
  },
  en: {
    badge: 'Author Manifesto & Philosophy',
    title: 'Order, Mythology, and Intentional Space',
    paragraph1: 'To me, graphic design, After Effects motion graphics, and audiovisual storytelling are deliberate ways of structuring the visual universe. It is never just surface aesthetics or shallow utility; it is a profound human expression connecting myth, discipline, and daily experience. Echoing the Norse concept of Raun, every creative work is a crucible where trial and persistence forge true mastery.',
    paragraph2: 'I believe in the quiet restraint of Shibui: an understated elegance that needs no superfluous adornment to command attention, where every contour, type weight, and void serves an uncompromising purpose. Digital innovation and tools do not substitute creative intent; they amplify its precision and resonance.',
    hint: 'Drag interactive nodes to reflow text tightly around their contours. Click to inspect case study. Press Escape to reset.'
  }
};

export const DISCIPLINE_NODES: DisciplineNode[] = [
  {
    id: 'node-profile',
    name: { es: 'Luis Bermúdez', en: 'Luis Bermúdez' },
    category: 'profile',
    color: '#C84B31',
    image: '/PERFIL.jpg',
    initialX: 50,
    initialY: 52,
    radius: 56
  },
  {
    id: 'node-raun',
    name: { es: 'Revista RAUN', en: 'RAUN Magazine' },
    category: 'project',
    projectId: 'raun',
    year: '2026',
    color: '#C84B31',
    image: '/projects/raun/raun_page_01.jpg',
    initialX: 22,
    initialY: 28,
    radius: 52
  },
  {
    id: 'node-dolores',
    name: { es: 'Dolores V.', en: 'Dolores V.' },
    category: 'project',
    projectId: 'dolores',
    year: '2026',
    color: '#D4A373',
    image: '/projects/dolores/page_1.jpg',
    initialX: 78,
    initialY: 28,
    radius: 50
  },
  {
    id: 'node-ironwall',
    name: { es: 'IronWall', en: 'IronWall' },
    category: 'project',
    projectId: 'ironwall',
    year: '2026',
    color: '#3A506B',
    image: '/projects/ironwall/post_1_ironwall.png',
    initialX: 25,
    initialY: 74,
    radius: 50
  },
  {
    id: 'node-legion',
    name: { es: 'LegionFit', en: 'LegionFit' },
    category: 'project',
    projectId: 'legionfit',
    year: '2025',
    color: '#E63946',
    image: '/projects/legionfit/logo_badge.png',
    initialX: 75,
    initialY: 74,
    radius: 50
  }
];
