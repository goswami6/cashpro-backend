import Blog from "../models/Blog.js";

/* ======================
   GET ALL BLOGS
====================== */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

/* ======================
   CREATE BLOG
====================== */
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      author,
      readTime,
      imageUrl,
    } = req.body;

    // ✅ ALWAYS CORRECT BASE URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const image = req.file
      ? `${baseUrl}/uploads/blogs/${req.file.filename}`
      : imageUrl || "";

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      category,
      author,
      readTime,
      image,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
