import axios from 'axios';

function formatForDiscord(title: string, body: string) {
  return `${title}\n\`\`\`${body}\`\`\``;
}

function send(content: string, targetChannel: string) {
  axios.post(targetChannel, {content});
}

export function sendStringToDiscord(
  title: string,
  body: string,
  targetChannel: string
) {
  send(formatForDiscord(title, body), targetChannel);
}
