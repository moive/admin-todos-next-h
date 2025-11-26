import { Todo } from "@/generated/prisma";

import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface ITodoItem {
  todo: Todo;
}

export const TodoItem = ({ todo }: ITodoItem) => {
  return (
    <div className={todo.complete ? styles.todoTodo : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60
          ${todo.complete ? "bg-blue-100" : "bg-red-100"}
        `}
        >
          {todo.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
        </div>
        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
