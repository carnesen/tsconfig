# @carnesen/tsconfig

[![Build Status](https://github.com/carnesen/tsconfig/workflows/test/badge.svg)](https://github.com/carnesen/tsconfig/actions?query=workflow%3Atest+branch%3Amaster)

TypeScript configurations for `@carnesen` projects

## Install

```
npm install --save-dev typescript @carnesen/tsconfig
```

## Usage

Create a file `tsconfig.json` at the root of your project:

```json
{
  "extends": "@carnesen/tsconfig/node24",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

Add your own `compilerOptions` or any other properties described [in the TypeScript docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## What's Included

The configuration extends [`@tsconfig/node24`](https://github.com/tsconfig/bases/blob/main/bases/node24.json) (ES2024, strict mode, nodenext modules) and adds:

- **Output artifacts**: `declaration`, `declarationMap`, `sourceMap`
- **Extra strictness**: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`
- **Safety**: `noEmitOnError`, `verbatimModuleSyntax`

## AGENTS.md Snippet

Add this to your project's `AGENTS.md` to give AI coding assistants context about the TypeScript configuration:

```markdown
## TypeScript

Extends `@carnesen/tsconfig/node24` (ES2024, strict mode, nodenext modules). Notable settings: `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` require explicit undefined handling for array access and optional props.
```

## More information

If you encounter any bugs or have any questions or feature requests, please don't hesitate to file an issue or submit a pull request on [this project's repository on GitHub](https://github.com/carnesen/tsconfig).

## Related

- [@carnesen/eslint-config](https://github.com/carnesen/eslint-config): ESLint configurations for `@carnesen` projects

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
