<div align="center">
  <a href="#">
    <img alt="stencil-logo" src="./assets/stencil-logo.png" width="60">
  </a>
</div>

<h1 align="center">
  Stencil Custom Readme
</h1>

<div align="center">

A plugin for [StencilJS][stencil-site] to add generate custom readme
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@cheese-grinder/stencil-custom-readme" target="_blank" rel="noopener noreferrer">
    <img alt="NPM package" src="https://img.shields.io/npm/v/%40cheese-grinder%2Fstencil-custom-readme">
  </a>
  <a href="https://github.com/CheeseGrinder/stencil-custom-readme/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
    <img alt="GitHub License" src="https://img.shields.io/github/license/CheeseGrinder/stencil-custom-readme">
  </a>
</div>

---------

### Install

```bash
npm install @cheese-grinder/stencil-custom-readme --save-dev
```

### Usage

```ts
// stencil.config.ts

import { docsReadme } from '@cheese-grinder/stencil-custom-readme';
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    docsReadme()
  ]
};
```

### Contributing

Thanks for your interest in contributing!
Please take a moment to read up on our guidelines for [contributing][contributing].
Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.


<!-- Links -->

[stencil-site]: https://stenciljs.com/
[contributing]: https://github.com/CheeseGrinder/stencil-custom-readme/blob/main/CONTRIBUTING.md
[code-of-conduct]: https://github.com/CheeseGrinder/stencil-custom-readme/blob/main/CODE_OF_CONDUCT.md