import { describe, expect, it } from "vitest";
import { createTestContainer } from "../../test/createTestContainer";
import DiscordCTA from "./DiscordCTA.astro";

describe("DiscordCTA", () => {
  it("renders join link with invite URL", async () => {
    const container = await createTestContainer();
    const html = await container.renderToString(DiscordCTA, {
      props: { href: "https://discord.gg/example" },
    });

    expect(html).toContain("Join Discord");
    expect(html).toContain("https://discord.gg/example");
  });
});
