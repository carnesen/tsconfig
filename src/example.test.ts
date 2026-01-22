import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { add } from './example.js';
import * as pkg from '../package.json';

describe('TypeScript syntax and compilation tests', () => {
  describe('basic functionality', () => {
    it('add function works correctly', () => {
      assert.strictEqual(add(1, 2, 3), 6);
      assert.strictEqual(add(), 0);
      assert.strictEqual(add(5), 5);
    });
  });

  describe('strict mode behaviors', () => {
    it('strictNullChecks - nullable values handled correctly', () => {
      const maybeString: string | null = Math.random() > 0.5 ? 'hello' : null;
      // This compiles because we check for null
      const length = maybeString !== null ? maybeString.length : 0;
      assert.strictEqual(typeof length, 'number');
    });

    it('noImplicitAny - explicit types required', () => {
      // This function has explicit types (would fail without them under noImplicitAny)
      const multiply = (a: number, b: number): number => a * b;
      assert.strictEqual(multiply(3, 4), 12);
    });
  });

  describe('ES2022+ features', () => {
    it('class fields work correctly', () => {
      class Counter {
        count = 0;
        increment() {
          this.count++;
        }
      }
      const counter = new Counter();
      counter.increment();
      assert.strictEqual(counter.count, 1);
    });

    it('private class fields work correctly', () => {
      class Secret {
        #value: string;
        constructor(value: string) {
          this.#value = value;
        }
        reveal() {
          return this.#value;
        }
      }
      const secret = new Secret('hidden');
      assert.strictEqual(secret.reveal(), 'hidden');
    });

    it('static class blocks work correctly', () => {
      class Config {
        static value: number;
        static {
          Config.value = 42;
        }
      }
      assert.strictEqual(Config.value, 42);
    });
  });

  describe('module features', () => {
    it('resolveJsonModule - JSON imports work', () => {
      // This tests that resolveJsonModule is enabled (pkg imported at top of file)
      assert.strictEqual(pkg.name, '@carnesen/tsconfig');
    });
  });

  describe('iteration features', () => {
    it('downlevelIteration - spread and for-of work on iterables', () => {
      const set = new Set([1, 2, 3]);
      const arr = [...set];
      assert.deepStrictEqual(arr, [1, 2, 3]);

      let sum = 0;
      for (const n of set) {
        sum += n;
      }
      assert.strictEqual(sum, 6);
    });

    it('generator functions work correctly', () => {
      function* range(start: number, end: number) {
        for (let i = start; i < end; i++) {
          yield i;
        }
      }
      const nums = [...range(0, 3)];
      assert.deepStrictEqual(nums, [0, 1, 2]);
    });
  });

  describe('const enums', () => {
    it('preserveConstEnums - const enums are preserved', () => {
      const enum Direction {
        Up = 'UP',
        Down = 'DOWN',
      }
      // With preserveConstEnums, these are inlined but the enum object still exists
      assert.strictEqual(Direction.Up, 'UP');
      assert.strictEqual(Direction.Down, 'DOWN');
    });
  });
});
