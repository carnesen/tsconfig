# @carnesen/tsconfig

Shareable TypeScript configuration for @carnesen projects. The package exports tsconfig files that other projects extend.

## Repository Structure

- `node24/tsconfig.json` - Main config extending `@tsconfig/node24` plus custom overrides
- `overrides/tsconfig.json` - Custom compiler options (declarations, source maps, strict settings)
- `src/` - TypeScript source files and tests validating the configuration
- `tsconfig.json` - Root config for this repo (extends node24, used for testing)
- `package.json` - Package metadata (Node.js >=24)

## Development

```bash
npm test              # Build with tsc, then run compiled tests (default)
npm run test:all      # Run all tests (tsx, tsc, esbuild)
npm run test:tsx      # Run tests directly on TypeScript source
npm run test:tsc      # Build with tsc, then run compiled tests
npm run test:esbuild  # Build with esbuild, then run compiled tests
npm run test:pack     # Integration test: pack, install in temp dir, compile
npm run lint          # Lint src/ with ESLint
```

Tests use Node.js native `node:test` module and verify TypeScript features compile and behave correctly with both `tsc` and `esbuild`.

The `test:pack` integration test validates the published package works correctly by:
1. Running `npm pack` to create a tarball
2. Creating a temp directory with the source files
3. Installing the tarball and dependencies
4. Compiling with both tsc and esbuild
5. Running the compiled tests

## Key Compiler Options

The configuration extends `@tsconfig/node24` and adds:

- `declaration`, `declarationMap`, `sourceMap` - Full output artifacts
- `noImplicitReturns`, `noEmitOnError` - Additional strictness
- `forceConsistentCasingInFileNames` - Cross-platform safety
- `resolveJsonModule`, `downlevelIteration`, `preserveConstEnums`
- `allowSyntheticDefaultImports: false` - Explicit imports required
- `module: "commonjs"`, `moduleResolution: "node"` - CommonJS output

See `overrides/tsconfig.json` for the full list of custom options.

## Usage

```json
{
  "extends": "@carnesen/tsconfig/node24"
}
```

Override or add options as needed for specific projects.
