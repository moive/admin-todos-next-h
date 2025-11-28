"use server";

import { Todo } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) throw `Todo with id: ${id} not found`;

  const updateTodo = await prisma.todo.update({ where: { id }, data: { complete } });

  revalidatePath("/dashboard/server-todos");

  return updateTodo;
};
