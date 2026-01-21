import { Property } from '@/types/property';

export interface NeighborhoodStats {
  name: string;
  avgPrice: number;
  avgRent: number;
  avgYield: number;
  propertyCount: number;
  minPrice: number;
  maxPrice: number;
}

export function calculateNeighborhoodStats(properties: Property[]): NeighborhoodStats[] {
  const neighborhoodMap = new Map<string, Property[]>();

  // Group properties by neighborhood
  properties.forEach(property => {
    const existing = neighborhoodMap.get(property.neighborhood) || [];
    neighborhoodMap.set(property.neighborhood, [...existing, property]);
  });

  // Calculate stats for each neighborhood
  const stats: NeighborhoodStats[] = [];

  neighborhoodMap.forEach((props, name) => {
    const totalPrice = props.reduce((sum, p) => sum + p.price, 0);
    const totalRent = props.reduce((sum, p) => sum + p.monthlyRent, 0);
    const totalYield = props.reduce((sum, p) => sum + p.yield, 0);
    const prices = props.map(p => p.price);

    stats.push({
      name,
      avgPrice: Math.round(totalPrice / props.length),
      avgRent: Math.round(totalRent / props.length),
      avgYield: Number((totalYield / props.length).toFixed(2)),
      propertyCount: props.length,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    });
  });

  // Sort by average yield (descending)
  return stats.sort((a, b) => b.avgYield - a.avgYield);
}
