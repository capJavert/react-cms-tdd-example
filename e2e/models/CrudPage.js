class CrudPage {
    static getResourcePath = (resource, basePath) => `${basePath || process.env.APP_PATH}/#/${resource}`
}

export default CrudPage
