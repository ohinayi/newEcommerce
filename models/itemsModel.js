const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,'name is a required detail']
    },
    category:{
        type:String,
        required: [true,'category is a required detail']
    },
    size:{
        type:String,
        required: [true,'size is a required detail']
    },
    cost:{
        type:String,
        required: [true,'cost is a required detail']
    },
    description:{
        type:String,
        required: [false,'description is a required detail']
    },
    path:{
        type:String,
        required: [false]
    },
},{
    timestamps: true
},);

module.exports = mongoose.model('item', ItemsSchema);