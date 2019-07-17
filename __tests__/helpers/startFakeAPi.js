import jsonServer from 'json-server'
import db from '../../data/db'

/**
 * Starts fake json server with API on provided port
 * @param  {[Number]} port Port for the api localhost:port
 * @return {[Function]} Function for closing started server
 */
const startFakeApi = (port, customDb) =>
    new Promise((resolve, reject) => {
        try {
            const server = jsonServer.create()
            const router = jsonServer.router(customDb || JSON.parse(JSON.stringify(db)))
            const middlewares = jsonServer.defaults({
                port,
                quiet: true
            })

            server.use(middlewares)
            server.use(router)

            const serverListener = server.listen(port, () => {
                resolve(
                    () =>
                        new Promise((resolve2, reject2) => {
                            try {
                                serverListener.close(resolve2)
                            } catch (e) {
                                console.error(e)
                                reject2()
                            }
                        })
                )
            })
        } catch (e) {
            console.error(e)
            reject()
        }
    })

export { startFakeApi }
