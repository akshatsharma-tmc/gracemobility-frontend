import React, { useEffect } from 'react';
import { MapPin, Clock, Users, Heart, Zap, Award, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const CareersPage = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);

  // Scroll to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    'Empathy-driven innovation',
    'User-centered design thinking',
    'Collaborative problem solving',
    'Commitment to accessibility',
    'Continuous learning mindset',
    'Impact-focused work'
  ];

  return (
    <div>
      {/* ────────────────────────────────────── HERO: JOIN OUR MISSION ────────────────────────────────────── */}
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
              Join Our <span className="text-green-600">Mission</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Help us build the future of assistive technology. Join a team of passionate
              individuals dedicated to improving lives through innovation.
            </p>

            {/* REMOVED: Team stats (10+, 2, 4.8/5) */}
            {/*
            <motion.div
              className="flex justify-center space-x-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <div className="text-3xl font-bold text-green-600">10+</div>
                <div className="text-gray-600 dark:text-gray-300">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">2</div>
                <div className="text-gray-600 dark:text-gray-300">Open Positions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">4.8/5</div>
                <div className="text-gray-600 dark:text-gray-300">Employee Rating</div>
              </div>
            </motion.div>
            */}
          </motion.div>
        </div>
      </motion.section>

      {/* ────────────────────────────────────── OPEN POSITIONS (MOVED UP) ────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find your next opportunity to make a meaningful impact.
            </p>
          </motion.div>

          {/* JOB 1: MECHANICAL ENGINEER */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg mb-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
              Mechanical Engineer
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Passionate about mobility, mechatronics, and product design
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Strong interest in mechanism design, motion systems, CAD modelling, or prototyping
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Proficiency in CAD tools (SolidWorks, Fusion 360, or similar) is preferred
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Eagerness to test, iterate, and learn through real-world builds
              </li>
            </ul>
            <a
              href="mailto:info@gracemobility.in?subject=Application: Mechanical Engineer"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium"
            >
              <Mail size={18} />
              <span>Send Your Resume</span>
            </a>
          </motion.div>

          {/* JOB 2: INDUSTRIAL DESIGNER */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
              Industrial Designer
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Passionate about inclusive design and improving quality of life
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Fan of minimalist design
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Review existing literature and conduct on-site field studies to understand user needs, caregiver ergonomics, and safety challenges
              </li>
            </ul>
            <a
              href="mailto:info@gracemobility.in?subject=Application: Industrial Designer"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium"
            >
              <Mail size={18} />
              <span>Send Your Resume</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────── WHY GRACE.EV? (KEPT) ────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Grace.ev?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We're building more than products—we're creating a culture of innovation and impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h3>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What Makes Us Different</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At Grace.ev, you're not just building software or hardware—you're creating
                solutions that directly impact people's quality of life. Every line of code,
                every design decision, and every feature has the potential to restore independence
                and dignity to someone who needs it.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We foster an environment where diverse perspectives are valued, innovation is
                encouraged, and every team member has the opportunity to make a meaningful contribution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────── BENEFITS & PERKS (COMMENTED OUT) ────────────────────────────────────── */}
      {/*
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We believe in taking care of our team so they can focus on their best work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}
    </div>
  );
};

export default CareersPage;