# React CMS TDD example

[![Build Status](https://travis-ci.org/capJavert/react-cms-tdd-example.svg?branch=master)](https://travis-ci.org/capJavert/react-cms-tdd-example)

Example of tests setup for general CMS with react-admin, jest and testcafe

## Setup

```
npm install
```

## Available Scripts

In the project directory, you can run:

```
npm start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

```
npm test
```

Launches the test runner in the interactive watch mode.

```
npm run e2e
```

Executes e2e tests with testcafe.

```
npm build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

```
npm run fake:rest
```

Run json-server on [localhost:4444](http://localhost:444) and using `./data/db.json` as data source.
