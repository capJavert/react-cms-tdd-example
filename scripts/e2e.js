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
require('dotenv').config({ path: join(__dirname, '../.env.test') });
require('../config/env');
const { execSync } = require('child_process');

execSync('cd e2e && testcafe', { stdio: 'inherit' });
