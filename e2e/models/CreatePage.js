import { Selector } from 'testcafe'

import CrudPage from './CrudPage'

class CreatePage extends CrudPage {
    constructor() {
        super()

        this.title = Selector('#react-admin-title')
        this.form = Selector('[data-test="create-form"]')
        this.inputs = {
            title: Selector('[data-test="input-title"]'),
            teaser: Selector('[data-test="input-teaser"]'),
            body: Selector('[data-test="input-body"]'),
            published_at: Selector('[data-test="input-published_at"]')
        }
    }
}

export default CreatePage
