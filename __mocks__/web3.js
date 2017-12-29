class Web3{
  constructor() {
    this.currentProvider = {}
    this.eth = {
      getAccounts: (cb) => {
        cb(['some account'])
      }
    }
  }
}

Web3.providers = {
  HttpProvider: class Provider{}
}

module.exports = Web3
