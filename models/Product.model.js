const { Schema, model } = require("mongoose");

const productSchema = new Schema({
	name: {
	type: String,
	required: true

},
	description: {
	
	type: String,
	required: true,
	maxLength: 500

},
	image:{
	type: String,
	required: true,
    default: "https://volmesbol.com/wp-content/uploads/2018/08/botella-vino.jpg"
},
	price:{
	type: Number,
	required: true
},
	tipo:{
	type: String,
	enum: ["Tinto", "Blanco", "Rosado", "Palo Cortado", "Espumoso"]
},
	bodega: {
	type: String,
	requered: true
	}

})




const Product = model("Product", ProductSchema);

module.exports = Product;