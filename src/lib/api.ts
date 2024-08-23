// lib/api.ts

const API_URL = 'https://66b6ec8d7f7b1c6d8f1a74d1.mockapi.io/api/v1/todos';

// Define the Todo type for consistency and type safety
export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Error fetching todos: ${response.statusText}`);
  }
  return response.json();
}

export async function addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error(`Error adding todo: ${response.statusText}`);
  }
  return response.json();
}

export async function updateTodo(id: string, todo: Omit<Todo, 'id'>): Promise<Todo> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating todo with ID ${id}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Update Todo Error:', error);
      throw error;
    }
  }
  

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error deleting todo: ${response.statusText}`);
  }
}
// Fetch a single todo by its ID
export async function fetchTodoById(id: string): Promise<Todo> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching todo with ID ${id}: ${response.statusText}`);
    }
    return response.json();
  }