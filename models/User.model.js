const { Schema, model, default: mongoose } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username:{
      type:String,
      required:[true, 'Username is required.'],
      unique:true
    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role:{
        type:String,
        enum: ["user","admin"],
        default:"user"
    },
    wishList :[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
    ,
    cart :[{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Product"
  }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
