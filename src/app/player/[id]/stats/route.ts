import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const stats = await prisma.playerStats.findUnique({
    where: { playerId: params.id },
  });

  if (!stats) {
    return NextResponse.json({ error: 'Stats not found' }, { status: 404 });
  }

  return NextResponse.json(stats);
}