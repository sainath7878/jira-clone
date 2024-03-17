import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const queryParams = request.nextUrl.searchParams;
        const boardId = queryParams.get('boardId');
        const skip = queryParams.get('skip');
        const take = queryParams.get('take');
        if (!boardId || !skip || !take) {
            return Response.json({ error: { message: 'Fields are missing' } }, { status: 400 })
        }

        const board = prisma.board.findUniqueOrThrow({
            where: {
                id: boardId
            }
        })
        const boardColumns = prisma.boardColumn.findMany({
            where: {
                boardId
            }
        })
        const boardTickets = prisma.boardTicket.findMany({
            where: {
                boardId
            },
            skip: Number(skip),
            take: Number(take)
        })
        const data = await Promise.all([board, boardColumns, boardTickets])
        return Response.json({ data: { board: data[0], boardColumns: data[1], boardTickets: data[2] } }, { status: 200 });
    }
    catch (err) {
        console.log(err);
        return Response.json({ error: { message: 'Something went wrong!' } }, { status: 500 })
    }
}