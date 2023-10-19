const User = require('../Models/userSchema')
const Product = require('../Models/productSchema')
const jwt = require('jsonwebtoken');

module.exports = {
    registration: async (req, res) => {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: "Fields 'username' and 'password' are required" });
        }
        await User.create({ username, password });
        res.json({
            status: 'success',
            message: "Admin account registered successfully"
        })
    },

    login: async (req, res) => {
        const { username, password } = req.body
        const user = await User.findOne({ username, password });
        if (user) {
            const token = jwt.sign({ username },
                process.env.USER_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                status: 'success',
                message: 'Successfully Logged In.',
                data: { jwt_token: token }
            })
        } else res.status(401).json({ message: 'Authentication failed' });
    },

    getAllProducts: async (req, res) => {
        const products = await Product.find()
        if (products.length == 0) {
            return res.json({ message: "Product collection is empty!" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched products detail.',
            data: products
        })
    },

    getProductById: async (req, res) => {
        const id = req.params.id
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched product details.',
            data: product
        })

    },

    getProductsByCategory: async (req, res) => {
        const category = req.query.category
        const products = await Product.findById({ category })
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched products details.',
            data: products
        })
    },

    showCart: async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }
        const cartItems = user.cart;
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched cart items.',
            data: cartItems,
        });
    },

    // addToCart: async (req, res) => {
    //     const id = req.params.id
    //     const user = await User.findById(id);
    //     if (!user) { return res.status(404).json({ message: 'User not found' }) }
    //     const { product } = req.body
    //     if (product) {
    //         await User.updateOne({ _id: userId }, { $push: { cart: productId } });
    //         return res.status(404).json({ message: 'Product not found' })
    //     }
    //     user.cart.push(product)
    //     const productExists = Product.findOne();

    //     if (productExists) {
    //         // The product exists in the list
    //         // You can perform additional actions here
    //         res.status(200).json({ message: 'Product exists in the list' });
    //     } else {
    //         // The product does not exist in the list
    //         // You can handle this case accordingly
    //         res.status(404).json({ message: 'Product not found in the list' });
    //     }
    // }


    // showWishlist
    // addToWishlist
    // deleteFromWishlist
}