'use client';

import { FilterOptions, SortField, SortOrder } from '@/types/property';
import { neighborhoods } from '@/data/mockProperties';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
  resultCount: number;
}

export function FilterBar({
  filters,
  onFiltersChange,
  sortField,
  sortOrder,
  onSortChange,
  resultCount,
}: FilterBarProps) {
  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      neighborhood: e.target.value || null,
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    onFiltersChange({ ...filters, minPrice: value });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    onFiltersChange({ ...filters, maxPrice: value });
  };

  const handleMinYieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    onFiltersChange({ ...filters, minYield: value });
  };

  const handleMinBedroomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    onFiltersChange({ ...filters, minBedrooms: value });
  };

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortField, sortOrder);
  };

  const toggleSortOrder = () => {
    onSortChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    onFiltersChange({
      neighborhood: null,
      minPrice: null,
      maxPrice: null,
      minYield: null,
      minBedrooms: null,
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== null);

  const selectClass = "bg-zinc-900/50 ring-1 ring-border-subtle rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:ring-border-hover transition-all duration-150";
  const inputClass = "bg-zinc-900/50 ring-1 ring-border-subtle rounded-lg px-3 py-2 text-zinc-100 text-sm focus:outline-none focus:ring-border-hover placeholder:text-zinc-600 transition-all duration-150";

  return (
    <div className="bg-surface rounded-xl p-5 ring-1 ring-border-subtle shadow-premium space-y-4">
      {/* Top row: Sort and Results */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 text-sm">Ordenar por:</span>
          <select
            value={sortField}
            onChange={handleSortFieldChange}
            className={selectClass}
          >
            <option value="yield">Rentabilidad</option>
            <option value="price">Precio</option>
            <option value="monthlyRent">Alquiler mensual</option>
            <option value="sqMeters">Metros cuadrados</option>
            <option value="bedrooms">Habitaciones</option>
          </select>
          <button
            onClick={toggleSortOrder}
            className="p-2 bg-zinc-900/50 ring-1 ring-border-subtle rounded-lg hover:ring-border-hover hover:bg-surface-hover transition-all duration-150"
            title={sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
          >
            {sortOrder === 'desc' ? (
              <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-sm">
            <span className="text-zinc-100 font-medium">{resultCount}</span> propiedades
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-zinc-500 hover:text-zinc-100 transition-colors duration-150"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-3">
        {/* Neighborhood */}
        <select
          value={filters.neighborhood || ''}
          onChange={handleNeighborhoodChange}
          className={selectClass}
        >
          <option value="">Todos los barrios</option>
          {neighborhoods.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        {/* Min Price */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Precio mín"
            value={filters.minPrice || ''}
            onChange={handleMinPriceChange}
            className={`w-28 ${inputClass}`}
          />
          <span className="text-zinc-600">—</span>
          <input
            type="number"
            placeholder="Precio máx"
            value={filters.maxPrice || ''}
            onChange={handleMaxPriceChange}
            className={`w-28 ${inputClass}`}
          />
        </div>

        {/* Min Yield */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.1"
            placeholder="Rent. mín %"
            value={filters.minYield || ''}
            onChange={handleMinYieldChange}
            className={`w-28 ${inputClass}`}
          />
        </div>

        {/* Min Bedrooms */}
        <select
          value={filters.minBedrooms || ''}
          onChange={handleMinBedroomsChange}
          className={selectClass}
        >
          <option value="">Habitaciones</option>
          <option value="1">1+ hab</option>
          <option value="2">2+ hab</option>
          <option value="3">3+ hab</option>
          <option value="4">4+ hab</option>
        </select>
      </div>
    </div>
  );
}
