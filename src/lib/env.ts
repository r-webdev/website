import { z } from 'zod';
import siteData from '../data/site.json';
import { SiteSchema } from '../schemas/site';

const EnvSchema = z.object({
  siteUrl: z.string().url(),
  discordInviteUrl: z.string().url(),
});

export type Env = z.infer<typeof EnvSchema>;

export function getSiteConfig() {
  return SiteSchema.parse(siteData);
}

export function getEnv(): Env {
  const site = getSiteConfig();

  return EnvSchema.parse({
    siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://webdevdesign.example.com',
    discordInviteUrl:
      import.meta.env.PUBLIC_DISCORD_INVITE_URL ?? site.discordInviteUrl,
  });
}
