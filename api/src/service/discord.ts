import axios from 'axios';
import {URL} from 'url';
import {stringTable} from '../constant';

export interface DiscordWebhookEmbbed {
  title?: string;
  color?: number;
  description?: string;
  timestamp?: string;
  url?: string;
  icon_url?: URL;
  image?: {url: URL};
  thumbnail?: {url: URL};
  fields?: Array<{
    name?: string;
    value?: string;
    inline?: boolean;
  }>;
}

export interface DiscordWebhookBody {
  content?: string;
  username?: string;
  avatar_url?: URL;
  embeds?: Array<DiscordWebhookEmbbed>;
}

/**
 * @param color: html color. E.g: #dc143c
 * @return number: int value. E.g: 14423100
 */
export function htmlColorToNumber(color: string) {
  return parseInt(color.slice(1), 16);
}

function formatForDiscord(title: string, body: string) {
  return `${title}\n\`\`\`${body}\`\`\``;
}

async function send(body: DiscordWebhookBody, targetChannel: string) {
  axios.post(targetChannel, body, {
    headers: {'Content-Type': 'application/json'},
  });
}

export function sendStringToDiscord(
  title: string,
  body: string,
  targetChannel: string
) {
  send({content: formatForDiscord(title, body)}, targetChannel);
}

export function sendObjToDiscord(
  title: string,
  body: any,
  targetChannel: string
) {
  sendStringToDiscord(title, stringTable.create(body), targetChannel);
}
