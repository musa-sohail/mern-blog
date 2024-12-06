const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const multer = require('multer');
require('dotenv').config();
const connectDB = require('./config/db');
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('./controllers/blogController');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve static files
// Ensure the uploads/images directory exists
const uploadsDir = path.join(__dirname, 'uploads', 'images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
// Connect to MongoDB
connectDB();

// Setup multer storage for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Routes
app.post('/api/create-blog', upload.single('image'), createBlog);
app.get('/api/get-blogs', getAllBlogs);
app.get('/api/get-blog/:id', getBlogById);
app.put('/api/update-blog/:id', upload.single('image'), updateBlog);
app.delete('/api/delete-blog/:id', deleteBlog);

// Test route
app.get('/test', (req, res) => {
  res.send('Server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
