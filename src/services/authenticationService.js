const jwt = require('jsonwebtoken');
const User = require('../entities/user');
const { hashPassword, comparePassword } = require('../utils/hashHelper');
const {EmailAddressAlreadyUsed,UserNotFounded,PasswordNotValid} = require("../exceptions/authenticationExceptions");


const registerUser = async ( email, password) => {
  const foundedUser = await User.findOne({email});
  if(foundedUser){
     throw new EmailAddressAlreadyUsed("This email address ("+email+") is already used.");
  }
  const hashedPassword = await hashPassword(password);
  const user = new User({  email, password: hashedPassword });
  await user.save();
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new UserNotFounded("Email address is not correct.");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new PasswordNotValid("Password is not correct.");

  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  registerUser,
  loginUser
};

