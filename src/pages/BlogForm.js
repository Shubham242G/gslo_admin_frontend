import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';
import 'react-quill/dist/quill.snow.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    status: 'draft',
  });

  const [image, setImage] = useState(''); // ✅ base64 string
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data } = await api.get(`/blogs/${id}`);
      setFormData({
        title: data.title,
        content: data.content,
        author: data.author,
        category: data.category,
        status: data.status,
      });
      setImage(data.image || '');
    } catch {
      toast.error('Error fetching blog');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Convert image → Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanContent = formData.content
    .replace(/style="([^"]*)color[^;]*:[^;"]*;?([^"]*)"/gi, 'style="$1$2"')
    .replace(/color\s*:\s*[^;"]*;?/gi, '')
    .replace(/text-[a-f0-9]{3,6}/gi, ''); // Remove Tailwind color classes too

  const payload = {
    ...formData,
    content: cleanContent, // 🔥 CLEAN HTML saved to DB
    image,
  };


    try {
      if (isEditMode) {
        await api.put(`/blogs/${id}`, payload);
        toast.success('Blog updated successfully');
      } else {
        await api.post('/blogs', payload);
        toast.success('Blog created successfully');
      }
      navigate('/blogs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {isEditMode ? 'Edit Blog' : 'Create Blog'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode ? 'Update your blog post' : 'Create a new blog post'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* React Quill Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
                className="bg-white"
              />
            </div>

            {/* Author & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="px-4 py-3 border rounded-lg"
                required
              />
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="px-4 py-3 border rounded-lg"
                required
              />
            </div>

            {/* Status */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Image
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="mt-4 h-32 rounded-lg object-cover"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg"
              >
                {loading ? 'Saving...' : isEditMode ? 'Update Blog' : 'Create Blog'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/blogs')}
                className="px-6 py-3 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
