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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-zinc-400 text-sm mb-1">Total Properties</div>
          <div className="text-3xl font-bold text-white">{stats.totalProperties}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-zinc-400 text-sm mb-1">Active Sources</div>
          <div className="text-3xl font-bold text-lime">{stats.activeSources}/{stats.totalSources}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-zinc-400 text-sm mb-1">Last Updated</div>
          <div className="text-lg font-semibold text-white">{formatDate(stats.lastUpdated)}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex items-center justify-center">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-6 py-2 bg-lime text-black font-semibold rounded-lg hover:bg-lime-hover transition-colors disabled:opacity-50"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh All'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Data Sources</h3>
        <div className="space-y-3">
          {sources.map((source) => (
            <div key={source.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    source.status === 'success' ? 'bg-green-500' :
                    source.status === 'running' ? 'bg-yellow-500 animate-pulse' :
                    source.status === 'error' ? 'bg-red-500' : 'bg-zinc-600'
                  }`} />
                  <div>
                    <div className="text-white font-semibold">{source.name}</div>
                    <div className="text-zinc-400 text-sm">{source.url}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{source.propertyCount} properties</div>
                  {source.lastScraped && (
                    <div className="text-zinc-400 text-sm">Last: {formatDate(source.lastScraped)}</div>
                  )}
                </div>
                <div className={`px-3 py-1 rounded text-sm font-medium ${
                  source.enabled ? 'bg-lime/20 text-lime' : 'bg-zinc-700 text-zinc-400'
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
