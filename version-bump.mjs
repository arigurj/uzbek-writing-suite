import { readFileSync, writeFileSync } from 'fs';

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const versions = JSON.parse(readFileSync('versions.json', 'utf8'));
const { version } = manifest;
const { minAppVersion } = Object.values(versions)[0];

console.log(`Bumping version to ${version}`);
console.log(`Minimum Obsidian version: ${minAppVersion}`);
