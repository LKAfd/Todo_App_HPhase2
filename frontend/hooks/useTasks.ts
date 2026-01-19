import { useState, useEffect } from 'react';
import { Task, CreateTaskInput } from '@/lib/types';
import { apiClient } from '@/lib/api-client';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (taskData: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, taskData: Partial<CreateTaskInput>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await apiClient.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const createTask = async (taskData: CreateTaskInput) => {
    try {
      setLoading(true);
      const newTask = await apiClient.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing task
  const updateTask = async (id: string, taskData: Partial<CreateTaskInput>) => {
    try {
      setLoading(true);
      const updatedTask = await apiClient.updateTask(id, taskData);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await apiClient.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion
  const toggleTask = async (id: string) => {
    try {
      setLoading(true);
      const updatedTask = await apiClient.toggleTask(id);
      setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? { ...task, completed: updatedTask.completed, updatedAt: updatedTask.updatedAt }
            : task
        )
      );
    } catch (err) {
      setError('Failed to toggle task');
      console.error('Error toggling task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};