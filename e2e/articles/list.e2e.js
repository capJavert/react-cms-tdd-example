import ListPage from '../models/ListPage'

fixture`Articles/List`.page(ListPage.getResourcePath('articles'))

const page = new ListPage()

test('Shows correct title', async t => {
    debugger
    await t.expect(page.title.innerText).eql('Articles')
})
