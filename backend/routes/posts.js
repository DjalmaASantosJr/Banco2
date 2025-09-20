const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create
router.post("/", async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deletado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
