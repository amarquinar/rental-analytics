import { Property } from '@/types/property';

export type ScraperStatus = 'idle' | 'running' | 'success' | 'error';

export interface DataSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  lastScraped?: string;
  propertyCount: number;
  status: ScraperStatus;
  errorMessage?: string;
}

export interface ScraperStats {
  totalProperties: number;
  lastUpdated: string;
  activeSources: number;
  totalSources: number;
}

export const mockDataSources: DataSource[] = [
  {
    id: 'idealista',
    name: 'Idealista',
    url: 'https://www.idealista.com',
    enabled: true,
    lastScraped: '2026-01-21T10:30:00Z',
    propertyCount: 6,
    status: 'success',
  },
  {
    id: 'fotocasa',
    name: 'Fotocasa',
    url: 'https://www.fotocasa.es',
    enabled: true,
    lastScraped: '2026-01-21T10:25:00Z',
    propertyCount: 5,
    status: 'success',
  },
  {
    id: 'habitaclia',
    name: 'Habitaclia',
    url: 'https://www.habitaclia.com',
    enabled: true,
    lastScraped: '2026-01-21T10:20:00Z',
    propertyCount: 4,
    status: 'success',
  },
];

const calcYield = (rent: number, price: number): number => {
  return Number(((rent * 12) / price * 100).toFixed(2));
};

export class ScraperService {
  private properties: Property[] = [];
  private sources: DataSource[] = mockDataSources;

  constructor(initialProperties: Property[] = []) {
    this.properties = [...initialProperties];
  }

  getProperties(): Property[] {
    return this.properties;
  }

  addProperty(property: Omit<Property, 'id' | 'yield' | 'createdAt'>): Property {
    const newProperty: Property = {
      ...property,
      id: Math.random().toString(36).substr(2, 9),
      yield: calcYield(property.monthlyRent, property.price),
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.properties.push(newProperty);
    return newProperty;
  }

  updateProperty(id: string, updates: Partial<Omit<Property, 'id' | 'yield' | 'createdAt'>>): Property | null {
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updated = { ...this.properties[index], ...updates };
    if (updates.price !== undefined || updates.monthlyRent !== undefined) {
      updated.yield = calcYield(updated.monthlyRent, updated.price);
    }
    this.properties[index] = updated;
    return updated;
  }

  deleteProperty(id: string): boolean {
    const initialLength = this.properties.length;
    this.properties = this.properties.filter(p => p.id !== id);
    return this.properties.length < initialLength;
  }

  getStats(): ScraperStats {
    const activeSources = this.sources.filter(s => s.enabled).length;
    return {
      totalProperties: this.properties.length,
      lastUpdated: new Date().toISOString(),
      activeSources,
      totalSources: this.sources.length,
    };
  }

  getSources(): DataSource[] {
    return this.sources;
  }

  async scrapeAll(): Promise<{ success: boolean; totalAdded: number }> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, totalAdded: 0 };
  }
}
