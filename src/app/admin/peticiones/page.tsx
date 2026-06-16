'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PeticionesEditor } from '@/components/admin/PeticionesEditor';
import { Button } from '@/components/common/Button';

interface Peticion {
id: string;
nombre: string;
intension: string;
fecha: Date;
oraciones: number;
estado: 'pendiente' | 'respondida';
}

export default function AdminPeticionesPage() {
const router = useRouter();
const { isAuthenticated } = useAuth();
const [peticiones, setPeticiones] = useState<Peticion[]>([
{
id: '1',
nombre: 'Maria',
intension: 'Por la salud de mi madre',
fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
oraciones: 12,
estado: 'pendiente',
},
{
id: '2',
nombre: 'Anonimo',
intension: 'Por paz en el mundo',
fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
oraciones: 8,
estado: 'pendiente',
},
]);

useEffect(() => {
if (!isAuthenticated) {
router.push('/admin/login');
}
}, [isAuthenticated, router]);

if (!isAuthenticated) {
return null;
}

const handleUpdateEstado = (
id: string,
estado: 'pendiente' | 'respondida'
) => {
setPeticiones((prev) =>
prev.map((p) => (p.id === id ? { ...p, estado } : p))
);
};

const handleDelete = (id: string) => {
if (confirm('Estas seguro de que deseas eliminar esta peticion?')) {
setPeticiones((prev) => prev.filter((p) => p.id !== id));
}
};

return (
<div className="min-h-screen bg-gray-100">
<header className="bg-primary-dark text-white shadow-lg">
<div className="max-w-7xl mx-auto px-4 py-6">
<Link href="/admin" className="inline-block mb-4">
<Button variant="gold" size="sm" className="flex items-center gap-2">
<ArrowLeft className="w-5 h-5" />
Volver al Panel
</Button>
</Link>
<h1 className="text-3xl font-bold">Gestionar Peticiones</h1>
<p className="text-gray-300 mt-2">
Revisa y gestiona las intenciones de oracion de la comunidad
</p>
</div>
</header>

<main className="max-w-7xl mx-auto px-4 py-12">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
>
<PeticionesEditor
peticiones={peticiones}
onUpdateEstado={handleUpdateEstado}
onDelete={handleDelete}
/>
</motion.div>
</main>
</div>
);
}
