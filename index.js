import "./db/index.js";
import express from "express";

const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("API is working ✅");
});

app.use(express.json());

app.listen(port, () =>
    console.log(`Server listening on port: http://localhost:${port}`)
);
