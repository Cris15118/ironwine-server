const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Product = require("../models/Product.model");
const User = require("../models/User.model");

//GET  "/api/cart" devuelve todos los productos del carrito
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const response = await User.findById(userId).populate(
      "cart",
      "name image price"
    ); //* retorna solo los campos especificados dentro del string, separados por espacios
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//PATCH "/api/:productId/add"  añade un producto a la compra en el array del carrito del usuario
router.patch("/:productId/add", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token
  const { productId } = req.params; //id del producto a añadir
  try {
    console.log("productId", productId);
    const foundUser = await User.findByIdAndUpdate(idUser, {
      cart: { $elemMatch: { productId: productId } },
    });
    console.log("foundUser", foundUser.cart);
    if (!foundUser) {
      // si no existe ese producto en el carrito del usuario

      await User.findByIdAndUpdate(
        idUser,
        {
          $push: { cart: { productId } }, //añade un producto al array de carrito
        },
        { new: true }
      );
      res.json("!foundUser Documento editado");
    } else {
      // const response=await User.findOneAndUpdate(
      //   { _id: idUser, cart: { productId: productId } },
      //   { $inc: { quantity: 1 } } // vuelve a meter todos los carritos
       
      // );
      const response=await User.findOneAndUpdate(
        { _id: idUser, "cart._id": productId } ,{ $inc: { "cart.$.quantity": 1 }}
        
        // vuelve a meter todos los carritos
       
      );
      console.log("response",response)
      res.json("foundUser Documento editado");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// PATCH "/api/cart/:productId/pull" quita producto del array del carrito del usuario
router.patch("/:productId/pull", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token
  const { productId } = req.params; //id del producto a añadir
  try {
    //busca el carrito del usuario con esa id
    const foundUser = await User.findById(idUser);
    const cart = foundUser.cart;

    for (let i = 0; i < cart.length; i++) {
      //encuentra el primer elemento del carrito que coincida con el id y lo quita del array
      if (cart[i].toString() === productId) {
        cart.splice(i, 1);
        break; // solo queremos la primera coincidencia
      }
    }

    res.json(cart, "un elemento eliminado del carrito");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// PUT "/api/cart/deleteall" vacía carrito
router.put("/deleteall", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token

  try {
    await User.findByIdAndUpdate(idUser, { cart: [] }); // quita todos los elementos del array de ese usuario
    res.json("Carrito vacío");
  } catch (err) {
    next(err);
  }
});

module.exports = router;