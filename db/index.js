import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGO_URI)
    .then((client) => {
        console.log(`✅ Connected to MongoDB @ ${client.connection.host}`);
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    });
