import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

    const orders = await prisma.order.findMany({
        where: { userId: Number(userId) },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { userId, items, total } = body; // items = [{ productId, quantity }]

    const order = await prisma.order.create({
        data: {
            userId,
            total,
            status: 'PENDING',
            items: {
                create: items.map((item: any) => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            }
        }
    });
    return NextResponse.json(order);
}