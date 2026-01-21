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
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const SortIcon = ({ field }: { field: SortKey }) => {
    if (sortKey !== field) return null;
    return <span className="ml-1 text-lime">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  const thClass = 'px-6 py-4 text-left text-zinc-400 font-semibold text-sm cursor-pointer hover:text-lime transition-colors';

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-950 border-b border-zinc-800">
            <tr>
              <th className={thClass} onClick={() => handleSort('name')}>
                Neighborhood <SortIcon field="name" />
              </th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('avgYield')}>
                Avg Yield <SortIcon field="avgYield" />
              </th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('avgPrice')}>
                Avg Price <SortIcon field="avgPrice" />
              </th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('avgRent')}>
                Avg Rent <SortIcon field="avgRent" />
              </th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('propertyCount')}>
                Properties <SortIcon field="propertyCount" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {sortedStats.map((stat, index) => (
              <tr key={stat.name} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-sm w-6">#{index + 1}</span>
                    <span className="text-white font-medium">{stat.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lime font-bold">{stat.avgYield}%</span>
                </td>
                <td className="px-6 py-4 text-right text-white">
                  {formatPrice(stat.avgPrice)}
                </td>
                <td className="px-6 py-4 text-right text-white">
                  {formatPrice(stat.avgRent)}/mo
                </td>
                <td className="px-6 py-4 text-right text-zinc-300">
                  {stat.propertyCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
