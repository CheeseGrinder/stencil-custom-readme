import { BuildCtx, CompilerCtx, Config, JsonDocs, OutputTargetCustom } from '@stencil/core/internal';
import { NOTE } from './constant';
import { ReadmeOptions } from './docs-util';
import { generateReadme } from './output-docs';

export function docsReadme(options?: ReadmeOptions): OutputTargetCustom {
  const parsedOptions = options || ({} as ReadmeOptions);
  parsedOptions.footer = NOTE;

  return {
    type: 'custom',
    name: 'docs-readme',
    taskShouldRun: 'onBuildOnly',
    async generator(config: Config, compilerCtx: CompilerCtx, _buildCtx: BuildCtx, docs: JsonDocs) {
      const timespan = config.logger!.createTimeSpan('starting generate readme documentation');
      await Promise.all(
        docs.components.map(async component => generateReadme(parsedOptions, config, compilerCtx, component)),
      );
      timespan.finish('readme documentation finished');
    },
  };
}
