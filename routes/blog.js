const { Router } = require("express");
const path = require("path");
const multer = require("multer");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, fileName);
    },
});

const upload = multer({
    storage,
});

const router = Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;

    const blog = await Blog.create({
        title,
        body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId).populate("createdBy");
    const comments = await Comment.find({ blogId: blogId }).populate(
        "createdBy"
    );

    return res.render("blog", {
        user: req.user,
        blog,
        comments,
    });
});

router.post("/comment/:blogId", async (req, res) => {
    const { content } = req.body;
    const blogId = req.params.blogId;

    Comment.create({
        blogId,
        content,
        createdBy: req.user._id,
    });

    return res.redirect(`/blog/${blogId}`);
});

module.exports = router;
