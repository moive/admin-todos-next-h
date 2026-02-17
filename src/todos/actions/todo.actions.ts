'use server';

import { Todo } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const sleep = async (secounds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, secounds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) throw `Todo with id: ${id} not found`;

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath('/dashboard/server-todos');

  return updateTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath('/dashboard/server-todos');
    return todo;
  } catch (error) {
    console.log(error);
    return {
      message: 'Error todo create',
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({ where: { complete: true } });
  revalidatePath('/dashboard/server-todos');
};
