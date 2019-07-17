'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.API_PATH = 'http://localhost:4444';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
const { join } = require('path');
const { mkdirSync } = require('fs')
require('dotenv').config({ path: join(__dirname, '../.env.test') });
require('../config/env');
const { execSync } = require('child_process');
let argv = process.argv.slice(2);

const screenshotsPath = join(__dirname, '../.tests/screenshots')

try {
    mkdirSync(join(__dirname, '../.tests'))
    mkdirSync(screenshotsPath)
} catch (e) {
    console.log('>', '.tests directory already exists')
}

const screenshotArgs = [
    '--screenshots',
    screenshotsPath,
    '--screenshots-on-fails'
];

const testScript = `cd e2e && testcafe ${[
    ...argv,
    ...screenshotArgs
].join(' ')}`
console .log('>', testScript)

try {
    execSync(testScript, { stdio: 'inherit' })
} catch(e) {
    console.log(e.name, e.message)
}
