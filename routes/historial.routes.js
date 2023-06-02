const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Compras = require("../models/Compras.model")
const User = require("../models/User.model");

//GET "/api/histoial" => devuelve todos los productos comprados del usuario
router.get("/", isAuthenticated, async (req, res, next)=>{
const userId = req.payload._id

try {
    const response = await Compras.findById(userId).populate("productItem", "name image price")
    res.json("historial de compras actualizado")
    
} catch (error) {
    next(error)
    console.log(error)
    
}


})






module.exports = router;