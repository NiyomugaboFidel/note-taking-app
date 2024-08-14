import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnection from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnection(); // Ensure the database connection is established

  try {
    const { username, email, password } = await req.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Fill all input fields',
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'User with this email already exists. Please try another',
      }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating user:', error); // Log the error for debugging
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message.replace(/[^a-zA-Z0-9]/g, ''), // Sanitize error message
    }, { status: 500 });
  }
}
