import { describe, expect, it, vi } from 'vitest';
import {
  countMembersByStatus,
  fetchDiscordWidget,
  formatPresenceCount,
  sortMembersByStatus,
} from './discordWidget';
import type { DiscordWidgetMember } from '../schemas/discordWidget';

const mockMembers: DiscordWidgetMember[] = [
  {
    id: '1',
    username: 'idle-user',
    status: 'idle',
    avatar_url: 'https://cdn.discordapp.com/widget-avatars/example/1',
  },
  {
    id: '2',
    username: 'online-user',
    status: 'online',
    avatar_url: 'https://cdn.discordapp.com/widget-avatars/example/2',
    game: { name: 'Visual Studio Code' },
  },
];

describe('discordWidget', () => {
  it('sorts members with online first', () => {
    const sorted = sortMembersByStatus(mockMembers);

    expect(sorted[0]?.username).toBe('online-user');
    expect(sorted[1]?.username).toBe('idle-user');
  });

  it('counts members by status', () => {
    expect(countMembersByStatus(mockMembers)).toEqual({
      online: 1,
      idle: 1,
      dnd: 0,
      offline: 0,
    });
  });

  it('formats presence counts', () => {
    expect(formatPresenceCount(5348)).toBe('5,348');
  });

  it('parses widget JSON from the API', async () => {
    const mockWidget = {
      id: '434487340535382016',
      name: 'Web Dev & Design',
      instant_invite: 'https://discord.com/invite/example',
      presence_count: 100,
      channels: [{ id: '1', name: 'general', position: 0 }],
      members: mockMembers,
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockWidget,
      }),
    );

    const result = await fetchDiscordWidget('434487340535382016');

    expect(result?.name).toBe('Web Dev & Design');
    expect(result?.presence_count).toBe(100);

    vi.unstubAllGlobals();
  });

  it('returns null when the API response is invalid', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ invalid: true }),
      }),
    );

    await expect(fetchDiscordWidget('434487340535382016')).resolves.toBeNull();

    vi.unstubAllGlobals();
  });
});
