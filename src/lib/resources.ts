import type { Resource, ResourceCategory } from '../schemas/resource';

export function sortFeaturedFirst(resources: Resource[]): Resource[] {
  return [...resources].sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function filterByCategory(
  resources: Resource[],
  category: ResourceCategory | 'all',
): Resource[] {
  if (category === 'all') return resources;
  return resources.filter((resource) => resource.category === category);
}

export function filterByQuery(resources: Resource[], query: string): Resource[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return resources;

  return resources.filter((resource) => {
    const haystack = [
      resource.title,
      resource.description ?? '',
      resource.category,
      ...resource.tags,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export function filterResources(
  resources: Resource[],
  query: string,
  category: ResourceCategory | 'all',
): Resource[] {
  return filterByQuery(filterByCategory(resources, category), query);
}
