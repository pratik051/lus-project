import mongoose from 'mongoose';
import env from '../config/env.js';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Address from '../models/Address.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import logger from './logger.js';

const DEMO_CATEGORIES = [
  {
    name: 'Apparel',
    slug: 'apparel',
    tagline: '01 / Wardrobe',
    subtitle: 'Tailored essentials & knitwear',
    description: 'Unhurried tailored apparel cut from Italian cashmere, virgin wool, and Normandy flax.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQo1xgGIz5vI5j5F-wIg3K7uacqLy0cAYaDdamaEklkxdsZ-ZGyUlIPzk3XJjgTirzvjsF-Yb_fqFPVkuvPln8dn3AJ6s02ZF3PluUC_YiqV1IYiO1n_5nU29etEfr4pqQvpFk3Pb1FRetmfcE_izRsemBHeLCiwYWzLMfIuIih1iekry5LEGTVILTFxt5_FxJiMrnybedRjXxH3fEiixNY7dcvzccfEDT9egKnejd84vQUOIfddXb4w',
    displayOrder: 1,
  },
  {
    name: 'Footwear',
    slug: 'footwear',
    tagline: '02 / Footwear',
    subtitle: 'Artisan loafers & boots',
    description: 'Blake-stitched and reverse-suede footwear handcrafted in Porto workshops.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-H6AozgjnSIq_CZiU1Jaev_1cz7IsaWK1WlVxci6mli4kWFpYR5ZF4A33yGXydy8_UA-C175I-L4cpkIDtiNTkoCbJYi-6u1O954Mkjhks_gLfKrhnhWyL6xJeOGuglYOzVYAddMIbd6368QdmCS2uhufmpWBJpRt_iaMjbetEQNPnqoc5HnZZEd7GpR8thJn7nZzO3WN6bkPIkYZ_RKahTpWGBc_9Aw3HR_sylPfU6chW7En9UGpvQ',
    displayOrder: 2,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    tagline: '03 / Accents',
    subtitle: 'Leather goods & timepieces',
    description: 'Vegetable-tanned Tuscan leather bags and Swiss quartz chronographs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANwXCrT1EosQPa0Zt0zVJXRh_VCOWotgzuH8OMVoRB17PTM31GDjegqs7AjO_hzCXKKoKzUetaQt952VnrhVd7MN4C-ZV16EEm0vjxk3uFV6SgDh2m_2dmsJx7Z5SBf4OiFG7Pcoz2jRY-qGxDbc0Nu1xqufYOrb5w_CNSaJpJMCXhLrc1LTpDGVuNudrecOOkwnFj7cv29uALoaOyj5usWH_HjckU4Dr3fZCwvy12ZGpHT4kNzAt50Q',
    displayOrder: 3,
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    tagline: '04 / Living',
    subtitle: 'Ceramics & textured textiles',
    description: 'Hand-thrown stoneware ceramics and spun brass task lighting.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj05OOw6iiV4tBGwG8Y9lrjRrMR5umDsU9Vh5f5pQavkFFt4pItJiZVjFV0SCGb2ac6jwqwMEoVsbDL2l89RuLujFil1iOM1nog-zTNeUCNZK_VEZ7g0drB9QawVN2l-SyDu5gg9S5E2YQ9h9piYVze5gPzCwsJZ1DuWRICNSWwbuC8wgrNL3Ampk8LehK9HzHCJ-CqvJ1YokN2dUYcTjIbwWmTLHvI2_PLwAiEU8nZlwMDRCkWQxrwA',
    displayOrder: 4,
  },
];

