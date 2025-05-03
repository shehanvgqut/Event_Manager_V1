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
}

module.exports = new UserController();
    