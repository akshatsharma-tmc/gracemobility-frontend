import React, { useEffect } from 'react';
import { ArrowRight, Shield, Zap, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const HomePage = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);

  // Scroll to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: 'Advanced Technology',
      description:
        'Cutting-edge sensors and AI-powered navigation systems for enhanced mobility and safety.'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Safety First',
      description:
        'Object detection and collision avoidance systems to ensure user safety in any environment.'
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: 'User-Centered Design',
      description:
        'Every product is designed with real user needs and accessibility standards in mind.'
    }
  ];

  return (
    <div>
      {/* ────────────────────────────────────── HERO ────────────────────────────────────── */}
      <motion.section
        className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 min-h-screen flex items-center transition-colors duration-300 relative overflow-hidden"
        style={{ y: parallaxY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-green-300/30 dark:from-gray-700/30 dark:to-gray-600/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Empowering
                <span className="text-green-600 dark:text-green-400"> Independence</span> Through
                Innovation
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Grace.ev creates advanced assistive technology to support people with mobility
                challenges, helping them live more independent and fulfilling lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200 font-semibold text-center"
                >
                  Explore Products
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 px-8 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200 font-semibold text-center"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-colors duration-300 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Innovation in Progress
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're developing revolutionary assistive technology that will transform lives.
                  Our team is working tirelessly to bring you products that enhance independence
                  and mobility.
                </p>
                <motion.div
                  className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-green-800 dark:text-green-300 font-semibold">
                    Coming Soon
                  </p>
                  <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                    Stay tuned for exciting updates!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── FEATURES ────────────────────────────────────── */}
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
              Why Choose Grace.ev?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine cutting-edge technology with compassionate design to create mobility
              solutions that truly make a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────── PRODUCT SHOWCASE ────────────────────────────────────── */}
      <motion.section
        className="py-20 bg-gradient-to-br from-green-900 to-green-800 dark:from-green-950 dark:to-green-900 text-white transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Introducing the Advanced Wheelchair
              </h2>
              <p className="text-xl mb-6 text-green-100">
                Our flagship autonomous wheelchair featuring advanced sensor technology,
                object detection, and intelligent navigation systems.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '360° obstacle detection',
                  'Autonomous navigation',
                  'Voice control integration',
                  'Emergency assistance features'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-white text-green-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
              >
                <span>Learn More</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/Blurred Wheelchair.png"
                alt="Wheelchair"
                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-md"
              />
              <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 text-center backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Advanced Wheelchair
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Coming Soon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ──────────────────────── WE ARE HIRING SECTION (MOVED HERE) ──────────────────────── */}
      <motion.section
        className="py-20 bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-green-800 dark:text-green-300 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            WE ARE HIRING
          </motion.h2>

          <motion.p
            className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Our projects combine mechanical innovation, smart control systems, and human-centered design to redefine what mobility assistance can achieve. We are a mission-driven team looking for like-minded passionate <strong>Mechanical Engineers</strong> and <strong>Industrial Designers</strong> to join us and innovate for India.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold text-lg shadow-lg"
            >
              <span>Explore Open Roles</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── CTA ────────────────────────────────────── */}
      <motion.section
        className="py-20 bg-green-600 dark:bg-green-700 transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Experience the Future of Mobility?
          </motion.h2>
          <motion.p
            className="text-xl text-green-100 dark:text-green-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join our community and be the first to know about our latest innovations and
            product launches.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
            >
              <span>Get in Touch</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── PARTNERS (LAST SECTION) ────────────────────────────────────── */}
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
              Our Partners
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We collaborate with leading institutions and organizations to drive innovation in assistive technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Partner 1: St Johns */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/St Johns logo.png"
                alt="St Johns Research Institute"
                className="w-32 h-32 mx-auto mb-6 object-contain rounded-lg"
              />
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">
                St Johns Research Institute
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A premier research institute in Bengaluru, collaborating with us on clinical validation, user studies, and medical-grade safety standards for assistive devices.
              </p>
            </motion.div>

            {/* Partner 2: Takumi Motion Controls */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/Takumi-Motion-Controls-Logo.png"
                alt="Takumi Motion Controls"
                className="w-32 h-32 mx-auto mb-6 object-contain rounded-lg"
              />
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">
                Takumi Motion Controls
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Our technology partner for precision motors, embedded systems, and motion control algorithms — enabling smooth, reliable, and efficient mobility solutions.
              </p>
            </motion.div>

            {/* Partner 3: Enable India */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/EnableIndia.png"
                alt="Enable India"
                className="w-32 h-32 mx-auto mb-6 object-contain rounded-lg"
              />
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">
                Enable India
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                A pioneer in disability inclusion and the Purple Economy — guiding our design philosophy to ensure our products are accessible, inclusive, and empowering.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;