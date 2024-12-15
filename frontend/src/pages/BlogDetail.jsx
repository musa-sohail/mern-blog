import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { ArrowLeft, Clock, User, Tag, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import 'react-loading-skeleton/dist/skeleton.css';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://echo-verse-one.vercel.app/api/get-blog/${id}`);
        const data = await response.json();
        if (data && data.blog) {
          setBlog(data.blog);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white relative">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'radial-gradient(#00000010 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}>
        </div>
        <div className="relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Skeleton height={400} className="mb-8" />
            <Skeleton height={40} width="80%" className="mb-4" />
            <div className="flex gap-4 mb-8">
              <Skeleton width={100} />
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>
            <Skeleton count={10} className="mb-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-center">Blog not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Dotted background pattern */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'radial-gradient(#00000010 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }}>
      </div>

      <div className="relative">
        {/* Back button */}
        <div className="fixed top-4 left-4 z-10">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[60vh] relative overflow-hidden">
          {blog.image ? (
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              src={`http://echo-verse-one.vercel.app${blog.image}`}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-32 relative z-10"
        >
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {blog.author}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                {blog.category || 'General'}
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none leading-relaxed">
              <p>{blog.content}</p>
            </div>

            {/* Share section */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BlogDetail;
