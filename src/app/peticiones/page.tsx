'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { PeticionesOracion } from '@/components/interactive/PeticionesOracion';

export default function PeticionesPage() {
  return (
      <>
            <HeroSection
                    bgImage="https://images.unsplash.com/photo-1543342384-1f1350e27861?w=1800&q=90"
                            title="Intenciones de Oracion"
                                    subtitle="Comparte tus peticiones con la comunidad"
                                          />

                                                <section className="py-16">
                                                        <PeticionesOracion />
                                                              </section>
                                                                  </>
                                                                    );
                                                                    }
                                                                    
