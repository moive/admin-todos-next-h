import { PrismaClient } from "@/generated/prisma";
import { NextResponse, NextRequest } from "next/server";

interface Segments {
  params: Promise<{ id: string }>;
}

const prisma = new PrismaClient();

export async function GET(request: Request, segments: Segments) {
  const { id } = await segments.params;

  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    return NextResponse.json({ messsage: `Todo with id: ${id} not found` }, { status: 404 });
  }

  return NextResponse.json(todo);
}
