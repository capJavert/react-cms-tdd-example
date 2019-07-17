import ListPage from '../models/ListPage'
import db from '../../data/db'
import { startFakeApi } from '../../__tests__/helpers/startFakeAPi'

let stopFakeApi
const { API_PORT } = process.env
const page = new ListPage()

fixture`Articles/List`
    .page(ListPage.getResourcePath('articles'))
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

    await t.expect(page.title.innerText).eql('Articles')
})

test.disablePageReloads('Browse items inside listing', async t => {
    debugger
    const itemsCount = db.articles.length

    await t.expect(await page.fields.id.count).eql(itemsCount)
    await t.expect(await page.fields.title.count).eql(itemsCount)
    await t.expect(await page.fields.published_at.count).eql(itemsCount)
})
