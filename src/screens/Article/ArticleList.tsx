import React from 'react'
import { List, Datagrid, TextField, DateField, EditButton } from 'react-admin'

const ArticleList: React.SFC<React.PropsWithChildren<{ basePath: string }>> = props => {
    const { basePath } = props

    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="title" />
                <DateField source="published_at" />
                <TextField source="average_note" />
                <TextField source="views" />
                <EditButton basePath={basePath} />
            </Datagrid>
        </List>
    )
}

export default ArticleList
