const express = require("express");
const {notesRoutes} = require("./routes/notes");
const {connectDB} = require("./config/db");
const dotenv = require("dotenv");
const { rateLimiter } = require("./middlewares/rateLimiter");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});