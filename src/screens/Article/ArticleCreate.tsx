import React from 'react'
import { Create, SimpleForm, TextInput, LongTextInput, DateInput } from 'react-admin'

const ArticleCreate: React.SFC = props => (
    <Create {...props}>
        <SimpleForm
            data-test="create-form"
            validate={({ title }: { title: string }) => ({
                title: !title ? 'Title is required' : undefined
            })}>
            <TextInput required data-test="input-title" source="title" />
            <TextInput data-test="input-teaser" source="teaser" />
            <LongTextInput data-test="input-body" source="body" />
            <DateInput data-test="input-published_at" label="Publication date" source="published_at" />
        </SimpleForm>
    </Create>
)

export default ArticleCreate
