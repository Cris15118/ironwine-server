const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
//POST "/payment/create-payment-intent" recibe los datos del formulario de pago
router.post("/create-payment-intent",isAuthenticated, async (req, res, next)=>{
    const userId=req.payload._id
   
    try {
        const response = await User.findById(userId).populate(
            "cart.productId", // hay que ponerla propiedad dentro del carrito
            "price"
          )
       
         const total=response.cart.reduce((accumulator, eachProduct) => {          
           return accumulator + eachProduct.quantity*eachProduct.productId.price
         },0)
        
        // todo aquí es donde más tarde obtendrá el precio correcto a pagar
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total*100, // le pasamos el precio total calculado del carrito,convertido de centimo a euro
            currency: "eur",
            automatic_payment_methods: {
              enabled: true,
            },
          });
          // todo parte 2 aquí es donde más tarde creará un Documento de Pago
        res.send({
            clientSecret: paymentIntent.client_secret// el cliente secreto se enviará al FE despues de la creacion de la intencion de pago en stripe

        })

    } catch (error) {
        next(error)
    }
})




module.exports = router