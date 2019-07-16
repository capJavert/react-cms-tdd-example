import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect as chaiExpect } from 'chai'
import 'jest-enzyme'

// make chai expect style assertions available through cExpect global
// https://www.npmjs.com/package/chai
global.cExpect = chaiExpect

Enzyme.configure({ adapter: new Adapter() })
