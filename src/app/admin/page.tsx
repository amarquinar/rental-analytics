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
            <Link href="/dashboard" className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150">Dashboard</Link>
            <Link href="/neighborhoods" className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150">Barrios</Link>
            <Link href="/calculator" className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150">Calculadora</Link>
            <Link href="/admin" className="px-4 py-2 text-zinc-50 text-sm font-medium bg-surface rounded-lg">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold text-zinc-50 tracking-tight">Data Management</h1>
          <p className="text-zinc-400">Manage properties and data sources</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border-subtle">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-3 font-medium text-sm transition-colors duration-150 ${
              activeTab === 'all' ? 'text-zinc-50 border-b-2 border-zinc-50' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            All Properties ({properties.length})
          </button>
          <button
            onClick={() => { setActiveTab('add'); setEditingProperty(null); }}
            className={`px-5 py-3 font-medium text-sm transition-colors duration-150 ${
              activeTab === 'add' ? 'text-zinc-50 border-b-2 border-zinc-50' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {editingProperty ? 'Edit Property' : 'Add New'}
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-5 py-3 font-medium text-sm transition-colors duration-150 ${
              activeTab === 'sources' ? 'text-zinc-50 border-b-2 border-zinc-50' : 'text-zinc-500 hover:text-zinc-300'
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

      <footer className="border-t border-border-subtle mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          Rental Analytics — Data-driven investment decisions
        </div>
      </footer>
    </div>
  );
}
