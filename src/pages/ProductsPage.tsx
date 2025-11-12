import React, { useEffect, useState } from 'react';
import { Wifi, Shield, Battery, Smartphone, MapPin, AlertCircle, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useBlog } from '../contexts/BlogContext';

const ProductsPage = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);
  const { subscribeToProducts } = useBlog();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Clear subscription message after 5 seconds
  useEffect(() => {
    if (subscriptionMessage) {
      const timer = setTimeout(() => {
        setSubscriptionMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [subscriptionMessage]);

  const products = [
    {
      id: 1,
      name: 'Advanced Wheelchair',
      category: 'Autonomous Wheelchair',
      price: '',
      status: 'Coming Soon',
      image: '/Blurred Wheelchair.png',
      features: [
        '360° obstacle detection',
        'Autonomous navigation',
        'Voice control',
        'Emergency assistance',
        '15-hour battery life',
        'Weather resistant'
      ],
      description: 'Our flagship autonomous wheelchair featuring advanced AI navigation, comprehensive safety systems, and intuitive controls designed for maximum independence.'
    },
    {
      id: 2,
      name: 'Wheelchair Assist Systems',
      category: 'Retrofit Motorization Kit',
      price: '',
      status: 'Coming Soon',
      image: '/Incline.png',
      features: [
        'Affordable motorization',
        'Easy retrofit installation',
        'Smart power assist',
        'Lightweight & compact',
        'Battery powered',
        'Indoor/outdoor use'
      ],
      description: 'We are developing retrofit kits for manual wheelchairs to provide affordable motorized assistance, making mobility accessible to more users without replacing their existing chair.'
    },
    {
      id: 3,
      name: 'Steps',
      category: 'Terrain Navigation Module',
      price: '',
      status: 'Coming Soon',
      image: '/Steps.png',
      features: [
        'Step & pothole traversal',
        'Compact climbing mechanism',
        'Stable balance control',
        'Lightweight design',
        'Quick attach/detach',
        'Safe descent control'
      ],
      description: 'With steps and potholes dominating pathways, our innovation enables wheelchairs to navigate small obstacles from doorstep to gate — without looking like a tank. Just-right mobility for real-world India.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Coming Soon':
        return 'bg-green-100 text-green-800';
      case 'In Development':
        return 'bg-yellow-100 text-yellow-800';
      case 'Research Phase':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Coming Soon':
        return <AlertCircle className="h-4 w-4" />;
      case 'In Development':
        return <Battery className="h-4 w-4" />;
      case 'Research Phase':
        return <MapPin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setSubscriptionMessage({ text: 'Please enter both name and email', type: 'error' });
      return;
    }
    setIsLoading(true);
    try {
      const result = await subscribeToProducts(email, name);
      setSubscriptionMessage({ text: result.message, type: result.success ? 'success' : 'error' });
      if (result.success) {
        setEmail('');
        setName('');
      }
    } catch (err) {
      setSubscriptionMessage({ text: 'Failed to subscribe. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* ────────────────────────────────────── HERO ────────────────────────────────────── */}
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
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-green-600">Products</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              We're developing innovative assistive technology to enhance independence and improve 
              quality of life for people with mobility challenges. Our products are coming soon!
            </p>
            <motion.div
              className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-6 max-w-2xl mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Coming Soon</h2>
              <p className="text-green-700 dark:text-green-400">
                Our revolutionary assistive devices are currently in development. Stay tuned for updates on our launch timeline!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── PRODUCTS GRID ────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Products in Development
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Here's what we're working on to revolutionize assistive technology
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                      {getStatusIcon(product.status)}
                      <span>{product.status}</span>
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-green-600 font-medium">{product.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <button className="bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 px-6 py-2 rounded-lg cursor-not-allowed font-medium">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────── TECHNOLOGY STACK ────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The cutting-edge technologies that power our assistive devices
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-green-600" />,
                title: 'AI Safety Systems',
                description: 'Advanced machine learning algorithms for real-time hazard detection and avoidance'
              },
              {
                icon: <MapPin className="h-8 w-8 text-green-600" />,
                title: 'GPS Navigation',
                description: 'Precision location services with indoor and outdoor navigation capabilities'
              },
              {
                icon: <Smartphone className="h-8 w-8 text-green-600" />,
                title: 'Smart Integration',
                description: 'Seamless connectivity with smartphones, smart homes, and IoT devices'
              },
              {
                icon: <Battery className="h-8 w-8 text-green-600" />,
                title: 'Long-Life Battery',
                description: 'Extended battery life with smart power management and fast charging'
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center transition-colors duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{tech.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────── CTA ────────────────────────────────────── */}
      <motion.section
        className="py-20 bg-green-600 dark:bg-green-700 text-white transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay Updated on Our Progress
          </motion.h2>
          <motion.p
            className="text-xl text-green-100 dark:text-green-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Be the first to know when our revolutionary assistive devices become available.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setShowSubscriptionModal(true)}
              className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Get Notified
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── SUBSCRIPTION MODAL ────────────────────────────────────── */}
      {showSubscriptionModal && (
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
              onClick={() => {
                setShowSubscriptionModal(false);
                setSubscriptionMessage(null);
              }}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get Notified
            </h2>
            {subscriptionMessage && (
              <motion.div
                className={`p-4 rounded-lg mb-4 text-center ${
                  subscriptionMessage.type === 'success'
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
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your name"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              <motion.button
                type="submit"
                className={`bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium w-full ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                transition={{ duration: 0.3 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductsPage;