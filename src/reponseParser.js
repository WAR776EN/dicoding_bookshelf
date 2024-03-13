const { RESPONSE_STATUS } = require("./enum")

exports.ok = (message, data) => {
  return {
    status: RESPONSE_STATUS.success,
    message,
    data
  }
}

exports.failed = (message, data) => {
  return {
    status: RESPONSE_STATUS.success,
    message,
    data
  }
}