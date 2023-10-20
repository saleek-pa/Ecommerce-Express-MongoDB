const User = require('../Models/userSchema')
const Product = require('../Models/productSchema')
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
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
        const category = req.params.categoryname
        console.log(category)
        const products = await Product.find({ category })
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

    addToCart: async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productId } = req.body
        const product = await Product.findById(productId);
        if (!product) { return res.status(404).json({ message: 'Product not found' }) }

        await User.findByIdAndUpdate(id, { $push: { cart: product } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully added to cart'
        });
    },

    deleteFromCart: async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productId } = req.body
        const product = await Product.findById(productId);
        // const inCart = user.cart.some(cartItem => cartItem === product);
        // if (!inCart) { return res.status(404).json({ message: 'Product not in cart' }) }

        await User.findByIdAndUpdate(id, { $pull: { cart: product } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted from cart'
        });
    },

    showWishlist: async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }
        const cartItems = user.wishlist;
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched wishlist.',
            data: cartItems,
        });
    },

    addToWishlist: async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productId } = req.body
        const product = await Product.findById(productId);
        if (!product) { return res.status(404).json({ message: 'Product not found' }) }

        await User.findByIdAndUpdate(id, { $push: { wishlist: product } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully added to wishlist'
        });
    },

    deleteFromWishlist: async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productId } = req.body
        const product = await Product.findById(productId);
        // const inWishlist = user.wishlist.some(wishlistItem => wishlistItem === product);
        // if (!inWishlist) { return res.status(404).json({ message: 'Product not in wishlist' }) }

        await User.findByIdAndUpdate(id, { $pull: { wishlist: product } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted from wishlist'
        });
    }
}