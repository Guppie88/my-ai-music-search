const User = require('../models/user.js');

// Create
exports.createNewUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: 'User saved successfully', user });
    } catch (error) {
        res.status(400).send({ error: 'Error saving user', details: error });
    }
};

// Read (get one)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: 'User not found' });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching user', details: error });
    }
};

// Read (get all)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching users', details: error });
    }
};

// Update
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404).send({ message: 'User not found' });
        res.status(200).send({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).send({ error: 'Error updating user', details: error });
    }
};

// Delete
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send({ message: 'User not found' });
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting user', details: error });
    }
};
