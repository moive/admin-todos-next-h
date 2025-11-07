import * as yup from "yup";
import { PrismaClient } from "@/generated/prisma";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  // const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json({ message: "Take must be a number" }, { status: 400 });
  }
  if (isNaN(skip)) {
    return NextResponse.json({ message: "Take must be a number" }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { description, complete } = await postSchema.validate(await request.json());
    const todo = await prisma.todo.create({ data: { description, complete } });
    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }
}
