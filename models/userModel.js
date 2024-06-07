const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'the name field is needed']
    },
    email: {
        type: String,
        required: [true, 'the email field is needed']
    },
    password: {
        type: String,
        required: [true, 'the password field is needed']
    },
    isAdmin: {
        type: Boolean,
        required: [true, 'this field is needed']
    }
},{timestamps:true},
);

module.exports = mongoose.model('ohinayi',userSchema);