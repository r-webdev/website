import { z } from 'zod';

export const DiscordWidgetMemberSchema = z.object({
  id: z.string(),
  username: z.string(),
  status: z.enum(['online', 'idle', 'dnd', 'offline']).optional(),
  avatar_url: z.string().url(),
  game: z.object({ name: z.string() }).optional(),
  channel_id: z.string().optional(),
});

export const DiscordWidgetChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.number(),
});

export const DiscordWidgetSchema = z.object({
  id: z.string(),
  name: z.string(),
  instant_invite: z.string().url().optional(),
  presence_count: z.number(),
  channels: z.array(DiscordWidgetChannelSchema),
  members: z.array(DiscordWidgetMemberSchema),
});

export type DiscordWidgetMember = z.infer<typeof DiscordWidgetMemberSchema>;
export type DiscordWidgetChannel = z.infer<typeof DiscordWidgetChannelSchema>;
export type DiscordWidgetData = z.infer<typeof DiscordWidgetSchema>;
