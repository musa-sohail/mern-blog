import React, { useState } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [content, setContent] = useState('');  // State to hold content from textarea

  // Handling the image upload using react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    },
    multiple: false, // Only one image at a time
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Please upload an image.');
      return;
    }

    // Creating FormData object to send the image and text fields
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('content', content);  // Use content from textarea
    formData.append('image', selectedImage); // Assuming the backend expects this field for image upload

    try {
      const response = await fetch('https://mern-blog-blue-theta.vercel.app/api/create-blog', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Blog created successfully!');
        // Reset form
        setTitle('');
        setAuthor('');
        setCategory('');
        setSelectedImage(null);
        setImagePreview('');
        setContent('');  // Reset content
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Error occurred while adding new blog.'}`);
      }
    } catch (error) {
      alert('An error occurred while creating the blog.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#00000010 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Create New Blog Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            {/* Author Input */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            {/* Category Input */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                required
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <div
                {...getRootProps()}
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="mb-4">
                      <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-md" />
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <Upload className="w-6 h-6 mx-auto" />
                      <p>Drag & drop an image here, or click to select one</p>
                    </div>
                  )}
                </div>
                <input {...getInputProps()} />
              </div>
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
