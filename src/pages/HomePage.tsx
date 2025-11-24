import React, { useEffect } from 'react';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const HomePage = () => {
  const { scrollY } = useScroll();
  // Gentle parallax that doesn't break full-height hero
  const parallaxY = useTransform(scrollY, [0, 600], [0, -100]);

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
    <div className="overflow-x-hidden">
      {/* ────────────────────────────────────── HERO ────────────────────────────────────── */}
      <motion.section
        className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 
                   dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                   min-h-screen flex items-center justify-center"
        style={{ y: parallaxY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Empowering<br />
                <span className="text-green-600 dark:text-green-400">Independence</span><br />
                Through Innovation
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                Grace.ev creates advanced assistive technology to support people with mobility
                challenges, helping them live more independent and fulfilling lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link
                  to="/products"
                  className="bg-green-600 hover:bg-green-700 text-white px-9 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Explore Products <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 px-9 py-4 rounded-xl font-bold text-lg transition-all duration-300 text-center"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-md border border-green-100 dark:border-green-800">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 text-center">
                  Innovation in Progress
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 text-center">
                  We're developing revolutionary assistive technology that will transform lives.
                  Our team is working tirelessly to bring you products that enhance independence
                  and mobility.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/50 dark:to-emerald-900/50 border-2 border-green-200 dark:border-green-700 rounded-2xl p-6 text-center"
                >
                  <p className="text-2xl font-bold text-green-800 dark:text-green-300">
                    Coming Soon
                  </p>
                  <p className="text-green-700 dark:text-green-400 mt-2">
                    Stay tuned for exciting updates!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── PARTNERS – NOW MUCH MORE ATTRACTIVE ────────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-b from-white via-green-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 relative">
        {/* Decorative wave top */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-green-100/30 to-transparent dark:from-green-900/20" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Partners</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We collaborate with world-class institutions and organizations to pioneer the future of assistive mobility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Partner Cards */}
            {[
              { name: "St Johns Research Institute", img: "/St Johns logo.png", desc: "Clinical validation, user studies, and medical-grade safety standards." },
              { name: "Takumi Motion Controls", img: "/Takumi-Motion-Controls-Logo.png", desc: "Precision motors, embedded systems, and advanced motion control algorithms." },
              { name: "Enable India", img: "/EnableIndia.png", desc: "Pioneers in disability inclusion guiding our human-centered design philosophy." }
            ].map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-3xl scale-0 group-hover:scale-100 transition-transform duration-700" />
                
                <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-all duration-500 hover:-translate-y-6 hover:shadow-3xl">
                  <div className="w-48 h-48 mx-auto mb-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl ring-8 ring-green-50 dark:ring-gray-800 p-8 flex items-center justify-center">
                    <img
                      src={partner.img}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {partner.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── WE ARE HIRING SECTION ──────────────────────── */}
      <motion.section
        className="py-28 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2 className="text-5xl lg:text-6xl font-extrabold text-green-800 dark:text-green-300 mb-8">
            WE ARE HIRING
          </motion.h2>
          <motion.p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
            Our projects combine mechanical innovation, smart control systems, and human-centered design to redefine what mobility assistance can achieve. We are a mission-driven team looking for passionate <strong>Mechanical Engineers</strong> and <strong>Industrial Designers</strong> to join us and innovate for India.
          </motion.p>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/careers"
              className="inline-flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl transition-all duration-300"
            >
              Explore Open Roles <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── CTA ────────────────────────────────────── */}
      <motion.section className="py-28 bg-green-600 dark:bg-green-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-extrabold mb-8"
          >
            Ready to Experience the Future of Mobility?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl text-green-100 mb-12 max-w-3xl mx-auto"
          >
            Join our community and be the first to know about our latest innovations.
          </motion.p>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 bg-white text-green-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Get in Touch <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── FEATURES ────────────────────────────────────── */}
      <section className="py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Why Choose Grace.ev?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We combine cutting-edge technology with compassionate design to create mobility solutions that truly make a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;