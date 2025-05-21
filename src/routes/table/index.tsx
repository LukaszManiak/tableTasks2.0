import { createFileRoute, Link } from "@tanstack/react-router";
import { Table } from "../__root";

export const Route = createFileRoute("/table/")({
  component: RouteComponent,
});

const tables: Table[] = [];

function RouteComponent() {
  return (
    <div>
      <h1 className="font-bold tracking-wider text-3xl">Tables</h1>
      {tables.length > 0 ? (
        <p className="text-lg  mb-4">
          Below is the list of your created tables. Select one to view or manage
          its tasks.
        </p>
      ) : (
        <p className="text-lg  mb-4">
          You haven't created any tables yet.{" "}
          <Link
            to="/table/addTable"
            className="text-green-600 underline hover:text-green-800"
          >
            Click here to create your first task table.
          </Link>
        </p>
      )}
    </div>
  );
}
