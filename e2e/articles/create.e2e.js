import { Selector } from 'testcafe'
import CreatePage from '../models/CreatePage'
import { startFakeApi } from '../../__tests__/helpers/startFakeAPi'
import db from '../../data/db'
import { title, teaser, body, published_at as publishedAt } from '../../data/articles/create.model'

let stopFakeApi
const { API_PORT } = process.env
const page = new CreatePage()

fixture`Articles/Create`
    .page(CreatePage.getResourcePath('articles/create'))
    .before(async () => {
        stopFakeApi = await startFakeApi(API_PORT)
    })
    .after(() => {
        if (typeof stopFakeApi === 'function') {
            stopFakeApi()
        }
    })

test('Open page', async t => {
    debugger

    await t.expect(page.title.innerText).eql('Create Article')
})

test.disablePageReloads('Article can not be created without title', async t => {
    debugger

    await t.click(page.form.find('button[type=submit]'))

    await t.expect(Selector('#title-helper-text').innerText).eql('Title is required')
})

test.disablePageReloads('Create article through form', async t => {
    debugger
    const typeOptions = {
        paste: true
    }

    await t.typeText(page.inputs.title, title, typeOptions)
    await t.typeText(page.inputs.teaser, teaser, typeOptions)
    await t.typeText(page.inputs.body, body, typeOptions)
    await t.typeText(page.inputs.published_at, publishedAt)
    await t.click(page.form.find('button[type=submit]'))

    await t.expect(page.title.innerText).eql(`Article #${db.articles.length + 1}`)
})
