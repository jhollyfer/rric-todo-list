import { TaskCard } from "@/components/task-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTasks } from "@/hooks/use-tasks";
import { ClipboardIcon, PlusCircleIcon, RocketIcon } from "lucide-react";

export function Home() {
  const { tasks, createTask, completed, total } = useTasks();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const description = event.currentTarget?.description?.value;

    if (!description) return;

    createTask({ description });
    event.currentTarget.reset();
  }

  return (
    <main className="flex min-h-screen w-full flex-col bg-gray-900/85">
      <header className="w-full flex items-center min-h-[200px] h-full bg-gray-900 text-white">
        <nav className="px-6 md:px-0 container mx-auto flex items-center justify-center gap-2">
          <RocketIcon size={32} />
          <h1 className="text-4xl font-semibold">Todo</h1>
        </nav>
      </header>
      <section className="flex-1 flex flex-col items-center w-full relative gap-6 min-h-screen">
        <form
          onSubmit={onSubmit}
          className="px-6 md:px-0 container max-w-[736px] w-full flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 -top-6 z-10"
        >
          <Input
            type="text"
            name="description"
            id="description"
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

        <div className="px-6 md:px-0 container max-w-[736px]  inline-flex pt-[88px] items-center justify-between">
          <div className="inline-flex gap-2">
            <Label className="text-white">Tarefas criadas</Label>
            <Badge className="rounded-full bg-gray-800">{total}</Badge>
          </div>
          <div className="inline-flex gap-2">
            <Label className="text-white">Concluídas</Label>
            <Badge className="rounded-full bg-gray-800">
              {completed} de {total}
            </Badge>
          </div>
        </div>

        <div className="px-6 md:px-0 container max-w-[736px] w-full h-full flex flex-col gap-4">
          <Separator className="opacity-50" />

          {total > 0 &&
            tasks.map((task) => <TaskCard task={task} key={task.id} />)}

          {!(total > 0) && (
            <div className="flex flex-col gap-1 items-center py-10 text-white/40">
              <ClipboardIcon size={56} />
              <p className="font-semibold">
                Você ainda não tem tarefas cadastradas
              </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
