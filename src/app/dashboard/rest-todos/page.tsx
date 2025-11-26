import { prisma } from "@/lib/prisma";
import { TodosGrid } from "@/todos";

// const prisma = new PrismaClient();

export const metadata = {
  title: "List Todos",
  description: "List Todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div>
      <TodosGrid todos={todos} />
    </div>
  );
}
