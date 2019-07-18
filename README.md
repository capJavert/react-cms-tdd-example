# React CMS TDD example

[![Build Status](https://travis-ci.org/capJavert/react-cms-tdd-example.svg?branch=master)](https://travis-ci.org/capJavert/react-cms-tdd-example)

Example of tests setup for general CMS with react-admin, jest, enzyme and testcafe.

## Setup

```
npm install
```

## Available Scripts

In the project directory, you can run following commands.

### Start

```
npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Fake REST

```
npm run fake:rest
```

Run json-server on [localhost:4444](http://localhost:444) and using `./data/db.json` as data source.

### Test
```
npm test
```

Launches the test runner in the interactive watch mode.

```
npm run e2e
```

Executes e2e tests with testcafe. <br>
Be sure to start dev server with `start` command or use `build -- --test` and `serve` commands for production code testing.<br>
You can pass any option supported by [testcafe command](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html).

**To learn more about tests and how to write them check `./TESTING.md` file.**

### Build

```
npm build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

Options:<br>
--test - **Include test attributes (used for e2e testing selectors)<br>**

The build is minified and the filenames include the hashes.

### Serve

```
npm serve
```

Serve created build from `./build` folder.<br>
Open [http://localhost:3000](http://localhost:5000) to view it in the browser.<br>
This command also starts json server like `fake:rest` command.

Options:<br>
--no-json-server - **Do not start json server<br>**
--no-public - **Do not server `./build` folder<br>**
