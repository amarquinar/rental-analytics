'use client';

import { Property } from '@/types/property';

interface ComparisonTableProps {
  properties: Property[];
  onRemove: (id: string) => void;
}

export function ComparisonTable({ properties, onRemove }: ComparisonTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (properties.length === 0) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-zinc-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-zinc-400">Selecciona propiedades para comparar</p>
        <p className="text-zinc-500 text-sm mt-1">Haz clic en el checkbox de las propiedades que quieras comparar</p>
      </div>
    );
  }

  const metrics = [
    { label: 'Precio', key: 'price', format: formatPrice, highlight: 'low' },
    { label: 'Alquiler/mes', key: 'monthlyRent', format: formatPrice, highlight: 'high' },
    { label: 'Rentabilidad', key: 'yield', format: (v: number) => `${v}%`, highlight: 'high' },
    { label: 'Superficie', key: 'sqMeters', format: (v: number) => `${v} m²`, highlight: 'high' },
    { label: 'Habitaciones', key: 'bedrooms', format: (v: number) => `${v}`, highlight: 'high' },
    { label: 'Baños', key: 'bathrooms', format: (v: number) => `${v}`, highlight: 'high' },
    { label: 'Barrio', key: 'neighborhood', format: (v: string) => v, highlight: null },
    { label: 'Fuente', key: 'source', format: (v: string) => v, highlight: null },
  ];

  // Find best values for highlighting
  const getBestValue = (key: string, type: 'high' | 'low' | null) => {
    if (type === null) return null;
    const values = properties.map(p => p[key as keyof Property] as number);
    return type === 'high' ? Math.max(...values) : Math.min(...values);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-lg font-semibold text-white">
          Comparando {properties.length} propiedades
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left p-4 text-zinc-400 font-medium text-sm sticky left-0 bg-zinc-900/90 min-w-[120px]">
                Métrica
              </th>
              {properties.map((property) => (
                <th key={property.id} className="p-4 min-w-[200px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-full h-24 rounded-lg overflow-hidden bg-zinc-800">
                      {property.imageUrl && (
                        <img
                          src={property.imageUrl}
                          alt={property.address}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <button
                        onClick={() => onRemove(property.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-white text-sm font-medium text-center line-clamp-2">
                      {property.address}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => {
              const bestValue = getBestValue(metric.key, metric.highlight as 'high' | 'low' | null);

              return (
                <tr key={metric.key} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="p-4 text-zinc-400 font-medium text-sm sticky left-0 bg-zinc-900/90">
                    {metric.label}
                  </td>
                  {properties.map((property) => {
                    const value = property[metric.key as keyof Property];
                    const isBest = bestValue !== null && value === bestValue;

                    return (
                      <td key={property.id} className="p-4 text-center">
                        <span
                          className={`
                            ${isBest ? 'text-lime font-semibold' : 'text-white'}
                          `}
                        >
                          {metric.format(value as never)}
                        </span>
                        {isBest && metric.highlight && (
                          <span className="ml-2 text-lime text-xs">★</span>
                        )}
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
