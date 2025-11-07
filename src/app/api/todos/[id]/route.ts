import { PrismaClient, Todo } from "@/generated/prisma";
import { get } from "http";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: Promise<{ id: string }>;
}

const prisma = new PrismaClient();

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  });
  return todo;
};

export async function GET(request: Request, segments: Segments) {
  const { id } = await segments.params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ messsage: `Todo with id: ${id} not found` }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, segments: Segments) {
  const { id } = await segments.params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ messsage: `Todo with id: ${id} not found` }, { status: 404 });
  }

  try {
    const { description, complete } = await putSchema.validate(await request.json());

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: { description, complete },
    });
    return NextResponse.json(updateTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
