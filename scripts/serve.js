const fs = require('fs')
const http = require('http')
const jsonServer = require('json-server')
const path = require('path')
const publicHandler = require('serve-handler')

const API_PORT = process.env.API_PORT || 4444
const PUBLIC_PORT = process.env.PUBLIC_PORT || 5000
const rootPath = path.join(__dirname, '..')

const servePublic = () => (
    new Promise((resolve, reject) => {
        try {
            const server = http.createServer((request, response) => (
                publicHandler(request, response, {
                    public: `${rootPath}/build`
                })
            ))

            server.listen(PUBLIC_PORT, () => {
                console.log('App is running')
                console.log(`http://localhost:${PUBLIC_PORT}`)
                resolve()
            })
        } catch (e) {
            reject(e)
        }
    })
)

const startJsonServer = () => (
    new Promise((resolve, reject) => {
        try {
            // create .tmp dir if missing
            // copy db.json file
            try {
                fs.mkdirSync(`${rootPath}/.tmp`)
            } catch (e) {
                console.log(e.message)
            }
            fs.copyFileSync(`${rootPath}/data/db.json`, `${rootPath}/.tmp/db.json`)

            const server = jsonServer.create()
            const router = jsonServer.router(`${rootPath}/.tmp/db.json`)
            const middlewares = jsonServer.defaults({
                port: API_PORT
            })

            server.use(middlewares)
            server.use(router)

            return server.listen(API_PORT, () => {
                console.log('JSON Server is running')
                console.log(`http://localhost:${API_PORT}`)
                resolve()
            })
        } catch (e) {
            reject(e)
        }
    })
)

if (process.argv.indexOf('--no-json-server') === -1) {
    startJsonServer()
}

if (process.argv.indexOf('--no-public') === -1) {
    servePublic()
}
