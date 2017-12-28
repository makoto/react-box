const truffleContract = () => {
  console.log('*** connect mock')
  const contract = {
    set: {
      sendTransaction: () => {
        console.log('*** sendTransaction mock')
        return contract
      }
    },
    get: {
      call: () => {
        console.log('*** call mock')
        return new Promise(
          (resolve, reject) => {
            resolve(truffleContract.__mockResponse)
          }
        )
      }
    }
  }
  return {
    setProvider: () => {
      console.log('*** setProvider mock')
    },
    deployed: () => {
      return contract
    }
  }
}
module.exports = truffleContract
