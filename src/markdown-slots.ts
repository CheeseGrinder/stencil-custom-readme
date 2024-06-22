import { JsonDocsComponent } from '@stencil/core/internal';
import { MarkdownTable } from './docs-util';

export function slotsToMarkdown({ slots }: JsonDocsComponent): string[] {
  const content: string[] = [];
  if (slots.length === 0) {
    return content;
  }

  content.push('## Slots');
  content.push('');

  const table = MarkdownTable.new();
  table.addHeader('Slot', 'Description');

  slots.forEach(slot => {
    table.addRow([slot.name === '' ? '' : `\`"${slot.name}"\``, slot.docs]);
  });

  content.push(...table.toMarkdown());
  content.push('');
  content.push('');

  return content;
}
