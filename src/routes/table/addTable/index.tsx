import { createFileRoute } from "@tanstack/react-router";
import { v4 as uuidv4 } from "uuid";
import { Link } from "@tanstack/react-router";

import { useForm, SubmitHandler } from "react-hook-form";
import { Table, useTables } from "../../../contexts/TableContext";
export const Route = createFileRoute("/table/addTable/")({
  component: RouteComponent,
});

type TableInputs = {
  title: string;
  type: "table" | "archived";
};

function RouteComponent() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TableInputs>();

  const { setTables } = useTables();

  const onSubmit: SubmitHandler<TableInputs> = (data) => {
    const newTable: Table = {
      id: uuidv4(),
      timeCreate: new Date().toISOString(),
      type: "table",
      title: data.title,
      tasks: [],
    };

    setTables((prevTables) => [...prevTables, newTable]);
    reset();
  };

  return (
    <div>
      <h1 className="text-6xl font-bold mb-12">Create your table!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 flex flex-col gap-y-8  rounded-3xl "
      >
        <label className="text-3xl font-bold ">Title</label>
        <input
          className="border-2 rounded-lg p-4"
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

        <div className="flex  gap-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-300 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4"
          >
            ADD TABLE
          </button>
          <Link to="/">
            <button className="bg-green-400 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4">
              CANCEL
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
