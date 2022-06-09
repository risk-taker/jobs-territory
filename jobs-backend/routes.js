const express = require('express');
const loginController = require('./controllers/auth/loginController');
const refreshController = require('./controllers/auth/refreshController');
const registerController = require('./controllers/auth/registerController');
const productController = require('./controllers/product/productController');
const userController = require('./controllers/userController');
const admin = require('./middlewares/admin');
const auth = require('./middlewares/auth');
const router = express.Router();
// routes related to auth
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.post('/refresh', refreshController.refresh);

//routes related to user
router.get('/users/:id', userController.me);
router.get('/users', userController.users);
router.get('/users/blockMe/:id', userController.blockMe);

//routes related to admin
router.post('/add-product', [auth, admin], productController.addProduct);
router.put('/update-product/:id', [auth, admin], productController.updateProduct);
router.get('/products', productController.products);


module.exports = router;