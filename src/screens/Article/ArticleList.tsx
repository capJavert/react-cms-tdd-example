import React from 'react'
import { List, Datagrid, TextField, DateField, EditButton } from 'react-admin'

const ArticleList: React.SFC<React.PropsWithChildren<{ basePath: string }>> = props => {
    const { basePath } = props

    return (
        <List {...props}>
            <Datagrid>
                <TextField data-test="field-id" source="id" />
                <TextField data-test="field-title" source="title" />
                <DateField data-test="field-published_at" source="published_at" />
                <EditButton basePath={basePath} />
            </Datagrid>
        </List>
    )
}

export default ArticleList
