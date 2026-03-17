import { unstable_cache } from 'next/cache';
import { getUserSessionServer } from '@/auth/actions/auth-actions';
import { prisma } from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import { redirect } from 'next/navigation';

// const prisma = new PrismaClient();

export const metadata = {
  title: 'List Todos',
  description: 'List Todos',
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer();
  if (!user) redirect('/api/auth/signin');

  const getTodos = unstable_cache(
    async () => {
      return await prisma.todo.findMany({
        where: { userId: user.id },
        orderBy: { description: 'asc' },
      });
    },
    ['todos', user.id],
    { revalidate: 60 }
  );

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
