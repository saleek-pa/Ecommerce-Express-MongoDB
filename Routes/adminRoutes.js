const express = require('express');
const router = express.Router();
const controller = require('../Controllers/adminController');
const tryCatch = require('../Middleware/tryCatch');
const checkAuth = require('../Middleware/checkAuth');

router.use(express.json());

router
    .post('/login', tryCatch(controller.login))
    .use(checkAuth)

    .get('/users', tryCatch(controller.getAllUsers))
    .get('/users/:id', tryCatch(controller.getUserById))

    .get('/products', tryCatch(controller.getAllProducts))
    .get('/products/:id', tryCatch(controller.getProductById))
    .get('/products/category', tryCatch(controller.getProductsByCategory))
    .post('/products', tryCatch(controller.createProduct))
    .put('/products', tryCatch(controller.updateProduct))
    .delete('/products', tryCatch(controller.deleteProduct))

    .get('/stats', tryCatch(controller.getStats))
    .get('/orders', tryCatch(controller.getOrders))


module.exports = router;

// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/adminController');
// const tryCatch = require('../Middleware/tryCatch');
// const checkAuth = require('../Middleware/checkAuth');

// router.use(express.json());

// router.post('/login', tryCatch(controller.login));
// router.use(checkAuth);

// router.get('/users', tryCatch(controller.getUsers));
// router.get('/users/:id', tryCatch(controller.getUserById));

// router.route('/products')
//     .get(tryCatch(controller.getProducts))
//     .post(tryCatch(controller.createProduct))
//     .put(tryCatch(controller.updateProduct))
//     .delete(tryCatch(controller.deleteProduct));

// router.get('/products/:id', tryCatch(controller.getProductById));
// router.get('/products/category', tryCatch(controller.getProductsByCategory));
// router.get('/stats', tryCatch(controller.getStats));
// router.get('/orders', tryCatch(controller.getOrders));


// module.exports = router;