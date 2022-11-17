const { reset } = require('nodemon');
const Order = require('../../../models/order')
const moment = require('moment')
function orderController(){
    return{
        store(req, res){
            const{phone, address} = req.body;
          
            if(!phone || !address){
                req.flash('error', 'All fields are required');
                return res.redirect('/cart')   
            }
            const order = new Order({
                CustomerId:req.user._id,
                items:req.session.cart.items,
                phone,
                address
            })
            console.log(order);
            order.save().then((result)=>{
               
                req.flash('success', 'Order Placed Successfully')
                return res.redirect('/');
            }).catch(err=>{
                console.log(err);
                req.flash('error', 'Something Went Wrong')
                return res.redirect('/cart')  
            })
        }, 
        async index(req, res){
           
            const orders = await Order.find({CustomerId:req.user._id})
            console.log(orders);
            res.render('customers/orders', {orders:orders, moment:moment});

        }
    }
}
module.exports = orderController;