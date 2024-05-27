const {BaseException} = require("./baseException");

class EmailAddressAlreadyUsed extends BaseException {
  constructor(message) {
    super(message , 400,"validation error.");
  }
}
class PasswordNotValid extends BaseException {
  constructor(message) {
    super(message , 400,"bad request.");
  }
}
class UserNotFounded extends BaseException {
  constructor(message) {
    super(message , 404,"not found.");
  }
}

module.exports = { EmailAddressAlreadyUsed,PasswordNotValid ,UserNotFounded};