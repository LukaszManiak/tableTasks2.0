import { createFileRoute } from "@tanstack/react-router";
import { useTables } from "../../../contexts/TableContext";

export const Route = createFileRoute("/table/$tableId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tables, setTables } = useTables();

  return <div>Hello "/table/$tableId/"!</div>;
}
