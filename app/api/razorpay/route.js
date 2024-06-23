import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import PaymentModel from "@/app/models/Payment";
import connectDB from "@/app/db/connectDB";
import User from "@/app/models/User";

export const POST = async (request) => {
    try {
        await connectDB();
        let body = await request.formData();
        body = Object.fromEntries(body);

        const data = await PaymentModel.findOne({ order_id: body.razorpay_order_id });
        if (!data) {
            return NextResponse.json({ success: false, message: "Order Id not found" });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        // Ensure the environment variable is correctly loaded
        let user = await User.findOne({username : data.to_user})
        console.log("user@@", user)
        const secret = user.razorpaySecret;
        if (!secret) {
            throw new Error("Razorpay secret key is not set in environment variables");
        }

        const result = validatePaymentVerification({
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id,
            },
            razorpay_signature,
            secret
        );

        if (result) {
            const payment = await PaymentModel.findOneAndUpdate(
                { order_id: razorpay_order_id },
                { done: "true" },
                { new: true }
            );

            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URI}/${payment.to_user}?paymentdone=true`);
        } else {
            return NextResponse.json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Error during payment verification:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}
