import { NextRequest, NextResponse } from 'next/server';

// Mock data
let peticiones = [
  {
    id: '1',
    nombre: 'Maria',
    intension: 'Por la salud de mi madre',
    fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    oraciones: 12,
    estado: 'pendiente',
    },
  ];

export async function GET() {
  return NextResponse.json(peticiones);
  }

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newPeticion = {
      id: Date.now().toString(),
      ...data,
      fecha: new Date(),
      oraciones: 0,
      estado: 'pendiente',
      };

    peticiones.push(newPeticion);
    return NextResponse.json(newPeticion, { status: 201 });
    } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear peticion' },
      { status: 500 }
      );
    }
  }

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
      }

    const { id, ...data } = await request.json();
    peticiones = peticiones.map((p) => (p.id === id ? { id, ...data } : p));

    return NextResponse.json({ success: true });
    } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar peticion' },
      { status: 500 }
      );
    }
  }

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
      }

    const { id } = await request.json();
    peticiones = peticiones.filter((p) => p.id !== id);

    return NextResponse.json({ success: true });
    } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar peticion' },
      { status: 500 }
      );
    }
  }
