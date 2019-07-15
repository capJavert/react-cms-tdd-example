import EditPage from '../models/EditPage'

fixture`Articles/Edit`.page(EditPage.getResourcePath('articles/1'))

const page = new EditPage()

test('Shows correct title', async t => {
    debugger
    await t.expect(page.title.innerText).eql('Article #1')
})
