"use client";

import { Todo } from "@/generated/prisma";
import { TodoItem } from "./TodoItem";

import * as api from "@/todos/helpers/todos.helper";
import { useRouter } from "next/navigation";

interface ITodosGrid {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: ITodosGrid) => {
  const router = useRouter();

  const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await api.updateTodo(id, complete);
    console.log({ updatedTodo });
    router.refresh();
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem todo={todo} toggleTodo={toggleTodo} key={todo.id} />
      ))}
    </div>
  );
};
