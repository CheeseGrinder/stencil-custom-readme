import { JsonDocsComponent, JsonDocsEvent } from '@stencil/core/internal';
import { MarkdownTable } from './docs-util';

export function eventsToMarkdown({ events }: JsonDocsComponent): string[] {
  const content: string[] = [];
  if (events.length === 0) {
    return content;
  }

  content.push('## Events');
  content.push('');

  const table = MarkdownTable.new();
  table.addHeader('Event', 'Description', 'Type');

  events.forEach(event =>
    table.addRow([`\`${event.event}\``, getDocsField(event), `\`CustomEvent<${event.detail}>\``]),
  );

  content.push(...table.toMarkdown());
  content.push('');
  content.push('');

  return content;
}

function getDocsField({ docs, deprecation }: JsonDocsEvent): string {
  const deprecated =
    deprecation !== undefined ? `<span style="color:red">**[DEPRECATED]**</span> ${deprecation}<br/><br/>` : '';

  return `${deprecated}${docs}`;
}
