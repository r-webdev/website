import { describe, expect, it } from 'vitest';
import { getEnv, getSiteConfig } from './env';

describe('env helpers', () => {
  it('parses site config from JSON', () => {
    const site = getSiteConfig();
    expect(site.name).toBe('Web Dev & Design');
    expect(site.discordInviteUrl).toMatch(/^https:\/\//);
  });

  it('returns env with fallback URLs', () => {
    const env = getEnv();
    expect(env.siteUrl).toMatch(/^https:\/\//);
    expect(env.discordInviteUrl).toMatch(/^https:\/\//);
  });
});
