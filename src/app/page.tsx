'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Clock, MapPin, Heart } from 'lucide-react';

export default function Home() {
return (
<>
<HeroSection
bgImage="https://images.unsplash.com/photo-1548625149-720754860eea?w=1800&q=90"
title="Bienvenido a Nuestra Comunidad"
subtitle="Parroquia Santa Maria de la Asuncion - Morelia, Michoacan"
cta={{ text: 'Conoce Nuestros Horarios', href: '/horarios' }}
/>

<section className="container-max section-padding">
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="text-center mb-12"
>
<h2 className="text-4xl font-bold text-primary-dark mb-4">
Proximas Misas
</h2>
<p className="text-gray-600 max-w-2xl mx-auto">
Unete a nuestra comunidad en cualquiera de nuestras celebraciones liturgicas
</p>
</motion.div>

<div className="grid md:grid-cols-3 gap-6">
{[
{
dia: 'Domingo',
horas: ['8:00 AM', '11:00 AM', '1:00 PM'],
icon: '1',
},
{
dia: 'Lunes a Viernes',
horas: ['7:00 AM'],
icon: '2',
},
{
dia: 'Sabado',
horas: ['6:00 PM'],
icon: '3',
},
].map((item, idx) => (
<motion.div
key={item.dia}
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: idx * 0.1 }}
>
<Card className="text-center h-full flex flex-col justify-between">
<div>
<div className="text-5xl mb-4">{item.icon}</div>
<h3 className="text-xl font-bold text-primary-dark mb-3">
{item.dia}
</h3>
<div className="space-y-2 mb-6">
{item.horas.map((hora) => (
<div key={hora} className="flex items-center justify-center gap-2 text-gray-600">
<Clock className="w-4 h-4" />
<span className="font-semibold">{hora}</span>
</div>
))}
</div>
</div>
<Button variant="gold" size="sm">
Reservar
</Button>
</Card>
</motion.div>
))}
</div>
</section>

<section className="bg-primary-dark text-white section-padding">
<div className="container-max">
<div className="grid md:grid-cols-2 gap-12 items-center">
<motion.div
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
>
<h2 className="text-4xl font-bold mb-6">
Ubicacion y Contacto
</h2>
<div className="space-y-4">
<div className="flex items-start gap-4">
<MapPin className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
<div>
<p className="font-semibold">Direccion</p>
<p className="text-gray-300">
Tejedores de Aranza, Colonia Vasco de Quiroga
<br />
Morelia, Michoacan
</p>
</div>
</div>
<div className="flex items-start gap-4">
<Clock className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
<div>
<p className="font-semibold">Horario de Atencion</p>
<p className="text-gray-300">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
</div>
</div>
</div>
<Button variant="gold" size="lg" className="mt-8">
Llamar Ahora
</Button>
</motion.div>

<motion.div
initial={{ opacity: 0, x: 20 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
className="bg-white rounded-lg p-8 text-primary-dark"
>
<h3 className="text-2xl font-bold mb-6">Formas de Ayudar</h3>
<div className="space-y-4">
<div className="flex items-center gap-3">
<Heart className="w-6 h-6 text-accent-red" />
<span>Donaciones y Diezmo</span>
</div>
<div className="flex items-center gap-3">
<Heart className="w-6 h-6 text-accent-red" />
<span>Voluntariado</span>
</div>
<div className="flex items-center gap-3">
<Heart className="w-6 h-6 text-accent-red" />
<span>Grupos Pastorales</span>
</div>
</div>
</motion.div>
</div>
</div>
</section>
</>
);
}
