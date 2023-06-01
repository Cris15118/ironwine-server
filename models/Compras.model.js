const { Schema, model } = require("mongoose");

const compraSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productItem: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }    
  },
  {
    timestamps: true,
  }
);

const Compras = model("Compras", ComprasSchema);

module.exports = Compras;
