"use server"
import Razorpay from "razorpay"
import PaymentModel from "../models/Payment"
import User from "../models/User"
import connectDB from "../db/connectDB"




export const createPayment = async (amount, to_username, paymentform) => {
    await connectDB()
    try {
        let user = await User.findOne({ username: to_username })
        let key = user.razorpayId;
        let secret = user.razorpaySecret;

        const instance = new Razorpay({
            key_id: key,
            key_secret: secret
        })
        
        const payment = await instance.orders.create({
            amount: Number.parseInt(amount),
            currency: "INR",
        })
        await PaymentModel.create({
            order_id: payment.id,
            amount: amount/100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message
        })
        return payment
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (username) => {
    await connectDB()
    try {
        const user = await User.findOne({ username: username })
        const data = user.toObject({ flattenObjectIds: true })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getPayments = async (username) => {
    await connectDB()
    try {
        // fetch all payments for specific user by decresing order
        const payments = await PaymentModel.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
        return payments
    } catch (error) {
        console.log(error)
    }
}


export const updateProfile = async (data, oldUsername) => {
    await connectDB();
    let newData = {};

    if (typeof data === 'object' && data !== null) {
        newData = Object.fromEntries(Object.entries(data));
    } else {
        // Handle the case where data is not an object
        console.error('Data is not an object');
        return; // or throw an error
    }
    
    try {
        if (oldUsername !== newData.username) {
            const user = await User.findOne({ username: newData.username })
            if (user) {
                throw new Error("User already exists")
            }
        }
        await User.updateOne({ email: newData.email }, newData)
    } catch (error) {
        console.log(error);
    }
}

// Function to update user profile
// export const updateProfile = async (data, oldUsername) => {
//     try {
//         const newData = { ...data };
//         const user = await User.findOne({ username: oldUsername });
//         console.log("user@", user)
//         if (!user) throw new Error("User not found");

//         if (newData.username && newData.username !== oldUsername) {
//             const usernameExists = await User.findOne({ username: newData.username });
//             if (usernameExists) throw new Error("Username already exists");
//         }

//         console.log("neuser@", newData)
//         await User.updateOne({ username: oldUsername }, newData);
//         return { success: true, message: "Profile updated successfully" };
//     } catch (error) {
//         console.error(error);
//         return { success: false, message: error.message };
//     }
// };