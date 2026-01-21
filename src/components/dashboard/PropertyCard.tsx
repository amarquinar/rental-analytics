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
        relative bg-zinc-900/50 border rounded-xl overflow-hidden transition-all duration-200
        ${isSelected ? 'border-lime ring-2 ring-lime/20' : 'border-zinc-800 hover:border-zinc-700'}
      `}
    >
      {/* Selection checkbox */}
      {onToggleSelect && (
        <button
          onClick={() => onToggleSelect(property.id)}
          className={`
            absolute top-3 right-3 z-10 w-6 h-6 rounded-md border-2 transition-all
            flex items-center justify-center
            ${isSelected
              ? 'bg-lime border-lime text-black'
              : 'bg-black/50 border-zinc-600 hover:border-zinc-400'
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
      <div className="relative h-40 bg-zinc-800">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.address}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        )}

        {/* Yield badge */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-lime text-black text-sm font-bold rounded-md">
          {property.yield}% yield
        </div>

        {/* Source badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-zinc-300 text-xs rounded-md">
          {property.source}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Address & Neighborhood */}
        <div>
          <h3 className="font-semibold text-white truncate">{property.address}</h3>
          <p className="text-sm text-zinc-400">{property.neighborhood}</p>
        </div>

        {/* Price & Rent */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-xl font-bold text-white">{formatPrice(property.price)}</span>
          </div>
          <div className="text-right">
            <span className="text-lime font-semibold">{formatPrice(property.monthlyRent)}</span>
            <span className="text-zinc-500 text-sm">/mes</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex gap-4 text-sm text-zinc-400 pt-2 border-t border-zinc-800">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.sqMeters} m²
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.bedrooms} hab
          </span>
          <span className="flex items-center gap-1">
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
