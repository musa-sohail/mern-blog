import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AddBlog from './pages/AddBlog';
import ViewBlogs from './pages/ViewBlogs';
import BlogDetail from './pages/BlogDetail';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addBlog" element={<AddBlog />} />
        <Route path="/admin/viewBlogs" element={<ViewBlogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} /> 
      </Routes>
    </Router>
  );
};

export default App;
