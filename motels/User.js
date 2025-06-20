import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        firstName: { type: String, required: [true, "Firstname is required."] },
        lastName: { type: String, required: [true, "Lastname is required."] },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid email address."],
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            select: false,
        },
        photoUrl: { type: String },
    },
    { timestamps: true }
);

export default model("User", userSchema);
