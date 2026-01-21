'use client';

import { ScraperStats, DataSource } from '@/lib/scraper';

interface DataStatusProps {
  stats: ScraperStats;
  sources: DataSource[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function DataStatus({ stats, sources, onRefresh, isRefreshing }: DataStatusProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl p-6 ring-1 ring-border-subtle shadow-premium">
          <div className="text-zinc-500 text-sm mb-2">Total Properties</div>
          <div className="text-3xl font-semibold text-zinc-50">{stats.totalProperties}</div>
        </div>
        <div className="bg-surface rounded-xl p-6 ring-1 ring-border-subtle shadow-premium">
          <div className="text-zinc-500 text-sm mb-2">Active Sources</div>
          <div className="text-3xl font-semibold text-lime">{stats.activeSources}/{stats.totalSources}</div>
        </div>
        <div className="bg-surface rounded-xl p-6 ring-1 ring-border-subtle shadow-premium">
          <div className="text-zinc-500 text-sm mb-2">Last Updated</div>
          <div className="text-lg font-medium text-zinc-100">{formatDate(stats.lastUpdated)}</div>
        </div>
        <div className="bg-surface rounded-xl p-6 ring-1 ring-border-subtle shadow-premium flex items-center justify-center">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-6 py-2.5 bg-lime text-black font-semibold rounded-lg hover:bg-lime-hover transition-all duration-150 disabled:opacity-50"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh All'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-zinc-100 mb-5">Data Sources</h3>
        <div className="space-y-3">
          {sources.map((source) => (
            <div key={source.id} className="bg-surface rounded-xl p-5 ring-1 ring-border-subtle shadow-premium hover:ring-border-hover transition-all duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    source.status === 'success' ? 'bg-green-500' :
                    source.status === 'running' ? 'bg-yellow-500 animate-pulse' :
                    source.status === 'error' ? 'bg-red-500' : 'bg-zinc-600'
                  }`} />
                  <div>
                    <div className="text-zinc-100 font-medium">{source.name}</div>
                    <div className="text-zinc-500 text-sm">{source.url}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-zinc-100 font-medium">{source.propertyCount} properties</div>
                  {source.lastScraped && (
                    <div className="text-zinc-500 text-sm">Last: {formatDate(source.lastScraped)}</div>
                  )}
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  source.enabled ? 'bg-lime/10 text-lime ring-1 ring-lime/20' : 'bg-zinc-800 text-zinc-500'
                }`}>
                  {source.enabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
