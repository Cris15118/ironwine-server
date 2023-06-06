const { Schema, model, default: mongoose } = require("mongoose");

const comentariosSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    comentario: {
        type: String,
        required: true
    }
})
const Comentario = model("Comentario", comentariosSchema)

module.exports = Comentario