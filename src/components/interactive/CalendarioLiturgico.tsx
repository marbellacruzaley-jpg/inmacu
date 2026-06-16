'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
  import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button';

interface EventoLiturgico {
  id: string;
fecha: Date;
titulo: string;
tipo: 'misa' | 'fiesta' | 'novena' | 'confesion';
descripcion: string;
horario?: string;
color: string;
}

export const CalendarioLiturgico: React.FC = () => {
const [mesActual, setMesActual] = useState(new Date());
const [eventos, setEventos] = useState<EventoLiturgico[]>([
{
id: '1',
  fecha: new Date(2026, 5, 8),
  titulo: 'Fiesta de Corpus Christi',
  tipo: 'fiesta',
  descripcion: 'Celebracion del Cuerpo de Cristo',
  horario: '10:00 AM',
  color: 'bg-red-500',
  },
{
id: '2',
  fecha: new Date(2026, 5, 15),
  titulo: 'Novena a la Virgen',
  tipo: 'novena',
  descripcion: 'Novena preparatoria',
  horario: '6:00 PM',
  color: 'bg-blue-500',
  },
{
id: '3',
  fecha: new Date(2026, 5, 22),
  titulo: 'Misa Especial',
  tipo: 'misa',
  descripcion: 'Misa de accion de gracias',
  horario: '7:00 AM',
  color: 'bg-green-500',
  },
  ]);

const diasDelMes = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0).getDate();
const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1).getDay();

const cambiarMes = (direccion: 'prev' | 'next') => {
  setMesActual((prev) => {
  const newDate = new Date(prev);
  newDate.setMonth(prev.getMonth() + (direccion === 'next' ? 1 : -1));
return newDate;
       });
};

const getEventosDia = (dia: number) => {
const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), dia);
return eventos.filter((e) => e.fecha.toDateString() === fecha.toDateString());
};

const container = {
hidden: { opacity: 0 },
show: {
opacity: 1,
  transition: {
staggerChildren: 0.05,
  },
},
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
    };

return (
  <motion.div
  className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
  initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  >
  <div className="flex items-center justify-between mb-8">
  <Button
  variant="outline"
  size="sm"
  onClick={() => cambiarMes('prev')}
>
  <ChevronLeft className="w-5 h-5" />
  </Button>

  <h2 className="text-3xl font-bold text-primary-dark">
  {mesActual.toLocaleDateString('es-MX', {
  month: 'long',
  year: 'numeric',
  })}
</h2>

  <Button
  variant="outline"
  size="sm"
  onClick={() => cambiarMes('next')}
>
  <ChevronRight className="w-5 h-5" />
  </Button>
  </div>

  <motion.div
  className="grid grid-cols-7 gap-2 mb-8"
  variants={container}
  initial="hidden"
  animate="show"
  >
  {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((dia) => (
  <div
  key={dia}
  className="text-center font-semibold text-gray-600 py-2 text-sm"
  >
  {dia}
  </div>
  ))}

{Array.from({ length: primerDia }).map((_, i) => (
  <div key={`empty-${i}`} className="aspect-square" />
  ))}

  {Array.from({ length: diasDelMes }).map((_, i) => {
  const dia = i + 1;
  const eventosDelDia = getEventosDia(dia);

return (
  <motion.div
  key={dia}
  variants={item}
  className="aspect-square border border-gray-200 rounded-lg p-2 hover:shadow-md transition cursor-pointer group bg-gray-50 hover:bg-blue-50"
  >
  <div className="text-sm font-semibold text-gray-700 mb-1">
  {dia}
  </div>
  <div className="space-y-0.5">
  {eventosDelDia.slice(0, 2).map((evento) => (
  <div
  key={evento.id}
  className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${evento.color}`}
title={evento.titulo}
  >
  {evento.titulo}
  </div>
  ))}
{eventosDelDia.length > 2 && (
  <div className="text-xs text-gray-500 px-1.5">
  +{eventosDelDia.length - 2}
</div>
  )}
</div>
  </motion.div>
  );
})}
</motion.div>

  <AnimatePresence>
  {eventos.length > 0 && (
  <motion.div
  className="border-t pt-6"
  initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  >
  <h3 className="text-lg font-bold text-primary-dark mb-4">
  Proximos eventos
</h3>
  <div className="space-y-3">
  {eventos.slice(0, 5).map((evento) => (
  <motion.div
  key={evento.id}
  className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg border-l-4 border-primary-dark"
  whileHover={{ x: 4 }}
>
<div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${evento.color}`} />
  <div className="flex-1">
  <p className="font-semibold text-gray-900">
  {evento.titulo}
  </p>
  <p className="text-sm text-gray-600">{evento.descripcion}</p>
  {evento.horario && (
  <p className="text-xs text-gray-500 mt-1">
  {evento.horario}
  </p>
  )}
  </div>
  </motion.div>
  ))}
  </div>
  </motion.div>
  )}
  </AnimatePresence>
  </motion.div>
  );
};
