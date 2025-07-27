import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Table,
  Task,
  useTables,
  SubTask,
} from "../../../../contexts/TableContext";
import { useEffect, useState } from "react";
import { Route as TaskRoute } from "./index";

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

  const [tags, setTags] = useState<string[]>([]);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);

  useEffect(() => {
    if (task) {
      setTags(task.tags || []);
      setSubTasks(task.subTasks || []);
    }
  }, [task]);

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

  const addTag = () => setTags([...tags, ""]);
  const updateTag = (index: number, value: string) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addSubTask = () =>
    setSubTasks([...subTasks, { description: "", isDone: false }]);

  const updateSubTask = (index: number, value: string) => {
    const updated = [...subTasks];
    updated[index].description = value;
    setSubTasks(updated);
  };

  const removeSubTask = (index: number) => {
    setSubTasks(subTasks.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<TaskInputs> = (data) => {
    if (!table || !task) return;

    const updatedTask: Task = {
      ...task,
      title: data.title,
      description: data.description,
      type: data.type,
      tags,
      subTasks,
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
        className="w-full xl:w-3/4 flex flex-col xl:items-start items-center gap-y-8 rounded-3xl"
      >
        <label className="text-3xl font-bold">Title</label>
        <input
          className="border-2 w-3/4 rounded-md p-4"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          type="text"
        />
        {errors.title && <p>{errors.title.message}</p>}

        <label className="text-3xl font-bold">Task Type</label>
        <div className="flex gap-x-6">
          {["todo", "doing", "done"].map((status) => (
            <label key={status} className="flex items-center gap-2 text-lg">
              <input
                type="radio"
                value={status}
                {...register("type", { required: true })}
                className="accent-green-500"
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
        {errors.type && (
          <p className="text-green-500 text-sm mt-1">
            Please select a task type.
          </p>
        )}

        <label className="text-3xl font-bold">Description</label>
        <input
          className="border-2 rounded-md p-4 w-3/4"
          {...register("description", {
            minLength: {
              value: 3,
              message: "Description must be at least 3 characters",
            },
          })}
          type="text"
        />

        <label className="text-3xl font-bold">Tags</label>
        <div className="flex flex-col gap-2 w-3/4">
          <ul className="flex flex-col gap-y-4">
            {tags.map((tag, i) => (
              <li key={i} className="flex gap-2">
                <input
                  className="border-2 rounded-md p-2 flex-grow"
                  type="text"
                  value={tag}
                  onChange={(e) => updateTag(i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="text-white bg-green-500 hover:bg-green-400 transition-all ease-in-out duration-200 px-4 py-2 rounded-4xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={addTag}
            className="text-lg text-green-500 hover:underline w-fit cursor-pointer"
          >
            + Add Tag
          </button>
        </div>

        <label className="text-3xl font-bold">SubTasks</label>
        <div className="flex flex-col gap-2 w-3/4">
          <ul className="flex flex-col gap-y-4">
            {subTasks.map((sub, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="border-2 rounded-md p-2 flex-grow"
                  type="text"
                  value={sub.description}
                  onChange={(e) => updateSubTask(i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeSubTask(i)}
                  className="text-white bg-green-500 hover:bg-green-400 transition-all ease-in-out duration-200 px-4 py-2 rounded-4xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </ul>
          <button
            type="button"
            onClick={addSubTask}
            className="text-lg text-green-500 hover:underline w-fit cursor-pointer"
          >
            + Add Subtask
          </button>
        </div>

        <div className="flex gap-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-300 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4"
          >
            EDIT TASK
          </button>
          <Link to={TaskRoute.to} params={{ tableId, taskId }}>
            <button className="bg-green-400 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4">
              CANCEL
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
