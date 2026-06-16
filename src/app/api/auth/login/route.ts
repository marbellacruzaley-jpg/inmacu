import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'parroquia-secret-key-2025';
const ADMIN = { username: 'admin', password: '12345' };

export async function POST(request: NextRequest) {
  try {
      const { username, password } = await request.json();

          if (username === ADMIN.username && password === ADMIN.password) {
                const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
                      return NextResponse.json({
                              success: true,
                                      token,
                                              username,
                                                    });
                                                        }

                                                            return NextResponse.json(
                                                                  { error: 'Credenciales invalidas' },
                                                                        { status: 401 }
                                                                            );
                                                                              } catch (error) {
                                                                                  return NextResponse.json(
                                                                                        { error: 'Error al procesar la solicitud' },
                                                                                              { status: 500 }
                                                                                                  );
                                                                                                    }
                                                                                                    }
                                                                                                    
