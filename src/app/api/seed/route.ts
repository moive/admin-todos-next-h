// import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo
  const todo = await prisma.todo.createMany({
    data: [
      { description: "Description 1", complete: true },
      { description: "Description 2" },
      { description: "Description 3" },
      { description: "Description 4" },
      { description: "Description 5" },
    ],
  });

  console.log(todo);

  return NextResponse.json({
    message: "Seed Executed",
  });
}
