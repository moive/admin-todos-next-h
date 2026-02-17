import { prisma } from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import { unstable_cache } from 'next/cache';

// const prisma = new PrismaClient();

export const metadata = {
  title: 'List Todos',
  description: 'List Todos',
};

const getTodos = unstable_cache(
  async () => {
    return await prisma.todo.findMany({ orderBy: { description: 'asc' } });
  },
  ['todos'],
  { revalidate: 60 }
);

export default async function RestTodosPage() {
  const todos = await getTodos();

  // const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
  console.log('Built server');
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
