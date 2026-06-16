'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card } from '@/components/common/Card';

interface TimelineItem {
year: string;
title: string;
description: string;
icon: string;
side: 'left' | 'right';
}

const timelineItems: TimelineItem[] = [
{
year: '1907',
title: 'Fundacion de la Colonia',
description:
'La colonia Vasco de Quiroga es fundada como uno de los primeros asentamientos en la periferia de la ciudad.',
icon: '1',
side: 'right',
},
{
year: '1943',
title: 'Fundacion de la Ermita',
description:
'Se funda la ermita de la Inmaculada Concepcion para evangelizar a la comunidad.',
icon: '2',
side: 'left',
},
{
year: '1976',
title: 'Ereccion Canonica',
description:
'El Sr. Arzobispo Estanislao Alcaraz erige canonicamente la parroquia.',
icon: '3',
side: 'right',
},
{
year: '2000',
title: 'Gran Remodelacion',
description:
'Se realiza la ampliacion y remodelacion del templo con arquitectura contemporanea.',
icon: '4',
side: 'left',
},
{
year: '2014',
title: 'Cristo de la Inmaculada',
description:
'Llega el Cristo de la Inmaculada, pieza de gran devocion elaborada en cana de azucar.',
icon: '5',
side: 'right',
},
];

export default function HistoriaPage() {
return (
<>
<HeroSection
bgImage="https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1800&q=90"
title="Nuestra Historia"
subtitle="Mas de ocho decadas de fe, comunidad y servicio"
/>

<section className="max-w-4xl mx-auto px-4 py-16">
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="text-center mb-12"
>
<h2 className="text-4xl font-bold text-primary-dark mb-6">
Una ermita, una comunidad, una fe
</h2>
<p className="text-lg text-gray-600 leading-relaxed">
Desde su fundacion en 1943 como una pequena ermita en la Colonia
Vasco de Quiroga, nuestra parroquia ha crecido hasta convertirse en
uno de los recintos espirituales mas significativos de Morelia,
sirviendo con devocion a miles de familias de la comunidad.
</p>
</motion.div>
</section>

<section className="max-w-5xl mx-auto px-4 py-16">
<motion.h2
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
className="text-3xl font-bold text-center text-primary-dark mb-16"
>
Cronologia Historica
</motion.h2>

<div className="relative">
<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-dark to-accent-gold" />

<div className="space-y-12">
{timelineItems.map((item, idx) => (
<motion.div
key={item.year}
initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ delay: idx * 0.1 }}
className={`flex items-center gap-8 ${
item.side === 'left' ? 'flex-row-reverse' : ''
}`}
>
<div className="flex-1">
<Card className="relative">
<div className="text-4xl mb-3">{item.icon}</div>
<h3 className="text-2xl font-bold text-primary-dark mb-2">
{item.year}
</h3>
<h4 className="text-lg font-semibold text-gray-900 mb-2">
{item.title}
</h4>
<p className="text-gray-600">{item.description}</p>
</Card>
</div>

<div className="hidden md:flex items-center justify-center">
<div className="w-6 h-6 bg-accent-gold rounded-full border-4 border-white shadow-lg" />
</div>

<div className="flex-1 hidden md:block" />
</motion.div>
))}
</div>
</div>
</section>

<section className="bg-primary-dark text-white py-16">
<div className="max-w-4xl mx-auto px-4">
<motion.h2
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
className="text-3xl font-bold text-center mb-12 text-accent-gold"
>
Patrimonio Vivo
</motion.h2>

<div className="grid md:grid-cols-2 gap-8">
{[
{
icon: '1',
title: 'Arquitectura Hiperbolica',
desc: 'Forma unica que evoca el manto protector de la Virgen Maria',
},
{
icon: '2',
title: 'El Dragon del Apocalipsis',
desc: 'Escenificacion del Capitulo 12 del Apocalipsis de San Juan',
},
{
icon: '3',
title: 'Cristo de Cana de Azucar',
desc: 'Obra maestra de la tradicion artesanal michoacana',
},
{
icon: '4',
title: 'Festividad del 8 de Diciembre',
desc: 'La celebracion religiosa mas larga y participativa de la zona',
},
].map((item, idx) => (
<motion.div
key={item.title}
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: idx * 0.1 }}
className="bg-white bg-opacity-10 rounded-lg p-6 border border-accent-gold border-opacity-30"
>
<div className="text-4xl mb-3">{item.icon}</div>
<h3 className="text-xl font-bold mb-2">{item.title}</h3>
<p className="text-gray-300">{item.desc}</p>
</motion.div>
))}
</div>
</div>
</section>
</>
);
}
