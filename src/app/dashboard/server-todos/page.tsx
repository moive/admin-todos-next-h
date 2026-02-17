import { prisma } from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

// const prisma = new PrismaClient();

export const metadata = {
  title: 'List Todos',
  description: 'List Todos',
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
  return (
    <>
      <span className="text-3xl mb-10">Server Action</span>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
