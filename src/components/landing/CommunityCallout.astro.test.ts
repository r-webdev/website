import { createTestContainer } from "@test/createTestContainer";
import { describe, expect, it } from "vitest";
import CommunityCallout from "./CommunityCallout.astro";

describe("CommunityCallout", () => {
  it("clarifies the server is not a job board", async () => {
    const container = await createTestContainer();
    const html = await container.renderToString(CommunityCallout, {
      props: {},
    });

    expect(html).toContain("Not a job board");
    expect(html).toContain("not a place for hiring");
    expect(html).toContain("/code-of-conduct");
  });
});
