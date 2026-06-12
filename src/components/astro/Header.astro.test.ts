import { describe, expect, it } from "vitest";
import { createTestContainer } from "../../test/createTestContainer";
import Header from "./Header.astro";

describe("Header", () => {
  it("renders logo lockup, site name, and navigation links", async () => {
    const container = await createTestContainer();
    const html = await container.renderToString(Header, {
      props: {
        siteName: "Web Dev & Design",
        discordUrl: "https://discord.gg/example",
      },
    });

    expect(html).toContain("/logo.png");
    expect(html).toContain("pride-border");
    expect(html).toContain("Web Dev &amp; Design");
    expect(html).toContain("Learning");
    expect(html).toContain("Code of Conduct");
    expect(html).toContain("Join Discord");
  });
});
