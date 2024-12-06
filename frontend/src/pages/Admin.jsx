import React from 'react';
import { Link } from 'react-router-dom';
import { PenLine, BookOpen } from 'lucide-react';

function Admin() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Dotted background pattern */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'radial-gradient(#00000010 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }}>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Echo Verse
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Add Blog Card */}
          <Link 
            to="/admin/addBlog"
            className="group transform transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-full p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-50 group-hover:bg-gray-100">
                <PenLine className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Add New Blog
              </h2>
              <p className="text-gray-600">
                Create and publish new blog posts. Add content, images, and manage your blog's growth.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-gray-900">
                Get Started
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* View Blogs Card */}
          <Link 
            to="/admin/viewBlogs"
            className="group transform transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-full p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-50 group-hover:bg-gray-100">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                View All Blogs
              </h2>
              <p className="text-gray-600">
                Manage existing posts, track performance, and make updates to your published content.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-gray-900">
                View Blogs
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;
