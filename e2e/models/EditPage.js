import { Selector } from 'testcafe'

import CrudPage from './CrudPage'

class EditPage extends CrudPage {
    constructor() {
        super()

        this.title = Selector('#react-admin-title')
    }
}

export default EditPage
