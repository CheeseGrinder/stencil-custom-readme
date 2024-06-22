import { JsonDocsComponent } from '@stencil/core/internal';
import { MarkdownTable } from './docs-util';

export function partsToMarkdown({ parts }: JsonDocsComponent): string[] {
  const content: string[] = [];
  if (parts.length === 0) {
    return content;
  }

  content.push('## Parts');
  content.push('');

  const table = MarkdownTable.new();
  table.addHeader('Part', 'Description');

  parts.forEach(part => {
    table.addRow([part.name === '' ? '' : `\`"${part.name}"\``, part.docs]);
  });

  content.push(...table.toMarkdown());
  content.push('');
  content.push('');

  return content;
}
