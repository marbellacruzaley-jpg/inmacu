'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
  import { X, Plus, Edit2, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

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

interface NewsEditorProps {
    noticias: Noticia[];
  onSave: (noticia: Noticia) => void;
  onDelete: (id: string) => void;
}

export const NewsEditor: React.FC<NewsEditorProps> = ({
  noticias,
  onSave,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Noticia>>({
    titulo: '',
    descripcion: '',
    imagen: '',
    categoria: 'Eventos',
    contenido: '',
    isLive: false,
});

  const categorias = ['Eventos', 'Formacion', 'Liturgia', 'Comunidad', 'Noticias'];

  const handleOpen = (noticia?: Noticia) => {
    if (noticia) {
      setFormData(noticia);
      setEditingId(noticia.id);
} else {
      setFormData({
        titulo: '',
        descripcion: '',
        imagen: '',
        categoria: 'Eventos',
        contenido: '',
        isLive: false,
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

    const noticia: Noticia = {
      id: editingId || Date.now().toString(),
      titulo: formData.titulo || '',
      descripcion: formData.descripcion || '',
      imagen: formData.imagen || '',
      categoria: formData.categoria || 'Eventos',
      fecha: editingId
        ? noticias.find((n) => n.id === editingId)?.fecha || new Date()
        : new Date(),
      contenido: formData.contenido || '',
      isLive: formData.isLive || false,
};

    onSave(noticia);
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
        Nueva Noticia
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
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-primary-dark text-white p-6 flex items-center justify-between border-b">
                <h2 className="text-2xl font-bold">
{editingId ? 'Editar Noticia' : 'Nueva Noticia'}
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
                    Titulo *
                  </label>
                  <input
                    type="text"
                    value={formData.titulo || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
}
                    placeholder="Titulo de la noticia"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripcion Corta *
                  </label>
                  <textarea
                    value={formData.descripcion || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
}
                    placeholder="Descripcion breve para la tarjeta"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contenido Completo *
                  </label>
                  <textarea
                    value={formData.contenido || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, contenido: e.target.value })
}
                    placeholder="Contenido completo de la noticia"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL de Imagen *
                  </label>
                  <input
                    type="url"
                    value={formData.imagen || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, imagen: e.target.value })
}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    required
                  />
{formData.imagen && (
                    <img
                      src={formData.imagen}
                      alt="Preview"
                      className="mt-3 w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    value={formData.categoria || 'Eventos'}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                  >
{categorias.map((cat) => (
                      <option key={cat} value={cat}>
{cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isLive"
                    checked={formData.isLive || false}
                    onChange={(e) =>
                      setFormData({ ...formData, isLive: e.target.checked })
}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="isLive" className="text-sm font-semibold text-gray-700">
                    Marcar como "En Vivo"
                  </label>
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
          Noticias ({noticias.length})
        </h3>

{noticias.length === 0 ? (
          <Card className="text-center py-12 text-gray-500">
            <p>No hay noticias aun. Crea la primera.</p>
          </Card>
        ) : (
          <div className="space-y-3">
{noticias.map((noticia) => (
              <motion.div
                key={noticia.id}
                layout
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition"
              >
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900">
{noticia.titulo}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
{noticia.descripcion}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-primary-dark px-2 py-1 rounded">
{noticia.categoria}
                        </span>
{noticia.isLive && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-red-700 rounded-full animate-pulse" />
                            EN VIVO
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOpen(noticia)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(noticia.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
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
