'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { Card } from '@/components/common/Card';
import Link from 'next/link';

interface Noticia {
id: string;
titulo: string;
descripcion: string;
imagen: string;
categoria: string;
fecha: Date;
contenido: string;
isLive?: boolean;
}

const noticias: Noticia[] = [
{
id: '1',
titulo: 'Concierto de Navidad este Sabado',
descripcion: 'Una velada musical especial en el templo. Entrada libre para toda la familia parroquial.',
imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=700&q=85',
categoria: 'Eventos',
fecha: new Date(2026, 5, 20),
contenido: 'Contenido completo de la noticia...',
isLive: false,
},
{
id: '2',
titulo: 'Nuevos Horarios de Catequesis',
descripcion: 'Inscripciones abiertas. Nuevos grupos para ninos, jovenes y adultos esta temporada.',
imagen: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&q=85',
categoria: 'Formacion',
fecha: new Date(2026, 5, 18),
contenido: 'Contenido completo de la noticia...',
isLive: false,
},
{
id: '3',
titulo: 'Transmision: Santa Misa de Hoy',
descripcion: 'Unete a la comunidad parroquial desde donde estes.',
imagen: 'https://images.unsplash.com/photo-1543342384-1f1350e27861?w=700&q=85',
categoria: 'Liturgia',
fecha: new Date(),
contenido: 'Contenido completo de la noticia...',
isLive: true,
},
];

export default function NoticiasPage() {
const [filtro, setFiltro] = useState<string | null>(null);

const noticiasFiltradas = filtro
? noticias.filter((n) => n.categoria === filtro)
: noticias;

const categorias = Array.from(new Set(noticias.map((n) => n.categoria)));

return (
<>
<HeroSection
bgImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1800&q=90"
title="Centro de Noticias"
subtitle="Mantente informado sobre nuestra parroquia y la comunidad"
/>

<section className="max-w-6xl mx-auto px-4 py-12">
<div className="flex flex-wrap gap-3 justify-center mb-12">
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={() => setFiltro(null)}
className={`px-6 py-2 rounded-full font-semibold transition ${
filtro === null
? 'bg-primary-dark text-white'
: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
}`}
>
Todas
</motion.button>
{categorias.map((cat) => (
<motion.button
key={cat}
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={() => setFiltro(cat)}
className={`px-6 py-2 rounded-full font-semibold transition ${
filtro === cat
? 'bg-primary-dark text-white'
: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
}`}
>
{cat}
</motion.button>
))}
</div>
</section>

<section className="max-w-6xl mx-auto px-4 pb-16">
<motion.div
layout
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
>
{noticiasFiltradas.map((noticia, idx) => (
<motion.div
key={noticia.id}
layout
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 20 }}
transition={{ delay: idx * 0.05 }}
>
<Link href={`/noticias/${noticia.id}`}>
<Card className="h-full cursor-pointer group overflow-hidden">
<div className="relative mb-4 overflow-hidden rounded-lg h-48">
<motion.img
src={noticia.imagen}
alt={noticia.titulo}
className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
/>
{noticia.isLive && (
<div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
<span className="w-2 h-2 bg-white rounded-full animate-pulse" />
EN VIVO
</div>
)}
</div>

<div className="space-y-3">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-primary-dark bg-blue-100 px-3 py-1 rounded-full">
{noticia.categoria}
</span>
<span className="text-xs text-gray-500">
{noticia.fecha.toLocaleDateString('es-MX')}
</span>
</div>

<h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-dark transition">
{noticia.titulo}
</h3>

<p className="text-sm text-gray-600 line-clamp-2">
{noticia.descripcion}
</p>

<div className="pt-4 border-t">
<span className="text-primary-dark font-semibold text-sm group-hover:gap-2 flex items-center gap-1 transition">
Leer mas
</span>
</div>
</div>
</Card>
</Link>
</motion.div>
))}
</motion.div>
</section>
</>
);
}
