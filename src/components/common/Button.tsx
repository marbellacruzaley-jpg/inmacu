'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
    variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-primary-dark text-white hover:bg-primary disabled:opacity-50',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50',
        gold: 'bg-accent-gold text-primary-dark hover:bg-yellow-300 disabled:opacity-50',
        outline: 'border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white disabled:opacity-50',
    };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg',
    };

  return (
        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          className={clsx(baseStyles, variants[variant], sizes[size], className)}
          disabled={disabled || isLoading}
    {...props}
    >
{isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Cargando...
          </>
        ) : (
          children
        )}
    </motion.button>
    );
};
