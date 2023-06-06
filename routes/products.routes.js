const router = require("express").Router();
const Product = require("../models/Product.model");

// GET "/api/products" => envia al FE todos los productos
router.get ("/", async (req, res, next)=>{
    try {
        const response = await Product.find().select({name:1, image:1, price:1})
        res.json(response)
        
    } catch (error) {
        next(error)
        console.log(error)
    }
})


//GET "/api/products/:id"=> devuelve los productos con sus detalles
router.get("/:id", async (req, res, next)=>{
    try {
        const response = await Product.findById(req.params.id)
        res.json(response)
    } catch (error) {
        next(error)
        console.log(error)
        
    }


})







module.exports = router;