import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date?: string;
  readTime: string;
  imageUrl: string;
}

export interface User {
  id?: string;
  username: string;
  password: string;
  role: 'admin' | 'creator';
  name: string;
}

interface BlogContextType {
  posts: BlogPost[];
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  userType: 'viewer' | 'creator' | null;
  login: (username: string, password: string, type: 'creator') => Promise<boolean>;
  logout: () => void;
  setUserType: (type: 'viewer' | 'creator' | null) => void;
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  changeUserPassword: (id: string, newPassword: string) => Promise<void>;
  subscribe: (email: string, name: string) => Promise<{ success: boolean; message: string }>;
  subscribeToProducts: (email: string, name: string) => Promise<{ success: boolean; message: string }>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'viewer' | 'creator' | null>(null);

  useEffect(() => {
    fetchPosts();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setCurrentUser({ id: decoded.id, username: '', password: '', role: decoded.role, name: decoded.name });
        setUserType('creator');
        if (decoded.role === 'admin') fetchUsers();
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const login = async (username: string, password: string, type: 'creator') => {
    try {
      const res = await axios.post(`${API_BASE}/users/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      setCurrentUser({ id: res.data.user.id, username: '', password: '', role: res.data.user.role, name: res.data.user.name });
      setUserType(type);
      await fetchPosts();
      if (res.data.user.role === 'admin') await fetchUsers();
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setUserType(null);
    setUsers([]);
  };

  const addPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/posts`, post, { headers: { Authorization: `Bearer ${token}` } });
      await fetchPosts();
    } catch (err) {
      console.error('Failed to add post:', err);
      throw err;
    }
  };

  const updatePost = async (id: string, post: Partial<BlogPost>) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/posts/${id}`, post, { headers: { Authorization: `Bearer ${token}` } });
      await fetchPosts();
    } catch (err) {
      console.error('Failed to update post:', err);
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      await fetchPosts();
    } catch (err) {
      console.error('Failed to delete post:', err);
      throw err;
    }
  };

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/users/register`, user, { headers: { Authorization: `Bearer ${token}` } });
      await fetchUsers();
    } catch (err) {
      console.error('Failed to add user:', err);
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      await fetchUsers();
    } catch (err) {
      console.error('Failed to delete user:', err);
      throw err;
    }
  };

  const changeUserPassword = async (id: string, newPassword: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE}/users/${id}/password`, { newPassword }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error('Failed to change user password:', err);
      throw err;
    }
  };

  const subscribe = async (email: string, name: string) => {
    try {
      const res = await axios.post(`${API_BASE}/subscriptions`, { email, name });
      return { success: true, message: res.data.message };
    } catch (err: any) {
      console.error('Subscription failed:', err);
      return { success: false, message: err.response?.data?.error || 'Failed to subscribe' };
    }
  };

  const subscribeToProducts = async (email: string, name: string) => {
    try {
      const res = await axios.post(`${API_BASE}/product-subscriptions`, { email, name });
      return { success: true, message: res.data.message };
    } catch (err: any) {
      console.error('Product subscription failed:', err);
      return { success: false, message: err.response?.data?.error || 'Failed to subscribe' };
    }
  };

  const value: BlogContextType = {
    posts,
    users,
    currentUser,
    isAuthenticated: !!localStorage.getItem('token'),
    userType,
    login,
    logout,
    setUserType,
    addPost,
    updatePost,
    deletePost,
    addUser,
    deleteUser,
    changeUserPassword,
    subscribe,
    subscribeToProducts
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};