const DEMO_PRODUCTS = [
  {
    name: 'Minimalist Precision Chronograph',
    slug: 'minimalist-precision-chronograph',
    sku: 'LX-CHR-40-BLK',
    category: 'Accessories',
    subCategory: 'Horology',
    price: 295.0,
    originalPrice: 370.0,
    discount: '20% OFF',
    inventory: 24,
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
    shipping: 'Complimentary express worldwide shipping in signature gift box.',
  },
  {
    name: 'Structured Cashmere Overcoat',
    slug: 'structured-cashmere-overcoat',
    sku: 'LX-OVC-WOL-CH',
    category: 'Apparel',
    subCategory: 'Outerwear',
    price: 380.0,
    originalPrice: 475.0,
    discount: '-20%',
    inventory: 15,
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
    name: 'Heritage Leather Duffel',
    slug: 'heritage-leather-duffel',
    sku: 'LX-BAG-DUF-CG',
    category: 'Accessories',
    subCategory: 'Bags & Luggage',
    price: 540.0,
    inventory: 10,
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
    colors: [
      { name: 'Cognac', hex: '#8B4513', ringColor: '#8B4513' },
      { name: 'Dark Chocolate', hex: '#3B2219', ringColor: '#3B2219' }
    ],
    sizes: ['45L Weekend'],
    materials: '100% Full-grain Tuscan leather, solid brass hardware',
    care: 'Treat with leather balm every 6 months.',
  },
  {
    name: 'Structured Leather Tote',
    slug: 'structured-leather-tote',
    sku: 'LX-BAG-TOT-NV',
    category: 'Accessories',
    subCategory: 'Bags & Luggage',
    price: 295.0,
    originalPrice: 350.0,
    discount: '-15%',
    inventory: 18,
    rating: 4.9,
    reviewCount: 92,
    badge: '-15%',
    isTrending: true,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKQaXk1Joeip6LRHDiha-KVqIxf4SxIeNPbbVxSjszXeaT_khIZegfE0tS9M0emZZFYxmdj95xt6HlAOaj60dOzihSXE80rWKhyMrfSVRPJBK4T91KgK4EdkeZKeKlMhngKSatg5q0kUN-C0jVmUrkG4X-YzG3ZPAgI2r7kM2gqQFClRH-wUxYXBa3l1KoIdiHWIBHEBG3oC3_x0bHKl4QrxxQR7sM4eHWS3ikPLXAYwMk9q20GJRTUQ',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKQaXk1Joeip6LRHDiha-KVqIxf4SxIeNPbbVxSjszXeaT_khIZegfE0tS9M0emZZFYxmdj95xt6HlAOaj60dOzihSXE80rWKhyMrfSVRPJBK4T91KgK4EdkeZKeKlMhngKSatg5q0kUN-C0jVmUrkG4X-YzG3ZPAgI2r7kM2gqQFClRH-wUxYXBa3l1KoIdiHWIBHEBG3oC3_x0bHKl4QrxxQR7sM4eHWS3ikPLXAYwMk9q20GJRTUQ'
    ],
    description: 'An architectural everyday tote with reinforced handles and structured base studs. Designed with clean edge-painted borders and a magnetic closure.',
    colors: [
      { name: 'Midnight Navy', hex: '#1B243B', ringColor: '#2457C5' },
      { name: 'Black Noir', hex: '#191B22', ringColor: '#191B22' }
    ],
    sizes: ['One Size (15" x 13" x 6")'],
    materials: 'Saffiano scratch-resistant calf leather',
  },
  {
    name: 'Minimalist Leather Boot',
    slug: 'minimalist-leather-boot',
    sku: 'LX-FTW-BOT-DK',
    category: 'Footwear',
    subCategory: 'Boots',
    price: 240.0,
    inventory: 14,
    rating: 4.8,
    reviewCount: 42,
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArNMftu5v3yJeoh6ipmKHzMQZPocQrV8uiwetHf4VBgo2Mm_Mg_a9exEvH3p8kq8AuUMtcxmzmvjGqj0Mx6BlTir4yZ59VBVlYv0ybNRCmBTL-SOQIjSH_ufbfM2LQuMJs69XuNG7K8U-prT9P86rG9p_1_IfIst2OukewdesDITk9MvDIMDs0TFpCCMCf70nwGhWl7QI5TOmsVfRSbdnduTXbga7_gixKm0ra4U_ofKsmtuEA6npPLw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArNMftu5v3yJeoh6ipmKHzMQZPocQrV8uiwetHf4VBgo2Mm_Mg_a9exEvH3p8kq8AuUMtcxmzmvjGqj0Mx6BlTir4yZ59VBVlYv0ybNRCmBTL-SOQIjSH_ufbfM2LQuMJs69XuNG7K8U-prT9P86rG9p_1_IfIst2OukewdesDITk9MvDIMDs0TFpCCMCf70nwGhWl7QI5TOmsVfRSbdnduTXbga7_gixKm0ra4U_ofKsmtuEA6npPLw'
    ],
    description: 'Handcrafted in Porto using supple European calfskin and Blake-stitched leather soles with inlaid rubber grip.',
    colors: [
      { name: 'Dark Brown', hex: '#4A3525', ringColor: '#4A3525' },
      { name: 'Matte Black', hex: '#191B22', ringColor: '#191B22' }
    ],
    sizes: ['40 (US 7)', '41 (US 8)', '42 (US 9)', '43 (US 10)', '44 (US 11)'],
    materials: 'European box calf leather, Blake-stitched sole',
  },
  {
    name: 'Merino Wool Crewneck',
    slug: 'merino-wool-crewneck',
    sku: 'LX-APP-KNT-OT',
    category: 'Apparel',
    subCategory: 'Knitwear',
    price: 155.0,
    inventory: 22,
    rating: 4.7,
    reviewCount: 65,
    badge: 'New',
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4y9oHRcAMDVbLQJC7MszNhtbZbVuZY-s8cyoNfxe66xox1Ph4ms46b_DWO9PdoAhIM956wUvWBX1aetFXpBDlcDX1wQavo_3smMIAqHUhAE7CFNlEeLXhRieQgnGdjbYQZ5q_rhzVjIly1QvuxwCqIA1rUj_D_x0O-0zXtw-9cZFLlC_Xh51znPDvQMKqS7x-0T2MWmoT0nGcd5Ad3Dw1IAzvoHTrr0gxUDkl3PojTomZH2GMuyXnYg',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4y9oHRcAMDVbLQJC7MszNhtbZbVuZY-s8cyoNfxe66xox1Ph4ms46b_DWO9PdoAhIM956wUvWBX1aetFXpBDlcDX1wQavo_3smMIAqHUhAE7CFNlEeLXhRieQgnGdjbYQZ5q_rhzVjIly1QvuxwCqIA1rUj_D_x0O-0zXtw-9cZFLlC_Xh51znPDvQMKqS7x-0T2MWmoT0nGcd5Ad3Dw1IAzvoHTrr0gxUDkl3PojTomZH2GMuyXnYg'
    ],
    description: 'Spun from extra-fine 19.5 micron Australian Merino wool. Engineered with seamless 3D knitting technology.',
    colors: [
      { name: 'Oatmeal Heather', hex: '#DED3C4', ringColor: '#DED3C4' },
      { name: 'Charcoal Melange', hex: '#3E414A', ringColor: '#3E414A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    materials: '100% Merino Wool',
  },
  {
    name: 'Ceramic Task Lamp',
    slug: 'ceramic-task-lamp',
    sku: 'LX-HME-LMP-ST',
    category: 'Home & Living',
    subCategory: 'Lighting',
    price: 210.0,
    inventory: 9,
    rating: 4.8,
    reviewCount: 29,
    badge: 'New',
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjuCzeVy5QQ36ka_xtvmYiQf9U-IbZh_znSZuTxMUNXXMqztEvVJQp9DTVGDg11NgaRDVCZPQnySLghxQcErN3F4_WSFL23kUqW9Zs0_PhVPt3dOMIbJFO4qoANJAzBCOe8SH5TBO28HaZCJ2n5ywXG-rBsDyzvyuGIIN4_eLFXSG8dYwqcKBvh42g2dELRJ2LLBA7ewEn-Gz5TniSUQsHLOXFAUzgJsy70oF95zkaVpSlXlo3SYY8rA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjuCzeVy5QQ36ka_xtvmYiQf9U-IbZh_znSZuTxMUNXXMqztEvVJQp9DTVGDg11NgaRDVCZPQnySLghxQcErN3F4_WSFL23kUqW9Zs0_PhVPt3dOMIbJFO4qoANJAzBCOe8SH5TBO28HaZCJ2n5ywXG-rBsDyzvyuGIIN4_eLFXSG8dYwqcKBvh42g2dELRJ2LLBA7ewEn-Gz5TniSUQsHLOXFAUzgJsy70oF95zkaVpSlXlo3SYY8rA'
    ],
    description: 'Sculptural table lamp featuring a hand-thrown stoneware base and a spun brass articulating shade.',
    colors: [
      { name: 'Matte Chalk', hex: '#EDE8DF', ringColor: '#EDE8DF' }
    ],
    sizes: ['Standard (14" H x 9" W)'],
    materials: 'Stoneware Ceramic, Brass',
  },
  {
    name: 'Minimalist Ceramic Mug',
    slug: 'minimalist-ceramic-mug',
    sku: 'LX-HME-MUG-WH',
    category: 'Home & Living',
    subCategory: 'Tableware',
    price: 28.0,
    inventory: 40,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7jA06VFddnk9z5_RvkKbsXspaYiwNUJomrrRPflIikZp5vhxPHOOwlE-2yCV_FxxhRrkj202NuhDPz-BZWS38MZhSuLXGyjRgzqDXQWP_f-B1wFIKUlhyUBcaWDJzkf9reOkKaP0UhoFDK_-Gx2YnJR40JOHLR9FrupW_8kjX5t0yaeYC8RItp5rkGWAVMb_p_OaYfJMMBZK-sGfJHP_WQOEHIJvK2GigZIh-dA55O22cS-IHUV4OtA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7jA06VFddnk9z5_RvkKbsXspaYiwNUJomrrRPflIikZp5vhxPHOOwlE-2yCV_FxxhRrkj202NuhDPz-BZWS38MZhSuLXGyjRgzqDXQWP_f-B1wFIKUlhyUBcaWDJzkf9reOkKaP0UhoFDK_-Gx2YnJR40JOHLR9FrupW_8kjX5t0yaeYC8RItp5rkGWAVMb_p_OaYfJMMBZK-sGfJHP_WQOEHIJvK2GigZIh-dA55O22cS-IHUV4OtA'
    ],
    description: 'A serene morning essential with a comfortable ergonomic loop handle and matte unglazed exterior.',
    colors: [
      { name: 'Matte White', hex: '#F9F9F8', ringColor: '#C3C6D5' }
    ],
    sizes: ['Standard 12oz'],
    materials: 'High-fire Stoneware Ceramic',
  },
  {
    name: 'Brass Desk Lamp',
    slug: 'brass-desk-lamp',
    sku: 'LX-HME-LMP-BR',
    category: 'Home & Living',
    subCategory: 'Lighting',
    price: 120.0,
    inventory: 18,
    rating: 4.7,
    reviewCount: 22,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCBOiGr6RGC5H6Li72YQF53MmF5gfsVphZKfvaZrjqbzWMOJ-QKmhJ8Oohv8GYfHm9iVppCaxrrAWhqNVuFfGA-mw-9qU5LQi_-0nkl6Og4oVmIY6WcLGpWOr59fOuU5NNcZ6ep558zYBwaz29K53Aw39OXg5axWKhfYjEwenCmwFiDkTRc1eQo28sFEq0bWKZ7HfM3H4idxr9SPEuJme601lTWNFVS_NMyli7o7V0QMXCydftC8-Bxw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCBOiGr6RGC5H6Li72YQF53MmF5gfsVphZKfvaZrjqbzWMOJ-QKmhJ8Oohv8GYfHm9iVppCaxrrAWhqNVuFfGA-mw-9qU5LQi_-0nkl6Og4oVmIY6WcLGpWOr59fOuU5NNcZ6ep558zYBwaz29K53Aw39OXg5axWKhfYjEwenCmwFiDkTRc1eQo28sFEq0bWKZ7HfM3H4idxr9SPEuJme601lTWNFVS_NMyli7o7V0QMXCydftC8-Bxw'
    ],
    description: 'Sleek architectural brass lamp with rotational head and touch dimmer. Engineered for precision desk work.',
    colors: [
      { name: 'Brushed Brass', hex: '#D4AF37', ringColor: '#D4AF37' }
    ],
    sizes: ['Standard'],
    materials: 'Brushed Brass, Aluminum',
  }
];

