"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCompleateTodosMutation,
  useCreateTodoMutation,
  useDeletTodosMutation,
  useGetTodosQuery,
} from "./Feauter/TodoSlice";
import { Data } from "../../types";

export interface Inputs {
  title: string;
  description: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [DeletTodo, { isLoading: isDeleting }] = useDeletTodosMutation();
  const { data: todos, error, isLoading, refetch } = useGetTodosQuery();
  const [Completetodo, { isLoading: isCompleting }] =
    useCompleateTodosMutation();
  console.log(todos, "todos");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createTodo(data).unwrap();
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };
  const DeleteTodo = async (a: string) => {
    try {
      await DeletTodo(a);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen p-24 bg-slate-50">
      <form className="flex gap-4 flex-row" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Todo Title"
          {...register("title", { required: true })}
          className="border p-2"
        />
        {errors.title && <span>This field is required</span>}

        <input
          placeholder="Description"
          {...register("description", { required: true })}
          className="border p-2"
        />
        {errors.description && <span>This field is required</span>}

        <button type="submit" className="bg-slate-200 p-2 rounded-lg">
          {isCreating ? "Creating..." : "Create Todo"}
        </button>
      </form>

      <div className="mt-8">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: </p>}
        <ul className="h-72 overflow-y-scroll">
          {todos &&
            todos?.map((todo: Data) => (
              <li key={todo._id} className="border-2 p-4 mb-2">
                <h3 className="font-bold">{todo.title}</h3>
                <p>{todo.description}</p>
                <p
                  className={`${
                    todo.completed ? "bg-green-300" : "bg-red-400"
                  }`}
                >
                  {todo.completed ? "Completed" : "Not Completed"}
                </p>
                <p>{new Date(todo.createdAt).toLocaleString()}</p>
                <div>
                  {" "}
                  <button
                    className="bg-slate-200 m-3 p-1 rounded-md"
                    onClick={() => DeleteTodo(todo._id)}
                  >
                    {isDeleting ? "....Deleting" : "Delete"}
                  </button>
                  <button
                    className={` m-3 p-1 rounded-md ${
                      !todo.completed ? "bg-green-300" : "bg-red-400"
                    }`}
                    onClick={() => Completetodo(todo._id)}
                  >
                    {isCompleting
                      ? "....Completing"
                      : todo.completed
                      ? "Uncompleted"
                      : "Complete"}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
