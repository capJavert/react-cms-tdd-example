import React from 'react'
import { Admin, Resource } from 'react-admin'
import { LibraryBooks as ArticleIcon } from '@material-ui/icons'
import restProvider from 'ra-data-json-server'

import { ArticleList, ArticleEdit, ArticleCreate } from './screens'

const App: React.SFC = () => {
    return (
        <Admin dataProvider={restProvider('http://localhost:4444')}>
            <Resource name="articles" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} icon={ArticleIcon} />
        </Admin>
    )
}

export default App
