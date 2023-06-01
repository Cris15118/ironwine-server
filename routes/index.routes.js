const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/auth",require("./auth.routes"))
router.use("/upload",require("./upload.routes")) //cloudinary
router.use("/admin",require("./admin.routes")) //rutas administrador


module.exports = router;
