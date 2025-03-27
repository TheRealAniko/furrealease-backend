import "./db/index.js";
import express from "express";
import petsRouter from "./routes/pets/petsRouter.js";
import remRouter from "./routes/remRouter.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/pets", petsRouter);
app.use("/reminders", remRouter);

app.get("/", (req, res) => {
    res.send("API is working ✅");
});

app.listen(port, () =>
    console.log(`Server listening on port: http://localhost:${port}`)
);
