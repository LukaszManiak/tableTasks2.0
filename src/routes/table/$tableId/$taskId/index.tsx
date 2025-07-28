import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Table, Task, useTables } from "../../../../contexts/TableContext";
import { Route as TableRoute } from "../index";
import { Route as EditTaskRoute } from "./edit";

export const Route = createFileRoute("/table/$tableId/$taskId/")({
  component: RouteComponent,
});

type ParamsIds = {
  tableId: string;
  taskId: string;
};

function RouteComponent() {
  const navigate = useNavigate();
  const { tables, setTables } = useTables();
  const { tableId, taskId }: ParamsIds = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);
  const task: Task | undefined = table?.tasks.find(
    (task) => task.id === taskId
  );

  function deleteTask() {
    if (!table || !task) return;

    const updatedTable: Table = {
      ...table,
      tasks: table.tasks.filter((t) => t.id !== task.id),
    };

    setTables((prevTables) =>
      prevTables.map((t) => (t.id === table.id ? updatedTable : t))
    );

    navigate({ to: `/table/${tableId}/` });
  }

  return (
    <div className="flex flex-col gap-y-6 items-start">
      <div className="flex justify-between w-full items-center">
        <Link
          to={TableRoute.to}
          params={{ tableId }}
          className="bg-green-300 rounded-full px-4 py-2 hover:bg-green-200 transition-all ease-in-out duration-200"
        >
          Go back
        </Link>
        <span className="flex items-center gap-x-4">
          <Link
            to={EditTaskRoute.to}
            params={{ tableId, taskId }}
            className="bg-green-300 rounded-full px-4 py-2 hover:bg-green-200 transition-all ease-in-out duration-200"
          >
            Edit Task
          </Link>
          <button
            className="bg-black rounded-4xl text-green-400 px-4 py-2 hover:bg-green-400 hover:text-black transition-all ease-in-out duration-300 cursor-pointer"
            onClick={() => deleteTask()}
          >
            Delete The Task
          </button>
        </span>
      </div>
      <>
        <span className="flex gap-4 items-center ">
          <h1 className="xl:text-6xl text-2xl font-bold mb-12">
            {task?.title}
          </h1>
          <p className="bg-green-300 rounded-full py-2 px-4">{task?.type}</p>
        </span>
        <ul className="flex gap-x-3  items-center">
          {task?.tags.map((tag) => (
            <li className="bg-green-400  text-white px-4 py-2 rounded-4xl">
              {tag}
            </li>
          ))}
        </ul>
        <p className="text-xl">{task?.description}</p>
        <ul className="flex flex-col gap-y-3 w-full xl:w-1/2 items-center">
          {task?.subTasks.map((subTask) => (
            <li className="bg-green-400 flex items-center w-full gap-x-4 text-white px-4 py-2 rounded-4xl">
              <input type="checkbox" /> <p>{subTask.description}</p>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
}
