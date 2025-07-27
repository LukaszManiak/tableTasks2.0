import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Table,
  useTables,
  Task,
  SubTask,
  TableId,
} from "../../../../contexts/TableContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const Route = createFileRoute("/table/$tableId/addTask/")({
  component: RouteComponent,
});

type TaskInputs = {
  title: string;
  description: string;
};

function RouteComponent() {
  const [tags, setTags] = useState<string[]>([]);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskInputs>();

  const navigate = useNavigate();

  const { tables, setTables } = useTables();
  const { tableId }: TableId = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);

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
    if (!table) return;

    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      timeCreate: new Date().toISOString(),
      type: "todo",
      subTasks,
      tags,
    };

    const updatedTable: Table = {
      ...table,
      tasks: [...table.tasks, newTask],
    };

    setTables((prevTables) =>
      prevTables.map((t) => (t.id === table.id ? updatedTable : t))
    );

    reset();
    setTags([]);
    setSubTasks([]);
    navigate({ to: `/table/${tableId}/` });
  };

  return (
    <div>
      <h1 className="text-6xl  xl:text-start text-center font-bold mb-12">
        Create task for your table!
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full xl:w-3/4 flex flex-col gap-y-3  xl:items-start items-center rounded-3xl "
      >
        <label className="text-3xl font-bold ">Title</label>
        <input
          className="border-2 w-3/4  rounded-md p-2"
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

        <label className="text-3xl font-bold">Description</label>
        <input
          className="border-2 w-3/4  rounded-md p-2"
          {...register("description", {
            minLength: {
              value: 3,
              message:
                "Task description needs to be at least 3 characters long",
            },
          })}
          type="text"
        />

        <div className="flex gap-2">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-400 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-2"
          >
            ADD TASK
          </button>
          <Link to="..">
            <button className="bg-green-400 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-2">
              CANCEL
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
