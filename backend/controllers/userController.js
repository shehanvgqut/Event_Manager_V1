const UserService = require('../services/UserService');

class UserController {
  async createUser(req, res) {
    try {
      const result = await UserService.createUser(req.body);
      return res.status(201).json(result);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: err.message || 'Failed to fetch users' });
    }
  }
}

module.exports = new UserController();
