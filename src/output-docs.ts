import { Config } from '@stencil/core';
import { CompilerCtx, JsonDocsComponent } from '@stencil/core/internal';
import { join, relative } from 'path';
import { AUTO_GENERATE_COMMENT } from './constant';
import { ReadmeOptions } from './docs-util';
import { cssPropsToMarkdown } from './markdown-css-props';
import { eventsToMarkdown } from './markdown-events';
import { methodsToMarkdown } from './markdown-methods';
import { overviewToMarkdown } from './markdown-overview';
import { partsToMarkdown } from './markdown-parts';
import { propsToMarkdown } from './markdown-props';
import { slotsToMarkdown } from './markdown-slots';

export async function generateReadme(
  options: ReadmeOptions,
  config: Config,
  compilerCtx: CompilerCtx,
  component: JsonDocsComponent,
) {
  const isUpdate = !!component.readme;

  const readmeContent = generateMarkdown(options, component);
  const relPath = relative(config.srcDir!, component.readmePath!);
  const absPath = join(config.srcDir!, relPath);
  const results = await compilerCtx.fs.writeFile(absPath, readmeContent);
  if (results.changedContent) {
    if (isUpdate) {
      config.logger!.info(`updated readme docs: ${component.tag}`);
    } else {
      config.logger!.info(`created readme docs: ${component.tag}`);
    }
  }
}

function generateMarkdown(options: ReadmeOptions, component: JsonDocsComponent) {
  return [
    `# ${component.tag}`,
    '',
    '',
    AUTO_GENERATE_COMMENT,
    '',
    '',
    ...overviewToMarkdown(component),
    ...propsToMarkdown(component),
    ...eventsToMarkdown(component),
    ...methodsToMarkdown(component),
    ...slotsToMarkdown(component),
    ...partsToMarkdown(component),
    ...cssPropsToMarkdown(component),
    '----------------------------------------------',
    '',
    options.footer,
    '',
  ].join('\n');
}
