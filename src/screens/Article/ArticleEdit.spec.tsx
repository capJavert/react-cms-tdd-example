import React from 'react'
import { Edit, SimpleForm } from 'react-admin'
import { shallow } from 'enzyme'

import ArticleEdit from './ArticleEdit'

const props: Record<string, any> = {
    id: 1,
    location: {},
    match: {},
    resource: 'articles'
}

test('renders without crashing', () => {
    const wrapper = shallow(<ArticleEdit {...props} />)
    cExpect(wrapper.find(Edit)).to.have.lengthOf(1)
    cExpect(wrapper.find(SimpleForm)).to.have.lengthOf(1)
})
