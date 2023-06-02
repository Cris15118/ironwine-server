const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Product = require("../models/Product.model");
const User = require("../models/User.model");

//GET "/api/wishlist" devuelve todos los productos de la lista de deseos
router.get("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const response = await User.findById(userId).populate(
      "wishList",
      "name image price"
    );
    console.log(response);
    res.json("deseo añadido");
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//PATH "/api/wishlist/:productId/add" añade un producto a la lista de deseos del usuario
router.patch("/:productId/add", isAuthenticated, async (req, res, next) => {
  const idUser = req.payload._id;
  const { productId } = req.params;

  try {
    const response = await User.findByIdAndUpdate(
      idUser,
      {
        $addToSet: { wishList: { productId } },
      },
      { new: true }
    );
    res.json("Deseo editado");
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//PATH "/api/wishlist/:productId/pull" quita un producto del array de la lista de deseos del usuario
router.patch("/:productId/pull", isAuthenticated, async(req, res, next)=>{
    const idUser = req.payload._id
    const {productId} =req.params
    try {
        const response = await User.findByIdAndUpdate(idUser,
            {
                $pull: {wishList: {productId}}
            },{new:true})
            res.json("deseo eliminado")
        
    } catch (error) {
        next(error)
        console.log(error)
    }
})

module.exports = router;
