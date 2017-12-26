import React from 'react'
import App from './App'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15.4';

configure({ adapter: new Adapter() });

function setup() {
  const props = {}

  const enzymeWrapper = mount(<App {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('App', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('.App').hasClass('App')).toBe(true)
      expect(enzymeWrapper.find('h1').text()).toBe('Good to Go!')
    })
  })
})
