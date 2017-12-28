const truffleContract = () => {
  const contract = {
    set: {
      sendTransaction: (value) => {
        return new Promise(
          (resolve, reject) => {
            resolve()
          }
        )
      }
    },
    get: {
      call: () => {
        return new Promise(
          (resolve, reject) => {
            resolve(truffleContract.__mockLoadValue)
          }
        )
      }
    }
  }
  return {
    setProvider: () => {
    },
    deployed: () => {
      return contract
    }
  }
}
module.exports = truffleContract
