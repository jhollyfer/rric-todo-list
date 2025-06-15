import { PlusCircleIcon, RocketIcon, TrashIcon } from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Estudar React",
    isCompleted: true,
  },
  {
    id: "2",
    title: "Estudar Node",
    isCompleted: true,
  },
  {
    id: "3",
    title: "Estudar Next",
    isCompleted: false,
  },
  {
    id: "4",
    title: "Estudar Tailwind",
    isCompleted: false,
  },
  {
    id: "5",
    title: "Estudar Prisma",
    isCompleted: false,
  },
];

export function App() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-gray-900/85">
      <header className="w-full flex items-center min-h-[200px] h-full bg-gray-900 text-white">
        <nav className="container mx-auto flex items-center justify-center gap-2">
          <RocketIcon size={32} />
          <h1 className="text-4xl font-semibold">Todo</h1>
        </nav>
      </header>
      <section className="flex-1 flex flex-col items-center w-full relative gap-6 min-h-screen">
        <form className="container max-w-[736px] w-full flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 -top-6 z-10">
          <Input
            type="text"
            className="flex-1 w-full bg-gray-800 h-[54px] text-white focus-visible:ring-0 focus-visible:border-transparent border-transparent"
            placeholder="Adicione uma nova tarefa"
          />
          <Button
            className="h-[54px] cursor-pointer bg-purple-800 hover:bg-purple-900"
            type="submit"
          >
            <span>Criar</span>
            <PlusCircleIcon size={16} />
          </Button>
        </form>

        <div className="container max-w-[736px]  inline-flex pt-[88px] items-center justify-between">
          <div className="inline-flex gap-2">
            <Label className="text-white">Tarefas criadas</Label>
            <Badge className="rounded-full bg-gray-800">5</Badge>
          </div>
          <div className="inline-flex gap-2">
            <Label className="text-white">Concluídas</Label>
            <Badge className="rounded-full bg-gray-800">2 de 5</Badge>
          </div>
        </div>

        <div className="container max-w-[736px] w-full h-full flex flex-col gap-4">
          {tasks.map((task) => {
            return (
              <Card
                key={task.id}
                className="bg-gray-800 border-transparent text-white flex-row items-center p-4"
              >
                <CardHeader className="pt-2 px-0">
                  <Checkbox className="h-4 w-4 rounded-full cursor-pointer" />
                  {/* <CardTitle>Card Title</CardTitle> */}
                  {/* <CardDescription>Card Description</CardDescription> */}
                  {/* <CardAction>Card Action</CardAction> */}
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <h2>{task.title}</h2>
                </CardContent>
                <CardFooter className="p-0">
                  <Button className="cursor-pointer bg-transparent" size={"sm"}>
                    <TrashIcon size={16} />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
