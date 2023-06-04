const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//POST "/payment/create-payment-intent" recibe los datos del formulario de pago
router.post("/create-payment-intent", async (req, res, next)=>{
    const productId = req.body._id; //recibiremos el ID de producto que el usuario está tratando de comprar.
    try {
        // todo aquí es donde más tarde obtendrá el precio correcto a pagar
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1400, // este es un ejemplo de una cantidad de 14 EUR utilizada para la prueba..
            currency: "eur",
            automatic_payment_methods: {
              enabled: true,
            },
          });
          // todo parte 2 aquí es donde más tarde creará un Documento de Pago
        res.send({
            clientSecret: paymentIntent.client_secret, // el cliente secreto se enviará al FE despues de la creacion de la intencion de pago en stripe

        })

    } catch (error) {
        next(error)
    }
})




module.exports = router