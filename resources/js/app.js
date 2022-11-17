import axios from 'axios'
import notie from 'notie'

let addToCart = document.querySelectorAll('.add-to-cart')

let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res=>{
        console.log(res);
        cartCounter.innerText = res.data.totalQty
        notie.alert({
           // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
            type:'success',
            text: "Item added to cart",
            //stay: Boolean, // optional, default = false
            //time: Number, // optional, default = 3, minimum = 1,
            //position: String // optional, default = 'top', enum: ['top', 'bottom']
          }).show();
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
    })
})