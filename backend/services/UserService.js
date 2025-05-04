const User = require('../models/User');
const bcrypt = require('bcrypt');
const UserBuilder = require('./UserBuilder');

class UserService {
  async createUser({ name, email, password, role, university, address, contactNumber }) {
    this._validateFields({ name, email, password, role, university, address, contactNumber });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // const hashedPassword = await this._hashPassword(password);

    // Use UserBuilder to build the user object
    const user = new UserBuilder()
      .setName(name)
      .setEmail(email)
      .setPassword(password)
      .setRole(role)
      .setUniversity(university)
      .setAddress(address)
      .setContactNumber(contactNumber)
      .build();

    const newUser = new User(user);
    await newUser.save();
    return { msg: 'User created successfully' };
  }

  //Get all the users
  async getAllUsers() {
    try {
      const users = await User.find().select('-password');  // never send passwords
      return users;
    } catch (err) {
      console.error('Error fetching users:', err);
      throw new Error('Failed to fetch users');
    }
  }


  // Private: validate required fields
  _validateFields(fields) {
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        throw new Error(`Field '${key}' is required`);
      }
    }
  }

  // Private: hash password
  async _hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}

module.exports = new UserService();
