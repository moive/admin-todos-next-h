"use client";

import { Todo } from "@/generated/prisma";
import { TodoItem } from "./TodoItem";

interface ITodosGrid {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: ITodosGrid) => {
  console.log(todos);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};
