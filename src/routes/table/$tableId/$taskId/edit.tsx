import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Table, Task, useTables } from "../../../../contexts/TableContext";

export const Route = createFileRoute("/table/$tableId/$taskId/edit")({
  component: RouteComponent,
});

type ParamsIds = {
  tableId: string;
  taskId: string;
};

type TaskInputs = {
  title: string;
  description: string;
  type: "todo" | "doing" | "done";
};

function RouteComponent() {
  const navigate = useNavigate();

  const { tables, setTables } = useTables();
  const { tableId, taskId }: ParamsIds = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);
  const task: Task | undefined = table?.tasks.find(
    (task) => task.id === taskId
  );

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<TaskInputs>({
    defaultValues: {
      title: task?.title,
      description: task?.description,
      type: task?.type,
    },
  });

  const onSubmit: SubmitHandler<TaskInputs> = (data) => {
    if (!table || !task) return;

    const updatedTask: Task = {
      ...task,
      title: data.title,
      description: data.description,
      type: data.type,
    };

    const updatedTable: Table = {
      ...table,
      tasks: table.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
    };

    setTables((prevTables) =>
      prevTables.map((t) => (t.id === table.id ? updatedTable : t))
    );

    reset();
    navigate({ to: `/table/${tableId}/${taskId}/` });
  };

  return (
    <div>
      <h1 className="text-6xl font-bold xl:text-start text-center mb-12">
        Edit your task!
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full xl:w-3/4 flex flex-col xl:items-start items-center gap-y-8 rounded-3xl "
      >
        <label className="text-3xl font-bold ">Title</label>
        <input
          className="border-2 w-3/4  rounded-md p-4"
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

        <label className="text-3xl font-bold">Task Type</label>
        <div className="flex gap-x-6">
          <label className="flex items-center w-3/4  gap-2 text-lg">
            <input
              type="radio"
              value="todo"
              {...register("type", { required: true })}
              className="accent-green-500"
            />
            ToDo
          </label>

          <label className="flex items-center gap-2 text-lg">
            <input
              type="radio"
              value="doing"
              {...register("type", { required: true })}
              className="accent-green-500 w-3/4 "
            />
            Doing
          </label>

          <label className="flex items-center gap-2 text-lg">
            <input
              type="radio"
              value="done"
              {...register("type", { required: true })}
              className="accent-green-500 w-3/4 "
            />
            Done
          </label>
        </div>
        {errors.type && (
          <p className="text-green-500 text-sm mt-1">
            Please select a task type.
          </p>
        )}

        <label className="text-3xl font-bold">Description</label>
        <input
          className="border-2 rounded-md p-4 w-3/4 "
          {...register("description", {
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
            EDIT TASK
          </button>
          <Link to={`/table/${tableId}/${taskId}/`}>
            <button className="bg-green-400 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4">
              CANCEL
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
