// src/middleware/auth.ts
import { verifyToken } from '@/utils/generateToken';
import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(request: NextRequest) {
    const token = request.cookies.get('jwt')?.value || request.headers.get('jwt');
    
    // Check if the token exists
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify the token
    const id = verifyToken(token);
    
    // If the token is not valid, redirect to login
    if (!id) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Create a response and set headers and cookies
    const response = NextResponse.next();
    
    // Optionally set an ID header (if required for downstream services)
    response.headers.set('id', id.toString());

    // Optionally set a new cookie (if needed)
    response.cookies.set('id', id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 hour
    });

    return response;
}
