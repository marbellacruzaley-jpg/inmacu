'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
  import { X, Plus, Edit2, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

interface Horario {
    id: string;
  dia: string;
  hora: string;
  tipo: 'misa' | 'confesion';
  sacerdote?: string;
  notas?: string;
}

interface HorariosEditorProps {
    horarios: Horario[];
  onSave: (horario: Horario) => void;
  onDelete: (id: string) => void;
}

export const HorariosEditor: React.FC<HorariosEditorProps> = ({
  horarios,
  onSave,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Horario>>({
    dia: '',
    hora: '',
    tipo: 'misa',
    sacerdote: '',
    notas: '',
});

  const handleOpen = (horario?: Horario) => {
    if (horario) {
      setFormData(horario);
      setEditingId(horario.id);
} else {
      setFormData({
        dia: '',
        hora: '',
        tipo: 'misa',
        sacerdote: '',
        notas: '',
});
      setEditingId(null);
}
    setIsOpen(true);
};

  const handleClose = () => {
    setIsOpen(false);
    setEditingId(null);
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const horario: Horario = {
      id: editingId || Date.now().toString(),
              dia: formData.dia || '',
              hora: formData.hora || '',
              tipo: (formData.tipo as 'misa' | 'confesion') || 'misa',
              sacerdote: formData.sacerdote,
              notas: formData.notas,
        };

    onSave(horario);
    handleClose();
  };

  return (
    <div className="space-y-6">
      <Button
        variant="primary"
        size="lg"
        onClick={() => handleOpen()}
        className="flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Nuevo Horario
      </Button>

      <AnimatePresence>
{isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full"
            >
              <div className="bg-primary-dark text-white p-6 flex items-center justify-between border-b">
                <h2 className="text-2xl font-bold">
{editingId ? 'Editar Horario' : 'Nuevo Horario'}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dia *
                  </label>
                  <input
                    type="text"
                    value={formData.dia || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, dia: e.target.value })
}
                    placeholder="Ej: Lunes a Viernes, Domingo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hora *
                  </label>
                  <input
                    type="text"
                    value={formData.hora || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, hora: e.target.value })
}
                    placeholder="Ej: 7:00 AM, 8:00 AM - 11:00 AM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo *
                  </label>
                  <select
                    value={formData.tipo || 'misa'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tipo: e.target.value as 'misa' | 'confesion',
})
}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  >
                    <option value="misa">Misa</option>
                    <option value="confesion">Confesion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sacerdote (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.sacerdote || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, sacerdote: e.target.value })
}
                    placeholder="Ej: P. Jose Reyes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notas (Opcional)
                  </label>
                  <textarea
                    value={formData.notas || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, notas: e.target.value })
}
                    placeholder="Informacion adicional"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-6 border-t">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
{editingId ? 'Actualizar' : 'Crear'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">
          Horarios ({horarios.length})
        </h3>

{horarios.length === 0 ? (
          <Card className="text-center py-12 text-gray-500">
            <p>No hay horarios configurados. Crea el primero.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
{horarios.map((horario) => (
              <motion.div
                key={horario.id}
                layout
                className={`border-l-4 rounded-lg p-4 ${
                  horario.tipo === 'misa'
                    ? 'bg-blue-50 border-primary-dark'
                    : 'bg-purple-50 border-purple-900'
}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-sm font-bold px-2 py-1 rounded ${
                          horario.tipo === 'misa'
                            ? 'bg-blue-200 text-primary-dark'
                            : 'bg-purple-200 text-purple-900'
}`}
                      >
{horario.tipo === 'misa' ? 'Misa' : 'Confesion'}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900">{horario.dia}</h4>
                    <p className="text-sm text-gray-600 mt-1">{horario.hora}</p>
{horario.sacerdote && (
                      <p className="text-sm text-gray-600">
{horario.sacerdote}
                      </p>
                    )}
{horario.notas && (
                      <p className="text-xs text-gray-500 mt-2 italic">
{horario.notas}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOpen(horario)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                    >
                      <Edit2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(horario.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
