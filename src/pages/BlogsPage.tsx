import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Plus, Edit, Trash2, Users, LogOut, LogIn, X } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import BlogAuth from '../components/BlogAuth';
import BlogEditor from '../components/BlogEditor';
import UserManagement from '../components/UserManagement';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
}

interface CurrentUser {
  id: string;
  name: string;
  role: string;
}

interface BlogContext {
  posts: Post[];
  userType: string | null;
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  deletePost: (postId: string) => Promise<void>;
  subscribe: (email: string, name: string) => Promise<{ success: boolean; message: string }>;
}

const BlogsPage: React.FC = () => {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [showUserManagement, setShowUserManagement] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const {
    posts,
    userType,
    currentUser,
    isAuthenticated,
    logout,
    deletePost,
    subscribe
  } = useBlog() as BlogContext;

  // Scroll to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Clear subscription message after 3 seconds
  useEffect(() => {
    if (subscriptionMessage) {
      const timer = setTimeout(() => {
        setSubscriptionMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [subscriptionMessage]);

  // Animation for scroll parallax effect
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);

  const handleEditPost = (post: Post): void => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDeletePost = async (postId: string, postAuthor: string): Promise<void> => {
    if (currentUser?.role === 'admin' || currentUser?.name === postAuthor) {
      if (confirm('Are you sure you want to delete this post?')) {
        await deletePost(postId);
      }
    }
  };

  const canEditPost = (postAuthor: string): boolean => {
    return currentUser?.role === 'admin' || currentUser?.name === postAuthor;
  };

  const canDeletePost = (postAuthor: string): boolean => {
    return currentUser?.role === 'admin' || currentUser?.name === postAuthor;
  };

  const handlePostClick = (post: Post): void => {
    setSelectedPost(post);
  };

  const handleCloseModal = (): void => {
    setSelectedPost(null);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setSubscriptionMessage({ text: 'Please enter both name and email', type: 'error' });
      return;
    }
    const result = await subscribe(email, name);
    setSubscriptionMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) {
      setEmail('');
      setName('');
    }
  };

  const userPosts: Post[] = isAuthenticated && currentUser && currentUser.role !== 'admin'
    ? posts.filter(post => post.author === currentUser.name)
    : posts;

  return (
    <div>
      {/* Hero Section with Parallax */}
      <motion.section
        className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 py-20 transition-colors duration-300 relative overflow-hidden"
        style={{ y: parallaxY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-green-300/30 dark:from-gray-700/30 dark:to-gray-600/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute top-0 right-0">
              {!isAuthenticated && (
                <motion.button
                  onClick={() => setShowAuth(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </motion.button>
              )}
            </div>
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Grace.ev <span className="text-green-600">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Insights, stories, and updates from the world of assistive technology innovation.
                Stay informed about the latest developments in accessibility and mobility solutions.
              </p>

              {/* User Controls */}
              {isAuthenticated && (
                <motion.div
                  className="mt-8 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => {
                      setEditingPost(null);
                      setShowEditor(true);
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus size={20} />
                    <span>Create Post</span>
                  </motion.button>

                  {currentUser?.role === 'admin' && (
                    <motion.button
                      onClick={() => setShowUserManagement(true)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Users size={20} />
                      <span>Manage Users</span>
                    </motion.button>
                  )}

                  <motion.button
                    onClick={logout}
                    className="border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 font-medium flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </motion.button>
                </motion.div>
              )}

              {isAuthenticated && (
                <motion.div
                  className="mt-4 text-green-600 dark:text-green-400 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Welcome back, {currentUser?.name}! ({currentUser?.role})
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts Grid with Staggered Fade-In */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {userPosts.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No posts available.
              </p>
              {isAuthenticated && (
                <motion.button
                  onClick={() => {
                    setEditingPost(null);
                    setShowEditor(true);
                  }}
                  className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Create Your First Post
                </motion.button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Edit/Delete buttons for creators */}
                    {isAuthenticated && (canEditPost(post.author) || canDeletePost(post.author)) && (
                      <div className="absolute top-4 left-4 flex space-x-2">
                        {canEditPost(post.author) && (
                          <motion.button
                            onClick={() => handleEditPost(post)}
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Edit size={16} />
                          </motion.button>
                        )}
                        {canDeletePost(post.author) && (
                          <motion.button
                            onClick={() => handleDeletePost(post.id, post.author)}
                            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3
                      className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
                      onClick={() => handlePostClick(post)}
                    >
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
                      </div>
                      <button
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm flex items-center space-x-1"
                        onClick={() => handlePostClick(post)}
                      >
                        <span>Read</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup with Scale Animation */}
      <motion.section
        className="py-16 bg-green-600 dark:bg-green-700 text-white transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay Updated
          </motion.h2>
          <motion.p
            className="text-xl text-green-100 dark:text-green-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get the latest insights, product updates, and industry news delivered
            straight to your inbox.
          </motion.p>
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subscriptionMessage && (
              <motion.div
                className={`p-3 rounded-lg mb-4 text-center ${subscriptionMessage.type === 'success'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {subscriptionMessage.text}
              </motion.div>
            )}
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email"
                />
              </div>
              <motion.button
                type="submit"
                className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Subscribe
              </motion.button>
            </form>
            <p className="text-green-100 dark:text-green-200 text-sm mt-3">
              No spam, just valuable content. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Full-Screen Blog Post Modal */}
      {selectedPost && (
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
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <X size={24} />
            </button>
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedPost.title}
            </h2>
            <div className="flex items-center space-x-3 mb-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
              </div>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <User size={14} />
                <span>{selectedPost.author}</span>
              </div>
            </div>
            <div
              className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Modals */}
      {showAuth && <BlogAuth onClose={() => setShowAuth(false)} />}
      {showEditor && (
        <BlogEditor
          post={editingPost}
          onClose={() => {
            setShowEditor(false);
            setEditingPost(null);
          }}
        />
      )}
      {showUserManagement && (
        <UserManagement onClose={() => setShowUserManagement(false)} />
      )}
    </div>
  );
};

export default BlogsPage;