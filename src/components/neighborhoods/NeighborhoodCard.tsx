'use client';

import { NeighborhoodStats } from '@/lib/neighborhoodStats';

interface NeighborhoodCardProps {
  stats: NeighborhoodStats;
  rank: number;
}

export function NeighborhoodCard({ stats, rank }: NeighborhoodCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-sm">#{rank}</span>
            <h3 className="text-xl font-bold text-white">{stats.name}</h3>
          </div>
          <p className="text-zinc-400 text-sm mt-1">{stats.propertyCount} properties</p>
        </div>
        <div className="px-3 py-1 bg-lime/20 rounded-lg">
          <span className="text-lime font-bold text-lg">{stats.avgYield}%</span>
          <span className="text-lime/70 text-xs ml-1">yield</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-zinc-500 text-sm">Avg Price</div>
          <div className="text-white font-semibold">{formatPrice(stats.avgPrice)}</div>
        </div>
        <div>
          <div className="text-zinc-500 text-sm">Avg Rent</div>
          <div className="text-white font-semibold">{formatPrice(stats.avgRent)}/mo</div>
        </div>
        <div className="col-span-2">
          <div className="text-zinc-500 text-sm">Price Range</div>
          <div className="text-zinc-300 text-sm">
            {formatPrice(stats.minPrice)} - {formatPrice(stats.maxPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}
