import React from "react";

import { TasksContext } from "@/contexts/tasks-context";

export function useTasks() {
  const context = React.useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksContextProvider");
  }
  return context;
}
