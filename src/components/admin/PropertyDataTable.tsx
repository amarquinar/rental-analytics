'use client';

import { Property } from '@/types/property';
import { useState } from 'react';

interface PropertyDataTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export function PropertyDataTable({ properties, onEdit, onDelete }: PropertyDataTableProps) {
  const [sortField, setSortField] = useState<keyof Property>('yield');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Property) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedProperties = [...properties].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const SortIcon = ({ field }: { field: keyof Property }) => {
    if (sortField !== field) return null;
    return <span className="ml-1.5 text-zinc-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  const thClass = 'px-5 py-4 text-left text-zinc-500 font-medium text-sm cursor-pointer hover:text-zinc-300 transition-colors duration-150';

  return (
    <div className="bg-surface rounded-xl overflow-hidden ring-1 ring-border-subtle shadow-premium">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-elevated border-b border-border-subtle">
            <tr>
              <th className={thClass} onClick={() => handleSort('address')}>
                Address <SortIcon field="address" />
              </th>
              <th className={thClass} onClick={() => handleSort('neighborhood')}>
                Neighborhood <SortIcon field="neighborhood" />
              </th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('price')}>
                Price <SortIcon field="price" />
              </th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('monthlyRent')}>
                Rent <SortIcon field="monthlyRent" />
              </th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('yield')}>
                Yield <SortIcon field="yield" />
              </th>
              <th className={thClass} onClick={() => handleSort('source')}>
                Source <SortIcon field="source" />
              </th>
              <th className="px-5 py-4 text-zinc-500 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {sortedProperties.map((property) => (
              <tr key={property.id} className="hover:bg-surface-hover transition-colors duration-150">
                <td className="px-5 py-4 text-zinc-100 text-sm">{property.address}</td>
                <td className="px-5 py-4 text-zinc-400 text-sm">{property.neighborhood}</td>
                <td className="px-5 py-4 text-zinc-100 text-sm text-right">€{property.price.toLocaleString()}</td>
                <td className="px-5 py-4 text-zinc-100 text-sm text-right">€{property.monthlyRent.toLocaleString()}</td>
                <td className="px-5 py-4 text-lime text-sm text-right font-medium">{property.yield}%</td>
                <td className="px-5 py-4 text-zinc-400 text-sm">{property.source}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <button onClick={() => onEdit(property)} className="text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors duration-150">
                      Edit
                    </button>
                    <button
                      onClick={() => { if (confirm('Delete this property?')) onDelete(property.id); }}
                      className="text-zinc-500 hover:text-red-400 text-sm font-medium transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {properties.length === 0 && (
        <div className="p-14 text-center text-zinc-500">No properties found.</div>
      )}
    </div>
  );
}
