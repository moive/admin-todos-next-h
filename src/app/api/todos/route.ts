import { PrismaClient } from "@/generated/prisma";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // const todos = await prisma.todo.findMany();
  // return NextResponse.json(todos);
  const todos = await prisma.todo.findMany();
  return Response.json(todos);
}
