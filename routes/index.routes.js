const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth",require("./auth.routes"))
router.use("/upload",require("./upload.routes")) //cloudinary
router.use("/admin",require("./admin.routes")) //rutas administrador
router.use("/cart",require("./cart.routes")) //rutas carrito compra


module.exports = router;
