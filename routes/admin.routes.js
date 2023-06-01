const router = require("express").Router();

const Product = require("../models/Product.model");
const uploader= require("../middlewares/cloudinary.config")

//POST "/api/admin/create" recoge los datos de creación de productos y los añade a la BD

//router.post("/api/create",uploader.single("image"),async(req,res,next)=>{
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

//PUT "/api/admin/:id" recoge datos de edición de producto y edita en la BD
router.put("/:id",async(req,res,next)=>{

    const {id} = req.params
    const {name,description,price,tipo,bodega,stock} = req.body 

    if(!name || !description || !price || !tipo || !bodega || !stock)
    {
        res.json("Los campos deben de estar llenos")
        return
    }

    try{
        const response = await Product.findByIdAndUpdate(id,{name,description,price,tipo,bodega,stock},{new:true})
        res.json("documento actualizado")
    }
    catch(err)
    {
        console.log(err)
        next(err)
    }
})

//DELETE "/api/admin/:id" borra un producto
router.delete("/:id",async(req,res,next)=>{
    const {id} =req.params
    try{

        await Product.findByIdAndDelete(id)
        res.json("Documento borrado")
    }
    catch(err)
    {
        next(err)
    }
})



module.exports = router;