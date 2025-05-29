import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Table, useTables } from "../../../contexts/TableContext";

export const Route = createFileRoute("/table/$tableId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tables, setTables } = useTables();
  const { tableId } = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);

  return (
    <div className="flex flex-col gap-y-6 items-start w-full">
      <div className="flex items-center w-full justify-between ">
        <Link
          className="px-4 py-2 bg-green-200 rounded-4xl hover:bg-green-100 transition-all ease-in-out duration-200"
          to="/table"
        >
          Go back
        </Link>

        <span className="flex items-center gap-x-2">
          <Link
            className="px-4 py-2 bg-green-200 rounded-4xl hover:bg-green-300 transition-all ease-in-out duration-200"
            to="/table"
          >
            Edit Task
          </Link>
          <Link
            className="px-4 py-2 bg-green-300 rounded-4xl hover:bg-green-200 transition-all ease-in-out duration-200"
            to="/table"
          >
            Add New Task
          </Link>
        </span>
      </div>
      <h1 className="text-3xl font-bold tracking-wider">{table?.title}</h1>
      <p>Created: {table?.timeCreate}</p>

      {/* tasks list */}
      <div className="flex items-center w-full justify-between">
        <ul>
          <p className="font-bold tracking-widest">TODO</p>
        </ul>
        <ul>
          <p className="font-bold tracking-widest">DOING</p>
        </ul>
        <ul>
          <p className="font-bold tracking-widest">DONE</p>
        </ul>
      </div>
    </div>
  );
}
