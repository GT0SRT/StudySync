const API_BASE = 'http://localhost:4000/api';

export async function fetchTodos(uid) {
  const res = await fetch(`${API_BASE}/todos?uid=${uid}`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function addTodo(uid, title, description) {
  const res = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, title, description }),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
}

export async function updateTodo(uid, todoId, updates) {
  const res = await fetch(`${API_BASE}/todos/${todoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, ...updates }),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

export async function deleteTodo(uid, todoId) {
  const res = await fetch(`${API_BASE}/todos/${todoId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid }),
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
}