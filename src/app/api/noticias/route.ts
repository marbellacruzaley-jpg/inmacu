import { NextRequest, NextResponse } from 'next/server';

let noticias = [
  {
      id: '1',
          titulo: 'Concierto de Navidad',
              descripcion: 'Una velada musical especial',
                  imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=700&q=85',
                      categoria: 'Eventos',
                          fecha: new Date(),
                              contenido: 'Contenido completo...',
                                },
                                ];

                                export async function GET() {
                                  return NextResponse.json(noticias);
                                  }

                                  export async function POST(request: NextRequest) {
                                    try {
                                        const token = request.headers.get('authorization')?.split(' ')[1];
                                            if (!token) {
                                                  return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
                                                      }

                                                          const data = await request.json();
                                                              const newNoticia = {
                                                                    id: Date.now().toString(),
                                                                          ...data,
                                                                                fecha: new Date(),
                                                                                    };

                                                                                        noticias.push(newNoticia);
                                                                                            return NextResponse.json(newNoticia, { status: 201 });
                                                                                              } catch (error) {
                                                                                                  return NextResponse.json(
                                                                                                        { error: 'Error al crear noticia' },
                                                                                                              { status: 500 }
                                                                                                                  );
                                                                                                                    }
                                                                                                                    }
                                                                                                                    
