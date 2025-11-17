import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { BlogProvider } from './contexts/BlogContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CareersPage from './pages/CareersPage';
import BlogsPage from './pages/BlogsPage';
import UnsubscribePage from './pages/UnsubscribePage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <ThemeProvider>
      <BlogProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/unsubscribe" element={<UnsubscribePage />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Chatbot available on all pages */}
            <Chatbot />
          </div>
        </Router>
      </BlogProvider>
    </ThemeProvider>
  );
}

export default App;