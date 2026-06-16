'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
  import { Heart, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface Peticion {
  id: string;
nombre: string;
intension: string;
fecha: Date;
oraciones: number;
estado: 'pendiente' | 'respondida';
}

export const PeticionesOracion: React.FC = () => {
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

const [formulario, setFormulario] = useState({ nombre: '', intension: '' });
const [enviando, setEnviando] = useState(false);

const enviarPeticion = async (e: React.FormEvent) => {
e.preventDefault();
if (!formulario.intension.trim()) return;

setEnviando(true);

try {
const nuevaPeticion: Peticion = {
id: Date.now().toString(),
nombre: formulario.nombre || 'Anonimo',
intension: formulario.intension,
fecha: new Date(),
oraciones: 0,
estado: 'pendiente',
};

setPeticiones([nuevaPeticion, ...peticiones]);
setFormulario({ nombre: '', intension: '' });
} catch (error) {
console.error('Error:', error);
} finally {
setEnviando(false);
}
};

const agregarOracion = (id: string) => {
setPeticiones((prev) =>
prev.map((p) =>
p.id === id ? { ...p, oraciones: p.oraciones + 1 } : p
)
);
};

const eliminarPeticion = (id: string) => {
setPeticiones((prev) => prev.filter((p) => p.id !== id));
};

return (
<div className="max-w-2xl mx-auto p-6">
<motion.form
onSubmit={enviarPeticion}
className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 mb-8 shadow-lg"
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
>
<h2 className="text-2xl font-bold text-primary-dark mb-6">
Comparte tu Intencion de Oracion
</h2>

<div className="space-y-4">
<input
type="text"
placeholder="Tu nombre (opcional)"
value={formulario.nombre}
onChange={(e) =>
setFormulario({ ...formulario, nombre: e.target.value })
}
className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
/>

<textarea
placeholder="Por que deseas que oremos? Comparte tu intencion..."
value={formulario.intension}
onChange={(e) =>
setFormulario({ ...formulario, intension: e.target.value })
}
rows={4}
className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark resize-none"
/>

<Button
type="submit"
variant="primary"
size="lg"
isLoading={enviando}
disabled={enviando || !formulario.intension.trim()}
className="w-full"
>
<Send className="w-5 h-5" />
Enviar Intencion
</Button>
</div>
</motion.form>

<div className="space-y-4">
<h3 className="text-xl font-bold text-gray-900 mb-4">
Intenciones de la Comunidad ({peticiones.length})
</h3>

<AnimatePresence>
{peticiones.map((peticion, index) => (
<motion.div
key={peticion.id}
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: 20 }}
transition={{ delay: index * 0.05 }}
className="bg-white border-l-4 border-primary-dark rounded-lg p-4 shadow hover:shadow-md transition"
>
<div className="flex items-start justify-between gap-4">
<div className="flex-1">
<p className="font-semibold text-gray-900">
{peticion.intension}
</p>
<p className="text-sm text-gray-500 mt-1">
{peticion.nombre}
</p>
<p className="text-xs text-gray-400 mt-1">
{peticion.fecha.toLocaleDateString('es-MX')}
</p>
</div>

<div className="flex items-center gap-2">
<motion.button
onClick={() => agregarOracion(peticion.id)}
className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary-dark rounded-lg hover:bg-blue-100 transition font-semibold"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
>
<Heart className="w-5 h-5" />
<span>{peticion.oraciones}</span>
</motion.button>

<motion.button
onClick={() => eliminarPeticion(peticion.id)}
className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
>
<Trash2 className="w-5 h-5" />
</motion.button>
</div>
</div>
</motion.div>
))}
</AnimatePresence>

{peticiones.length === 0 && (
<motion.div
className="text-center py-12 text-gray-500"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
>
<p className="text-lg">No hay intenciones aun</p>
<p className="text-sm">Se el primero en compartir una intencion</p>
</motion.div>
)}
</div>
</div>
);
};
