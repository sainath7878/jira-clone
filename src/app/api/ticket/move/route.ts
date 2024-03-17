import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { schema } from '@/schema/moveTicket';

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        const response = schema.safeParse(payload);
        if (!response.success) {
            return Response.json({ error: { message: 'Fields are missing or passed incorrect' } }, { status: 400 })
        }
        const { ticketId, boardId, boardColumnId, position } = payload;

        const ticketData = await prisma.boardTicket.update({
            where: {
                id: ticketId
            },
            data: {
                boardId,
                boardColumnId,
                position
            }
        })
        return Response.json({
            data: {
                ticketData
            }
        }, { status: 200 })
    }
    catch (err) {
        console.log(err);
        return Response.json({ error: { message: 'Something went wrong!' } }, { status: 500 })
    }
}