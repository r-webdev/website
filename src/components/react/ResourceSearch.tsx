import { useMemo, useState } from 'react';
import type { Resource, ResourceCategory } from '../../schemas/resource';
import { filterResources } from '../../lib/resources';

interface ResourceSearchProps {
  resources: Resource[];
}

const categories: Array<ResourceCategory | 'all'> = [
  'all',
  'html',
  'css',
  'js',
  'design',
  'tools',
  'accessibility',
];

export default function ResourceSearch({ resources }: ResourceSearchProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ResourceCategory | 'all'>('all');

  const filtered = useMemo(
    () => filterResources(resources, query, category),
    [resources, query, category],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="resource-search">
          Search resources
        </label>
        <input
          id="resource-search"
          type="search"
          role="searchbox"
          placeholder="Search resources..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:max-w-sm"
        />
        <label className="sr-only" htmlFor="resource-category">
          Filter by category
        </label>
        <select
          id="resource-category"
          value={category}
          onChange={(event) => setCategory(event.target.value as ResourceCategory | 'all')}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value === 'all' ? 'All categories' : value}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-ink-muted">
        {filtered.length} resource{filtered.length === 1 ? '' : 's'}
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {filtered.map((resource) => (
          <li key={resource.id}>
            <article className="h-full rounded-xl border border-slate-200 bg-surface-elevated p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-600"
                  >
                    {resource.title}
                  </a>
                </h3>
                {resource.featured && (
                  <span className="shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700">
                    Featured
                  </span>
                )}
              </div>
              {resource.description && (
                <p className="mt-2 text-sm text-ink-muted">{resource.description}</p>
              )}
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-brand-600">
                {resource.category}
              </p>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-sm text-ink-muted">No resources match your search.</p>
      )}
    </div>
  );
}
