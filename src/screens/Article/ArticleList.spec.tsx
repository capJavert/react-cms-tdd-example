import React from 'react'
import { List, Datagrid } from 'react-admin'
import { shallow } from 'enzyme'

import ArticleList from './ArticleList'

interface ControllerProps extends Record<string, any> {
    basePath: string
}

const props: ControllerProps = {
    hasCreate: false,
    hasEdit: false,
    hasList: true,
    hasShow: false,
    location: {},
    match: {},
    resource: 'articles',
    basePath: 'articles'
}

test('renders without crashing', () => {
    const wrapper = shallow(<ArticleList {...props} />)
    cExpect(wrapper.find(List)).to.have.lengthOf(1)
    cExpect(wrapper.find(Datagrid)).to.have.lengthOf(1)
})
