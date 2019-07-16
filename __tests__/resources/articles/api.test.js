import jsonServer from 'json-server'
import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from 'react-admin'
import restProvider from 'ra-data-json-server'

import db from '../../../data/db'

const { API_PORT } = process.env
const dataProvider = restProvider(`http://localhost:${API_PORT}`)

describe('resources.articles.api', () => {
    const server = jsonServer.create()

    beforeAll(
        () =>
            new Promise((resolve, reject) => {
                try {
                    const router = jsonServer.router(db)
                    const middlewares = jsonServer.defaults({
                        port: API_PORT,
                        quiet: true
                    })

                    server.use(middlewares)
                    server.use(router)

                    server.listen(API_PORT, () => {
                        resolve()
                    })
                } catch (e) {
                    console.error(e)
                    reject()
                }
            }),
        10000
    )

    it('should return items and total', async () => {
        expect.assertions(2)

        const { data, total } = await dataProvider(GET_LIST, 'articles', {
            pagination: {
                page: 1,
                perPage: 10
            },
            sort: {
                field: 'id',
                order: 'DESC'
            }
        })

        expect(data).toBeDefined()
        expect(total).toBeDefined()
    })

    it('should respect perPage option', async () => {
        expect.assertions(3)

        const { data, total } = await dataProvider(GET_LIST, 'articles', {
            pagination: {
                page: 1,
                perPage: 10
            },
            sort: {
                field: 'id',
                order: 'DESC'
            }
        })

        expect(data).toBeDefined()
        expect(total).toBeDefined()
        expect(data.length).toBeLessThanOrEqual(10)
    })

    it('should create article', async () => {
        expect.assertions(3)

        const article = {
            title: 'Ovo se ne događa',
            teaser: 'no comment',
            body: 'Nope, still nothing..',
            published_at: '2019-07-16T09:57:19.844Z'
        }
        const { data } = await dataProvider(CREATE, 'articles', { data: article })
        const { id, ...createdArticle } = data

        expect(data).toBeDefined()
        expect(id).toBeDefined()
        expect(createdArticle).toMatchObject(article)
    })

    it('should return article by id', async () => {
        expect.assertions(2)

        const { data } = await dataProvider(GET_ONE, 'articles', { id: 1 })

        expect(data).toBeDefined()
        expect(data.id).toEqual(1)
    })

    it('should edit article by id', async () => {
        expect.assertions(3)

        const article = {
            title: 'This shit changed'
        }

        const { data } = await dataProvider(UPDATE, 'articles', { id: 1, data: article })
        const { id, title } = data

        expect(data).toBeDefined()
        expect(id).toEqual(1)
        expect(title).toEqual('This shit changed')
    })

    it('should delete article by id', async () => {
        expect.assertions(2)

        await expect(dataProvider(DELETE, 'articles', { id: 1 })).resolves.toBeTruthy()
        await expect(dataProvider(GET_ONE, 'articles', { id: 1 })).rejects.toThrow('Not Found')
    })

    afterAll(() => {
        server.close()
    })
})
