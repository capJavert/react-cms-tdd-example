import React from 'react'
import { Edit, SimpleForm, TextInput, LongTextInput, DateInput } from 'react-admin'

const ArticleEdit = (props: Record<string, any>) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <LongTextInput source="body" />
            <DateInput label="Publication date" source="published_at" />
        </SimpleForm>
    </Edit>
)

export default ArticleEdit
