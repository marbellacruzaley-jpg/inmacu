'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { HorariosEditor } from '@/components/admin/HorariosEditor';
import { Button } from '@/components/common/Button';

interface Horario {
id: string;
dia: string;
hora: string;
tipo: 'misa' | 'confesion';
sacerdote?: string;
notas?: string;
}

export default function AdminHorariosPage() {
const router = useRouter();
const { isAuthenticated } = useAuth();
const [horarios, setHorarios] = useState<Horario[]>([
{
id: '1',
dia: 'Lunes a Viernes',
hora: '7:00 AM',
tipo: 'misa',
sacerdote: 'P. Jose Reyes',
notas: 'Misa de difuntos',
},
{
id: '2',
dia: 'Domingo',
hora: '8:00 AM, 11:00 AM, 1:00 PM',
tipo: 'misa',
},
{
id: '3',
dia: 'Sabado',
hora: '4:00 PM - 5:00 PM',
tipo: 'confesion',
notas: 'Confesiones sacramentales',
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

const handleSave = (horario: Horario) => {
setHorarios((prev) => {
const exists = prev.find((h) => h.id === horario.id);
if (exists) {
return prev.map((h) => (h.id === horario.id ? horario : h));
}
return [horario, ...prev];
});
};

const handleDelete = (id: string) => {
if (confirm('Estas seguro de que deseas eliminar este horario?')) {
setHorarios((prev) => prev.filter((h) => h.id !== id));
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
<h1 className="text-3xl font-bold">Gestionar Horarios</h1>
<p className="text-gray-300 mt-2">
Actualiza los horarios de misas y confesiones
</p>
</div>
</header>

<main className="max-w-7xl mx-auto px-4 py-12">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
>
<HorariosEditor
horarios={horarios}
onSave={handleSave}
onDelete={handleDelete}
/>
</motion.div>
</main>
</div>
);
}
