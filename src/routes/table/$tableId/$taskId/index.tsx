import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Table, Task, useTables } from "../../../../contexts/TableContext";

export const Route = createFileRoute("/table/$tableId/$taskId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tables, setTables } = useTables();
  const { tableId, taskId } = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);
  const task: Task | undefined = table?.tasks.find(
    (task) => task.id === taskId
  );

  console.log(table, task);

  return (
    <div className="flex flex-col gap-y-6 items-start">
      <div className="flex justify-between w-full items-center">
        <Link
          to={`/table/${tableId}/`}
          className="bg-green-300 rounded-full px-4 py-2 hover:bg-green-200 transition-all ease-in-out duration-200"
        >
          Go back
        </Link>
        <Link
          to={`/table/${tableId}/${taskId}/edit`}
          className="bg-green-300 rounded-full px-4 py-2 hover:bg-green-200 transition-all ease-in-out duration-200"
        >
          Edit Task
        </Link>
      </div>
      <>
        <span className="flex gap-4 items-center">
          <h1 className="text-6xl font-bold mb-12">{task?.title}</h1>
          <p className="bg-green-300 rounded-full py-2 px-4">{task?.type}</p>
        </span>
        <p className="text-xl">{task?.description}</p>
      </>
    </div>
  );
}
