import { useMemo, useState } from "react";
import type { Resource, ResourceCategory } from "../../schemas/resource";
import { filterResources } from "../../lib/resources";

interface ResourceSearchProps {
  resources: Resource[];
}

const categories: Array<ResourceCategory | "all"> = [
  "all",
  "html",
  "css",
  "js",
  "design",
  "tools",
  "accessibility",
];

export default function ResourceSearch({ resources }: ResourceSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategory | "all">("all");

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
          className="border-border bg-surface-elevated text-ink placeholder:text-ink-muted focus:border-brand-500 focus:ring-brand-500/20 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:outline-none sm:max-w-sm"
        />
        <label className="sr-only" htmlFor="resource-category">
          Filter by category
        </label>
        <select
          id="resource-category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as ResourceCategory | "all")
          }
          className="border-border bg-surface-elevated text-ink focus:border-brand-500 focus:ring-brand-500/20 rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:outline-none"
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value === "all" ? "All categories" : value}
            </option>
          ))}
        </select>
      </div>

      <p className="text-ink-muted text-sm">
        {filtered.length} resource{filtered.length === 1 ? "" : "s"}
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {filtered.map((resource) => (
          <li key={resource.id}>
            <article className="border-border bg-surface-elevated h-full rounded-xl border p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-ink text-lg font-semibold">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-500"
                  >
                    {resource.title}
                  </a>
                </h3>
                {resource.featured && (
                  <span className="bg-admin/20 text-admin shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              {resource.description && (
                <p className="text-ink-muted mt-2 text-sm">
                  {resource.description}
                </p>
              )}
              <p className="text-brand-500 mt-3 text-xs font-medium tracking-wide uppercase">
                {resource.category}
              </p>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-ink-muted text-sm">
          No resources match your search.
        </p>
      )}
    </div>
  );
}
