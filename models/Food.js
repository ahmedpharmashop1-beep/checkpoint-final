const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Pizza", "Burger", "Pasta", "Salad", "Dessert", "Autre"],
        default: "Pizza"
    },
    profile_img: { type: String },
    cloudinary_id: { type: String }
}, { timestamps: true });

module.exports = Food = mongoose.model("Food", foodSchema);