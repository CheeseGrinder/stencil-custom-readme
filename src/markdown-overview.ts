import { JsonDocsComponent } from '@stencil/core/internal';

/**
 * Generate an 'Overview' section for a markdown file
 * @param overview a component-level comment string to place in a markdown file
 * @returns The generated Overview section. If the provided overview is empty, return an empty list
 */
export function overviewToMarkdown({ overview }: JsonDocsComponent): ReadonlyArray<string> {
  if (!overview) {
    return [];
  }

  return ['## Overview', '', overview.trim(), ''];
}
