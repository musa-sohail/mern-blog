import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import EditModal from '../components/EditModal';  // Import EditModal component

function ViewBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); // Store the selected blog for editing

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://echo-verse-one.vercel.app/api/get-blogs');
        const data = await response.json();
        if (data && data.blogs) {
          setBlogs(data.blogs);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);  // Set the selected blog data for editing
    setIsModalOpen(true);  // Open the modal
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this blog?');
    if (confirmation) {
      try {
        const response = await fetch(`http://echo-verse-one.vercel.app/api/delete-blog/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Blog deleted successfully');
          setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from UI
        } else {
          alert('Failed to delete blog');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (loading) {
    return <p className="text-center">Loading blogs...</p>;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#00000010 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="relative max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">All Blog Posts</h1>
        </div>

        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-48 flex-shrink-0">
                  {blog.image ? (
                    <img
                      src={`http://echo-verse-one.vercel.app${blog.image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover object-center rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">{blog.category}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                      <p className="text-sm text-gray-600 mb-2">By {blog.author}</p>
                      <p className="text-gray-600 mb-4">{blog.content.slice(0, 100)}...</p>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to edit the blog */}
      {isModalOpen && selectedBlog && (
        <EditModal
          blog={selectedBlog}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ViewBlogs;
