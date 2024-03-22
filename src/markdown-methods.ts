import { JsonDocsComponent, JsonDocsMethod } from '@stencil/core/internal';
import { MarkdownTable } from './docs-util';

export function methodsToMarkdown({ methods }: JsonDocsComponent): string[] {
  const content: string[] = [];
  if (methods.length === 0) {
    return content;
  }

  content.push('## Methods');
  content.push('');

  methods.forEach(method => {
    content.push(`### \`${method.signature}\``);
    content.push('');
    content.push(getDocsField(method));
    content.push('');

    if (method.parameters.length > 0) {
      const table = MarkdownTable.new();
      table.addHeader('Name', 'Type', 'Description');

      method.parameters.forEach(param => table.addRow([`\`${param.name}\``, `\`${param.type}\``, param.docs]));

      content.push(`#### Parameters`);
      content.push(``);
      content.push(...table.toMarkdown());
      content.push(``);
    }

    if (method.returns) {
      content.push(`#### Returns`);
      content.push(``);
      content.push(`Type: \`${method.returns.type}\``);
      content.push(``);
      content.push(method.returns.docs);
      content.push(``);
    }
  });
  content.push('');

  return content;
}

function getDocsField({ docs, deprecation }: JsonDocsMethod): string {
  const deprecated =
    deprecation !== undefined ? `<span style="color:red">**[DEPRECATED]**</span> ${deprecation}<br/><br/>` : '';

  return `${deprecated}${docs}`;
}
