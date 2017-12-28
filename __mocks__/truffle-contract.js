// mock the file to stop "TypeError: (intermediate value).toBigNumber is not a function" error when importing the module.

module.exports = () => {}
