import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import axios from 'axios';

interface BlogEditorProps {
  post: {
    id?: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    imageUrl: string;
    date?: string;
    readTime?: string;
  } | null;
  onClose: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onClose }) => {
  const { addPost, updatePost, currentUser } = useBlog();
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [readTime, setReadTime] = useState(post?.readTime || '5 min read');
  const [uploading, setUploading] = useState(false);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/posts/upload-url`,
          { fileName: file.name, contentType: file.type },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        await fetch(res.data.url, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });
        setImageUrl(res.data.key);
        setImage(file);
      } catch (err) {
        console.error('Image upload failed:', err);
        alert('Failed to upload image');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !excerpt || !imageUrl || !currentUser) {
      alert('Please fill in all fields');
      return;
    }

    const newPost = {
      title,
      content,
      excerpt,
      author: currentUser.name,
      imageUrl,
      readTime,
    };

    try {
      if (post?.id) {
        await updatePost(post.id, newPost);
      } else {
        await addPost(newPost);
      }
      onClose();
    } catch (err) {
      alert('Failed to save post');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              className="bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter post excerpt"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={uploading}
            />
            {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Read Time
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., 5 min read"
            />
          </div>
          <motion.button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Save size={20} />
            <span>{post ? 'Update Post' : 'Publish Post'}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogEditor;