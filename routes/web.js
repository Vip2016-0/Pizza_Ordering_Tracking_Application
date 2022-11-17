
const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const guest = require('../app/http/middlewares/guest')
const orderController = require('../app/http/controllers/customers/orderController');
function initRoutes(app){

    app.get('/', homeController().index);   
    app.get('/cart', cartController().index);
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)    
    app.post('/update-cart', cartController().update)    
    app.post('/logout', authController().logout)
    app.post('/orders', orderController().store)
    app.get('/customer/orders', orderController().index);
}

module.exports = initRoutes