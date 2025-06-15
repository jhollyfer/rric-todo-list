import { TasksContextProvider } from "./contexts/tasks-context";
import { Home } from "./pages/home";

export function App() {
  return (
    <TasksContextProvider>
      <Home />
    </TasksContextProvider>
  );
}
