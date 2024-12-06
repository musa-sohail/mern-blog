const Blog = require('../models/blog');
const path = require('path');

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, category, author, content } = req.body;
    const imagePath = `/uploads/images/${req.file.filename}`;

    const newBlog = new Blog({
      title,
      category,
      author,
      content,
      image: imagePath,
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const { title, category, author, content } = req.body;
    const updatedData = { title, category, author, content };

    if (req.file) {
      updatedData.image = `/uploads/images/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
