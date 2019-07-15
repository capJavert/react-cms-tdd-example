import { Selector } from 'testcafe'

import CrudPage from './CrudPage'

class CreatePage extends CrudPage {
    constructor() {
        super()

        this.title = Selector('#react-admin-title')
    }
}

export default CreatePage
