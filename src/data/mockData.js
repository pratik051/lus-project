export const MOCK_CATEGORIES = [
  {
    id: 'apparel',
    name: 'Apparel',
    slug: 'apparel',
    tagline: '01 / Wardrobe',
    subtitle: 'Tailored essentials & knitwear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQo1xgGIz5vI5j5F-wIg3K7uacqLy0cAYaDdamaEklkxdsZ-ZGyUlIPzk3XJjgTirzvjsF-Yb_fqFPVkuvPln8dn3AJ6s02ZF3PluUC_YiqV1IYiO1n_5nU29etEfr4pqQvpFk3Pb1FRetmfcE_izRsemBHeLCiwYWzLMfIuIih1iekry5LEGTVILTFxt5_FxJiMrnybedRjXxH3fEiixNY7dcvzccfEDT9egKnejd84vQUOIfddXb4w',
    count: 24
  },
  {
    id: 'footwear',
    name: 'Footwear',
    slug: 'footwear',
    tagline: '02 / Footwear',
    subtitle: 'Artisan loafers & boots',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-H6AozgjnSIq_CZiU1Jaev_1cz7IsaWK1WlVxci6mli4kWFpYR5ZF4A33yGXydy8_UA-C175I-L4cpkIDtiNTkoCbJYi-6u1O954Mkjhks_gLfKrhnhWyL6xJeOGuglYOzVYAddMIbd6368QdmCS2uhufmpWBJpRt_iaMjbetEQNPnqoc5HnZZEd7GpR8thJn7nZzO3WN6bkPIkYZ_RKahTpWGBc_9Aw3HR_sylPfU6chW7En9UGpvQ',
    count: 14
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    tagline: '03 / Accents',
    subtitle: 'Leather goods & timepieces',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANwXCrT1EosQPa0Zt0zVJXRh_VCOWotgzuH8OMVoRB17PTM31GDjegqs7AjO_hzCXKKoKzUetaQt952VnrhVd7MN4C-ZV16EEm0vjxk3uFV6SgDh2m_2dmsJx7Z5SBf4OiFG7Pcoz2jRY-qGxDbc0Nu1xqufYOrb5w_CNSaJpJMCXhLrc1LTpDGVuNudrecOOkwnFj7cv29uALoaOyj5usWH_HjckU4Dr3fZCwvy12ZGpHT4kNzAt50Q',
    count: 18
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    slug: 'home-living',
    tagline: '04 / Living',
    subtitle: 'Ceramics & textured textiles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj05OOw6iiV4tBGwG8Y9lrjRrMR5umDsU9Vh5f5pQavkFFt4pItJiZVjFV0SCGb2ac6jwqwMEoVsbDL2l89RuLujFil1iOM1nog-zTNeUCNZK_VEZ7g0drB9QawVN2l-SyDu5gg9S5E2YQ9h9piYVze5gPzCwsJZ1DuWRICNSWwbuC8wgrNL3Ampk8LehK9HzHCJ-CqvJ1YokN2dUYcTjIbwWmTLHvI2_PLwAiEU8nZlwMDRCkWQxrwA',
    count: 12
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 'minimalist-precision-chronograph',
    name: 'Minimalist Precision Chronograph',
    category: 'Accessories',
    subCategory: 'Horology',
    price: 295.0,
    originalPrice: 370.0,
    discount: '20% OFF',
    rating: 4.9,
    reviewCount: 128,
    badge: '20% OFF',
    isTrending: true,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArMWa2cqi0NDjtdGI3LA2rireNbKJi5zHAlWYJrOknXPBRx7lEPuGaUo1Xko_rhvxObOLq-jp_-fYVorjyVcF2Zw1IuGMvhNOmaBsIK-cbU1Y_zBFDUZ3gMZgdLbO0rnsYLlDWs_DM97bR32DF7qiFTHNtLIvQooCdE9CIiClxdg2baRuwHZWXNKAkfGdFvs29JbhUvtyce_djR7XbKT7FzmyCoKjIzyahuihOkhHT_vo828lz6SbhVA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArMWa2cqi0NDjtdGI3LA2rireNbKJi5zHAlWYJrOknXPBRx7lEPuGaUo1Xko_rhvxObOLq-jp_-fYVorjyVcF2Zw1IuGMvhNOmaBsIK-cbU1Y_zBFDUZ3gMZgdLbO0rnsYLlDWs_DM97bR32DF7qiFTHNtLIvQooCdE9CIiClxdg2baRuwHZWXNKAkfGdFvs29JbhUvtyce_djR7XbKT7FzmyCoKjIzyahuihOkhHT_vo828lz6SbhVA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYd5QMI4waHSCCSNjYCIi_Z3fL8VyTIY9JnVNB-JReaAdcNDqjzMlb1Si9daXA6CBuvQX0JDiIIr5JkYB04xpf2X1D9RNklL0mXt5Qscfj0bnOubeSFWDIHepXvpMbU0l5V_MPDBymGPZPfVo1ldUnfIXjzNz5dPQmIznRZrcg_XQ4UbBFTETK8p392R26s64iuOruVSSnD2EUD_ackTdY0bCVfgI8MgatS99dliG1PMkjjOqdKS-q0w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBD3HIwuUxgO7LJkZ1Yz4mdPh3lpJJP53E7gEU1OwJBndMQM-Z5gs0SvzSNElivIVWLw-xdCJ7gIEYITNXbT4YtEksYkahxvj94_-X8oPX0G4JHlPjqQEGhqBopNNzLM_7d3zfJ-QtnOu6DhUVSjW_6kRk7YqQgvUq0WBdX0P1iepa5dbkt81Ez3h4Z5B5YXyJZwolXqnKSS2XP7r_QFhORrQfn_fwBJ-Z4M1gFrFVLMq6y68mvmwvNg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1c6QxC5eItvKI7pKdj6p6ANOsUIICmPI2DsTMga8Wo8Wz36C0MIbpj03jJMcpJ5PEQyF4wHkabw1TBIe2ruoXemb0FBnODKg4rMZnxjKveAW1Z4TORgbdnnBKnE-2X1WIuU8H_w_d4u59iDbHqQed22mEPafFRBenD4WLtTNaYJSmUI9DhzIQizFgP6_F2DwCYtvfy4WuRavz3XOSUIWY3yKLffrCwRsKldC_vbEfuTHsos5CnGosAA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQIipe7uFUg-HHjPpq9smw6QeCr7jT1M5HL9B-FQCHq-eP35-Qg5sdzhP9ALMu-CbihaGQgcox8ZjKMdVVYb7tkFr18lmMdmkUoi6NPMrj0McohzPf6i7Df-tVx-SwJHxIyiJd89OqyhQjMQwYFUdY5RPyqyOfEIKq42pG5CHxg_Wk8Ow97-uz6hUsfmosFxF21VRAu3apqS5DuirDLOQDFFi1GGjAC8CMM1035Op47CBCz1TDxdPZXA'
    ],
    description: 'Engineered with Swiss quartz movement, scratch-resistant sapphire crystal glass, and interchangeable vegetable-tanned Italian leather straps. The dial boasts a clean matte finish with understated indices designed for timeless legibility.',
    inStock: true,
    stockCount: 18,
    sku: 'LX-CHR-40-BLK',
    colors: [
      { name: 'Matte Black', hex: '#191B22', ringColor: '#2457C5' },
      { name: 'Polar White', hex: '#FFFFFF', ringColor: '#C3C6D5' },
      { name: 'Brushed Rose Gold', hex: '#E0A996', ringColor: '#B07B69' }
    ],
    sizes: ['40mm Standard', '36mm Petite'],
    features: [
      'Swiss Ronda 5030.D Quartz Chronograph Movement',
      'Scratch-resistant sapphire crystal with anti-reflective coating',
      '316L Marine-grade stainless steel casing',
      'Interchangeable quick-release Tuscan leather strap',
      'Water resistant to 5 ATM (50 meters)'
    ],
    materials: '316L Stainless Steel, Sapphire Crystal, Full-grain Tuscan Calfskin',
    care: 'Wipe case with a soft microfiber cloth. Avoid prolonged water exposure for leather strap.',
    shipping: 'Complimentary express worldwide shipping. Ships within 24 hours in our signature gift box.'
  },
  {
    id: 'structured-cashmere-overcoat',
    name: 'Structured Cashmere Overcoat',
    category: 'Apparel',
    subCategory: 'Outerwear',
    price: 380.0,
    originalPrice: 475.0,
    discount: '-20%',
    rating: 4.9,
    reviewCount: 48,
    badge: 'Trending',
    isTrending: true,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrHltshVXpcVqGoUSnmceOy6iqwuitJljwhez3N6oslZdue_U1L3s3bP9mnSBpzh91ZCaiWvO5piYG5ErZAvdZM56uO783cV0-v6DV7F9nWKz0rbLGhB4T_UFpdcgmf01lgmU5IhW5XCBBCvE4N6qN48EfGZWgkP3h5INq1GrElKKJPel87m5e4h_dFmt2V-XIfq7yiaPMwKTjithDxJXI94KmJIFuDuIGHRKk6PNJxepWie5QMxTxtw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrHltshVXpcVqGoUSnmceOy6iqwuitJljwhez3N6oslZdue_U1L3s3bP9mnSBpzh91ZCaiWvO5piYG5ErZAvdZM56uO783cV0-v6DV7F9nWKz0rbLGhB4T_UFpdcgmf01lgmU5IhW5XCBBCvE4N6qN48EfGZWgkP3h5INq1GrElKKJPel87m5e4h_dFmt2V-XIfq7yiaPMwKTjithDxJXI94KmJIFuDuIGHRKk6PNJxepWie5QMxTxtw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5vLBchWNm-gYFReO0GV7XXqp7MC0tkQTu1SK22zGg-Gg4MDpTaBPx3SxCVfXCX4s1v6YYyRtLI_1mIeNQxmut9eXOnaYVtXGZ47tXzB-sWB1cwu5bKGPmnTp6j17tNxWDdWEoAXTLQdAEI-QdDCy1W02BOyNymsytXTuRrWex23Nnerk-CiXq7E08kMSjYIrG5mx1mkeynrvwdnCCiHuWz6rqDG_1C7KOHyrWSg5lnsDUDTIFqh7WoA'
    ],
    description: 'A timeless silhouette meticulously tailored from double-faced Italian cashmere and recycled virgin wool. Features clean notch lapels, discreet horn buttons, and unstructured shoulders for natural drape.',
    inStock: true,
    stockCount: 11,
    sku: 'LX-OVC-WOL-CH',
    colors: [
      { name: 'Charcoal Grey', hex: '#2E3037', ringColor: '#2457C5' },
      { name: 'Warm Camel', hex: '#C29B72', ringColor: '#A87F55' },
      { name: 'Midnight Navy', hex: '#1B243B', ringColor: '#2457C5' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      '90% Italian Virgin Wool, 10% Cashmere',
      'Double-breasted front with real horn buttons',
      'Viscose satin sleeve lining for frictionless layering',
      'Deep welt hand pockets & interior chest pocket'
    ],
    materials: '90% Virgin Wool, 10% Cashmere blend',
    care: 'Dry clean only. Store on wide wooden hanger.',
    shipping: 'Complimentary shipping & 30-day returns.'
  },
  {
    id: 'heritage-leather-duffel',
    name: 'Heritage Leather Duffel',
    category: 'Accessories',
    subCategory: 'Bags & Luggage',
    price: 540.0,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviewCount: 36,
    badge: 'Edition 04',
    isTrending: true,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBlwbs-mLoRPS4HKLTSx44h2wFFD3B1XoGUn8Bg89RxoPzVHzHADLzb5RFKRl4y3wT6Bt3KyAoWiTfxrO2HKWyZr4ji99vqtSli3sLbxou23hQ2tkj9mT_aKVZQOjqym6xMl95Xa0GAAA6X886iI8ymW91QdfbvdDWTys_vex2tFgdKC_vsoLbJflO9mfdMnQiXKmfd_xkhF7JbvDt7Vp3-Uij_bh3LHhRBX80OwP06S5dmYfJk6jNGA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBlwbs-mLoRPS4HKLTSx44h2wFFD3B1XoGUn8Bg89RxoPzVHzHADLzb5RFKRl4y3wT6Bt3KyAoWiTfxrO2HKWyZr4ji99vqtSli3sLbxou23hQ2tkj9mT_aKVZQOjqym6xMl95Xa0GAAA6X886iI8ymW91QdfbvdDWTys_vex2tFgdKC_vsoLbJflO9mfdMnQiXKmfd_xkhF7JbvDt7Vp3-Uij_bh3LHhRBX80OwP06S5dmYfJk6jNGA'
    ],
    description: 'Crafted from rich full-grain cognac leather treated with natural vegetable waxes. Reinforced solid brass hardware and an adjustable shoulder strap make it the quintessential companion for weekend retreats.',
    inStock: true,
    stockCount: 8,
    sku: 'LX-BAG-DUF-CG',
    colors: [
      { name: 'Cognac', hex: '#8B4513', ringColor: '#8B4513' },
      { name: 'Dark Chocolate', hex: '#3B2219', ringColor: '#3B2219' },
      { name: 'Natural Tan', hex: '#D2B48C', ringColor: '#D2B48C' }
    ],
    sizes: ['45L Weekend'],
    features: [
      'Full-grain vegetable-tanned leather exterior',
      'Solid antiqued brass hardware and YKK Excella zippers',
      'Dedicated padded 16-inch laptop compartment',
      'Heavy cotton twill interior lining'
    ],
    materials: '100% Full-grain Tuscan leather',
    care: 'Treat with leather balm every 6 months.',
    shipping: 'Express insured courier delivery included.'
  },
  {
    id: 'structured-leather-tote',
    name: 'Structured Leather Tote',
    category: 'Accessories',
    subCategory: 'Bags & Luggage',
    price: 295.0,
    originalPrice: 350.0,
    discount: '-15%',
    rating: 4.9,
    reviewCount: 92,
    badge: '-15%',
    isTrending: true,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKQaXk1Joeip6LRHDiha-KVqIxf4SxIeNPbbVxSjszXeaT_khIZegfE0tS9M0emZZFYxmdj95xt6HlAOaj60dOzihSXE80rWKhyMrfSVRPJBK4T91KgK4EdkeZKeKlMhngKSatg5q0kUN-C0jVmUrkG4X-YzG3ZPAgI2r7kM2gqQFClRH-wUxYXBa3l1KoIdiHWIBHEBG3oC3_x0bHKl4QrxxQR7sM4eHWS3ikPLXAYwMk9q20GJRTUQ',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKQaXk1Joeip6LRHDiha-KVqIxf4SxIeNPbbVxSjszXeaT_khIZegfE0tS9M0emZZFYxmdj95xt6HlAOaj60dOzihSXE80rWKhyMrfSVRPJBK4T91KgK4EdkeZKeKlMhngKSatg5q0kUN-C0jVmUrkG4X-YzG3ZPAgI2r7kM2gqQFClRH-wUxYXBa3l1KoIdiHWIBHEBG3oC3_x0bHKl4QrxxQR7sM4eHWS3ikPLXAYwMk9q20GJRTUQ'
    ],
    description: 'An architectural everyday tote with reinforced handles and structured base studs. Designed with clean edge-painted borders and a magnetic closure that keeps essentials safe yet instantly accessible.',
    inStock: true,
    stockCount: 14,
    sku: 'LX-BAG-TOT-NV',
    colors: [
      { name: 'Midnight Navy', hex: '#1B243B', ringColor: '#2457C5' },
      { name: 'Black Noir', hex: '#191B22', ringColor: '#191B22' },
      { name: 'Desert Dune', hex: '#D8C6B1', ringColor: '#D8C6B1' }
    ],
    sizes: ['One Size (15" x 13" x 6")'],
    features: [
      'Structured base with polished protective metal feet',
      'Fits up to 15" MacBook Pro with ease',
      'Detachable interior zip organizer pouch',
      'Magnetic bridge closure'
    ],
    materials: 'Saffiano scratch-resistant calf leather',
    care: 'Wipe clean with a damp lint-free cloth.',
    shipping: 'Complimentary shipping.'
  },
  {
    id: 'minimalist-leather-boot',
    name: 'Minimalist Leather Boot',
    category: 'Footwear',
    subCategory: 'Boots',
    price: 240.0,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviewCount: 42,
    badge: null,
    isTrending: false,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArNMftu5v3yJeoh6ipmKHzMQZPocQrV8uiwetHf4VBgo2Mm_Mg_a9exEvH3p8kq8AuUMtcxmzmvjGqj0Mx6BlTir4yZ59VBVlYv0ybNRCmBTL-SOQIjSH_ufbfM2LQuMJs69XuNG7K8U-prT9P86rG9p_1_IfIst2OukewdesDITk9MvDIMDs0TFpCCMCf70nwGhWl7QI5TOmsVfRSbdnduTXbga7_gixKm0ra4U_ofKsmtuEA6npPLw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArNMftu5v3yJeoh6ipmKHzMQZPocQrV8uiwetHf4VBgo2Mm_Mg_a9exEvH3p8kq8AuUMtcxmzmvjGqj0Mx6BlTir4yZ59VBVlYv0ybNRCmBTL-SOQIjSH_ufbfM2LQuMJs69XuNG7K8U-prT9P86rG9p_1_IfIst2OukewdesDITk9MvDIMDs0TFpCCMCf70nwGhWl7QI5TOmsVfRSbdnduTXbga7_gixKm0ra4U_ofKsmtuEA6npPLw'
    ],
    description: 'Handcrafted in Porto using supple European calfskin and Blake-stitched leather soles with inlaid rubber grip. A minimalist Chelsea-inspired silhouette that transitions seamlessly from day to evening.',
    inStock: true,
    stockCount: 15,
    sku: 'LX-FTW-BOT-DK',
    colors: [
      { name: 'Dark Brown', hex: '#4A3525', ringColor: '#4A3525' },
      { name: 'Matte Black', hex: '#191B22', ringColor: '#191B22' }
    ],
    sizes: ['40 (US 7)', '41 (US 8)', '42 (US 9)', '43 (US 10)', '44 (US 11)', '45 (US 12)'],
    features: [
      'Blake-stitched construction for lifetime resoleability',
      'Supple full-calfskin lining for immediate comfort',
      'Dual elastic side gussets with pull tabs'
    ],
    materials: 'European box calf leather, leather sole with rubber island',
    care: 'Condition regularly with neutral shoe cream.',
    shipping: 'Free size exchanges.'
  },
  {
    id: 'merino-wool-crewneck',
    name: 'Merino Wool Crewneck',
    category: 'Apparel',
    subCategory: 'Knitwear',
    price: 155.0,
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviewCount: 65,
    badge: 'New',
    isTrending: false,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4y9oHRcAMDVbLQJC7MszNhtbZbVuZY-s8cyoNfxe66xox1Ph4ms46b_DWO9PdoAhIM956wUvWBX1aetFXpBDlcDX1wQavo_3smMIAqHUhAE7CFNlEeLXhRieQgnGdjbYQZ5q_rhzVjIly1QvuxwCqIA1rUj_D_x0O-0zXtw-9cZFLlC_Xh51znPDvQMKqS7x-0T2MWmoT0nGcd5Ad3Dw1IAzvoHTrr0gxUDkl3PojTomZH2GMuyXnYg',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4y9oHRcAMDVbLQJC7MszNhtbZbVuZY-s8cyoNfxe66xox1Ph4ms46b_DWO9PdoAhIM956wUvWBX1aetFXpBDlcDX1wQavo_3smMIAqHUhAE7CFNlEeLXhRieQgnGdjbYQZ5q_rhzVjIly1QvuxwCqIA1rUj_D_x0O-0zXtw-9cZFLlC_Xh51znPDvQMKqS7x-0T2MWmoT0nGcd5Ad3Dw1IAzvoHTrr0gxUDkl3PojTomZH2GMuyXnYg'
    ],
    description: 'Spun from extra-fine 19.5 micron Australian Merino wool. Engineered with seamless 3D knitting technology for superior comfort without restrictive internal seams.',
    inStock: true,
    stockCount: 22,
    sku: 'LX-APP-KNT-OT',
    colors: [
      { name: 'Oatmeal Heather', hex: '#DED3C4', ringColor: '#DED3C4' },
      { name: 'Charcoal Melange', hex: '#3E414A', ringColor: '#3E414A' },
      { name: 'Forest Green', hex: '#26402E', ringColor: '#26402E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      '100% Extra-fine non-mulesed Merino wool',
      'Ribbed collar, cuffs, and hem with lycra memory retention',
      'Naturally temperature regulating and odor resistant'
    ],
    materials: '100% Merino Wool',
    care: 'Hand wash cold or gentle wool cycle. Dry flat.',
    shipping: 'Standard delivery.'
  },
  {
    id: 'pleated-wool-trousers',
    name: 'Pleated Wool Trousers',
    category: 'Apparel',
    subCategory: 'Trousers',
    price: 190.0,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviewCount: 31,
    badge: null,
    isTrending: false,
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq_NyCmdUAU3mSckWFAm0nnW5iQZo_EFbt3eHE0OYe9J0EMuSbgdlRVOfmxl_HJWHPsbf2zajBhEWgfArmACcD_1Zo_QIyAAH5ydir-txgzxcYQZRZjTCojr2mDtduhZUkI634QnZSSfnmeDDps5stFa-CCsPfI5dkEKw9AxYwgHd2TMop-neiRy4rqnZG6VsrnM98H1iWb3X_jHpMKP3jykilS1Dj4KhNxdNk23EqmcHuX62uWY_PxQ',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAq_NyCmdUAU3mSckWFAm0nnW5iQZo_EFbt3eHE0OYe9J0EMuSbgdlRVOfmxl_HJWHPsbf2zajBhEWgfArmACcD_1Zo_QIyAAH5ydir-txgzxcYQZRZjTCojr2mDtduhZUkI634QnZSSfnmeDDps5stFa-CCsPfI5dkEKw9AxYwgHd2TMop-neiRy4rqnZG6VsrnM98H1iWb3X_jHpMKP3jykilS1Dj4KhNxdNk23EqmcHuX62uWY_PxQ'
    ],
    description: 'Relaxed tailored trousers with single forward pleats and discreet side adjusters. Cut from breathable tropical-weight wool with a clean drape.',
    inStock: true,
    stockCount: 16,
    sku: 'LX-APP-TRS-CH',
    colors: [
      { name: 'Charcoal Grey', hex: '#3B3D44', ringColor: '#3B3D44' },
      { name: 'Dark Navy', hex: '#1C2333', ringColor: '#1C2333' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    features: [
      '100% Tropical wool woven in Biella, Italy',
      'Side waist adjusters eliminating belt necessity',
      'Unfinished hem for personalized tailoring'
    ],
    materials: '100% Virgin Tropical Wool',
    care: 'Dry clean only.',
    shipping: 'Standard delivery.'
  },
  {
    id: 'ceramic-task-lamp',
    name: 'Ceramic Task Lamp',
    category: 'Home & Living',
    subCategory: 'Lighting',
    price: 210.0,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviewCount: 29,
    badge: 'New',
    isTrending: false,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjuCzeVy5QQ36ka_xtvmYiQf9U-IbZh_znSZuTxMUNXXMqztEvVJQp9DTVGDg11NgaRDVCZPQnySLghxQcErN3F4_WSFL23kUqW9Zs0_PhVPt3dOMIbJFO4qoANJAzBCOe8SH5TBO28HaZCJ2n5ywXG-rBsDyzvyuGIIN4_eLFXSG8dYwqcKBvh42g2dELRJ2LLBA7ewEn-Gz5TniSUQsHLOXFAUzgJsy70oF95zkaVpSlXlo3SYY8rA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjuCzeVy5QQ36ka_xtvmYiQf9U-IbZh_znSZuTxMUNXXMqztEvVJQp9DTVGDg11NgaRDVCZPQnySLghxQcErN3F4_WSFL23kUqW9Zs0_PhVPt3dOMIbJFO4qoANJAzBCOe8SH5TBO28HaZCJ2n5ywXG-rBsDyzvyuGIIN4_eLFXSG8dYwqcKBvh42g2dELRJ2LLBA7ewEn-Gz5TniSUQsHLOXFAUzgJsy70oF95zkaVpSlXlo3SYY8rA'
    ],
    description: 'Sculptural table lamp featuring a hand-thrown stoneware base and a spun brass articulating shade. Emits a warm, glare-free ambient glow.',
    inStock: true,
    stockCount: 7,
    sku: 'LX-HME-LMP-ST',
    colors: [
      { name: 'Matte Chalk', hex: '#EDE8DF', ringColor: '#EDE8DF' },
      { name: 'Terracotta', hex: '#B85D43', ringColor: '#B85D43' }
    ],
    sizes: ['Standard (14" H x 9" W)'],
    features: [
      'Hand-thrown textured stoneware base',
      'Solid spun brass pivot arm and hardware',
      'Integrated dimmable warm LED module (2700K)'
    ],
    materials: 'Stoneware Ceramic, Brass, Braided Cotton Cord',
    care: 'Dust with a dry cloth.',
    shipping: 'Fragile handling included.'
  },
  {
    id: 'organic-linen-shirt',
    name: 'Organic Linen Shirt',
    category: 'Apparel',
    subCategory: 'Shirts',
    price: 120.0,
    originalPrice: null,
    discount: null,
    rating: 4.6,
    reviewCount: 54,
    badge: null,
    isTrending: false,
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUicBialW2RiYknmwj7NwDbi_bsy6asJRp1rv1-atZEKKeBDwyh78cAu1nSUfcMBWOkHg7PK69ShdXuNS4tecF6W0_-F9ygxBCLdbEdD9OFSsmIWs7gdXQnMX2tIKJGPVIstC8YTElmrYhqk50bXPtM-Q0fZXtOLLKKnAbQqjjc2nQGl64nZ2aZjkBvSwjvtJ7j7l2Vi9G7ZNbgGicZ9yFQcavFYbQvrB8-g95UxPeoHZKdEAQGGP08g',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUicBialW2RiYknmwj7NwDbi_bsy6asJRp1rv1-atZEKKeBDwyh78cAu1nSUfcMBWOkHg7PK69ShdXuNS4tecF6W0_-F9ygxBCLdbEdD9OFSsmIWs7gdXQnMX2tIKJGPVIstC8YTElmrYhqk50bXPtM-Q0fZXtOLLKKnAbQqjjc2nQGl64nZ2aZjkBvSwjvtJ7j7l2Vi9G7ZNbgGicZ9yFQcavFYbQvrB8-g95UxPeoHZKdEAQGGP08g'
    ],
    description: 'Woven from Normandy flax, this breathable button-down features french seams, a camp collar, and natural mother-of-pearl buttons. Garment-washed for broken-in softness.',
    inStock: true,
    stockCount: 19,
    sku: 'LX-APP-SHR-WH',
    colors: [
      { name: 'Optic White', hex: '#FFFFFF', ringColor: '#C3C6D5' },
      { name: 'Raw Natural', hex: '#E2DCD0', ringColor: '#E2DCD0' },
      { name: 'Sky Slate', hex: '#A8B7C7', ringColor: '#A8B7C7' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      '100% Certified European Flax Linen',
      'Mother-of-pearl buttons cross-stitched for durability',
      'Camp collar with clean French front placket'
    ],
    materials: '100% French Flax Linen',
    care: 'Machine wash cool, hang dry.',
    shipping: 'Standard delivery.'
  },
  {
    id: 'minimalist-leather-loafers',
    name: 'Minimalist Suede Loafers',
    category: 'Footwear',
    subCategory: 'Shoes',
    price: 185.0,
    originalPrice: 245.0,
    discount: '-25%',
    rating: 4.8,
    reviewCount: 39,
    badge: '-25%',
    isTrending: false,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABdXul4k3sgfq18xfmNVw44w3j-pcDZ4dnwxwJFtqG1h3ymszc5f84rFQgRuMBqkWhNTk-fL2Ba1lkNaI9J2KP0G0IB_YlrhHlGRogltdEr_6m6Z85eoZlCNq54OYSUa7jnHojmbvBe1sRh7bq3EHqu8DSZrGT4z_di4hQxpGD-pORSIM74XZyCBqCM0QT_ki9z6KVTCf1KKAzB-6B5rR_0GblmMR_vyxsvpCNytbiXoH85ov8r7gIVw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABdXul4k3sgfq18xfmNVw44w3j-pcDZ4dnwxwJFtqG1h3ymszc5f84rFQgRuMBqkWhNTk-fL2Ba1lkNaI9J2KP0G0IB_YlrhHlGRogltdEr_6m6Z85eoZlCNq54OYSUa7jnHojmbvBe1sRh7bq3EHqu8DSZrGT4z_di4hQxpGD-pORSIM74XZyCBqCM0QT_ki9z6KVTCf1KKAzB-6B5rR_0GblmMR_vyxsvpCNytbiXoH85ov8r7gIVw'
    ],
    description: 'Unlined Italian reverse suede loafers crafted for glove-like softness. Features a cushioned memory-foam leather insole and flexible welt construction.',
    inStock: true,
    stockCount: 10,
    sku: 'LX-FTW-LOF-TN',
    colors: [
      { name: 'Warm Tan Suede', hex: '#B89066', ringColor: '#B89066' },
      { name: 'Espresso', hex: '#3E2D23', ringColor: '#3E2D23' }
    ],
    sizes: ['40 (US 7)', '41 (US 8)', '42 (US 9)', '43 (US 10)', '44 (US 11)'],
    features: [
      'Velvety water-repellent Italian reverse calf suede',
      'Unstructured heel counter for easy slip-on wear',
      'Ultra-flexible natural rubber sole'
    ],
    materials: 'Italian Calf Suede, Natural Rubber',
    care: 'Brush lightly with a suede brush.',
    shipping: 'Free returns within 30 days.'
  },
  {
    id: 'minimalist-ceramic-mug',
    name: 'Minimalist Ceramic Mug',
    category: 'Home & Living',
    subCategory: 'Tableware',
    price: 28.0,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviewCount: 88,
    badge: null,
    isTrending: false,
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7jA06VFddnk9z5_RvkKbsXspaYiwNUJomrrRPflIikZp5vhxPHOOwlE-2yCV_FxxhRrkj202NuhDPz-BZWS38MZhSuLXGyjRgzqDXQWP_f-B1wFIKUlhyUBcaWDJzkf9reOkKaP0UhoFDK_-Gx2YnJR40JOHLR9FrupW_8kjX5t0yaeYC8RItp5rkGWAVMb_p_OaYfJMMBZK-sGfJHP_WQOEHIJvK2GigZIh-dA55O22cS-IHUV4OtA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7jA06VFddnk9z5_RvkKbsXspaYiwNUJomrrRPflIikZp5vhxPHOOwlE-2yCV_FxxhRrkj202NuhDPz-BZWS38MZhSuLXGyjRgzqDXQWP_f-B1wFIKUlhyUBcaWDJzkf9reOkKaP0UhoFDK_-Gx2YnJR40JOHLR9FrupW_8kjX5t0yaeYC8RItp5rkGWAVMb_p_OaYfJMMBZK-sGfJHP_WQOEHIJvK2GigZIh-dA55O22cS-IHUV4OtA'
    ],
    description: 'A serene morning essential with a comfortable ergonomic loop handle and matte unglazed exterior paired with glossy interior glaze.',
    inStock: true,
    stockCount: 30,
    sku: 'LX-HME-MUG-WH',
    colors: [
      { name: 'Matte White', hex: '#F9F9F8', ringColor: '#C3C6D5' },
      { name: 'Ash Grey', hex: '#9E9E9E', ringColor: '#9E9E9E' }
    ],
    sizes: ['Standard 12oz', 'Grand 16oz'],
    features: [
      'High-fired stoneware resistant to chipping',
      'Dishwasher and microwave safe',
      'Comfortable two-finger ergonomic loop'
    ],
    materials: 'High-fire Stoneware Ceramic',
    care: 'Dishwasher and microwave safe.',
    shipping: 'Secure padded packaging.'
  },
  {
    id: 'brass-desk-lamp',
    name: 'Brass Desk Lamp',
    category: 'Home & Living',
    subCategory: 'Lighting',
    price: 120.0,
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviewCount: 22,
    badge: null,
    isTrending: false,
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCBOiGr6RGC5H6Li72YQF53MmF5gfsVphZKfvaZrjqbzWMOJ-QKmhJ8Oohv8GYfHm9iVppCaxrrAWhqNVuFfGA-mw-9qU5LQi_-0nkl6Og4oVmIY6WcLGpWOr59fOuU5NNcZ6ep558zYBwaz29K53Aw39OXg5axWKhfYjEwenCmwFiDkTRc1eQo28sFEq0bWKZ7HfM3H4idxr9SPEuJme601lTWNFVS_NMyli7o7V0QMXCydftC8-Bxw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCBOiGr6RGC5H6Li72YQF53MmF5gfsVphZKfvaZrjqbzWMOJ-QKmhJ8Oohv8GYfHm9iVppCaxrrAWhqNVuFfGA-mw-9qU5LQi_-0nkl6Og4oVmIY6WcLGpWOr59fOuU5NNcZ6ep558zYBwaz29K53Aw39OXg5axWKhfYjEwenCmwFiDkTRc1eQo28sFEq0bWKZ7HfM3H4idxr9SPEuJme601lTWNFVS_NMyli7o7V0QMXCydftC8-Bxw'
    ],
    description: 'Sleek architectural brass lamp with rotational head and touch dimmer. Engineered for precision desk work with warm flicker-free illumination.',
    inStock: true,
    stockCount: 12,
    sku: 'LX-HME-LMP-BR',
    colors: [
      { name: 'Brushed Brass', hex: '#D4AF37', ringColor: '#D4AF37' },
      { name: 'Matte Black', hex: '#191B22', ringColor: '#191B22' }
    ],
    sizes: ['Standard'],
    features: [
      'Solid brushed brass finish with protective seal',
      '3-stage step touch brightness sensor',
      'Energy efficient 3000K warm LED'
    ],
    materials: 'Brushed Brass, Aluminum',
    care: 'Wipe with dry microfiber cloth.',
    shipping: 'Express shipping included.'
  },
  {
    id: 'tuscan-leather-cardholder',
    name: 'Tuscan Leather Cardholder',
    category: 'Accessories',
    subCategory: 'Small Leather Goods',
    price: 85.0,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviewCount: 74,
    badge: null,
    isTrending: false,
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZCr-TnYSAg9aAdwVAeHOoEApcTVR6SIaEDNN8RaXJVEe-QrQ4i4QrKnRMc4ANFi8sLE93xA-SqZUJSONyZw4YiY5PLeUsuEWX5Gm4nhEBc2xT6pDlAvxM_M0dz3-0q9pWW7XXamo-_xIGfq4-sxaBHD718M92-CK2pZNKPah6k6nkCCeh0cG85y5GnjjjX6aeBBBz0AlXmU_qSRBYtcK6g3S7HX9ATJ9cCHfwtFDuWEK8uMDucDHvEA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZCr-TnYSAg9aAdwVAeHOoEApcTVR6SIaEDNN8RaXJVEe-QrQ4i4QrKnRMc4ANFi8sLE93xA-SqZUJSONyZw4YiY5PLeUsuEWX5Gm4nhEBc2xT6pDlAvxM_M0dz3-0q9pWW7XXamo-_xIGfq4-sxaBHD718M92-CK2pZNKPah6k6nkCCeh0cG85y5GnjjjX6aeBBBz0AlXmU_qSRBYtcK6g3S7HX9ATJ9cCHfwtFDuWEK8uMDucDHvEA'
    ],
    description: 'Slim four-slot cardholder with central folded cash slip pocket. Cut from vegetable-tanned Tuscan vachetta leather that develops a lustrous patina over time.',
    inStock: true,
    stockCount: 25,
    sku: 'LX-ACC-CRD-TS',
    colors: [
      { name: 'Whiskey Tan', hex: '#A36838', ringColor: '#A36838' },
      { name: 'Onyx Black', hex: '#191B22', ringColor: '#191B22' }
    ],
    sizes: ['4-Slot Slim'],
    features: [
      '4 card slots + 1 cash note slip pocket',
      'Hand-burnished waxed edge detailing',
      'Subtle blind debossed LuxStore emblem'
    ],
    materials: 'Vegetable-tanned Tuscan Vachetta Leather',
    care: 'Condition occasionally with leather wax.',
    shipping: 'Complimentary standard shipping.'
  },
  {
    id: 'architectural-steel-money-clip',
    name: 'Architectural Steel Money Clip',
    category: 'Accessories',
    subCategory: 'Hardware',
    price: 45.0,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviewCount: 19,
    badge: null,
    isTrending: false,
    isFeatured: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjfw1tzy59rvFt5FzMtPg7tTbOftTXN8ZGVgwfclMNt77jkiBCKy3J-G521y7-5wE7TIxFT2rrOraUxKdog_8AUnygEfY-PuZ_XfkkMgWXzj2r6yF5aakeU8G-waOiFy2EZ0uefBeE_26hAMlQayBx0X5pH_a3nAws70spOx3gZy7jPlG2EiODYoBwFfa2neKaJ-DS0V4e2af6rFCC8LaqYuxeS8CXn8_sYpttHhRanNCcyPrlKnJyVA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjfw1tzy59rvFt5FzMtPg7tTbOftTXN8ZGVgwfclMNt77jkiBCKy3J-G521y7-5wE7TIxFT2rrOraUxKdog_8AUnygEfY-PuZ_XfkkMgWXzj2r6yF5aakeU8G-waOiFy2EZ0uefBeE_26hAMlQayBx0X5pH_a3nAws70spOx3gZy7jPlG2EiODYoBwFfa2neKaJ-DS0V4e2af6rFCC8LaqYuxeS8CXn8_sYpttHhRanNCcyPrlKnJyVA'
    ],
    description: 'Precision milled from a single block of aerospace-grade titanium and stainless steel. Designed with elastic tension that securely holds 1 to 20 banknotes.',
    inStock: true,
    stockCount: 14,
    sku: 'LX-ACC-MNC-SS',
    colors: [
      { name: 'Brushed Steel', hex: '#8E919B', ringColor: '#8E919B' },
      { name: 'Matte Titanium', hex: '#4B4D54', ringColor: '#4B4D54' }
    ],
    sizes: ['Standard'],
    features: [
      'Milled 316L stainless steel',
      'Laser-calibrated spring tension memory',
      'Ultra-thin 1.2mm silhouette'
    ],
    materials: '316L Stainless Steel',
    care: 'Wipe with microfiber cloth.',
    shipping: 'Standard shipping.'
  }
];

