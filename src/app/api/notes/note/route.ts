import { NextRequest, NextResponse } from 'next/server';
import dbConnection from '@/lib/db';
import Note from '@/models/Note';
// import User from '@/models/User';

// Get a single note by ID
export async function GET(req: NextRequest) {
    try {
      await dbConnection();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json({ success: false, error: 'ID is required.' }, { status: 400 });
      }
  
      const note = await Note.findById(id);
  
      if (!note) {
        return NextResponse.json({ success: false, error: 'Note not found.' }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, note }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }