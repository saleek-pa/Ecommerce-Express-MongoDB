const express = require('express');
const router = express.Router();
const controller = require('../Controllers/userController');
const tryCatch = require('../Middleware/tryCatch');
const checkAuth = require('../Middleware/checkAuth');

router.use(express.json());

router
    .post('/register', tryCatch(controller.register))
    .post('/login', tryCatch(controller.login))
    .use(checkAuth(process.env.USER_ACCESS_TOKEN_SECRET))

    .get('/products', tryCatch(controller.getAllProducts))
    .get('/products/:id', tryCatch(controller.getProductById))
    .get('/products/category/:categoryname', tryCatch(controller.getProductsByCategory))

    .get('/:id/cart', tryCatch(controller.showCart))
    .post('/:id/cart', tryCatch(controller.addToCart))
    .delete('/:id/cart', tryCatch(controller.deleteFromCart))

    .get('/:id/wishlist', tryCatch(controller.showWishlist))
    .post('/:id/wishlist', tryCatch(controller.addToWishlist))
    .delete('/:id/wishlist', tryCatch(controller.deleteFromWishlist))
    
    .post('/:id/payment', tryCatch(controller.payment))
    .get('/:id/success', tryCatch(controller.success))
    .post('/:id/cancel', tryCatch(controller.cancel))

module.exports = router;