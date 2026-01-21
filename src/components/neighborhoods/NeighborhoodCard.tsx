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
    <div className="bg-surface rounded-xl p-6 ring-1 ring-border-subtle shadow-premium hover:ring-border-hover transition-all duration-150">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 text-sm">#{rank}</span>
            <h3 className="text-xl font-medium text-zinc-50">{stats.name}</h3>
          </div>
          <p className="text-zinc-500 text-sm mt-1">{stats.propertyCount} properties</p>
        </div>
        <div className="px-3 py-1.5 bg-lime/10 rounded-lg ring-1 ring-lime/20">
          <span className="text-lime font-semibold text-lg">{stats.avgYield}%</span>
          <span className="text-lime/60 text-xs ml-1">yield</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-zinc-600 text-sm">Avg Price</div>
          <div className="text-zinc-100 font-medium mt-0.5">{formatPrice(stats.avgPrice)}</div>
        </div>
        <div>
          <div className="text-zinc-600 text-sm">Avg Rent</div>
          <div className="text-zinc-100 font-medium mt-0.5">{formatPrice(stats.avgRent)}/mo</div>
        </div>
        <div className="col-span-2 pt-3 border-t border-border-subtle">
          <div className="text-zinc-600 text-sm">Price Range</div>
          <div className="text-zinc-400 text-sm mt-0.5">
            {formatPrice(stats.minPrice)} — {formatPrice(stats.maxPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}
