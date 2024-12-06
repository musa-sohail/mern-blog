const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

// Setup multer storage for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.post('/create-blog', upload.single('image'), createBlog);
router.get('/get-blogs', getAllBlogs);
router.get('/get-blog/:id', getBlogById);
router.put('/update-blog/:id', upload.single('image'), updateBlog);
router.delete('/delete-blog/:id', deleteBlog);

module.exports = router;
