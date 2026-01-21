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
    <div className="min-h-screen bg-background text-zinc-50">
      {/* Header */}
      <header className="border-b border-border-subtle sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center border border-border-subtle group-hover:border-border-hover transition-all duration-150">
              <span className="text-lime font-semibold text-sm">RA</span>
            </div>
            <span className="text-zinc-100 font-medium tracking-tight">Rental Analytics</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/dashboard" className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150">Dashboard</Link>
            <Link href="/neighborhoods" className="px-4 py-2 text-zinc-50 text-sm font-medium bg-surface rounded-lg">Barrios</Link>
            <Link href="/calculator" className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150">Calculadora</Link>
            <Link href="/admin" className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header with stats */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">Neighborhoods</h1>
            <p className="text-zinc-500 text-sm mt-1">
              {stats.length} areas · {mockProperties.length} total properties
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Key Metrics Row - Terminal Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-subtle rounded-lg overflow-hidden mb-8">
          <div className="bg-surface/40 p-5">
            <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Areas Tracked</div>
            <div className="font-mono text-3xl font-bold text-zinc-100">{stats.length}</div>
          </div>
          <div className="bg-surface/40 p-5">
            <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Properties</div>
            <div className="font-mono text-3xl font-bold text-zinc-100">{mockProperties.length}</div>
          </div>
          <div className="bg-surface/40 p-5">
            <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Best Yield</div>
            <div className="font-mono text-3xl font-bold text-lime">{stats[0]?.avgYield || 0}%</div>
            <div className="text-zinc-600 text-xs mt-1 font-mono">{stats[0]?.name}</div>
          </div>
          <div className="bg-surface/40 p-5">
            <div className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Avg Yield</div>
            <div className="font-mono text-3xl font-bold text-zinc-100">
              {(stats.reduce((sum, s) => sum + s.avgYield, 0) / stats.length).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Leaderboard - Top 3 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Leaderboard</span>
            <div className="flex-1 h-px bg-border-subtle" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topNeighborhoods.map((stat, index) => (
              <div
                key={stat.name}
                className={`
                  relative p-5 rounded-lg border
                  ${index === 0 ? 'bg-lime/5 border-lime/30' : 'bg-surface/30 border-border-subtle'}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm
                    ${index === 0 ? 'bg-lime text-black' : 'bg-zinc-800 text-zinc-400'}
                  `}>
                    {index + 1}
                  </div>
                  <div className="text-right font-mono">
                    <div className={`text-2xl font-bold ${index === 0 ? 'text-lime' : 'text-zinc-100'}`}>
                      {stat.avgYield}%
                    </div>
                    <div className="text-zinc-500 text-xs">yield</div>
                  </div>
                </div>
                <div className="text-zinc-100 font-medium">{stat.name}</div>
                <div className="text-zinc-500 text-sm mt-1">{stat.propertyCount} properties</div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border-subtle text-xs font-mono">
                  <span className="text-zinc-500">Avg: <span className="text-zinc-300">{new Intl.NumberFormat('de-DE').format(stat.avgPrice)}€</span></span>
                  <span className="text-zinc-500">Rent: <span className="text-zinc-300">{new Intl.NumberFormat('de-DE').format(stat.avgRent)}€</span></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Rankings Table */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">All Areas</span>
            <div className="flex-1 h-px bg-border-subtle" />
          </div>
          <NeighborhoodTable stats={stats} />
        </section>

        {/* Insights - Terminal style */}
        <section className="mt-8 p-5 bg-zinc-900/30 rounded-lg border border-border-subtle">
          <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="uppercase tracking-widest">Investment Notes</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-mono">
            <div className="text-zinc-400">
              <span className="text-lime">$</span> High yield = higher risk. Due diligence required.
            </div>
            <div className="text-zinc-400">
              <span className="text-lime">$</span> More listings = more reliable data.
            </div>
            <div className="text-zinc-400">
              <span className="text-lime">$</span> Factor in transit & development plans.
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-subtle mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          Rental Analytics — Data-driven investment decisions
        </div>
      </footer>
    </div>
  );
}
