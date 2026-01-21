'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { mockProperties } from '@/data/mockProperties';
import { calculateNeighborhoodStats } from '@/lib/neighborhoodStats';
import { NeighborhoodCard, NeighborhoodTable } from '@/components/neighborhoods';

export default function NeighborhoodsPage() {
  const stats = useMemo(() => calculateNeighborhoodStats(mockProperties), []);

  // Get top 3 for cards
  const topNeighborhoods = stats.slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-sm">RA</span>
            </div>
            <span className="text-white font-medium">Rental Analytics</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/neighborhoods" className="text-lime font-medium">Barrios</Link>
            <Link href="/calculator" className="text-zinc-400 hover:text-white transition-colors">Calculadora</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-bold text-white">Neighborhood Analytics</h1>
          <p className="text-zinc-400 mt-1">
            Compare rental yields and investment potential across Barcelona neighborhoods
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="text-zinc-400 text-sm mb-1">Total Neighborhoods</div>
            <div className="text-3xl font-bold text-white">{stats.length}</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="text-zinc-400 text-sm mb-1">Total Properties</div>
            <div className="text-3xl font-bold text-white">{mockProperties.length}</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="text-zinc-400 text-sm mb-1">Highest Yield</div>
            <div className="text-3xl font-bold text-lime">{stats[0]?.avgYield || 0}%</div>
            <div className="text-zinc-500 text-sm">{stats[0]?.name}</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="text-zinc-400 text-sm mb-1">Avg Yield (All)</div>
            <div className="text-3xl font-bold text-white">
              {(stats.reduce((sum, s) => sum + s.avgYield, 0) / stats.length).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Top neighborhoods cards */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Top Investment Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topNeighborhoods.map((stat, index) => (
              <NeighborhoodCard key={stat.name} stats={stat} rank={index + 1} />
            ))}
          </div>
        </section>

        {/* Full table */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">All Neighborhoods</h2>
          <NeighborhoodTable stats={stats} />
        </section>

        {/* Investment tips */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Neighborhood Investment Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-lime font-medium mb-2">High Yield Areas</div>
              <p className="text-zinc-400">
                Higher yields often come with higher risk. Research the area carefully before investing.
              </p>
            </div>
            <div>
              <div className="text-lime font-medium mb-2">Property Count</div>
              <p className="text-zinc-400">
                More properties = more data reliability. Be cautious with stats from areas with few listings.
              </p>
            </div>
            <div>
              <div className="text-lime font-medium mb-2">Growth Potential</div>
              <p className="text-zinc-400">
                Consider future development plans and transit improvements when evaluating neighborhoods.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
          Rental Analytics - Data-driven investment decisions
        </div>
      </footer>
    </div>
  );
}
