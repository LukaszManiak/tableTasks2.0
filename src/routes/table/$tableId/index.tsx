import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Table, useTables } from "../../../contexts/TableContext";

export const Route = createFileRoute("/table/$tableId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { tables, setTables } = useTables();
  const { tableId } = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);

  function deleteTable() {
    if (!table) return;

    setTables((prevTables) => prevTables.filter((t) => t.id !== table.id));

    navigate({ to: "/table/" });
  }

  return (
    <div className="flex flex-col gap-y-6 items-start w-full">
      <div className="flex items-center w-full justify-between flex-wrap gap-y-2">
        <Link
          className="px-4 py-2 bg-green-200 rounded-4xl hover:bg-green-100 transition-all ease-in-out duration-200"
          to="/table"
        >
          Go back
        </Link>

        <span className="flex items-center gap-x-2">
          <Link
            className="px-4 py-2 bg-green-200 rounded-4xl hover:bg-green-300 transition-all ease-in-out duration-200"
            to={`/table/${tableId}/edit`}
          >
            Edit Table
          </Link>
          <Link
            className="px-4 py-2 bg-green-300 rounded-4xl hover:bg-green-200 transition-all ease-in-out duration-200 "
            to={`/table/${tableId}/addTask/`}
          >
            Add New Task
          </Link>
          <button
            className="bg-black rounded-4xl text-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition-all ease-in-out duration-300 cursor-pointer"
            onClick={() => deleteTable()}
          >
            Delete Table
          </button>
        </span>
      </div>
      <h1 className="text-3xl font-bold tracking-wider">{table?.title}</h1>
      <p>Created: {table?.timeCreate}</p>

      {/* tasks list */}
      <div className="flex items-center w-full justify-between">
        <ul className="flex flex-col gap-y-6">
          <p className="font-bold tracking-widest">TODO</p>
          {table?.tasks
            .filter((task) => task.type === "todo")
            .map((task) => (
              <Link
                className="p-4 rounde-xl bg-green-100 hover:bg-green-200 transition-all ease-in-out duration-200 hover:-translate-y-1"
                to={`/table/${tableId}/${task.id}/`}
                key={task.id}
              >
                <p className="font-semibold">{task.title}</p>
                <p>{task.description.slice(0, 20)}...</p>
              </Link>
            ))}
        </ul>
        <ul className="flex flex-col gap-y-6">
          <p className="font-bold tracking-widest">DOING</p>
          {table?.tasks
            .filter((task) => task.type === "doing")
            .map((task) => (
              <Link
                className="p-4 rounde-xl bg-green-100 hover:bg-green-200 transition-all ease-in-out duration-200 hover:-translate-y-1"
                to={`/table/${tableId}/${task.id}/`}
                key={task.id}
              >
                <p className="font-semibold">{task.title}</p>
                <p>{task.description.slice(0, 20)}...</p>
              </Link>
            ))}
        </ul>
        <ul className="flex flex-col gap-y-6">
          <p className="font-bold tracking-widest">DONE</p>
          {table?.tasks
            .filter((task) => task.type === "done")
            .map((task) => (
              <Link
                className="p-4 rounde-xl bg-green-100 hover:bg-green-200 transition-all ease-in-out duration-200 hover:-translate-y-1"
                to={`/table/${tableId}/${task.id}/`}
                key={task.id}
              >
                <p className="font-semibold">{task.title}</p>
                <p>{task.description.slice(0, 20)}...</p>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}
