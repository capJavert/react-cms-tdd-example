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

E2E tests use [testcafe](https://github.com/DevExpress/testcafe) framework. Testcafe provides three main things:
* assertion helper methods (like Jest for unit tests)
* Selector API - used for querying data from app
* browser automation API

All E2E tests are also excuted with separate command `e2e`. Also this command accepts all of the [testcafe CLI options](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html).

By running this script dedicated browser window (or windows if you are testing in multiple browsers) are opened.<br>
**Make sure that windows are focused and not minimised during tests runtime. If not that can result in false positives because browsers work differently minimised (power saving etc.)**

Each test can interact with one or series of screens/pages of the app. Each page is represented as Page model.

Example:

```js
import { Selector } from 'testcafe'

import CreatePage from './CreatePage'

class EditPage extends CreatePage {
    constructor() {
        super()

        this.form = Selector('[data-test="edit-form"]')
        this.inputs.id = Selector('[data-test="input-id"]')
    }
}

export default EditPage
```

We use Page models for extracting some common logic or operations that need to be executed during testing of the page. For example in code snipped above we are querying form and input elements on the page. `Selector` is special class that kinda acts as `document.querySelector` only difference is that it is `async` and includes some added [methods/properties](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors/).

Other main part of the testcafe API is `Actions` [class](class). It provides a set of actions that enable you to interact with the screen/page.

Example:

```js
import { Selector } from 'testcafe'
import EditPage from '../models/EditPage'

const page = new EditPage()

test('Edit article through form', async t => {
    debugger
    const typeOptions = {
        paste: true,
        replace: true
    }

    await t.typeText(page.inputs.title, title, typeOptions)
    await t.click(page.form.find('button[type=submit]'))

    await t.expect(page.title.innerText).eql('Articles')

    const titleFields = Selector('[data-test="field-title"]')

    await t.expect(titleFields.nth((await titleFields.count) - 1).innerText).eql(title)
})
```

Every test injects `t` param which is an instance of `TestController` which is instance of `Actions` class. We can see how we call `typeText` method to type something inside an input field that we get from the page object.<br>
**It is important to note that most methods that interact with the browser are `async` because automation API has to actually go ahead and execute actions inside browser like real user would.**

Inside testcafe tests can be organised into groups called fixtures. Fixtures are also responsivle for lifecycle hooks similar to those in Jest. This is an example of how you would define a fixture with two hooks:

```js
fixture`Articles/Edit`
    .page(EditPage.getResourcePath('articles/1'))
    .before(async () => {
        stopFakeApi = await startFakeApi(API_PORT)
    })
    .after(async () => {
        if (typeof stopFakeApi === 'function') {
            await stopFakeApi()
        }
    })
```

`page` method accepts URL of the page we would like this fixture to start on (open that page inside browser). Fixture class is created as `Builder` pattern which means every method returns an instance of fixture.<br>
**Also all lifecycle hooks in testcafe are also async by default.**

Configuration file for Jest is `./e2e/.testcaferc.json`. More about options can be found [here](https://devexpress.github.io/testcafe/documentation/using-testcafe/configuration-file.html).<br>
**It is important to know that each option you pass through CLI command overrides the option set inside config file.**
