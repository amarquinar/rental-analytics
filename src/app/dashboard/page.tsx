'use client';

import { useState, useMemo } from 'react';
import { Property, FilterOptions, SortField, SortOrder } from '@/types/property';
import { mockProperties } from '@/data/mockProperties';
import { PropertyRow } from '@/components/dashboard/PropertyRow';
import { StickySidebar } from '@/components/dashboard/StickySidebar';
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
            <Link
              href="/dashboard"
              className="px-4 py-2 text-zinc-50 text-sm font-medium bg-surface rounded-lg"
            >
              Dashboard
            </Link>
            <Link
              href="/neighborhoods"
              className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150"
            >
              Barrios
            </Link>
            <Link
              href="/calculator"
              className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150"
            >
              Calculadora
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content - Two column layout */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left: Data Table */}
          <div className="flex-1 min-w-0">
            {/* Header with title and count */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">Properties</h1>
                <p className="text-zinc-500 text-sm mt-1">
                  {filteredProperties.length} listings · Click to select for comparison
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                LIVE
              </div>
            </div>

            {/* Filter bar - compact */}
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              sortField={sortField}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              resultCount={filteredProperties.length}
            />

            {/* Comparison section (if any selected) */}
            {selectedIds.size >= 2 && (
              <section className="mt-6">
                <ComparisonTable
                  properties={selectedProperties}
                  onRemove={handleRemoveFromComparison}
                />
              </section>
            )}

            {/* Table Header */}
            <div className="hidden md:flex items-center gap-4 py-3 px-4 mt-6 border-b border-border text-xs uppercase tracking-wider text-zinc-500 font-medium">
              <div className="w-5" /> {/* Checkbox */}
              <div className="w-14" /> {/* Thumbnail */}
              <div className="flex-1">Property</div>
              <div className="grid grid-cols-5 gap-8 text-right font-mono" style={{ width: '500px' }}>
                <div>Price</div>
                <div>Rent</div>
                <div>Yield</div>
                <div>Size</div>
                <div>Rooms</div>
              </div>
              <div className="w-16" /> {/* Source */}
            </div>

            {/* Property Rows */}
            <div className="border-x border-border-subtle">
              {filteredProperties.length === 0 ? (
                <div className="text-center py-16 border-b border-border-subtle">
                  <div className="text-zinc-600 font-mono text-sm mb-2">NO_RESULTS</div>
                  <p className="text-zinc-500 text-sm">Adjust filters to see properties</p>
                </div>
              ) : (
                filteredProperties.map((property, index) => (
                  <PropertyRow
                    key={property.id}
                    property={property}
                    index={index}
                    isSelected={selectedIds.has(property.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                ))
              )}
            </div>

            {/* Bottom border with count */}
            <div className="border border-t-0 border-border-subtle rounded-b-lg px-4 py-3 bg-surface/20">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Showing {filteredProperties.length} of {mockProperties.length}</span>
                <span>{selectedIds.size} selected</span>
              </div>
            </div>
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="hidden xl:block w-72 flex-shrink-0">
            <StickySidebar
              properties={filteredProperties}
              selectedCount={selectedIds.size}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          Rental Analytics — Data-driven investment decisions
        </div>
      </footer>
    </div>
  );
}
