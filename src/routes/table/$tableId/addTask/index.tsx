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
} from "../../../../contexts/TableContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export const Route = createFileRoute("/table/$tableId/addTask/")({
  component: RouteComponent,
});

type TaskInputs = {
  title: string;
  description: string;
  tag: string;
  subtask: string;
};

function RouteComponent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskInputs>();

  const navigate = useNavigate();

  // const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // const handleSubTaskChange = (index: number, value: string) => {
  //   const updated = [...subTasks];
  //   updated[index] = value;
  //   setSubTasks(updated);
  // };

  // const addSubTask = () => {
  //   setSubTasks((prev) => [...prev, ""]);
  // };

  // const removeSubTask = (index: number) => {
  //   setSubTasks((prev) => prev.filter((_, i) => i !== index));
  // };

  // const handleTagsChange = (index: number, value: string) => {
  //   const updated = [...subTasks];
  //   updated[index] = value;
  //   setSubTasks(updated);
  // };

  const addTag = () => {
    setTags((prev) => [...prev, ""]);
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const { tables, setTables } = useTables();
  const { tableId } = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);

  const onSubmit: SubmitHandler<TaskInputs> = (data) => {
    if (!table) return;

    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      timeCreate: new Date().toISOString(),
      type: "todo",
    };

    const updatedTable: Table = {
      ...table,
      tasks: [...table.tasks, newTask],
    };

    setTables((prevTables) =>
      prevTables.map((t) => (t.id === table.id ? updatedTable : t))
    );

    reset();
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

        <label className="text-3xl font-bold ">Tags</label>
        <input
          className="border-2 w-3/4  rounded-md p-2"
          {...register("tag", {
            minLength: {
              value: 3,
              message: "Tag needs to be at least 3 characters long",
            },
          })}
          type="text"
        />

        <label className="text-3xl font-bold ">SubTasks</label>
        <input
          className="border-2 w-3/4  rounded-md p-2"
          {...register("subtask", {
            minLength: {
              value: 3,
              message: "Subtask needs to be at least 3 characters long",
            },
          })}
          type="text"
        />

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
            className="bg-green-300 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-2"
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
