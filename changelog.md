# @carnesen/tsconfig changelog
## 2020-07-07 - 0.4.0
- Set ts-node transpileOnly = true

## 2020-05-29 - 0.3.1
### Fix
- Target es2020 otherwise we can't use optional chaining etc.

## 2020-05-26 - 0.3.0
### Breaking
Remove entrypoint nodejs/tsconfig.json. Just use the main entrypoint.

### Internal
Use ESLint instead of TSLint for linting
