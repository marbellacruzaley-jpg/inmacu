'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Bell } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface Horario {
  id: string;
dia: string;
hora: string;
tipo: 'misa' | 'confesion';
sacerdote?: string;
notas?: string;
recordatorio?: boolean;
}

export const HorariosMisas: React.FC = () => {
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
dia: 'Sabado',
  hora: '6:00 PM',
tipo: 'misa',
sacerdote: 'P. Jose Reyes',
},
{
id: '3',
dia: 'Domingo',
hora: '8:00 AM, 11:00 AM, 1:00 PM',
tipo: 'misa',
},
{
id: '4',
dia: 'Sabado',
hora: '4:00 PM - 5:00 PM',
tipo: 'confesion',
notas: 'Confesiones sacramentales',
},
]);

const [recordatorios, setRecordatorios] = useState<Set<string>>(new Set());

const toggleRecordatorio = (id: string) => {
const newSet = new Set(recordatorios);
if (newSet.has(id)) {
newSet.delete(id);
} else {
newSet.add(id);
}
setRecordatorios(newSet);
       };

const container = {
  hidden: { opacity: 0 },
    show: {
opacity: 1,
  transition: {
staggerChildren: 0.1,
  },
    },
};

const item = {
  hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    };

return (
  <div className="max-w-4xl mx-auto p-6">
  <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-8"
  >
  <h2 className="text-3xl font-bold text-primary-dark mb-2">
  Horarios de Misas
</h2>
<p className="text-gray-600">
Unete a nuestra comunidad en cualquiera de nuestras celebraciones
</p>
</motion.div>

<motion.div
variants={container}
initial="hidden"
  animate="show"
  className="grid md:grid-cols-2 gap-6 mb-12"
  >
  {horarios.map((horario) => (
<motion.div
  key={horario.id}
  variants={item}
  className={`rounded-lg p-6 shadow-lg hover:shadow-xl transition ${
  horario.tipo === 'misa'
  ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-primary-dark'
: 'bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-900'
  }`}
>
  <div className="flex items-center justify-between mb-4">
  <span
  className={`text-sm font-bold px-3 py-1 rounded-full ${
  horario.tipo === 'misa'
  ? 'bg-blue-200 text-primary-dark'
  : 'bg-purple-200 text-purple-900'
  }`}
  >
{horario.tipo === 'misa' ? 'Misa' : 'Confesion'}
</span>
  <motion.button
onClick={() => toggleRecordatorio(horario.id)}
  whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
  className={`p-2 rounded-lg transition ${
recordatorios.has(horario.id)
? 'bg-yellow-300 text-yellow-900'
: 'bg-gray-200 text-gray-600 hover:bg-gray-300'
}`}
>
<Bell className="w-5 h-5" />
  </motion.button>
</div>

  <h3 className="text-lg font-bold text-gray-900 mb-2">
{horario.dia}
</h3>

<div className="flex items-center gap-2 mb-3 text-gray-700">
  <Clock className="w-5 h-5 text-primary-dark" />
<span className="font-semibold">{horario.hora}</span>
  </div>

{horario.sacerdote && (
<div className="flex items-center gap-2 mb-3 text-gray-600 text-sm">
<span>{horario.sacerdote}</span>
</div>
)}

{horario.notas && (
<div className="bg-white bg-opacity-60 rounded p-2 text-sm text-gray-700 italic mb-4">
{horario.notas}
  </div>
)}

<Button
variant={horario.tipo === 'misa' ? 'primary' : 'secondary'}
size="sm"
className="w-full"
>
  {horario.tipo === 'misa' ? 'Reservar Lugar' : 'Mas Informacion'}
</Button>
  </motion.div>
))}
</motion.div>

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.5 }}
className="bg-primary-dark text-white rounded-lg p-6 border border-primary"
>
<h3 className="text-lg font-bold text-accent-gold mb-4">
Ubicacion
  </h3>
<div className="flex items-start gap-3">
<MapPin className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
<div>
<p className="font-semibold">
Parroquia Santa Maria de la Asuncion
</p>
<p className="text-gray-300">
Tejedores de Aranza, Colonia Vasco de Quiroga
</p>
<p className="text-gray-300">Morelia, Michoacan</p>
  <p className="text-accent-gold font-semibold mt-2">
  (722) 000-0000
  </p>
  </div>
  </div>
  </motion.div>
  </div>
  );
};
