import { describe, expect, it } from "vitest";
import type { Resource } from "../schemas/resource";
import {
  filterByCategory,
  filterByQuery,
  filterResources,
  sortFeaturedFirst,
} from "./resources";

const resources: Resource[] = [
  {
    id: "css-tricks",
    title: "CSS Tricks",
    url: "https://css-tricks.com",
    description: "CSS articles",
    category: "css",
    tags: ["layout"],
    featured: true,
  },
  {
    id: "mdn-html",
    title: "MDN HTML",
    url: "https://developer.mozilla.org",
    description: "HTML reference",
    category: "html",
    tags: ["docs"],
    featured: false,
  },
];

describe("resources helpers", () => {
  it("sorts featured resources first", () => {
    const sorted = sortFeaturedFirst(resources);
    expect(sorted[0]?.id).toBe("css-tricks");
  });

  it("filters by category", () => {
    const filtered = filterByCategory(resources, "css");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("CSS Tricks");
  });

  it("filters by query", () => {
    const filtered = filterByQuery(resources, "html");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("MDN HTML");
  });

  it("combines category and query filters", () => {
    const filtered = filterResources(resources, "css", "css");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("CSS Tricks");
  });
});
