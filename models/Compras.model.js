const { Schema, model,  default: mongoose } = require("mongoose");

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

const Compras = model("Compras", compraSchema);

module.exports = Compras;
