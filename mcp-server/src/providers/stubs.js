import { z } from 'zod';

// Stub tools for future implementation
export const stubTools = [
  {
    name: 'notion_create_page',
    description: 'Create a Notion page (stub - not implemented)',
    inputSchema: z.object({ title: z.string(), content: z.string() }).strip(),
    async handler() {
      return { content: [{ type: 'text', text: 'Notion integration coming soon' }] };
    },
  },
  {
    name: 'slack_send_message',
    description: 'Send a Slack message (stub - not implemented)',
    inputSchema: z.object({ channel: z.string(), text: z.string() }).strip(),
    async handler() {
      return { content: [{ type: 'text', text: 'Slack integration coming soon' }] };
    },
  },
];
