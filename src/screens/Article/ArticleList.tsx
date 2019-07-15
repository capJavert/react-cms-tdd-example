import React from 'react'
import { List, Datagrid, TextField, DateField, EditButton } from 'react-admin'

const ArticleList = (props: Record<string, any>) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="average_note" />
            <TextField source="views" />
            <EditButton basePath="/posts" />
        </Datagrid>
    </List>
)

export default ArticleList
