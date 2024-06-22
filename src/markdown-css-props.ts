import { JsonDocsComponent } from '@stencil/core/internal';
import { MarkdownTable } from './docs-util';

export function cssPropsToMarkdown({ styles }: JsonDocsComponent): string[] {
  const content: string[] = [];
  if (styles.length === 0) {
    return content;
  }

  content.push('## CSS Custom Properties');
  content.push('');

  const table = MarkdownTable.new();
  table.addHeader('Name', 'Description');

  styles.forEach(style => {
    table.addRow([`\`${style.name}\``, style.docs]);
  });

  content.push(...table.toMarkdown());
  content.push('');
  content.push('');

  return content;
}
