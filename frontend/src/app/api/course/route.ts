import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getCourse(); // Récupère toutes les courses
    return NextResponse.json(data), { status: 200 };
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }), { status: 500 };
  }
}
