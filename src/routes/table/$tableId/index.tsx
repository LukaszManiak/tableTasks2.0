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
    <div>
      <Link to="/table">Go back</Link>
      <h1 className="text-3xl font-bold tracking-wider">{table?.title}</h1>
      <p>Created: {table?.timeCreate}</p>
    </div>
  );
}
