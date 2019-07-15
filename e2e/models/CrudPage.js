class CrudPage {
    static getResourcePath = (resource, basePath) => `${basePath || process.env.API_PATH}/#/${resource}`
}

export default CrudPage
