const router = require("express").Router();

const Product = require("../models/Product.model");
const uploader= require("../middlewares/cloudinary.config")

//POST "/admin/create" recoge los datos de creación de productos y los añade a la BD

//router.post("/create",uploader.single("image"),async(req,res,next)=>{
    router.post("/create",async(req,res,next)=>{
const {name,description,price,tipo,bodega,stock} = req.body 


try{
    await Product.create({
      
        name,description,price,tipo,bodega,stock//!  probar imagen
       // name,description,price,tipo,bodega,stock,image:req.file.path //!  probar imagen
    })
    res.json("Documento creado")

}
catch(err)
{
    console.log(err)
    next(err)
}

})




module.exports = router;