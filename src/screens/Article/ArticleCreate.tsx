import React from 'react'
import { Create, SimpleForm, TextInput, LongTextInput, DateInput } from 'react-admin'

const ArticleEdit: React.SFC = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" />
            <LongTextInput source="body" />
            <DateInput label="Publication date" source="published_at" />
        </SimpleForm>
    </Create>
)

export default ArticleEdit
