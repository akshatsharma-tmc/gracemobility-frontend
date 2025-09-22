import React, { useEffect } from 'react';
import { Heart, Target, Eye, Users, Award, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutPage = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);

  // Scroll to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: 'Compassion',
      description: 'Every decision we make is guided by empathy and understanding for the people we serve.'
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: 'Innovation',
      description: 'We continuously push the boundaries of technology to create better solutions.'
    },
    {
      icon: <Eye className="h-8 w-8 text-green-600" />,
      title: 'Accessibility',
      description: 'We believe everyone deserves access to technology that enhances their independence.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Lives Impacted' },
    { number: '50+', label: 'Patents Filed' },
    { number: '5', label: 'Years of Research' },
    { number: '99%', label: 'User Satisfaction' }
  ];

  const team = [
    {
      name: 'Mr. Sandeep Janardan',
      role: 'CEO & Founder',
      bio: 'Product Manager for Personal Mobility and Autonomy, building the next generation of personal mobility vehicles for the elderly, incorporating sensor and EV technology',
      image: '/Sandeep sir.jpg'
    },
    {
      name: 'Mr. John Edward',
      role: 'CTO & Co-Founder',
      bio: '15+ years of experience in Design and developing enterprise-level application using Microsoft .Net, C#, SQL and Docker',
      image: '/John sir.jpg'
    },
  ];

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
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-green-600">Grace.ev</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're on a mission to break down barriers and empower independence through
              innovative assistive technology. Every product we create is designed to help
              people live their lives without limitations.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision with Slide-In */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                To develop cutting-edge assistive technology that empowers people with mobility
                challenges to live independently, safely, and with dignity. We believe that
                everyone deserves access to technology that enhances their quality of life.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Through continuous innovation and user-centered design, we're creating a world
                where physical limitations don't define what's possible.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                A world where advanced technology seamlessly integrates with daily life to
                provide unprecedented independence and mobility for everyone, regardless of
                their physical abilities.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We envision smart assistive devices that don't just compensate for limitations,
                but actually enhance human capabilities and open new possibilities for exploration
                and adventure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values with Staggered Fade-In */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with Fade-In and Scale */}
      <motion.section
        className="py-20 bg-green-600 dark:bg-green-700 text-white transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-green-100 dark:text-green-200">
              Pioneering the future of assistive technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-8 w-8 text-white" />,
                title: "Global Reach",
                description: "Expanding access to innovative mobility solutions worldwide."
              },
              {
                icon: <Award className="h-8 w-8 text-white" />,
                title: "Breakthrough Innovation",
                description: "Developing next-gen assistive devices with cutting-edge tech."
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: "Community Impact",
                description: "Empowering individuals to live independently and confidently."
              }
            ].map((goal, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="mb-4 flex justify-center">{goal.icon}</div>
                <div className="text-2xl lg:text-3xl font-bold mb-2">{goal.title}</div>
                <p className="text-green-100 dark:text-green-200">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team with Staggered Slide-In */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The passionate individuals driving innovation at Grace.ev
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline with Staggered Fade-In */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Milestones in our mission to improve lives through technology
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">2025 - Company Founded</h3>
                <p className="text-gray-600 dark:text-gray-300">Grace.ev was founded with a vision to revolutionize assistive technology.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;