import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const reminderSchema = new Schema(
    {
        title: { type: String, required: [true, "title is required."] },
        date: { type: Date, required: [true, "Date is required."] },
        petId: {
            type: ObjectId,
            ref: "Pet",
        },
        category: {
            type: String,
            enum: [
                "medication",
                "vet",
                "birthday",
                "supply",
                "grooming",
                "other",
            ],
        },
        recurring: {
            type: String,
            enum: ["none", "daily", "weekly", "monthly", "yearly"],
            default: "none",
        },
        notes: String,
        status: {
            type: String,
            enum: ["pending", "done", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default model("Reminder", reminderSchema);
