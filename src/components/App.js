import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import React, { Component } from 'react'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import '../App.css'

export class App extends Component {
  constructor(props) {
    console.log('props', props)
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
    setValue: () => {
      dispatch(actions.setValue())
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
//
//
// class App extends Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       storageValue: 0,
//       web3: null
//     }
//   }
//
//   componentWillMount() {
//     // Get network provider and web3 instance.
//     // See utils/getWeb3 for more info.
//
//     getWeb3
//     .then(results => {
//       this.setState({
//         web3: results.web3
//       })
//
//       // Instantiate contract once web3 provided.
//       this.instantiateContract()
//     })
//     .catch(() => {
//       console.log('Error finding web3.')
//     })
//   }
//
//   instantiateContract() {
//     /*
//      * SMART CONTRACT EXAMPLE
//      *
//      * Normally these functions would be called in the context of a
//      * state management library, but for convenience I've placed them here.
//      */
//
//     const contract = require('truffle-contract')
//     const simpleStorage = contract(SimpleStorageContract)
//     simpleStorage.setProvider(this.state.web3.currentProvider)
//
//     // Declaring this for later so we can chain functions on SimpleStorage.
//     var simpleStorageInstance
//
//     // Get accounts.
//     this.state.web3.eth.getAccounts((error, accounts) => {
//       simpleStorage.deployed().then((instance) => {
//         simpleStorageInstance = instance
//
//         // Stores a given value, 5 by default.
//         return simpleStorageInstance.set(5, {from: accounts[0]})
//       }).then((result) => {
//         // Get the value from the contract to prove it worked.
//         return simpleStorageInstance.get.call(accounts[0])
//       }).then((result) => {
//         // Update state with the result.
//         return this.setState({ storageValue: result.c[0] })
//       })
//     })
//   }
//
//   render() {
//     return (
//       <div className="App">
//         <nav className="navbar pure-menu pure-menu-horizontal">
//             <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
//         </nav>
//
//         <main className="container">
//           <div className="pure-g">
//             <div className="pure-u-1-1">
//               <h1>Good to Go!</h1>
//               <p>Your Truffle Box is installed and ready.</p>
//               <h2>Smart Contract Example</h2>
//               <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
//               <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
//               <p>The stored value is: {this.state.storageValue}</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
// }
//
// export default App
