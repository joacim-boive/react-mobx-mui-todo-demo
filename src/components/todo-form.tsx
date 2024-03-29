import { useTodo } from "@/hooks/use-todo";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormMessage,
  Input,
} from "@components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { observer } from "mobx-react-lite";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Todo must be at least 2 characters.",
  }),
});

export const TodoForm: FC = observer(() => {
  const { addTodo, markAllDoneTodos } = useTodo();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const handleMarkAllDone = () => {
    markAllDoneTodos();
    form.reset();
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const todo = {
      id: uuidv4(),
      title: data.title,
      isCompleted: false,
    };
    addTodo(todo);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <div className="grid items-center grid-cols-10 gap-4">
              <label htmlFor="bt-mark-all-done" className="sr-only">
                Mark all Todos as Done!
              </label>
              <Button
                id="bt-mark-all-done"
                onClick={() => handleMarkAllDone()}
                type="button"
                variant="transparent"
                size="icon"
                className="flex items-center justify-start bg-red-50 bg-blu"
              >
                <CheckCircle
                  size={28}
                  strokeWidth={1}
                  className="h-8 w-84"
                  aria-label="Mark all Todos as Done!"
                />
              </Button>
              <div className="flex items-center justify-between w-full col-span-9">
                <FormControl className="formControl">
                  <>
                    <label htmlFor="title" className="sr-only">
                      Todo Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Add a todo"
                      {...field}
                      className="pl-0 text-2xl "
                    />
                  </>
                </FormControl>
                <FormMessage />
                <Button type="submit" variant="default">
                  Add
                </Button>
              </div>
            </div>
          )}
        />
      </form>
    </Form>
  );
});
