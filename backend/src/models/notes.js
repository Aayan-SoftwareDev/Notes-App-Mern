const mongoose = require("mongoose");

const model = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    }
    },
    {timestamps:true}
);

const Note = mongoose.model("Note", model);

module.exports = {
    Note
}