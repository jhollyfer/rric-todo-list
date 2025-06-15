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

export function TasksContextProvider({ children }: TasksContextProviderProps) {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  function createTask(task: Pick<Task, "description">) {
    setTasks((old) => {
      const id = Math.random().toString(36).substring(2, 9);

      const payload: Task = {
        id: id,
        description: task.description,
        done: false,
      };

      return [...old, payload];
    });
  }

  function removeTask(taskId: string) {
    setTasks((old) => old.filter((task) => task.id !== taskId));
  }

  function toggleTask(taskId: string) {
    setTasks((old) => {
      return old.map((task) => {
        if (task.id === taskId) {
          return { ...task, done: !task.done };
        }

        return task;
      });
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
