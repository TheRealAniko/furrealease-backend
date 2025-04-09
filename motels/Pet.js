import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const petSchema = new Schema(
    {
        name: { type: String, required: [true, "Name is required."] },
        petOwner: {
            type: ObjectId,
            ref: "User",
            required: [true, "Petowner is required."],
        },
        photoUrl: { type: String },
        birthdate: { type: Date },
        species: { type: String, required: [true, "Species is required."] },
        breed: { type: String },
        sex: { type: String, enum: ["male", "female", "unknown"] },
        color: { type: String },
        intact: {
            type: String,
            enum: ["intact", "neutered", "unknown"],
            default: "unknown",
        }, // true = nicht kastriert
        chipped: {
            type: String,
            enum: ["yes", "no", "unknown"],
            default: "unknown",
        },
        chipNumber: {
            type: String,
            validate: {
                validator: function (v) {
                    return !this.chipped || !!v;
                },
                message: "Chip number is required if pet is chipped.",
            },
        }, // optional, only relevant if chipped = true
        status: {
            type: String,
            enum: ["active", "sleeping"],
            default: "active",
        },
        sleepingSince: {
            type: Date,
        },

        vaccinationPassUrl: { type: String },
        vaccinations: [
            {
                name: String,
                date: Date,
                status: String,
            },
        ],
        medications: [
            {
                name: String,
                dosage: String,
                date: Date,
                status: String,
            },
        ],
        vetVisits: [
            {
                date: Date,
                reason: String,
                feedback: String,
                documentUrl: String,
            },
        ],
        weightHistory: [
            {
                date: {
                    type: Date,
                    required: true,
                },
                weight: {
                    type: Number,
                    required: true,
                },
            },
        ],
        notes: [
            {
                date: Date,
                time: String,
                category: { type: String, default: "Other" },
                note: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);

export default model("Pet", petSchema);