const DEMO_COUPONS = [
  {
    code: 'ATELIER10',
    discountType: 'percentage',
    value: 10,
    minPurchase: 50,
    validUntil: new Date('2030-12-31'),
    description: '10% off for verified Atelier members on orders over $50',
  },
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    value: 20,
    minPurchase: 100,
    validUntil: new Date('2030-12-31'),
    description: '20% off seasonal welcome code on orders over $100',
  },
  {
    code: 'LUX10',
    discountType: 'percentage',
    value: 10,
    minPurchase: 0,
    validUntil: new Date('2030-12-31'),
    description: '10% discount across all products',
  },
];

export async function seedDatabase() {
  await connectDatabase();
  logger.info('🌱 Starting LuxStore database seeding...');

  try {
    // 1. Seed Categories
    await Category.deleteMany();
    const categories = await Category.insertMany(DEMO_CATEGORIES);
    logger.info(`✅ Seeded ${categories.length} categories.`);

    // 2. Seed Products
    await Product.deleteMany();
    const products = await Product.insertMany(DEMO_PRODUCTS);
    logger.info(`✅ Seeded ${products.length} products with complete specs and imagery.`);

    // 3. Seed Users
    await User.deleteMany();
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'Director',
      email: 'admin@luxstore.internal',
      password: 'Admin@LuxStore2026!',
      role: 'admin',
      status: 'active',
      memberTier: 'Atelier Privé',
      rewardPoints: 5000,
    });

    const staffUser = await User.create({
      firstName: 'Staff',
      lastName: 'Curator',
      email: 'staff@luxstore.internal',
      password: 'Staff@LuxStore2026!',
      role: 'staff',
      status: 'active',
      memberTier: 'Verified Member',
      rewardPoints: 2000,
    });

    const customerUser = await User.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'JaneDoe@2026!',
      role: 'customer',
      status: 'active',
      phone: '+1 (555) 019-2834',
      memberTier: 'Verified Member',
      rewardPoints: 1250,
    });
    logger.info('✅ Seeded Admin, Staff, and Customer (Jane Doe) accounts.');

    // 4. Seed Addresses for Jane Doe
    await Address.deleteMany();
    await Address.create({
      user: customerUser._id,
      title: 'Home Address',
      fullName: 'Jane Doe',
      phone: '+1 (555) 019-2834',
      street: '123 Luxury Lane, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States',
      isDefault: true,
    });
    await Address.create({
      user: customerUser._id,
      title: 'Studio / Workspace',
      fullName: 'Jane Doe',
      phone: '+1 (555) 019-2834',
      street: '840 Atelier District, Suite 300',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
      country: 'United States',
      isDefault: false,
    });
    logger.info('✅ Seeded default addresses for customer.');

    // 5. Seed Coupons
    await Coupon.deleteMany();
    await Coupon.insertMany(DEMO_COUPONS);
    logger.info('✅ Seeded coupons (ATELIER10, WELCOME20, LUX10).');

    // 6. Seed Demo Orders for Jane Doe matching Stitch Screen 6
    await Order.deleteMany();
    const coat = products.find(p => p.slug === 'structured-cashmere-overcoat');
    const watch = products.find(p => p.slug === 'minimalist-precision-chronograph');
    const mug = products.find(p => p.slug === 'minimalist-ceramic-mug');

    await Order.create({
      orderNumber: 'LX-94821',
      user: customerUser._id,
      items: [
        {
          product: watch._id,
          productId: watch.slug,
          name: watch.name,
          sku: watch.sku,
          image: watch.image,
          variantColor: 'Matte Black',
          variantSize: '40mm Standard',
          unitPrice: 295.0,
          quantity: 1,
          totalPrice: 295.0,
        },
      ],
      subtotal: 295.0,
      discount: 0,
      shippingFee: 0,
      tax: 23.6,
      total: 318.6,
      currency: 'USD',
      shippingAddress: {
        fullName: 'Jane Doe',
        street: '123 Luxury Lane, Apt 4B',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107',
        country: 'United States',
        phone: '+1 (555) 019-2834',
        email: 'jane.doe@example.com',
      },
      paymentMethod: 'Mastercard ending in 8892',
      paymentStatus: 'authorized',
      orderStatus: 'confirmed',
      trackingNumber: 'TRK-984210984US',
      carrier: 'FedEx Express Worldwide',
      estimatedDelivery: 'Oct 14, 2026',
      timeline: [
        { title: 'Order Authorized & Confirmed', time: 'Oct 8, 2026 - 10:24 AM', completed: true },
        { title: 'Quality Assurance & Packaging', time: 'Oct 8, 2026 - 02:15 PM', completed: true },
        { title: 'Dispatched from Atelier Warehouse', time: 'Oct 9, 2026 - 09:30 AM', completed: true },
        { title: 'In Transit with FedEx', time: 'Oct 11, 2026 - 04:45 PM', completed: true },
        { title: 'Out for Delivery', time: 'Expected Oct 14, 2026', completed: false },
      ],
    });

    await Order.create({
      orderNumber: 'LX-87214',
      user: customerUser._id,
      items: [
        {
          product: coat._id,
          productId: coat.slug,
          name: coat.name,
          sku: coat.sku,
          image: coat.image,
          variantColor: 'Charcoal Grey',
          variantSize: 'M',
          unitPrice: 380.0,
          quantity: 1,
          totalPrice: 380.0,
        },
        {
          product: mug._id,
          productId: mug.slug,
          name: mug.name,
          sku: mug.sku,
          image: mug.image,
          variantColor: 'Matte White',
          variantSize: 'Standard',
          unitPrice: 28.0,
          quantity: 2,
          totalPrice: 56.0,
        },
      ],
      subtotal: 436.0,
      discount: 0,
      shippingFee: 0,
      tax: 34.88,
      total: 470.88,
      currency: 'USD',
      shippingAddress: {
        fullName: 'Jane Doe',
        street: '123 Luxury Lane, Apt 4B',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107',
        country: 'United States',
        phone: '+1 (555) 019-2834',
        email: 'jane.doe@example.com',
      },
      paymentMethod: 'Apple Pay (Visa 4242)',
      paymentStatus: 'paid',
      orderStatus: 'delivered',
      trackingNumber: 'TRK-872149872US',
      carrier: 'DHL Express',
      estimatedDelivery: 'Sep 21, 2026',
      timeline: [
        { title: 'Order Placed', time: 'Sep 18, 2026', completed: true },
        { title: 'Delivered to Concierge', time: 'Sep 21, 2026', completed: true },
      ],
    });
    logger.info('✅ Seeded demo orders matching customer dashboard timeline.');

    // 7. Seed Reviews
    await Review.deleteMany();
    await Review.create({
      product: watch._id,
      user: customerUser._id,
      authorName: 'Jane D.',
      rating: 5,
      title: 'Flawless timepiece, quiet refinement',
      comment: 'The matte dial and brushed steel casing are exceptionally well-balanced. Swiss movement has been completely accurate.',
      verifiedPurchase: true,
      moderationStatus: 'approved',
    });
    logger.info('✅ Seeded customer reviews.');

    logger.info('🎉 LuxStore database seeding completed successfully!');
  } catch (error) {
    logger.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await disconnectDatabase();
  }
}

// Direct execution from CLI
if (process.argv[1]?.endsWith('seedData.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default seedDatabase;
