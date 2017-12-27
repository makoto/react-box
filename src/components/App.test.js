import React from 'react'
import {App} from './App'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15.4';

configure({ adapter: new Adapter() });

function setup(num) {
  const props = {
    storageValue: num || 1,
    setValue: jest.fn(),
    loadValue: jest.fn(),
    initializeWeb3: jest.fn()
  }

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
      expect(enzymeWrapper.find('.storageValue').text()).toBe('The stored value is: 1')
      expect(enzymeWrapper.find('.storageValue').text()).toBe('The stored value is: 1')
    })

    it('should render self', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('.App').hasClass('App')).toBe(true)
      expect(enzymeWrapper.find('h1').text()).toBe('Good to Go!')
    })

    it('should set state value to be props storageValue', () =>{
      const initialValue = 2
      const { enzymeWrapper } = setup(initialValue)
      expect(enzymeWrapper.find('.storageValue').text()).toBe(`The stored value is: ${initialValue}`)
      expect(enzymeWrapper.state().value).toBe(initialValue)
    })

    it('should call loadValue', () => {
      const newValue = 2
      const { enzymeWrapper, props } = setup(0)
      const button = enzymeWrapper.find('.loadValue')
      button.props().onClick()
      expect(props.loadValue.mock.calls.length).toBe(1)
    })

    it('should call setValue with value on input', () => {
      const newValue = 2
      const { enzymeWrapper, props } = setup()
      const button = enzymeWrapper.find('.setValue button')
      const input = enzymeWrapper.find('.setValue input')
      input.simulate('change', {target: {value:2}})
      button.props().onClick()
      expect(props.setValue.mock.calls.length).toBe(1)
      expect(props.setValue.mock.calls[0][0]).toBe(newValue)
    })
  })
})
