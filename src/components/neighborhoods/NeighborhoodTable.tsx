'use client';

import { useState } from 'react';
import { NeighborhoodStats } from '@/lib/neighborhoodStats';

interface NeighborhoodTableProps {
  stats: NeighborhoodStats[];
}

type SortKey = 'name' | 'avgYield' | 'avgPrice' | 'avgRent' | 'propertyCount';

export function NeighborhoodTable({ stats }: NeighborhoodTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('avgYield');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder(key === 'name' ? 'asc' : 'desc');
    }
  };

  const sortedStats = [...stats].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE').format(price) + '€';
  };

  const SortIcon = ({ field }: { field: SortKey }) => {
    if (sortKey !== field) return <span className="ml-1.5 text-zinc-700">↕</span>;
    return <span className="ml-1.5 text-lime">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="border border-border-subtle rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-3 bg-surface/30 border-b border-border text-xs uppercase tracking-wider text-zinc-500 font-medium">
        <div className="col-span-2 cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => handleSort('name')}>
          Area <SortIcon field="name" />
        </div>
        <div className="text-right cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => handleSort('avgYield')}>
          Yield <SortIcon field="avgYield" />
        </div>
        <div className="text-right cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => handleSort('avgPrice')}>
          Avg Price <SortIcon field="avgPrice" />
        </div>
        <div className="text-right cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => handleSort('avgRent')}>
          Avg Rent <SortIcon field="avgRent" />
        </div>
        <div className="text-right cursor-pointer hover:text-zinc-300 transition-colors" onClick={() => handleSort('propertyCount')}>
          Count <SortIcon field="propertyCount" />
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-border-subtle">
        {sortedStats.map((stat, index) => (
          <div
            key={stat.name}
            className={`
              grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 px-4 py-4
              hover:bg-surface/30 transition-colors cursor-pointer
              ${index % 2 === 0 ? 'bg-transparent' : 'bg-surface/10'}
            `}
          >
            {/* Rank & Name */}
            <div className="col-span-2 flex items-center gap-3">
              <span className={`
                w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold
                ${index === 0 ? 'bg-lime text-black' : 'bg-zinc-800 text-zinc-500'}
              `}>
                {index + 1}
              </span>
              <span className="text-zinc-100 font-medium">{stat.name}</span>
            </div>

            {/* Mobile: Full row with all data */}
            <div className="md:hidden flex items-center justify-between text-sm mt-2 pt-2 border-t border-border-subtle/50">
              <div className="font-mono">
                <span className="text-zinc-500 text-xs mr-2">Yield:</span>
                <span className="text-lime font-semibold">{stat.avgYield}%</span>
              </div>
              <div className="font-mono">
                <span className="text-zinc-500 text-xs mr-2">Avg:</span>
                <span className="text-zinc-100">{formatPrice(stat.avgPrice)}</span>
              </div>
              <div className="font-mono">
                <span className="text-zinc-500 text-xs mr-2">Props:</span>
                <span className="text-zinc-400">{stat.propertyCount}</span>
              </div>
            </div>

            {/* Desktop: Individual columns */}
            <div className="hidden md:flex items-center justify-end font-mono">
              <span className={`text-lg font-bold ${index === 0 ? 'text-lime' : 'text-zinc-100'}`}>
                {stat.avgYield}%
              </span>
            </div>
            <div className="hidden md:flex items-center justify-end font-mono text-zinc-100">
              {formatPrice(stat.avgPrice)}
            </div>
            <div className="hidden md:flex items-center justify-end font-mono text-zinc-100">
              {formatPrice(stat.avgRent)}
            </div>
            <div className="hidden md:flex items-center justify-end font-mono text-zinc-500">
              {stat.propertyCount}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-surface/20 border-t border-border-subtle">
        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>Total: {sortedStats.length} areas</span>
          <span>Sorted by: {sortKey}</span>
        </div>
      </div>
    </div>
  );
}
