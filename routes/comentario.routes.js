const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Comentario = require("../models/Comentario.model")

//POST "/comentario/:id/create" recoge los datos del formulario de crear comentario
router.post("/:productId/create",isAuthenticated, async (req, res, next)=>{
    const idUser = req.payload._id;
    const { productId } = req.params;
    try {
        const checkComentario = await Comentario.find({
            product: productId,
            user: idUser
        })

        const createComentario = await Comentario.create({
            user: idUser,
            product: productId,
            comentario: req.body.comentario
        })
        res.json("comentario creado")
    } catch (error) {
        next(error)
    }
})




module.exports = router;