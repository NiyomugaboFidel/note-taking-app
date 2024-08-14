import { NextRequest, NextResponse } from 'next/server';
import dbConnection from '@/lib/db';
import Note from '@/models/Note';
import User from '@/models/User';

// Create a new note
export async function POST(req: NextRequest) {
  try {
    await dbConnection();
    const { userId, title, content } = await req.json();

    if (!userId || !title || !content) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    const note = new Note({
      userId,
      title,
      content,
    });

    await note.save();

    return NextResponse.json({ success: true, note, message: `${title} added successfully` }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Get all notes or notes by userId
export async function GET(req: NextRequest) {
  try {
    await dbConnection();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const query = userId ? { userId } : {};

    // If a userId is provided, check if the user exists
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
      }
    }

    const notes = await Note.find(query);

    return NextResponse.json({ success: true, notes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Update a note by ID
export async function PUT(req: NextRequest) {
  try {
    await dbConnection();
    const { id, userId, title, content } = await req.json();

    if (!id || !userId || (!title && !content)) {
      return NextResponse.json({ success: false, error: 'ID, userId, and either title or content are required.' }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ success: false, error: 'Note not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, note: updatedNote }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Delete a note by ID
export async function DELETE(req: NextRequest) {
  try {
    await dbConnection();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!id || !userId) {
      return NextResponse.json({ success: false, error: 'ID and userId are required.' }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ success: false, error: 'Note not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Note deleted successfully.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
