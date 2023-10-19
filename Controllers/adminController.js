const User = require('../Models/userSchema')
const Product = require('../Models/productSchema')
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        if (username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ username },
                process.env.ADMIN_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                status: 'success',
                message: 'Successfully Logged In.',
                data: { jwt_token: token }
            })
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    },

    getAllUsers: async (req, res) => {
        const users = await User.find()
        if (users.length == 0) {
            return res.json({ message: "User collection is empty!" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched user datas.',
            data: users
        })
    },

    getUserById: async (req, res) => {
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched user data.',
            data: user
        })

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

    createProduct: async (req, res) => {
        // const id = Date.now()
        const { title, description, image, price } = req.body
        // if (!title && !description && !image && !price) {
        //     return res.status(400).json({ message: "Fields 'title', 'description', 'image' and 'price' are required" });
        // }
        await Product.create({ title, description, image, price })
        res.status(201).json({
            status: 'success',
            message: 'Successfully created a product.',
        })
    },

    updateProduct: async (req, res) => {
        const id = req.params.id
        const { title, description, image, price } = req.body;
        const product = await Product.findByIdAndUpdate(id, {
            $set: { title, description, image, price }
        })
        if (product) {
            res.json({
                status: 'success',
                message: 'Successfully updated a product.',
            })
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    },

    deleteProduct: async (req, res) => {
        const id = req.params.id
        const product = await Product.findByIdAndRemove(id)
        if (product) {
            res.json({
                status: 'success',
                message: 'Successfully deleted a product.',
            })
        } else {
            res.status(404).json({ message: 'Product not found' });

        }
    },

    getStats: async (req, res) => {
        const products = await Product.find();
        // const totalProductsSold = products.reduce((total, product) => total + product.sold, 0);
        // const totalRevenue = products.reduce((total, product) => total + product.price * product.sold, 0);
        const stats = { totalProductsSold, totalRevenue }
        res.json({
            status: 'success',
            message: 'Successfully fetched stats.',
            data: stats
        })
    },

    getOrders: async (req, res) => {
        const orderDetails = null
        res.json({
            status: 'success',
            message: 'Successfully fetched order details.',
            data: orderDetails
        })
    }
}