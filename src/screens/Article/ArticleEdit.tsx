import React from 'react'
import { Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin'

const ArticleEdit: React.SFC = props => (
    <Edit {...props}>
        <SimpleForm
            data-test="edit-form"
            validate={({ title }: { title: string }) => ({
                title: !title ? 'Title is required' : undefined
            })}>
            <DisabledInput required data-test="input-id" source="id" />
            <TextInput required data-test="input-title" source="title" />
            <TextInput data-test="input-teaser" source="teaser" />
            <LongTextInput data-test="input-body" source="body" />
            <DateInput data-test="input-published_at" label="Publication date" source="published_at" />
        </SimpleForm>
    </Edit>
)

export default ArticleEdit
