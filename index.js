import "./db/index.js";
import express from "express";
import petsRouter from "./routes/pets/petsRouter.js";
import remRouter from "./routes/remRouter.js";
import authRouter from "./routes/authRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import authenticate from "./middleware/authenticate.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/pets", authenticate, petsRouter);
app.use("/reminders", authenticate, remRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("API is working ✅");
});

app.listen(port, () =>
    console.log(`Server listening on port: http://localhost:${port}`)
);
