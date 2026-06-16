'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
{
      title: 'Contacto',
      items: [
{ icon: MapPin, label: 'Tejedores de Aranza, Morelia', href: '#' },
{ icon: Phone, label: '(722) 000-0000', href: 'tel:+527220000000' },
{ icon: Mail, label: 'parroquia@ejemplo.mx', href: 'mailto:parroquia@ejemplo.mx' },
{ icon: Clock, label: 'Lun-Vie 9:00-18:00', href: '#' },
      ],
},
{
      title: 'Enlaces',
      items: [
{ label: 'Inicio', href: '/' },
{ label: 'Historia', href: '/historia' },
{ label: 'Noticias', href: '/noticias' },
{ label: 'Horarios', href: '/horarios' },
      ],
},
{
      title: 'Comunidad',
      items: [
{ label: 'Grupos Pastorales', href: '#' },
{ label: 'Catequesis', href: '#' },
{ label: 'Caritas', href: '#' },
{ label: 'Pastoral Juvenil', href: '#' },
      ],
},
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">[P]</span>
              <div>
                <h3 className="font-bold text-lg">Santa Maria</h3>
                <p className="text-xs text-gray-300">de la Asuncion</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Sirviendo a la comunidad con fe, esperanza y caridad desde 1943.
            </p>
          </motion.div>

{footerSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="font-bold text-lg mb-4 text-accent-gold">
{section.title}
              </h4>
              <ul className="space-y-2">
{section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-gray-300 hover:text-accent-gold transition text-sm"
                      >
{Icon && <Icon className="w-4 h-4" />}
{item.label}
                      </Link>
                    </li>
                  );
})}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="text-center text-sm text-gray-400">
            <p>
              (c) {currentYear} Parroquia Santa Maria de la Asuncion - Morelia.
              <br />
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
