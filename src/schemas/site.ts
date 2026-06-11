import { z } from 'zod';

export const SiteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  memberCount: z.string().optional(),
  discordServerId: z.string(),
  discordInviteUrl: z.string().url(),
  socials: z.object({
    github: z.string().url().optional(),
    discord: z.string().url().optional(),
  }),
});

export type Site = z.infer<typeof SiteSchema>;
