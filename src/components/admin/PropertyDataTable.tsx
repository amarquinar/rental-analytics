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
    return <span className="ml-1 text-lime">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  const thClass = 'px-4 py-3 text-left text-zinc-400 font-semibold text-sm cursor-pointer hover:text-lime transition-colors';

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-950 border-b border-zinc-800">
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
              <th className="px-4 py-3 text-zinc-400 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {sortedProperties.map((property) => (
              <tr key={property.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-4 py-3 text-white text-sm">{property.address}</td>
                <td className="px-4 py-3 text-zinc-300 text-sm">{property.neighborhood}</td>
                <td className="px-4 py-3 text-white text-sm text-right">€{property.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-white text-sm text-right">€{property.monthlyRent.toLocaleString()}</td>
                <td className="px-4 py-3 text-lime text-sm text-right font-semibold">{property.yield}%</td>
                <td className="px-4 py-3 text-zinc-300 text-sm">{property.source}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(property)} className="text-lime hover:text-lime-hover text-sm font-medium">
                      Edit
                    </button>
                    <button
                      onClick={() => { if (confirm('Delete this property?')) onDelete(property.id); }}
                      className="text-red-500 hover:text-red-400 text-sm font-medium"
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
        <div className="p-12 text-center text-zinc-400">No properties found.</div>
      )}
    </div>
  );
}
