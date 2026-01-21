'use client';

import { Property } from '@/types/property';

interface PropertyRowProps {
  property: Property;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
  index: number;
}

export function PropertyRow({ property, isSelected, onToggleSelect, index }: PropertyRowProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE').format(price);
  };

  const formatRent = (rent: number) => {
    return new Intl.NumberFormat('de-DE').format(rent);
  };

  return (
    <div
      className={`
        group flex items-center gap-4 py-4 px-4 border-b border-border-subtle
        transition-all duration-100 cursor-pointer
        ${index % 2 === 0 ? 'bg-transparent' : 'bg-surface/20'}
        ${isSelected
          ? 'bg-lime/5 border-l-2 border-l-lime'
          : 'border-l-2 border-l-transparent hover:bg-surface/40'
        }
      `}
      onClick={() => onToggleSelect?.(property.id)}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0">
        <div
          className={`
            w-5 h-5 rounded border transition-all duration-100
            flex items-center justify-center
            ${isSelected
              ? 'bg-lime border-lime'
              : 'border-border-subtle group-hover:border-zinc-500'
            }
          `}
        >
          {isSelected && (
            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-zinc-900">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.address}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}
      </div>

      {/* Address & Neighborhood */}
      <div className="flex-1 min-w-0">
        <div className="text-zinc-100 font-medium truncate">{property.address}</div>
        <div className="text-zinc-500 text-sm">{property.neighborhood}</div>
      </div>

      {/* Details - monospace grid */}
      <div className="hidden md:grid grid-cols-5 gap-8 items-center font-mono text-sm">
        {/* Price */}
        <div className="text-right">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Price</div>
          <div className="text-zinc-100 text-base font-semibold">{formatPrice(property.price)}€</div>
        </div>

        {/* Rent */}
        <div className="text-right">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Rent/mo</div>
          <div className="text-zinc-100">{formatRent(property.monthlyRent)}€</div>
        </div>

        {/* Yield - THE KEY METRIC */}
        <div className="text-right">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Yield</div>
          <div className="text-lime text-xl font-bold">{property.yield}%</div>
        </div>

        {/* Size */}
        <div className="text-right">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Size</div>
          <div className="text-zinc-400">{property.sqMeters}m²</div>
        </div>

        {/* Rooms */}
        <div className="text-right">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Rooms</div>
          <div className="text-zinc-400">{property.bedrooms}bd/{property.bathrooms}ba</div>
        </div>
      </div>

      {/* Mobile: Yield only */}
      <div className="md:hidden text-right font-mono">
        <div className="text-lime text-lg font-bold">{property.yield}%</div>
        <div className="text-zinc-500 text-xs">{formatPrice(property.price)}€</div>
      </div>

      {/* Source tag */}
      <div className="hidden lg:block flex-shrink-0">
        <span className="px-2 py-1 bg-zinc-800/50 text-zinc-500 text-xs rounded font-mono">
          {property.source}
        </span>
      </div>
    </div>
  );
}
