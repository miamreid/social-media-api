const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find()
      .select('-__v');
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user by id
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(
        user
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId },
        req.body
      )
      .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No user with that id! '})
      }
      res.json({ message: 'User updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId)
      .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No user found' })
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404)
        .json({ message: 'No user found with id'});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res
        .status(404)
        .json({ message: 'No user found with id' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
