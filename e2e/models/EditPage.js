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
