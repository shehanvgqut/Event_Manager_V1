const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
  async createUser({ name, email, password, role }) {
    if (!name || !email || !password || !role) {
      throw new Error('Please fill all fields');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return { msg: 'User created successfully' };
  }
}

module.exports = new UserService();
