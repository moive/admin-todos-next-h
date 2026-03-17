import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.user.deleteMany(); // delete * from user

  const user = await prisma.user.create({
    data: {
      email: 'test1@test.com',
      password: bcrypt.hashSync('123456', 10),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'Description 1', complete: true },
          { description: 'Description 2' },
          { description: 'Description 3' },
          { description: 'Description 4' },
          { description: 'Description 5' },
        ],
      },
    },
  });

  // const todo = await prisma.todo.createMany({
  //   data: [
  //     { description: 'Description 1', complete: true },
  //     { description: 'Description 2' },
  //     { description: 'Description 3' },
  //     { description: 'Description 4' },
  //     { description: 'Description 5' },
  //   ],
  // });

  // console.log(todo);

  return NextResponse.json({
    message: 'Seed Executed',
  });
}
