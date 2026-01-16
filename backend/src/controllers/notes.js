const {Note} = require("../models/notes");

async function showPosts(_, res) {
    try {
        const posts = await Note.find().sort({createdAt:-1});
        if(!posts) return res.status(404).json({message:"There are no posts"});
        return res.status(200).json(posts);
    } catch(e){
        console.error("Server Error");
        return res.status(500).json({message:e});
    }
};

async function showPostById(req, res) {
    try {
        const id = req.params.id;
        const postById = await Note.findById(id);
        if(!postById) return res.status(404).json({message:"Post Not Found!"});
        return res.status(200).json(postById);
    } catch(e) {
        console.error("Server Error", e);
        return res.status(500).json({message:"Server Error!"});
    }
}

async function createPost(req, res) {
    try {
        const body = req.body;
        if((!body.content || !body.title) && (!(body.content && body.title) == String)){
            return res.status(400).json({message:"Incomplete or incorrect body!"});
        }; 

        const newNote = await Note.insertOne({
            title: body.title,
            content: body.content
        });

        if(!newNote) return res.status(404).json({message:"Note not found"});

        return res.status(201).json(newNote);

    } catch(e){
        console.error("Server error!");
        return res.status(500).json({message:e});
    };
};

async function updatePost(req, res) {
    try {
        const id = req.params.id;
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content});
        if(!updatedNote) return res.status(404).json({message:"Note not found"});
        return res.status(200).json(updatedNote);
    } catch(e){
        console.error("Server error!", e);
        return res.status(500).json({message:"Server Error"});
    }
};

async function deletePost(req, res) {
    try {
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        return res.status(200).json(deletedNote);
    } catch (e) {
        console.error("Server error encountered");
        return res.status(500).json(e);
    }
};

module.exports = {
    showPosts,
    createPost,
    updatePost,
    deletePost,
    showPostById
};
