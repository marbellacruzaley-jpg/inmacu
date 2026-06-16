'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { NewsEditor } from '@/components/admin/NewsEditor';
import { Button } from '@/components/common/Button';

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

                export default function AdminNoticiasPage() {
                  const router = useRouter();
                    const { isAuthenticated } = useAuth();
                      const [noticias, setNoticias] = useState<Noticia[]>([
                          {
                                id: '1',
                                      titulo: 'Concierto de Navidad este Sabado',
                                            descripcion: 'Una velada musical especial en el templo.',
                                                  imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=700&q=85',
                                                        categoria: 'Eventos',
                                                              fecha: new Date(2026, 5, 20),
                                                                    contenido: 'Contenido completo...',
                                                                          isLive: false,
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
                                                                                                          
                                                                                                            const handleSave = (noticia: Noticia) => {
                                                                                                                setNoticias((prev) => {
                                                                                                                      const exists = prev.find((n) => n.id === noticia.id);
                                                                                                                            if (exists) {
                                                                                                                                    return prev.map((n) => (n.id === noticia.id ? noticia : n));
                                                                                                                                          }
                                                                                                                                                return [noticia, ...prev];
                                                                                                                                                    });
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                        const handleDelete = (id: string) => {
                                                                                                                                                            if (confirm('Estas seguro de que deseas eliminar esta noticia?')) {
                                                                                                                                                                  setNoticias((prev) => prev.filter((n) => n.id !== id));
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
                                                                                                                                                                                                                                                                              <h1 className="text-3xl font-bold">Gestionar Noticias</h1>
                                                                                                                                                                                                                                                                                        <p className="text-gray-300 mt-2">
                                                                                                                                                                                                                                                                                                    Crea, edita y elimina noticias de la parroquia
                                                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                            </header>
                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                  <main className="max-w-7xl mx-auto px-4 py-12">
                                                                                                                                                                                                                                                                                                                                          <motion.div
                                                                                                                                                                                                                                                                                                                                                    initial={{ opacity: 0, y: 20 }}
                                                                                                                                                                                                                                                                                                                                                              animate={{ opacity: 1, y: 0 }}
                                                                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                                                                <NewsEditor
                                                                                                                                                                                                                                                                                                                                                                                            noticias={noticias}
                                                                                                                                                                                                                                                                                                                                                                                                        onSave={handleSave}
                                                                                                                                                                                                                                                                                                                                                                                                                    onDelete={handleDelete}
                                                                                                                                                                                                                                                                                                                                                                                                                              />
                                                                                                                                                                                                                                                                                                                                                                                                                                      </motion.div>
                                                                                                                                                                                                                                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                  
