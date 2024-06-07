const userDb = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const getUsers = async (req, res) => {
    const users = await userDb.find();
    return res.status(200).json(users);
}

const createUsers = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: false
    }
    if (!newUser.name || !newUser.email || !newUser.password) {
        return res.status(400).json({ 'message': 'all field are required.' });
    }
    const exist = await userDb.findOne({ email: newUser.email });
    if (exist) {
        return res.status(400).json('This email has already been registered');
    }
    const accessToken = jwt.sign({
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        },
    }, process.env.SECRET_KEY,
        { expiresIn: "200m" }
    );
    await userDb.create(newUser)
    return res.status(201).json(accessToken);

}

const updateUsers = async (req, res) => {
    const user = await userDb.findById(req.params.id);
    if (!user) {
        return res.status(400).json({ 'message': 'id doesn\'t exist' });
    }
    const updatedUser = await userDb.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    return res.status(200).json(updatedUser);
}

const getUser = async (req, res) => {
    const user = await userDb.findById(req.params.id);
    return res.status(200).json(user);
}

const deleteUsers = async (req, res) => {
    const user = await userDb.findByIdAndDelete(req.params.id);
    return res.status(200).json({ 'message': 'user deleted succesfully' });
}

const loginUser = async (req, res) => {
    const email = req.body.email;
    const exist = await userDb.findOne({ email: email });
    if (!exist) {
        return res.status(400).json('This email does not exist');
    }
    const password = req.body.password;
    if (exist && await bcrypt.compare(password,exist.password)) {
        const accessToken = jwt.sign({
            user: {
                id: exist.id,
                name: exist.name,
                email: exist.email,
                isAdmin: exist.isAdmin
            },
        }, process.env.SECRET_KEY,
            { expiresIn: "200m" }
        );
        return res.status(200).json(accessToken);
    }
    return res.status(400).json( 'wrong password please input the wright password');
}

module.exports = { getUsers, createUsers, getUser, updateUsers, deleteUsers, loginUser};