'use client';

import React, { useState, useEffect } from 'react';
  import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  bgImage: string;
title: string;
subtitle?: string;
cta?: {
  text: string;
href: string;
};
}

export const HeroSection: React.FC<HeroProps> = ({
bgImage,
title,
subtitle,
cta,
}) => {
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
const handleScroll = () => setScrollY(window.scrollY);
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
  <motion.section
  className="relative h-screen flex items-center justify-center overflow-hidden"
  initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  >
  <motion.div
  className="absolute inset-0 z-0"
  style={{
backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  y: scrollY * 0.5,
  }}
>
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
  </motion.div>

  <div className="relative z-10 text-center text-white px-4 max-w-4xl">
  <motion.div
  className="flex items-center justify-center gap-4 mb-6"
  initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  >
  <div className="h-1 w-12 bg-gradient-to-r from-transparent to-accent-gold" />
  <span className="text-accent-gold text-sm font-semibold tracking-widest">
  BIENVENIDO
  </span>
  <div className="h-1 w-12 bg-gradient-to-l from-transparent to-accent-gold" />
  </motion.div>

  <motion.h1
  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
  initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3, duration: 0.8 }}
>
  {title}
</motion.h1>

{subtitle && (
<motion.p
className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.4, duration: 0.8 }}
>
{subtitle}
</motion.p>
)}

{cta && (
<motion.a
href={cta.href}
className="inline-block px-8 py-4 bg-accent-gold text-primary-dark font-bold rounded-lg hover:bg-yellow-300 transition shadow-lg"
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: 0.5 }}
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
>
{cta.text}
</motion.a>
)}
</div>

<motion.div
className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
animate={{ y: [0, 10, 0] }}
transition={{ duration: 2, repeat: Infinity }}
>
<ChevronDown className="w-8 h-8 text-white" />
</motion.div>
</motion.section>
);
};
