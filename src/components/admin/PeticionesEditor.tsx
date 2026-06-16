'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

interface Peticion {
    id: string;
  nombre: string;
  intension: string;
  fecha: Date;
  oraciones: number;
  estado: 'pendiente' | 'respondida';
}

interface PeticionesEditorProps {
    peticiones: Peticion[];
  onUpdateEstado: (id: string, estado: 'pendiente' | 'respondida') => void;
  onDelete: (id: string) => void;
}

export const PeticionesEditor: React.FC<PeticionesEditorProps> = ({
  peticiones,
  onUpdateEstado,
  onDelete,
}) => {
  const [filtro, setFiltro] = useState<'todas' | 'pendiente' | 'respondida'>(
    'todas'
  );

  const peticionesFiltradas =
    filtro === 'todas'
      ? peticiones
      : peticiones.filter((p) => p.estado === filtro);

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
{(['todas', 'pendiente', 'respondida'] as const).map((f) => (
          <Button
            key={f}
            variant={filtro === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFiltro(f)}
          >
{f === 'todas' && `Todas (${peticiones.length})`}
{f === 'pendiente' &&
              `Pendientes (${peticiones.filter((p) => p.estado === 'pendiente').length})`}
{f === 'respondida' &&
              `Respondidas (${peticiones.filter((p) => p.estado === 'respondida').length})`}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
{peticionesFiltradas.length === 0 ? (
          <Card className="text-center py-12 text-gray-500">
            <p>No hay peticiones en esta categoria.</p>
          </Card>
        ) : (
          peticionesFiltradas.map((peticion) => (
            <motion.div
              key={peticion.id}
              layout
              className={`border-l-4 rounded-lg p-4 ${
                peticion.estado === 'pendiente'
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-green-50 border-green-500'
}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-sm font-bold px-2 py-1 rounded flex items-center gap-1 ${
                        peticion.estado === 'pendiente'
                          ? 'bg-yellow-200 text-yellow-900'
                          : 'bg-green-200 text-green-900'
}`}
                    >
{peticion.estado === 'pendiente' ? (
                        <>
                          <Clock className="w-4 h-4" />
                          Pendiente
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Respondida
                        </>
                      )}
                    </span>
                  </div>

                  <p className="font-semibold text-gray-900">
{peticion.intension}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Por: {peticion.nombre}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>
{peticion.fecha.toLocaleDateString('es-MX')}
                    </span>
                    <span>{peticion.oraciones} oraciones</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      onUpdateEstado(
                        peticion.id,
                        peticion.estado === 'pendiente'
                          ? 'respondida'
                          : 'pendiente'
                      )
}
                    className={`p-2 rounded-lg transition ${
                      peticion.estado === 'pendiente'
                        ? 'text-green-600 hover:bg-green-100'
                        : 'text-yellow-600 hover:bg-yellow-100'
}`}
                  >
{peticion.estado === 'pendiente' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(peticion.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
