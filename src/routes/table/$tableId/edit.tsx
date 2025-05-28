import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTables } from "../../../contexts/TableContext";

export const Route = createFileRoute("/table/$tableId/edit")({
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

  const { tables, setTables } = useTables();

  return (
    <div>
      <h1 className="text-6xl font-bold mb-12">Edit your "xyz" table!</h1>
      <form className="w-1/2 flex flex-col gap-y-8  rounded-3xl ">
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

        {/* TYPE */}

        <div className="flex  gap-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-300 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4"
          >
            EDIT TABLE
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
