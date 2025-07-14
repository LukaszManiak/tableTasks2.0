import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Table, TableId, useTables } from "../../../contexts/TableContext";
import { Route as TableRoute } from "./index";

export const Route = createFileRoute("/table/$tableId/edit")({
  component: RouteComponent,
});

type TableInputs = {
  title: string;
  type: "table" | "archived";
};

function RouteComponent() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<TableInputs>();

  const { tables, setTables } = useTables();
  const { tableId }: TableId = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);

  const onSubmit: SubmitHandler<TableInputs> = (data) => {
    if (!table) return;

    const updatedTable: Table = {
      ...table,
      title: data.title,
    };

    setTables((prevTables) =>
      prevTables.map((t) => (t.id === table.id ? updatedTable : t))
    );

    reset();
    navigate({ to: `/table/${tableId}/` });
  };

  return (
    <div>
      <h1 className="text-6xl font-bold mb-12">Edit your table!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 flex flex-col gap-y-8  rounded-3xl "
      >
        <label className="text-3xl font-bold ">Title</label>
        <input
          className="border-2 rounded-lg p-4"
          defaultValue={table?.title}
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
          <Link to={TableRoute.to} params={{ tableId }}>
            <button className="bg-green-400 font-bold tracking-wider hover:bg-green-200 transition-all ease-in-out duration-200 cursor-pointer text-green-50 rounded-md p-4">
              CANCEL
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
