import { describe, expect, it } from "vitest";
import { createTestContainer } from "../../test/createTestContainer";
import DiscordWidget from "./DiscordWidget.astro";
import type { DiscordWidgetData } from "../../schemas/discordWidget";

const mockWidget: DiscordWidgetData = {
  id: "434487340535382016",
  name: "Web Dev & Design",
  instant_invite: "https://discord.com/invite/example",
  presence_count: 5348,
  channels: [
    { id: "1", name: "event-stage", position: 1 },
    { id: "2", name: "AFK", position: 7 },
  ],
  members: [
    {
      id: "1",
      username: "Yash",
      status: "online",
      avatar_url: "https://cdn.discordapp.com/widget-avatars/example/1",
      game: { name: "Visual Studio Code" },
    },
    {
      id: "2",
      username: "Battousai",
      status: "online",
      avatar_url: "https://cdn.discordapp.com/widget-avatars/example/2",
    },
  ],
};

describe("DiscordWidget", () => {
  it("renders live server stats and members from widget JSON", async () => {
    const container = await createTestContainer();
    const html = await container.renderToString(DiscordWidget, {
      props: {
        widget: mockWidget,
        inviteUrl: "https://discord.gg/example",
      },
    });

    expect(html).toContain("5,348 online");
    expect(html).toContain("Web Dev &amp; Design");
    expect(html).toContain("event-stage");
    expect(html).toContain("Yash");
    expect(html).toContain("Visual Studio Code");
    expect(html).toContain("Join Discord");
    expect(html).not.toContain("<iframe");
  });

  it("renders a fallback when widget data is unavailable", async () => {
    const container = await createTestContainer();
    const html = await container.renderToString(DiscordWidget, {
      props: {
        widget: null,
        inviteUrl: "https://discord.gg/example",
      },
    });

    expect(html).toContain("Couldn't load live server data");
    expect(html).toContain("https://discord.gg/example");
  });
});
