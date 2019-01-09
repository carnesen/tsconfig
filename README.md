# @carnesen/tsconfig [![Build Status](https://travis-ci.com/carnesen/tsconfig.svg?branch=master)](https://travis-ci.com/carnesen/tsconfig)

TypeScript configurations for `@carnesen` projects

## Install

```
npm install --save-dev typescript @carnesen/tsconfig
```

## Usage

These instructions assume that you're using TypeScript >=[3.2 with support for "tsconfig.json inheritance via Node.js packages"](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html). 

Create a file `tsconfig.json` at the root of your project with contents:

```json
{
  "extends": "@carnesen/tsconfig"
}
```
Add your own `compilerOptions` or any other properties described [here in the TypeScript docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

The `@carnesen/tsconfig` [base configuration](tsconfig.json) sets some desirable non-default values such as `"strict": true`. It also enumerates as comments most of the other available configuration options. The base configuration can be used directly as `"extends": "@carnesen/tsconfig"`. This package also makes available a Node.js-specific configuration usable as `"extends": "@carnesen/tsconfig/nodejs/tsconfig.json`". The `nodejs` configuration extends the base one and also sets "es2017" as the compiler target, suitable for use with Node.js >=8.

## More information
If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on this project's repository on GitHub.

## Related
- [@carnesen/tslint-config](https://github.com/carnesen/tslint-config): TSLint configurations for `@carnesen` projects

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
