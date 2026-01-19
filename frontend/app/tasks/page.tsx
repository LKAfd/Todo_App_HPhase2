'use client';

import React, { useState, useEffect } from 'react';
import { Task, CreateTaskInput } from '@/lib/types';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import { useAuth } from '@/components/providers/AuthProvider';
import { apiClient } from '@/lib/api-client';

const TasksPage: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks
  const fetchTasks = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const fetchedTasks = await apiClient.getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh tasks
  const refreshTasks = () => {
    fetchTasks();
  };

  // Initialize
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  // Handle task form submission (create/update)
  const handleTaskSubmit = async (data: CreateTaskInput) => {
    try {
      if (editingTask) {
        // Update existing task
        const updatedTask = await apiClient.updateTask(editingTask.id, data);
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      } else {
        // Create new task
        const newTask = await apiClient.createTask(data);
        setTasks([...tasks, newTask]);
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setError('Failed to save task. Please try again.');
      console.error('Error saving task:', err);
    }
  };

  // Handle task completion toggle
  const handleToggleComplete = async (taskId: string | number) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const updatedTask = await apiClient.toggleTask(taskId);
      setTasks(tasks.map(t =>
        t.id === taskId ? { ...t, completed: updatedTask.completed, updatedAt: updatedTask.updatedAt } : t
      ));
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error toggling task:', err);
    }
  };

  // Handle task deletion
  const handleDelete = async (taskId: string | number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.deleteTask(taskId);
        setTasks(tasks.filter(t => t.id !== taskId));
      } catch (err) {
        setError('Failed to delete task. Please try again.');
        console.error('Error deleting task:', err);
      }
    }
  };

  // Handle task edit
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Show loading if auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show unauthorized message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Please sign in to view tasks
            </h2>
            <p className="mt-2 text-gray-600">
              <a href="/(auth)/sign-in" className="text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your personal tasks
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="mt-8">
          {showForm ? (
            <TaskForm
              task={editingTask || undefined}
              onSubmit={handleTaskSubmit}
              onCancel={handleCancelForm}
              submitButtonText={editingTask ? 'Update Task' : 'Create Task'}
            />
          ) : (
            <TaskList
              tasks={tasks}
              loading={loading}
              error={error}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onRefresh={refreshTasks}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;