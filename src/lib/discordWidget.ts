import {
  DiscordWidgetSchema,
  type DiscordWidgetData,
  type DiscordWidgetMember,
} from '../schemas/discordWidget';

const WIDGET_API = 'https://discord.com/api/guilds';

const statusOrder: Record<NonNullable<DiscordWidgetMember['status']>, number> = {
  online: 0,
  idle: 1,
  dnd: 2,
  offline: 3,
};

export async function fetchDiscordWidget(serverId: string): Promise<DiscordWidgetData | null> {
  try {
    const response = await fetch(`${WIDGET_API}/${serverId}/widget.json`);

    if (!response.ok) {
      return null;
    }

    const json: unknown = await response.json();
    const parsed = DiscordWidgetSchema.safeParse(json);

    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function sortMembersByStatus(members: DiscordWidgetMember[]): DiscordWidgetMember[] {
  return [...members].sort((a, b) => {
    const aStatus = statusOrder[a.status ?? 'offline'];
    const bStatus = statusOrder[b.status ?? 'offline'];
    return aStatus - bStatus;
  });
}

export function countMembersByStatus(members: DiscordWidgetMember[]) {
  return members.reduce(
    (counts, member) => {
      const status = member.status ?? 'offline';
      counts[status] += 1;
      return counts;
    },
    { online: 0, idle: 0, dnd: 0, offline: 0 },
  );
}

export function formatPresenceCount(count: number): string {
  return count.toLocaleString('en-US');
}
