import React, { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { motion } from 'framer-motion';

interface BlogAuthProps {
  onClose: () => void;
}

const BlogAuth: React.FC<BlogAuthProps> = ({ onClose }) => {
  const { login } = useBlog();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password, 'creator');
    if (success) {
      onClose();
    } else {
      setError('Invalid username or password');
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
        className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-8 relative"
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
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <motion.button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <LogIn size={20} />
            <span>Login</span>
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BlogAuth;