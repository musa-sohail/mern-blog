import React, { useState, useEffect } from "react";
import { Github, ArrowUp, FileQuestion } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Categories and Mock Data
const categories = [
  "all",
  "technology",
  "lifestyle",
  "travel",
  "food",
  "health",
];

const categoryColors = {
  all: "bg-gray-100 hover:bg-gray-200",
  technology: "bg-blue-50 hover:bg-blue-100",
  lifestyle: "bg-pink-50 hover:bg-pink-100",
  travel: "bg-green-50 hover:bg-green-100",
  food: "bg-yellow-50 hover:bg-yellow-100",
  health: "bg-purple-50 hover:bg-purple-100",
};

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  // const {REACT_APP_BACKEND_URL} = process.env;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://echo-verse-one.vercel.app/api/get-blogs");
        const data = await response.json();
        if (data && data.blogs) {
          setBlogs(data.blogs);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 top-0 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">EchoVerse</h1>
            </div>
            <div>
              <a
                href="https://github.com/musa-sohail"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to <span className="text-black">EchoVerse</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Discover stories, ideas, and expertise from writers on any topic.
              Explore our diverse collection of insightful articles and stay
              informed.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${categoryColors[category] || "bg-gray-100 hover:bg-gray-200"}
              ${selectedCategory === category ? "ring-2 ring-black" : ""}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Blog Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <Skeleton height={192} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton width={60} />
                    <Skeleton width={80} />
                  </div>
                  <Skeleton height={24} width="80%" className="mb-2" />
                  <Skeleton width={120} className="mb-2" />
                  <Skeleton count={2} className="mb-4" />
                  <Skeleton width={100} height={36} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FileQuestion className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No blogs found in this category
            </h3>
            <p className="text-sm text-gray-500">
              Try changing the category or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {blog.image ? (
                  <img
                    src={`http://echo-verse-one.vercel.app${blog.image}`} // Assuming your image URL follows this structure
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      {blog.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">By {blog.author}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.content}
                  </p>
                  <Link
                    to={`/blog/${blog._id}`} // Use the correct property name for blog id
                    className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isLoading || (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
