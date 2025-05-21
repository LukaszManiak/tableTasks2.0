import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";

export const Route = createFileRoute("/table/addTask/")({
  component: RouteComponent,
});

type TaskInputs = {
  title: string;
  taskDescription: string;
  subTasks: string[];
  tags: string[];
  type: "todo" | "doing" | "done";
};

function RouteComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaskInputs>();

  const onSubmit: SubmitHandler<TaskInputs> = (data) => console.log(data);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-12">Create task for your table!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 flex flex-col gap-y-8 rounded-3xl "
      >
        <label className="text-3xl font-bold ">Title</label>
        <input
          className="border-2 rounded-md p-4"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title needs to be at least 3 characters long",
            },
          })}
          type="text"
        />
        {errors.title && <p>{errors.title.message}</p>}

        <label className="text-3xl font-bold">Description</label>
        <input
          className="border-2 rounded-md p-4"
          {...register("taskDescription", {
            minLength: {
              value: 3,
              message:
                "Task description needs to be at least 3 characters long",
            },
          })}
          type="text"
        />

        <div className="flex gap-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-300 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4"
          >
            ADD TASK
          </button>
          <Link to="..">
            <button className="bg-green-400 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4">
              CANCEL
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
