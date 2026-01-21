'use client';

import { Property } from '@/types/property';
import { useMemo } from 'react';

interface StickySidebarProps {
  properties: Property[];
  selectedCount: number;
}

export function StickySidebar({ properties, selectedCount }: StickySidebarProps) {
  const stats = useMemo(() => {
    if (properties.length === 0) {
      return {
        avgYield: 0,
        avgPrice: 0,
        avgRent: 0,
        avgPricePerSqm: 0,
        topYield: null as Property | null,
        totalValue: 0,
      };
    }

    const avgYield = properties.reduce((sum, p) => sum + p.yield, 0) / properties.length;
    const avgPrice = properties.reduce((sum, p) => sum + p.price, 0) / properties.length;
    const avgRent = properties.reduce((sum, p) => sum + p.monthlyRent, 0) / properties.length;
    const totalSqm = properties.reduce((sum, p) => sum + (p.sqMeters || 0), 0);
    const totalPrice = properties.reduce((sum, p) => sum + p.price, 0);
    const avgPricePerSqm = totalSqm > 0 ? totalPrice / totalSqm : 0;
    const topYield = [...properties].sort((a, b) => b.yield - a.yield)[0];
    const totalValue = properties.reduce((sum, p) => sum + p.price, 0);

    return { avgYield, avgPrice, avgRent, avgPricePerSqm, topYield, totalValue };
  }, [properties]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(Math.round(num));
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
          Market Overview
        </h2>
        <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
      </div>

      {/* Key Stats */}
      <div className="space-y-4">
        {/* Average Yield - PRIMARY */}
        <div className="p-4 bg-surface/40 rounded-lg border border-border-subtle">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Avg. Yield</div>
          <div className="font-mono text-4xl font-bold text-lime">
            {stats.avgYield.toFixed(2)}%
          </div>
          <div className="text-zinc-600 text-xs mt-1">
            across {properties.length} properties
          </div>
        </div>

        {/* Price Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-surface/30 rounded-lg border border-border-subtle">
            <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Avg. Price</div>
            <div className="font-mono text-lg text-zinc-100">
              {formatNumber(stats.avgPrice)}€
            </div>
          </div>
          <div className="p-3 bg-surface/30 rounded-lg border border-border-subtle">
            <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Avg. Rent</div>
            <div className="font-mono text-lg text-zinc-100">
              {formatNumber(stats.avgRent)}€
            </div>
          </div>
        </div>

        {/* Price per sqm */}
        <div className="p-3 bg-surface/30 rounded-lg border border-border-subtle">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Price/m²</div>
          <div className="font-mono text-lg text-zinc-100">
            {formatNumber(stats.avgPricePerSqm)}€
          </div>
        </div>

        {/* Total Market Value */}
        <div className="p-3 bg-zinc-900/50 rounded-lg border border-border-subtle">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total Value</div>
          <div className="font-mono text-xl text-zinc-100">
            {formatNumber(stats.totalValue)}€
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Selection Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Selected</span>
          <span className={`font-mono ${selectedCount > 0 ? 'text-lime' : 'text-zinc-600'}`}>
            {selectedCount}
          </span>
        </div>
        {selectedCount >= 2 && (
          <div className="text-xs text-lime/80 bg-lime/10 px-3 py-2 rounded-lg border border-lime/20">
            Comparison ready
          </div>
        )}
      </div>

      {/* Top Performer */}
      {stats.topYield && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="space-y-2">
            <div className="text-zinc-500 text-xs uppercase tracking-wider">Top Performer</div>
            <div className="p-3 bg-lime/5 rounded-lg border border-lime/20">
              <div className="text-zinc-100 text-sm font-medium truncate">
                {stats.topYield.address}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-zinc-500 text-xs">{stats.topYield.neighborhood}</span>
                <span className="font-mono text-lime font-bold">
                  {stats.topYield.yield}%
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quick Actions */}
      <div className="space-y-2 pt-2">
        <button className="w-full px-4 py-2.5 bg-lime text-black font-semibold text-sm rounded-lg hover:bg-lime-hover transition-colors">
          Export Data
        </button>
        <button className="w-full px-4 py-2 bg-surface text-zinc-400 text-sm rounded-lg border border-border-subtle hover:border-border-hover hover:text-zinc-100 transition-all">
          Save Filter
        </button>
      </div>
    </div>
  );
}
