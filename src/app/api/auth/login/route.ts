import { NextRequest, NextResponse } from 'next/server';
import dbConnection from '@/lib/db';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { generateToken } from '@/utils/generateToken';

export const POST = async (req: NextRequest) => {
  await dbConnection();

  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Fill all input fields' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Validate password
    const isMatchPassword = await bcrypt.compare(password, existingUser.password);
    if (!isMatchPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid Credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = await generateToken(existingUser._id);

    const response = NextResponse.json(
      {
        success: true,
        message: 'User logged in successfully',
        user: {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        },
        token,
      },
      { status: 200 }
    );


    response.cookies.set('authToken',token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 *60 * 60 *1000,// 1 hour
    });

    return response;

  } catch (error: any) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
        error: error.message.replace(/[^a-zA-Z0-9]/g, ''), // Sanitize error message
      },
      { status: 500 }
    );
  }
};
