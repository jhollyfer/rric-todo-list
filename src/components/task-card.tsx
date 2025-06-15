import { useTasks } from "@/hooks/use-tasks";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface Props {
  task: Task;
}

export function TaskCard({ task }: Props) {
  const { removeTask, toggleTask } = useTasks();

  return (
    <Card
      key={task.id}
      className="bg-gray-800 border-transparent text-white flex-row items-center p-4"
    >
      <CardHeader className="pt-2 px-0">
        <Checkbox
          checked={task.done}
          onCheckedChange={() => toggleTask(task.id)}
          className="h-4 w-4 rounded-full cursor-pointer data-[state=checked]:bg-purple-600"
        />
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent
        className={cn(
          "flex-1 p-0 cursor-pointer",
          task.done && "line-through opacity-50"
        )}
        onClick={() => toggleTask(task.id)}
      >
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          onClick={() => removeTask(task.id)}
          className="cursor-pointer bg-transparent"
          size={"sm"}
        >
          <TrashIcon size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}
