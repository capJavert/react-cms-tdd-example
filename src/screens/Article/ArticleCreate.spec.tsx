import React from 'react'
import { Create, SimpleForm } from 'react-admin'
import { shallow } from 'enzyme'

import ArticleCreate from './ArticleCreate'

const props: Record<string, any> = {
    location: {},
    match: {},
    resource: 'articles'
}

test('renders without crashing', () => {
    const wrapper = shallow(<ArticleCreate {...props} />)
    cExpect(wrapper.find(Create)).to.have.lengthOf(1)
    cExpect(wrapper.find(SimpleForm)).to.have.lengthOf(1)
})
