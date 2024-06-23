import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    name: String,
    to_user: String,
    order_id: String,
    message: String,
    amount: Number,
    done: { type: Boolean, default: false }
}, { timestamps: true }); 

export default mongoose.models.Payment || model("Payment", paymentSchema)