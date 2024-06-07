const users = require ('../controllers/usersController');
const express = require('express');
const router = express.Router();

router.route('/users').get(users.getUsers)
router.route('/user/:id').get(users.getUser)
router.route('/userCreate').post(users.createUsers)
router.route('/userUpdate/:id').put(users.updateUsers)
router.route('/userDelete/:id').delete(users.deleteUsers)
router.route('/userLogin').post(users.loginUser)

module.exports = router;