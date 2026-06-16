import { NextRequest, NextResponse } from 'next/server';

// Mock data
let horarios = [
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
    dia: 'Domingo',
    hora: '8:00 AM, 11:00 AM, 1:00 PM',
    tipo: 'misa',
    },
  ];

export async function GET() {
  return NextResponse.json(horarios);
  }

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
      }

    const data = await request.json();
    const newHorario = {
      id: Date.now().toString(),
      ...data,
      };

    horarios.push(newHorario);
    return NextResponse.json(newHorario, { status: 201 });
    } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear horario' },
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
    horarios = horarios.map((h) => (h.id === id ? { id, ...data } : h));

    return NextResponse.json({ success: true });
    } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar horario' },
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
    horarios = horarios.filter((h) => h.id !== id);

    return NextResponse.json({ success: true });
    } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar horario' },
      { status: 500 }
      );
    }
  }
