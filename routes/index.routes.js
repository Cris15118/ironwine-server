const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth",require("./auth.routes"))
router.use("/upload",require("./upload.routes")) //cloudinary
router.use("/admin",require("./admin.routes")) //rutas administrador
router.use("/cart",require("./cart.routes")) //rutas carrito compra
router.use("/products",require("./products.routes")) //rutas carrito compra
router.use("/wishlist", require("./wishlist.routes")) // rutas de lista de deseos
router.use("/historial", require("./historial.routes")) // ruta del historial de la compras

module.exports = router;