export const MOCK_ORDERS = [
  {
    id: 'LX-94821',
    date: '2026-10-08',
    status: 'In Transit',
    trackingNumber: 'TRK-984210984US',
    carrier: 'FedEx Express',
    estimatedDelivery: 'Oct 14, 2026',
    items: [
      {
        id: 'minimalist-precision-chronograph',
        name: 'Minimalist Precision Chronograph',
        price: 295.0,
        quantity: 1,
        variant: 'Dial: Matte Black / 40mm Standard',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArMWa2cqi0NDjtdGI3LA2rireNbKJi5zHAlWYJrOknXPBRx7lEPuGaUo1Xko_rhvxObOLq-jp_-fYVorjyVcF2Zw1IuGMvhNOmaBsIK-cbU1Y_zBFDUZ3gMZgdLbO0rnsYLlDWs_DM97bR32DF7qiFTHNtLIvQooCdE9CIiClxdg2baRuwHZWXNKAkfGdFvs29JbhUvtyce_djR7XbKT7FzmyCoKjIzyahuihOkhHT_vo828lz6SbhVA'
      }
    ],
    shippingAddress: {
      fullName: 'Jane Doe',
      street: '123 Luxury Lane, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    },
    paymentMethod: 'Mastercard ending in 8892',
    subtotal: 295.0,
    shippingFee: 0.0,
    tax: 23.6,
    total: 318.6,
    timeline: [
      { title: 'Order Placed', time: 'Oct 8, 2026 - 10:24 AM', completed: true },
      { title: 'Quality Inspection & Packaging', time: 'Oct 8, 2026 - 02:15 PM', completed: true },
      { title: 'Dispatched from Atelier Warehouse', time: 'Oct 9, 2026 - 09:30 AM', completed: true },
      { title: 'In Transit with FedEx', time: 'Oct 11, 2026 - 04:45 PM', completed: true },
      { title: 'Out for Delivery', time: 'Expected Oct 14, 2026', completed: false }
    ]
  },
  {
    id: 'LX-87214',
    date: '2026-09-18',
    status: 'Delivered',
    trackingNumber: 'TRK-872149872US',
    carrier: 'DHL Express',
    estimatedDelivery: 'Sep 21, 2026',
    items: [
      {
        id: 'structured-cashmere-overcoat',
        name: 'Structured Cashmere Overcoat',
        price: 380.0,
        quantity: 1,
        variant: 'Charcoal Grey / Size M',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrHltshVXpcVqGoUSnmceOy6iqwuitJljwhez3N6oslZdue_U1L3s3bP9mnSBpzh91ZCaiWvO5piYG5ErZAvdZM56uO783cV0-v6DV7F9nWKz0rbLGhB4T_UFpdcgmf01lgmU5IhW5XCBBCvE4N6qN48EfGZWgkP3h5INq1GrElKKJPel87m5e4h_dFmt2V-XIfq7yiaPMwKTjithDxJXI94KmJIFuDuIGHRKk6PNJxepWie5QMxTxtw'
      },
      {
        id: 'minimalist-ceramic-mug',
        name: 'Minimalist Ceramic Mug',
        price: 28.0,
        quantity: 2,
        variant: 'Matte White / Standard',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7jA06VFddnk9z5_RvkKbsXspaYiwNUJomrrRPflIikZp5vhxPHOOwlE-2yCV_FxxhRrkj202NuhDPz-BZWS38MZhSuLXGyjRgzqDXQWP_f-B1wFIKUlhyUBcaWDJzkf9reOkKaP0UhoFDK_-Gx2YnJR40JOHLR9FrupW_8kjX5t0yaeYC8RItp5rkGWAVMb_p_OaYfJMMBZK-sGfJHP_WQOEHIJvK2GigZIh-dA55O22cS-IHUV4OtA'
      }
    ],
    shippingAddress: {
      fullName: 'Jane Doe',
      street: '123 Luxury Lane, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    },
    paymentMethod: 'Apple Pay (Visa 4242)',
    subtotal: 436.0,
    shippingFee: 0.0,
    tax: 34.88,
    total: 470.88,
    timeline: [
      { title: 'Order Placed', time: 'Sep 18, 2026', completed: true },
      { title: 'Delivered to Concierge', time: 'Sep 21, 2026', completed: true }
    ]
  }
];

export const MOCK_USER = {
  id: 'usr_jane_doe_1',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  phone: '+1 (555) 019-2834',
  initials: 'JD',
  memberTier: 'Verified Member',
  rewardPoints: 1250,
  addresses: [
    {
      id: 'addr_1',
      isDefault: true,
      title: 'Home Address',
      fullName: 'Jane Doe',
      street: '123 Luxury Lane, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States',
      phone: '+1 (555) 019-2834'
    },
    {
      id: 'addr_2',
      isDefault: false,
      title: 'Studio / Workspace',
      fullName: 'Jane Doe',
      street: '840 Atelier District, Suite 300',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
      country: 'United States',
      phone: '+1 (555) 019-2834'
    }
  ]
};
