'use client';

import { Property } from '@/types/property';
import { useState, FormEvent } from 'react';

interface AddPropertyFormProps {
  onAdd: (property: Omit<Property, 'id' | 'yield' | 'createdAt'>) => void;
  editingProperty?: Property | null;
  onCancelEdit?: () => void;
}

export function AddPropertyForm({ onAdd, editingProperty, onCancelEdit }: AddPropertyFormProps) {
  const [formData, setFormData] = useState({
    address: editingProperty?.address || '',
    neighborhood: editingProperty?.neighborhood || '',
    price: editingProperty?.price || 0,
    monthlyRent: editingProperty?.monthlyRent || 0,
    sqMeters: editingProperty?.sqMeters || 0,
    bedrooms: editingProperty?.bedrooms || 0,
    bathrooms: editingProperty?.bathrooms || 0,
    source: editingProperty?.source || 'Manual',
    imageUrl: editingProperty?.imageUrl || '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      address: '', neighborhood: '', price: 0, monthlyRent: 0,
      sqMeters: 0, bedrooms: 0, bathrooms: 0, source: 'Manual', imageUrl: '',
    });
    if (onCancelEdit) onCancelEdit();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = 'w-full px-4 py-3 bg-zinc-900/50 ring-1 ring-border-subtle rounded-lg text-zinc-100 focus:ring-border-hover focus:outline-none placeholder:text-zinc-600 transition-all duration-150';
  const labelClass = 'block text-zinc-500 text-sm font-medium mb-2';

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-xl p-7 ring-1 ring-border-subtle shadow-premium space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-zinc-50">
          {editingProperty ? 'Edit Property' : 'Add New Property'}
        </h3>
        {editingProperty && onCancelEdit && (
          <button type="button" onClick={onCancelEdit} className="text-zinc-500 hover:text-zinc-100 text-sm transition-colors duration-150">
            Cancel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Address *</label>
          <input type="text" required value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={inputClass} placeholder="Carrer de Mallorca 245" />
        </div>

        <div>
          <label className={labelClass}>Neighborhood *</label>
          <input type="text" required value={formData.neighborhood}
            onChange={(e) => handleChange('neighborhood', e.target.value)}
            className={inputClass} placeholder="Eixample" />
        </div>

        <div>
          <label className={labelClass}>Source</label>
          <input type="text" value={formData.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className={inputClass} placeholder="Idealista" />
        </div>

        <div>
          <label className={labelClass}>Price (€) *</label>
          <input type="number" required min="0" value={formData.price || ''}
            onChange={(e) => handleChange('price', Number(e.target.value))}
            className={inputClass} placeholder="320000" />
        </div>

        <div>
          <label className={labelClass}>Monthly Rent (€) *</label>
          <input type="number" required min="0" value={formData.monthlyRent || ''}
            onChange={(e) => handleChange('monthlyRent', Number(e.target.value))}
            className={inputClass} placeholder="1400" />
        </div>

        <div>
          <label className={labelClass}>Square Meters</label>
          <input type="number" min="0" value={formData.sqMeters || ''}
            onChange={(e) => handleChange('sqMeters', Number(e.target.value))}
            className={inputClass} placeholder="85" />
        </div>

        <div>
          <label className={labelClass}>Bedrooms</label>
          <input type="number" min="0" value={formData.bedrooms || ''}
            onChange={(e) => handleChange('bedrooms', Number(e.target.value))}
            className={inputClass} placeholder="3" />
        </div>

        <div>
          <label className={labelClass}>Bathrooms</label>
          <input type="number" min="0" value={formData.bathrooms || ''}
            onChange={(e) => handleChange('bathrooms', Number(e.target.value))}
            className={inputClass} placeholder="2" />
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input type="url" value={formData.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            className={inputClass} placeholder="https://..." />
        </div>
      </div>

      <button type="submit" className="w-full px-6 py-3 bg-lime text-black font-semibold rounded-lg hover:bg-lime-hover transition-all duration-150 shadow-glow">
        {editingProperty ? 'Update Property' : 'Add Property'}
      </button>
    </form>
  );
}
