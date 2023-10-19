const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cart: [Object],
    wishlist: [Object],
    orders: [Object],
})

module.exports = mongoose.model('User', userSchema)