import { Selector } from 'testcafe'
import EditPage from '../models/EditPage'
import { startFakeApi } from '../../__tests__/helpers/startFakeAPi'
import { title } from '../../data/articles/create.model'

let stopFakeApi
const { API_PORT } = process.env
const page = new EditPage()

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

test('Open page', async t => {
    debugger

    await t.expect(page.title.innerText).eql('Article #1')
})

test.disablePageReloads('ID input can not be edited', async t => {
    debugger

    await t.expect(page.inputs.id.find('input').hasAttribute('disabled')).ok()
})

test.disablePageReloads('Article can not be saved without title', async t => {
    debugger

    await t.selectText(page.inputs.title.find('input'), 0).pressKey('delete')
    await t.click(page.form.find('button[type=submit]'))

    await t.expect(Selector('#title-helper-text').innerText).eql('Title is required')
})

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
