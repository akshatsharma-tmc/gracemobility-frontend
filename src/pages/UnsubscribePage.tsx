import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');

      if (!email || !token) {
        setMessage({ text: 'Invalid unsubscribe link', type: 'error' });
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/product-subscriptions`, {
          params: { email, token }
        });
        setMessage({ text: response.data.message, type: 'success' });
      } catch (err: any) {
        setMessage({ text: err.response?.data?.error || 'Failed to unsubscribe', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    unsubscribe();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-8 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : (
          message && (
            <motion.div
              className={`p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-2">{message.type === 'success' ? 'Unsubscribed Successfully' : 'Unsubscribe Failed'}</h2>
              <p>{message.text}</p>
              {message.type === 'success' && (
                <p className="mt-4">
                  Return to <a href={import.meta.env.VITE_COMPANY_WEBSITE} className="text-green-600 hover:underline">Grace Mobility</a>.
                </p>
              )}
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default UnsubscribePage;