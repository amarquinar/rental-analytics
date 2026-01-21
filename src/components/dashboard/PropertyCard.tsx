'use client';

import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

export function PropertyCard({ property, isSelected, onToggleSelect }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`
        relative bg-surface rounded-xl overflow-hidden transition-all duration-150 shadow-premium
        ${isSelected
          ? 'ring-1 ring-lime/40 shadow-glow'
          : 'ring-1 ring-border-subtle hover:ring-border-hover hover:bg-surface-hover'
        }
      `}
    >
      {/* Selection checkbox */}
      {onToggleSelect && (
        <button
          onClick={() => onToggleSelect(property.id)}
          className={`
            absolute top-3 right-3 z-10 w-6 h-6 rounded-md transition-all duration-150
            flex items-center justify-center
            ${isSelected
              ? 'bg-lime text-black'
              : 'bg-zinc-900/80 ring-1 ring-border hover:ring-border-hover'
            }
          `}
        >
          {isSelected && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      )}

      {/* Image */}
      <div className="relative h-40 bg-zinc-900">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.address}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}

        {/* Yield badge - key metric, lime allowed */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-lime text-black text-sm font-semibold rounded-md">
          {property.yield}% yield
        </div>

        {/* Source badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-zinc-900/90 text-zinc-400 text-xs rounded-md backdrop-blur-sm">
          {property.source}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Address & Neighborhood */}
        <div>
          <h3 className="font-medium text-zinc-50 truncate">{property.address}</h3>
          <p className="text-sm text-zinc-500 mt-0.5">{property.neighborhood}</p>
        </div>

        {/* Price & Rent */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-xl font-semibold text-zinc-50">{formatPrice(property.price)}</span>
          </div>
          <div className="text-right">
            <span className="text-zinc-100 font-medium">{formatPrice(property.monthlyRent)}</span>
            <span className="text-zinc-500 text-sm">/mes</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex gap-4 text-sm text-zinc-500 pt-3 border-t border-border-subtle">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.sqMeters} m²
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.bedrooms} hab
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {property.bathrooms} baño{property.bathrooms > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
