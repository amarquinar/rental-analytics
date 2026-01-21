'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { ScraperService } from '@/lib/scraper';
import { mockProperties } from '@/data/mockProperties';
import { DataStatus, PropertyDataTable, AddPropertyForm } from '@/components/admin';

type Tab = 'all' | 'add' | 'sources';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [scraper] = useState(() => new ScraperService(mockProperties));
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setProperties(scraper.getProperties());
  }, [scraper]);

  const handleAddProperty = (propertyData: Omit<Property, 'id' | 'yield' | 'createdAt'>) => {
    if (editingProperty) {
      scraper.updateProperty(editingProperty.id, propertyData);
      setEditingProperty(null);
    } else {
      scraper.addProperty(propertyData);
    }
    setProperties(scraper.getProperties());
    setActiveTab('all');
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setActiveTab('add');
  };

  const handleDeleteProperty = (id: string) => {
    scraper.deleteProperty(id);
    setProperties(scraper.getProperties());
  };

  const handleCancelEdit = () => {
    setEditingProperty(null);
    setActiveTab('all');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await scraper.scrapeAll();
    setProperties(scraper.getProperties());
    setIsRefreshing(false);
  };

  const stats = scraper.getStats();
  const sources = scraper.getSources();

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
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/neighborhoods" className="text-zinc-400 hover:text-white transition-colors">Barrios</Link>
            <Link href="/calculator" className="text-zinc-400 hover:text-white transition-colors">Calculadora</Link>
            <Link href="/admin" className="text-lime font-medium">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Data Management</h1>
          <p className="text-zinc-400 mt-1">Manage properties and data sources</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'all' ? 'text-lime border-b-2 border-lime' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Properties ({properties.length})
          </button>
          <button
            onClick={() => { setActiveTab('add'); setEditingProperty(null); }}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'add' ? 'text-lime border-b-2 border-lime' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {editingProperty ? 'Edit Property' : 'Add New'}
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'sources' ? 'text-lime border-b-2 border-lime' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Data Sources
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'all' && (
          <PropertyDataTable properties={properties} onEdit={handleEditProperty} onDelete={handleDeleteProperty} />
        )}
        {activeTab === 'add' && (
          <AddPropertyForm onAdd={handleAddProperty} editingProperty={editingProperty} onCancelEdit={handleCancelEdit} />
        )}
        {activeTab === 'sources' && (
          <DataStatus stats={stats} sources={sources} onRefresh={handleRefresh} isRefreshing={isRefreshing} />
        )}
      </main>

      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
          Rental Analytics - Data-driven investment decisions
        </div>
      </footer>
    </div>
  );
}
