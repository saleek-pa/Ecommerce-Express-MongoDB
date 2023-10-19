const express = require('express');
const router = express.Router();
const controller = require('../Controllers/userController');
const tryCatch = require('../Middleware/tryCatch');
const checkAuth = require('../Middleware/checkAuth');

router.use(express.json());

router
    .post('/register', tryCatch(controller.register))
    .post('/login', tryCatch(controller.login))
    .use(checkAuth)

    .get('/products', tryCatch(controller.getAllProducts))
    .get('/products/:id', tryCatch(controller.getProductById))
    .get('/products/category/:categoryname', tryCatch(controller.getProductsByCategory))

    .get('/:id/cart', tryCatch(controller.showCart))
    .post('/:id/cart', tryCatch(controller.addToCart))

    .get('/:id/wishlists', tryCatch(controller.showWishlist))
    .post('/:id/wishlists', tryCatch(controller.addToWishlist))
    .delete('/:id/wishlists', tryCatch(controller.deleteFromWishlist))

module.exports = router;