// pages/edit/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchTodoById, updateTodo } from '@/lib/api';

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export default function EditTodo() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const loadTodo = async () => {
        const todo = await fetchTodoById(id as string);
        setTodo(todo);
        setTitle(todo.title);
        setDescription(todo.description);
        setDueDate(todo.dueDate);
        setStatus(todo.status);
      };
      loadTodo();
    }
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !description || !dueDate || !status) {
      setError('All fields are required.');
      return;
    }

    try {
      if (todo) {
        await updateTodo(todo.id, {
          title,
          description,
          dueDate,
          status,
        });
        router.push('/todos');
      }
    } catch (err) {
      setError('Failed to update todo.');
      console.error('Update Todo Error:', err);
    }
  };


  if (!todo) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="py-4 text-center text-white bg-blue-500 rounded-t-lg">

          <h1 className="text-3xl font-bold">Edit Todo</h1>
        </div>
        <div className="justify-center w-full max-w-lg p-8 bg-white rounded-lg ">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <button
                onClick={handleUpdate}
                className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
