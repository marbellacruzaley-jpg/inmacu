'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
}) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      whileHover={hover ? { y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      transition={{ duration: 0.3 }}
            >
        {children}
    </motion.div>
          );
};
