import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    // WARNING: This is basic. In production, use bcrypt to compare hashed passwords.
    const user = await prisma.user.findUnique({
        where: { email: body.email }
    });

    if (user && user.password === body.password) {
        return NextResponse.json({ success: true, userId: user.id, name: user.name });
    }
    return NextResponse.json({ success: false }, { status: 401 });
}