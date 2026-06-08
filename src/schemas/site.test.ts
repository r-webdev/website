import { describe, expect, it } from 'vitest';
import { SiteSchema } from './site';

describe('SiteSchema', () => {
  it('accepts valid site data', () => {
    const result = SiteSchema.safeParse({
      name: 'Web Dev & Design',
      tagline: 'A community',
      description: 'Description',
      discordInviteUrl: 'https://discord.gg/example',
      socials: {
        github: 'https://github.com/example',
      },
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid discord URL', () => {
    const result = SiteSchema.safeParse({
      name: 'Web Dev & Design',
      tagline: 'A community',
      description: 'Description',
      discordInviteUrl: 'not-a-url',
      socials: {},
    });

    expect(result.success).toBe(false);
  });
});
