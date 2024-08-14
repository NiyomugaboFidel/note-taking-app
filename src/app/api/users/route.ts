// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'GET request successful' });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json({ message: 'POST request successful', data });
}
