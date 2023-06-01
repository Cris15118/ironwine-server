const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Product = require("../models/Product.model");
const User = require("../models/User.model");

//GET  "/api/cart" devuelve todos los productos del carrito
router.get("/",isAuthenticated,async(req,res,next)=>{

    const userId=req.payload._id 
    try{
        const response = await User.findById(userId).populate("cart","name image price") //* retorna solo los campos especificados dentro del string, separados por espacios
        console.log(response)
        res.json(response)
    }
    catch(err)
    {
        console.log(err)
        next(err)
    }
})


//PUT "/api/cart"  añade un producto a la compra en el array del carrito del usuario
router.put("/:id", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token
  const { id } = req.params; //id del producto a añadir
  try {
    const response = await User.findByIdAndUpdate(
      idUser,
      {
        $push: { cart: id }, //añade un producto al array de carrito
      },
      { new: true }
    );
    res.json("Documento editado");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// PUT "/api/cart/:id/pull" quita producto del array del carrito del usuario
router.put("/:id/pull", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token
  const { id } = req.params; //id del producto a añadir
  try {
    const response = await User.findByIdAndUpdate(
      idUser,
      {
        //todo PREGUNTAR PARA SOLO QUITAR UNO AUNQUE COINCIDAN LAS IDS
        $pull: { cart: id }, //añade un producto al array de carrito
      },
      { new: true }
    );
    res.json("Documento editado pull");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
