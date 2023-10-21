const User = require('../Models/userSchema')
const Product = require('../Models/productSchema')
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
        const productID = req.params.id
        const product = await Product.findById(productID)
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
        const userID = req.params.id
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }
        const cartItems = user.cart;
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched cart items.',
            data: cartItems,
        });
    },

    addToCart: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productID } = req.body
        const product = await Product.findById(productID);
        if (!product) { return res.status(404).json({ message: 'Product not found' }) }

        await User.findByIdAndUpdate(userID, { $push: { cart: product } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully added to cart'
        });
    },

    deleteFromCart: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productId } = req.body
        const product = await Product.findById(productId);
        // const inCart = user.cart.some(cartItem => cartItem === product);
        // if (!inCart) { return res.status(404).json({ message: 'Product not in cart' }) }

        await User.findByIdAndUpdate(userID, { $pull: { cart: product } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted from cart'
        });
    },

    showWishlist: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }
        const cartItems = user.wishlist;
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched wishlist.',
            data: cartItems,
        });
    },

    addToWishlist: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productId } = req.body
        const product = await Product.findById(productId);
        if (!product) { return res.status(404).json({ message: 'Product not found' }) }

        await User.findByIdAndUpdate(userID, { $push: { wishlist: product } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully added to wishlist'
        });
    },

    deleteFromWishlist: async (req, res) => {
        const userID = req.params.id
        const user = await User.findById(userID);
        if (!user) { return res.status(404).json({ message: 'User not found' }) }

        const { productId } = req.body
        const product = await Product.findById(productId);
        // const inWishlist = user.wishlist.some(wishlistItem => wishlistItem === product);
        // if (!inWishlist) { return res.status(404).json({ message: 'Product not in wishlist' }) }

        await User.findByIdAndUpdate(userID, { $pull: { wishlist: product } });
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted from wishlist'
        });
    },

    payment: async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Product Name',
                        },
                        unit_amount: 1000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://yourwebsite.com/success',
            cancel_url: 'https://yourwebsite.com/cancel',
        });

        // res.redirect(session.url);
    }
}