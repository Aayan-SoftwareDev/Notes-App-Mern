const express = require("express");
const {showPosts, createPost, updatePost, deletePost, showPostById} = require("../controllers/notes");

const notesRoutes = express.Router();

notesRoutes.get("/", showPosts);

notesRoutes.get("/:id", showPostById);

notesRoutes.post("/", createPost);

notesRoutes.put("/:id", updatePost);

notesRoutes.delete("/:id", deletePost);

module.exports = {
    notesRoutes,
};