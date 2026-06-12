import { describe, expect, it } from "vitest";
import { createTestContainer } from "../../test/createTestContainer";
import Hero from "./Hero.astro";

describe("Hero", () => {
  it("renders tagline, logo, and member count", async () => {
    const container = await createTestContainer();
    const html = await container.renderToString(Hero, {
      props: {
        name: "Web Dev & Design",
        tagline: "A place to learn, help, and belong",
        description: "Community description",
        discordUrl: "https://discord.gg/example",
        memberCount: "1,000+",
      },
    });

    expect(html).toContain("Welcome to");
    expect(html).toContain("Web Dev &amp; Design");
    expect(html).toContain("A place to learn, help, and belong");
    expect(html).toContain("1,000+ members and growing");
    expect(html).toContain("Browse resources");
    expect(html).toContain("/logo.png");
    expect(html).toContain("bg-mod");
    expect(html).toContain("from-surface-elevated");
  });
});
