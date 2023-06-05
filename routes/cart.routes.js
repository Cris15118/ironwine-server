const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const Compras = require("../models/Compras.model");

//GET  "/api/cart" devuelve todos los productos del carrito
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const response = await User.findById(userId).populate(
      "cart.productId", // hay que ponerla propiedad dentro del carrito
      "_id name image price"
    ); //* retorna solo los campos especificados dentro del string, separados por espacios

    res.json(response.cart); // retorna el carrito de ese usuario
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//PATCH "/api/:productId/add"  añade un producto a la compra en el array del carrito del usuario
router.patch("/:productId/add", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token
  const { productId } = req.params; //id del producto a añadir
  let updatedUser = null;
  try {
    const foundUser = await User.findOne({
      $and: [{ _id: idUser }, { "cart.productId": productId }],
    });

    if (!foundUser) {
      // si no existe ese producto en el carrito del usuario

      updatedUser = await User.findByIdAndUpdate(
        idUser,
        {
          $push: { cart: { productId } }, //añade un producto al array de carrito
        },
        { new: true }
      ).populate("cart.productId", "_id name image price");
    } else {
      updatedUser = await User.findOneAndUpdate(
        // para encontrar el elemento a actualizar y el indice del carrito
        { $and: [{ _id: idUser }, { "cart.productId": productId }] },
        { $inc: { "cart.$.quantity": 1 } }, // el $ es usado para saber cual es el indice a actualizar
        // incrementa en uno la cantidad de ese produccto
        { new: true }
      )
      .populate("cart.productId", "_id name image price"); //.select({cart:1})
    }

    const productFound = updatedUser.cart.find((eachProduct) => {
      return eachProduct.productId._id.toString() === productId;
    });
    res.json(productFound);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// PATCH "/api/cart/:productId/pull" disminute cantidad del producto del array del carrito del usuario y si es 0 lo elimina
router.patch("/:productId/pull", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id; // id del usuario cogido del token
  const { productId } = req.params; //id del producto a añadir
  let updatedUser = null;
  try {
    const foundUser = await User.findOne(
      {
        $and: [{ _id: idUser }, { "cart.productId": productId }],
      },
      { new: true }
    );

    if (foundUser.cart[0].quantity > 1) {
      // si es mayor que uno resta uno
      updatedUser = await User.findOneAndUpdate(
        { $and: [{ _id: idUser }, { "cart.productId": productId }] },
        { $inc: { "cart.$.quantity": -1 } },
        { new: true }
        // incrementa en uno la cantidad de ese produccto
      ).populate("cart.productId", "_id name image price");
    } else {
      // const response=await User.findByIdAndUpdate(idUser,{$pull:{"cart.$.productId":productId}})
      updatedUser = await User.findByIdAndUpdate(
        idUser,
        {
          $pull: { cart: { productId: productId } },
        },
        { new: true }
      )
        .populate("cart.productId", "_id name image price")
        .select({ cart: 1 });
    }

    const productFound = updatedUser.cart.find((eachProduct) => {
      return eachProduct.productId._id.toString() === productId;
    });
    res.json(productFound);
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
