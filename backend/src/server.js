const express = require("express");
const {notesRoutes} = require("./routes/notes");
const {connectDB} = require("./config/db");
const dotenv = require("dotenv");
const { rateLimiter } = require("./middlewares/rateLimiter");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

if(process.env.NODE_ENV != "production"){
    app.use(cors({
    origin: "http://localhost:5173"
}));
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("(.*)", (_, res) => {
        res.sendFile(__dirname, "../frontend", "dist", "index.html");
});
}

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});