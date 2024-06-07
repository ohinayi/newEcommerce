const mongoose = require('mongoose');

const purchasedSchema = mongoose.Schema({
    user_id: {
        type: String,
        required:[true, 'user id is needed']
    },

    product_id: {
        type: String,
        required:[true, 'product id is needed']
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('purchased', purchasedSchema);