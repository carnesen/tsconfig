import { describe, it, before, after } from 'node:test';
import * as assert from 'node:assert';
import { execSync } from 'node:child_process';
import { mkdtempSync, cpSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

describe('integration test with npm pack', () => {
  let tempDir: string;
  let tarballPath: string;

  before(() => {
    // Create tarball from the package
    const packOutput = execSync('npm pack --pack-destination .', {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
    }).trim();
    tarballPath = join(ROOT_DIR, packOutput);

    // Create temp directory
    tempDir = mkdtempSync(join(tmpdir(), 'tsconfig-test-'));

    // Copy source files (excluding integration test itself)
    cpSync(join(ROOT_DIR, 'src', 'example.ts'), join(tempDir, 'src', 'example.ts'), {
      recursive: true,
    });
    cpSync(join(ROOT_DIR, 'src', 'example.test.ts'), join(tempDir, 'src', 'example.test.ts'), {
      recursive: true,
    });

    // Create package.json in temp dir
    writeFileSync(
      join(tempDir, 'package.json'),
      JSON.stringify(
        {
          name: 'test-project',
          version: '1.0.0',
          type: 'commonjs',
        },
        null,
        2
      )
    );

    // Install the tarball and dev dependencies
    // Note: @tsconfig/node24 and @types/node are peer dependencies needed for compilation
    execSync(`npm install "${tarballPath}" typescript esbuild @tsconfig/node24 @types/node`, {
      cwd: tempDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    // Create tsconfig.json that extends the installed package
    writeFileSync(
      join(tempDir, 'tsconfig.json'),
      JSON.stringify(
        {
          extends: '@carnesen/tsconfig/node24',
          include: ['src'],
          compilerOptions: {
            rootDir: './src',
            outDir: './dist',
          },
        },
        null,
        2
      )
    );
  });

  after(() => {
    // Clean up
    if (tempDir) {
      rmSync(tempDir, { recursive: true, force: true });
    }
    if (tarballPath) {
      rmSync(tarballPath, { force: true });
    }
  });

  it('tsc compiles successfully with installed package', () => {
    execSync('./node_modules/.bin/tsc', {
      cwd: tempDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    // Verify output files exist
    const distFiles = readdirSync(join(tempDir, 'dist'));
    assert.ok(distFiles.includes('example.js'), 'example.js should exist');
    assert.ok(distFiles.includes('example.d.ts'), 'example.d.ts should exist');
    assert.ok(distFiles.includes('example.test.js'), 'example.test.js should exist');
  });

  it('compiled tests run successfully', () => {
    execSync('node --test dist/*.test.js', {
      cwd: tempDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    // If we get here without throwing, the tests passed
    assert.ok(true);
  });

  it('esbuild compiles successfully with installed package', () => {
    execSync('./node_modules/.bin/esbuild src/*.ts --outdir=dist-esbuild --format=cjs --platform=node', {
      cwd: tempDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    // Verify output files exist
    const distFiles = readdirSync(join(tempDir, 'dist-esbuild'));
    assert.ok(distFiles.includes('example.js'), 'example.js should exist');
    assert.ok(distFiles.includes('example.test.js'), 'example.test.js should exist');
  });

  it('esbuild compiled tests run successfully', () => {
    execSync('node --test dist-esbuild/*.test.js', {
      cwd: tempDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    // If we get here without throwing, the tests passed
    assert.ok(true);
  });
});
