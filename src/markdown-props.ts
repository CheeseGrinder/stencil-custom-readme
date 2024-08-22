import { JsonDocsComponent, JsonDocsProp } from '@stencil/core/internal';
import { MarkdownTable } from './docs-util';

export function propsToMarkdown({ props }: JsonDocsComponent): string[] {
  const content: string[] = [];
  if (props.length === 0) {
    return content;
  }

  content.push('## Properties');
  content.push('');

  const table = MarkdownTable.new();
  table.addHeader('Property', 'Attribute', 'Description', 'Type', 'Default');

  props.forEach(prop => {
    table.addRow([
      getPropertyField(prop),
      getAttributeField(prop),
      getDocsField(prop),
      `\`${prop.type}\``,
      getDefault(prop),
    ]);
  });

  content.push(...table.toMarkdown());
  content.push('');
  content.push('');

  return content;
}

function getPropertyField({ name, required }: JsonDocsProp): string {
  return `\`${name}\`${required ? ' _(required)_' : ''}`;
}

function getAttributeField({ attr }: JsonDocsProp): string {
  return attr ? `\`${attr}\`` : '--';
}

function getDocsField({ docs, deprecation }: JsonDocsProp): string {
  const deprecated =
    deprecation !== undefined ? `<span style="color:red">**[DEPRECATED]**</span> ${deprecation}<br/><br/>` : '';

  return `${deprecated}${docs}`;
}

function getDefault(prop: JsonDocsProp): string {
  const defaultFromTag = prop.docsTags.find(tag => tag.name === 'default')?.text;
  const propDefault =
    prop.default === undefined ? (defaultFromTag === undefined ? undefined : defaultFromTag) : prop.default;

  if (propDefault.includes('`')) {
    return `<code>${propDefault.replace(/`/g, '\\`')}</code>`;
  }

  return `\`${propDefault}\``;
}
