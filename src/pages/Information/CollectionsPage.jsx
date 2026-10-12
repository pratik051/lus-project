import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MOCK_CATEGORIES } from '../../data/mockData';

export const CollectionsPage = () => {
  const collections = [
    {
      title: 'Edition 04 — Autumn / Winter Capsule',
      subtitle: 'Double-faced cashmere, structured outerwear, and raw wool layering pieces.',
      category: 'apparel',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrHltshVXpcVqGoUSnmceOy6iqwuitJljwhez3N6oslZdue_U1L3s3bP9mnSBpzh91ZCaiWvO5piYG5ErZAvdZM56uO783cV0-v6DV7F9nWKz0rbLGhB4T_UFpdcgmf01lgmU5IhW5XCBBCvE4N6qN48EfGZWgkP3h5INq1GrElKKJPel87m5e4h_dFmt2V-XIfq7yiaPMwKTjithDxJXI94KmJIFuDuIGHRKk6PNJxepWie5QMxTxtw',
    },
    {
      title: 'Horology & Precision Instruments',
      subtitle: 'Swiss quartz movements encased in 316L marine-grade steel with sapphire crystal.',
      category: 'accessories',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArMWa2cqi0NDjtdGI3LA2rireNbKJi5zHAlWYJrOknXPBRx7lEPuGaUo1Xko_rhvxObOLq-jp_-fYVorjyVcF2Zw1IuGMvhNOmaBsIK-cbU1Y_zBFDUZ3gMZgdLbO0rnsYLlDWs_DM97bR32DF7qiFTHNtLIvQooCdE9CIiClxdg2baRuwHZWXNKAkfGdFvs29JbhUvtyce_djR7XbKT7FzmyCoKjIzyahuihOkhHT_vo828lz6SbhVA',
    },
    {
      title: 'Tuscan Vegetable-Tanned Leatherware',
      subtitle: 'Full-grain weekenders, totes, and cardholders tanned with chestnut and mimosa bark.',
      category: 'accessories',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBlwbs-mLoRPS4HKLTSx44h2wFFD3B1XoGUn8Bg89RxoPzVHzHADLzb5RFKRl4y3wT6Bt3KyAoWiTfxrO2HKWyZr4ji99vqtSli3sLbxou23hQ2tkj9mT_aKVZQOjqym6xMl95Xa0GAAA6X886iI8ymW91QdfbvdDWTys_vex2tFgdKC_vsoLbJflO9mfdMnQiXKmfd_xkhF7JbvDt7Vp3-Uij_bh3LHhRBX80OwP06S5dmYfJk6jNGA',
    },
    {
      title: 'Monolithic Living & Ceramics',
      subtitle: 'Hand-thrown textured ceramics and tactile desk lighting for contemplation spaces.',
      category: 'home-living',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj05OOw6iiV4tBGwG8Y9lrjRrMR5umDsU9Vh5f5pQavkFFt4pItJiZVjFV0SCGb2ac6jwqwMEoVsbDL2l89RuLujFil1iOM1nog-zTNeUCNZK_VEZ7g0drB9QawVN2l-SyDu5gg9S5E2YQ9h9piYVze5gPzCwsJZ1DuWRICNSWwbuC8wgrNL3Ampk8LehK9HzHCJ-CqvJ1YokN2dUYcTjIbwWmTLHvI2_PLwAiEU8nZlwMDRCkWQxrwA',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="max-w-2xl space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Curated Portfolios
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
          Seasonal Collections & Capsules
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          Thematic groupings arranged by tactile discipline, utility, and materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((col, idx) => (
          <div
            key={idx}
            className="group rounded-xl border border-surface-variant overflow-hidden bg-surface flex flex-col justify-between shadow-sm hover:border-primary/80 transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-bold text-on-surface">{col.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{col.subtitle}</p>
              <Link
                to={`/shop?category=${col.category}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-2"
              >
                <span>Shop this capsule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
