'use client';

import { useState, useMemo } from 'react';
import { Property, FilterOptions, SortField, SortOrder } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';
import { PropertyCard } from '@/components/dashboard/PropertyCard';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { ComparisonTable } from '@/components/dashboard/ComparisonTable';
import Link from 'next/link';

export default function DashboardPage() {
  // State for filters and sorting
  const [filters, setFilters] = useState<FilterOptions>({
    neighborhood: null,
    minPrice: null,
    maxPrice: null,
    minYield: null,
    minBedrooms: null,
  });
  const [sortField, setSortField] = useState<SortField>('yield');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // State for selected properties (comparison)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...mockProperties];

    // Apply filters
    if (filters.neighborhood) {
      result = result.filter(p => p.neighborhood === filters.neighborhood);
    }
    if (filters.minPrice !== null) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== null) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.minYield !== null) {
      result = result.filter(p => p.yield >= filters.minYield!);
    }
    if (filters.minBedrooms !== null) {
      result = result.filter(p => p.bedrooms >= filters.minBedrooms!);
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const modifier = sortOrder === 'asc' ? 1 : -1;
      return (aVal - bVal) * modifier;
    });

    return result;
  }, [filters, sortField, sortOrder]);

  // Get selected properties for comparison
  const selectedProperties = useMemo(() => {
    return mockProperties.filter(p => selectedIds.has(p.id));
  }, [selectedIds]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleRemoveFromComparison = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

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
            <Link
              href="/dashboard"
              className="text-lime font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Barrios
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Calculadora
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-bold text-white">Property Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Compara propiedades y encuentra las mejores oportunidades de inversión
          </p>
        </div>

        {/* Comparison section (if any selected) */}
        {selectedIds.size > 0 && (
          <section>
            <ComparisonTable
              properties={selectedProperties}
              onRemove={handleRemoveFromComparison}
            />
          </section>
        )}

        {/* Filter bar */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          resultCount={filteredProperties.length}
        />

        {/* Properties grid */}
        <section>
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-zinc-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-zinc-400 text-lg">No se encontraron propiedades</p>
              <p className="text-zinc-500 mt-1">Intenta ajustar los filtros</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSelected={selectedIds.has(property.id)}
                  onToggleSelect={handleToggleSelect}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
          Rental Analytics - Data-driven investment decisions
        </div>
      </footer>
    </div>
  );
}
