import { useEffect, useState } from 'react';
import { fetchTodos, deleteTodo} from '../lib/api';
import { useRouter } from 'next/router';

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const router = useRouter();

  const loadTodos = async () => {
    const todos = await fetchTodos();
    setTodos(todos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-lg max-w-screen-2xl">
        <div className="py-4 text-center text-white bg-blue-500">
          <h1 className="text-3xl font-bold">Todos List</h1>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todos.map(todo => (
                <tr key={todo.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{todo.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.dueDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.status}</td>
                  <td className="gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(todo.id)}
                      className="mr-4 text-blue-500 hover:text-blue focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
