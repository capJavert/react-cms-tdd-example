class CrudPage {
    static getResourcePath = (resource, basePath = 'http://localhost:3000') => `${basePath}/#/${resource}`
}

export default CrudPage
