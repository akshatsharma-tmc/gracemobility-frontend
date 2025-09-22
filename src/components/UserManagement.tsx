import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Key } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import { motion } from 'framer-motion';

interface UserManagementProps {
  onClose: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onClose }) => {
  const { users, addUser, deleteUser, changeUserPassword } = useBlog();
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'creator' as 'admin' | 'creator', name: '' });
  const [error, setError] = useState('');
  const [passwordChangeUserId, setPasswordChangeUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Clear confirmation message after 3 seconds
  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password || !newUser.name) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await addUser(newUser);
      setNewUser({ username: '', password: '', role: 'creator', name: '' });
      setError('');
    } catch (err) {
      setError('Failed to add user');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setPasswordError('Please enter a new password');
      return;
    }
    if (passwordChangeUserId) {
      try {
        await changeUserPassword(passwordChangeUserId, newPassword);
        setConfirmationMessage({ text: 'Password changed successfully', type: 'success' });
        setPasswordChangeUserId(null);
        setNewPassword('');
        setPasswordError('');
      } catch (err) {
        setConfirmationMessage({ text: 'Failed to change password', type: 'error' });
        setPasswordError('Failed to change password');
      }
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
          Manage Users
        </h2>
        {confirmationMessage && (
          <motion.div
            className={`p-3 rounded-lg mb-4 text-center ${confirmationMessage.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {confirmationMessage.text}
          </motion.div>
        )}
        <form onSubmit={handleAddUser} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
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
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'creator' })}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="creator">Creator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <motion.button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Plus size={20} />
            <span>Add User</span>
          </motion.button>
        </form>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Existing Users</h3>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div>
                  <p className="text-gray-900 dark:text-white">{user.name} ({user.username})</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => user.id && setPasswordChangeUserId(user.id)}
                    className="bg-yellow-600 text-white p-2 rounded-full hover:bg-yellow-700 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Key size={16} />
                  </motion.button>
                  <motion.button
                    onClick={() => user.id && deleteUser(user.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {passwordChangeUserId && (
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
                onClick={() => setPasswordChangeUserId(null)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Change Password
              </h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter new password"
                  />
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                <motion.button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Key size={20} />
                  <span>Update Password</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserManagement;