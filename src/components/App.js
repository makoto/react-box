import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import React, { Component } from 'react'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../App.css'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.storageValue || ''
    }
  }

  componentDidMount() {
    this.props.initializeWeb3()
  }

  handleLoad() {
    this.props.loadValue()
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  handleSave() {
    this.props.setValue(this.state.value)
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <span className="storageValue">
                The stored value is: {this.props.storageValue}
              </span>

              <button className="loadValue" onClick={this.handleLoad.bind(this)}>Load value</button>
              <div className="setValue">
                  <input
                    type="text"
                    onChange={this.handleChange.bind(this)}
                    placeholder="Set new value"
                    value={this.state.value}
                  />
                  <button className="btn btn-success pull-right" onClick={this.handleSave.bind(this)}>Send transaction</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    storageValue: state.storageValue && state.storageValue.toNumber()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setValue: (value) => {
      dispatch(actions.setValue(value))
    },
    loadValue: () => {
      dispatch(actions.loadValue())
    },
    initializeWeb3: () => {
      dispatch(actions.initializeWeb3())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
