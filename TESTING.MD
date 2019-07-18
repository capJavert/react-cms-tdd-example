# Testing

This project uses jest, enzyme and testcafe for test coverage and quality assurance.

## Structure of tests

We have three types of tests:
1. Unit
2. Integration
3. E2E (end to end)

Refer to `./__tests__/README.md` for more info about each test type.

Depending on the type of test there are different places when test files should be placed.
* `<FilePath>/<FileName>.spec.js` - unit tests for specific files
* `./__tests__/**/*.test.js` - integration tests for modules, features etc.
* `./e2e/**/*.e2e.js` - e2e tests

Test files can be of different file type. For example test files that test react component end with `.jsx` or `.tsx`.<br>
Same applies for **e2e** and **integration** tests.

## Unit tests

We are using Jest framework and Jest globals are integrated with linter and bundler.

Example of simple unit test that is checking if component renders correctly:
```tsx
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
})

```

We use:
* `test` keyword to specify tests.
* `expect` keyword to assert some condition that test has to satisfy.
* More can be found in [Jest documenation](https://jestjs.io/docs/en/expect.html)

Configuration file for Jest is `./jest.config.js`. More about options can be found [here](https://jestjs.io/docs/en/configuration).

There is a `./scripts/test.js` script that provides ready to use testing interface but you can also use `npx jest <arguments>` command.<br>
Docs for Jest CLI are [here](https://jestjs.io/docs/en/cli).

We also use helper library for unit testing React components called [enzyme](https://airbnb.io/enzyme/).

Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.

Example:

```tsx
import React from 'react'
import { Edit, SimpleForm } from 'react-admin'
import { shallow } from 'enzyme'

import ArticleEdit from './ArticleEdit'

const props: Record<string, any> = {
    id: 1,
    location: {},
    match: {},
    resource: 'articles'
}

test('renders without crashing', () => {
    const wrapper = shallow(<ArticleEdit {...props} />)
    cExpect(wrapper.find(Edit)).to.have.lengthOf(1)
    cExpect(wrapper.find(SimpleForm)).to.have.lengthOf(1)
})
```

We use `shallow` method to render our component and "fake" rendering of underlying components (that are in this case from `react-admin` vendor) that are not needed for this test.

We also provide mocked `props` that component would receive if it was really used inside full application.

We use `cExpect` for assertion which is an alternative for Jest `except`. It provides alternate approach when checking test values and its sometimes more easy to use with React based components, hooks etc. Checkout more about [Chai package](https://www.npmjs.com/package/chai).

## Integration tests

Jest is also used for integration tests. Only difference is that integration tests are located inside `__tests__` folder.

Something that you may encounter while writing integration tests is Lifecycle test hooks like `afterAll` and `beforeAll`. List of those can be found [here](https://jestjs.io/docs/en/api#beforeallfn-timeout).<br>
We use them to do setup/cleanup before each test is executed. For example if test need Fake REST API and you don't want each test to inherit changes in data that previous test made.

Example:
```js
import restProvider from 'ra-data-json-server'
import { startFakeApi } from '../../helpers'

const { API_PORT } = process.env
const dataProvider = restProvider(`http://localhost:${API_PORT}`)

describe('resources.articles.api', () => {
    let stopFakeApi

    beforeAll(async () => {
        stopFakeApi = await startFakeApi(API_PORT)
    }, 10000)

    // ... test code

    afterAll(async () => {
        if (typeof stopFakeApi === 'function') {
            await stopFakeApi()
        }
    })
})
```

## E2E tests

TODO
