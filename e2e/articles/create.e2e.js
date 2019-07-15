import CreatePage from '../models/CreatePage'

fixture`Articles/Create`.page(CreatePage.getResourcePath('articles/create'))

const page = new CreatePage()

test('Shows correct title', async t => {
    debugger
    await t.expect(page.title.innerText).eql('Create Article')
})
