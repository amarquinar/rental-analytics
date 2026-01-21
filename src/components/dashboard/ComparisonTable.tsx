'use client';

import { Property } from '@/types/property';

interface ComparisonTableProps {
  properties: Property[];
  onRemove: (id: string) => void;
}

export function ComparisonTable({ properties, onRemove }: ComparisonTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE').format(price);
  };

  if (properties.length === 0) {
    return null;
  }

  // For 2 properties, use split-screen view
  if (properties.length === 2) {
    const [left, right] = properties;

    const metrics = [
      { label: 'PRICE', leftVal: `${formatPrice(left.price)}€`, rightVal: `${formatPrice(right.price)}€`, winner: left.price < right.price ? 'left' : right.price < left.price ? 'right' : 'tie' },
      { label: 'RENT/MO', leftVal: `${formatPrice(left.monthlyRent)}€`, rightVal: `${formatPrice(right.monthlyRent)}€`, winner: left.monthlyRent > right.monthlyRent ? 'left' : right.monthlyRent > left.monthlyRent ? 'right' : 'tie' },
      { label: 'YIELD', leftVal: `${left.yield}%`, rightVal: `${right.yield}%`, winner: left.yield > right.yield ? 'left' : right.yield > left.yield ? 'right' : 'tie', isPrimary: true },
      { label: 'SIZE', leftVal: `${left.sqMeters}m²`, rightVal: `${right.sqMeters}m²`, winner: left.sqMeters > right.sqMeters ? 'left' : right.sqMeters > left.sqMeters ? 'right' : 'tie' },
      { label: 'ROOMS', leftVal: `${left.bedrooms}bd/${left.bathrooms}ba`, rightVal: `${right.bedrooms}bd/${right.bathrooms}ba`, winner: 'tie' },
      { label: 'PRICE/M²', leftVal: `${formatPrice(Math.round(left.price / (left.sqMeters || 1)))}€`, rightVal: `${formatPrice(Math.round(right.price / (right.sqMeters || 1)))}€`, winner: (left.price / (left.sqMeters || 1)) < (right.price / (right.sqMeters || 1)) ? 'left' : (right.price / (right.sqMeters || 1)) < (left.price / (left.sqMeters || 1)) ? 'right' : 'tie' },
    ];

    return (
      <div className="bg-surface/30 rounded-xl overflow-hidden ring-1 ring-lime/30 shadow-glow">
        {/* Header */}
        <div className="px-4 py-3 border-b border-lime/20 bg-lime/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="text-lime text-xs uppercase tracking-widest font-medium">
              Head-to-Head Comparison
            </span>
          </div>
          <button
            onClick={() => {
              onRemove(left.id);
              onRemove(right.id);
            }}
            className="text-zinc-500 hover:text-zinc-300 text-xs"
          >
            Clear
          </button>
        </div>

        {/* Split View */}
        <div className="flex">
          {/* Left Property */}
          <div className="flex-1 p-6">
            {/* Property Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                {left.imageUrl ? (
                  <img src={left.imageUrl} alt={left.address} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-zinc-100 font-medium truncate">{left.address}</div>
                <div className="text-zinc-500 text-sm">{left.neighborhood}</div>
                <div className="text-zinc-600 text-xs mt-1">{left.source}</div>
              </div>
              <button
                onClick={() => onRemove(left.id)}
                className="p-1.5 hover:bg-zinc-800 rounded transition-colors"
              >
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              {metrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-zinc-500 text-xs uppercase tracking-wider">{m.label}</span>
                  <span className={`font-mono ${m.isPrimary ? 'text-2xl font-bold' : 'text-lg'} ${m.winner === 'left' ? 'text-lime' : 'text-zinc-100'}`}>
                    {m.leftVal}
                    {m.winner === 'left' && <span className="ml-1 text-lime text-xs">★</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DRAMATIC LIME DIVIDER */}
          <div className="relative w-1 bg-lime/80 flex-shrink-0">
            <div className="absolute inset-0 bg-lime blur-sm" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-lime rounded-full flex items-center justify-center shadow-glow">
              <span className="text-black font-bold text-xs">VS</span>
            </div>
          </div>

          {/* Right Property */}
          <div className="flex-1 p-6">
            {/* Property Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                {right.imageUrl ? (
                  <img src={right.imageUrl} alt={right.address} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-zinc-100 font-medium truncate">{right.address}</div>
                <div className="text-zinc-500 text-sm">{right.neighborhood}</div>
                <div className="text-zinc-600 text-xs mt-1">{right.source}</div>
              </div>
              <button
                onClick={() => onRemove(right.id)}
                className="p-1.5 hover:bg-zinc-800 rounded transition-colors"
              >
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              {metrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-zinc-500 text-xs uppercase tracking-wider">{m.label}</span>
                  <span className={`font-mono ${m.isPrimary ? 'text-2xl font-bold' : 'text-lg'} ${m.winner === 'right' ? 'text-lime' : 'text-zinc-100'}`}>
                    {m.rightVal}
                    {m.winner === 'right' && <span className="ml-1 text-lime text-xs">★</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For 3+ properties, use table view
  const metrics = [
    { label: 'Price', key: 'price', format: (v: number) => `${formatPrice(v)}€`, highlight: 'low' },
    { label: 'Rent/mo', key: 'monthlyRent', format: (v: number) => `${formatPrice(v)}€`, highlight: 'high' },
    { label: 'Yield', key: 'yield', format: (v: number) => `${v}%`, highlight: 'high' },
    { label: 'Size', key: 'sqMeters', format: (v: number) => `${v}m²`, highlight: 'high' },
    { label: 'Rooms', key: 'bedrooms', format: (v: number) => `${v}bd`, highlight: 'high' },
  ];

  const getBestValue = (key: string, type: 'high' | 'low' | null) => {
    if (type === null) return null;
    const values = properties.map(p => p[key as keyof Property] as number);
    return type === 'high' ? Math.max(...values) : Math.min(...values);
  };

  return (
    <div className="bg-surface/30 rounded-xl overflow-hidden ring-1 ring-lime/30 shadow-glow">
      <div className="px-4 py-3 border-b border-lime/20 bg-lime/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="text-lime text-xs uppercase tracking-widest font-medium">
            Comparing {properties.length} Properties
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left p-4 text-zinc-500 font-medium text-xs uppercase tracking-wider sticky left-0 bg-surface/50 backdrop-blur-sm">
                Metric
              </th>
              {properties.map((property) => (
                <th key={property.id} className="p-4 min-w-[180px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-full h-16 rounded-lg overflow-hidden bg-zinc-900">
                      {property.imageUrl && (
                        <img src={property.imageUrl} alt={property.address} className="w-full h-full object-cover" />
                      )}
                      <button
                        onClick={() => onRemove(property.id)}
                        className="absolute top-1 right-1 w-5 h-5 bg-zinc-900/90 hover:bg-red-500/80 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-zinc-100 text-sm font-medium text-center line-clamp-1">{property.address}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => {
              const bestValue = getBestValue(metric.key, metric.highlight as 'high' | 'low' | null);
              return (
                <tr key={metric.key} className="border-b border-border-subtle/30 hover:bg-surface/30">
                  <td className="p-4 text-zinc-500 font-medium text-xs uppercase tracking-wider sticky left-0 bg-surface/50 backdrop-blur-sm">
                    {metric.label}
                  </td>
                  {properties.map((property) => {
                    const value = property[metric.key as keyof Property] as number;
                    const isBest = bestValue !== null && value === bestValue;
                    return (
                      <td key={property.id} className="p-4 text-center font-mono">
                        <span className={isBest ? 'text-lime font-semibold' : 'text-zinc-100'}>
                          {metric.format(value)}
                          {isBest && <span className="ml-1 text-xs">★</span>}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
