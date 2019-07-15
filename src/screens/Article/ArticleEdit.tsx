import React from 'react'
import { Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin'

const ArticleEdit = (props: Record<string, any>) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" />
            <LongTextInput source="body" />
            <DateInput label="Publication date" source="published_at" />
        </SimpleForm>
    </Edit>
)

export default ArticleEdit
