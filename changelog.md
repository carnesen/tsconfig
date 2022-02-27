# @carnesen/tsconfig changelog

## Upcoming

## carnesen-tsconfig-0.5.0 (2022-02-27)

Update for Node.js 16 per https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping
- `"lib": ["ES2021"]`
- `"target": "ES2021"`

## v0.4.1 (2021-05-29)

- Internal: Update dev dependencies

- Change: Remove ts-node transpileOnly = true since that's not an inherited property

## 0.4.0 (2020-07-07)

- Change: Set ts-node transpileOnly = true

## 0.3.1 (2020-05-29)

- Fix: Target es2020 otherwise we can't use optional chaining etc.

## 0.3.0 (2020-05-26)

- Breaking: Remove entrypoint nodejs/tsconfig.json. Just use the main entrypoint.

- Internal: Use ESLint instead of TSLint for linting
