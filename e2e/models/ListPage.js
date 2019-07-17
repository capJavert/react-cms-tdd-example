import { Selector } from 'testcafe'

import CrudPage from './CrudPage'

class ListPage extends CrudPage {
    constructor() {
        super()

        this.title = Selector('#react-admin-title')
        this.fields = {
            id: Selector('[data-test="field-id"]'),
            title: Selector('[data-test="field-title"]'),
            published_at: Selector('[data-test="field-published_at"]')
        }
    }
}

export default ListPage
