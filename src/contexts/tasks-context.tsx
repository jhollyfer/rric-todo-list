import React from "react";

import type { Task } from "@/lib/types";

interface TasksContextType {
  tasks: Task[];
  createTask: (task: Pick<Task, "description">) => void;
  removeTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
  total: number;
  completed: number;
}

export const TasksContext = React.createContext({} as TasksContextType);

interface TasksContextProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "@ignite-todo:tasks";

export function TasksContextProvider({ children }: TasksContextProviderProps) {
  const [tasks, setTasks] = React.useState<Task[]>(() => {
    return getStorageData();
  });

  function getStorageData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  function updateStorageData(data: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function createTask(task: Pick<Task, "description">) {
    setTasks((old) => {
      const id = Math.random().toString(36).substring(2, 9);

      const payload: Task = {
        id: id,
        description: task.description,
        done: false,
      };
      const data = [...old, payload];
      updateStorageData(data);
      return data;
    });
  }

  function removeTask(taskId: string) {
    setTasks((old) => {
      const data = old.filter((task) => task.id !== taskId);
      updateStorageData(data);
      return data;
    });
  }

  function toggleTask(taskId: string) {
    setTasks((old) => {
      const data = old.map((task) => {
        if (task.id === taskId) {
          return { ...task, done: !task.done };
        }

        return task;
      });
      updateStorageData(data);
      return data;
    });
  }

  const total = React.useMemo(() => tasks.length, [tasks]);
  const completed = React.useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, removeTask, toggleTask, total, completed }}
    >
      {children}
    </TasksContext.Provider>
  );
}
