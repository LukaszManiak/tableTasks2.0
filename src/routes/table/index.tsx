import { createFileRoute, Link } from "@tanstack/react-router";
import { useTables } from "../../contexts/TableContext";

export const Route = createFileRoute("/table/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tables, setTables } = useTables();

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold tracking-wider text-3xl">Tables</h1>
      {tables.length > 0 ? (
        <p className="text-xl   mb-4">
          Below is the list of your created tables. Select one to view or manage
          its tasks.
        </p>
      ) : (
        <p className="text-xl   mb-4">
          You haven't created any tables yet.{" "}
          <Link
            to="/table/addTable"
            className="text-green-600 underline hover:text-green-800"
          >
            Click here to create your first task table.
          </Link>
        </p>
      )}
      <ul className="flex gap-x-6 gap-y-6 items-center flex-wrap">
        {tables.length > 0 &&
          tables.map((table) => (
            <Link
              to={`/table/${table.id}/`}
              className="p-4 flex flex-col gap-y-2 cursor-pointer rounded-md bg-green-50 hover:mb-2 hover:bg-green-100 transition-all ease-in-out duration-200"
            >
              <span className="flex gap-x-2">
                <p className="font-bold">{table.title}</p>
                <p className="bg-green-300 px-2 rounded-full">{table.type}</p>
              </span>
              <p>Created at: {table.timeCreate.slice(0, 10)}</p>
            </Link>
          ))}
      </ul>
    </div>
  );
}
