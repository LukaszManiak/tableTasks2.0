import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import {
  Table,
  useTables,
  Note as NoteType,
  TableId,
} from "../../../contexts/TableContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "../../../ui/Note";

export const Route = createFileRoute("/table/$tableId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();

  const { tables, setTables } = useTables();
  const { tableId }: TableId = useParams({
    strict: true,
    from: "__root__",
  });

  const table: Table | undefined = tables.find((table) => table.id === tableId);

  function addNote() {
    if (!noteContent || !table) return;

    const newNote: NoteType = { id: uuidv4(), content: noteContent };

    setTables((prevTables) =>
      prevTables.map((t) =>
        t.id === table.id ? { ...t, notes: [...(t.notes ?? []), newNote] } : t
      )
    );

    setNoteContent("");
  }

  function deleteNote(noteId: string) {
    if (!table) return;
    setTables((prevTables) =>
      prevTables.map((t) =>
        t.id === table.id
          ? { ...t, notes: t.notes?.filter((n) => n.id !== noteId) ?? [] }
          : t
      )
    );
  }

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
      <p>Created: {new Date(table?.timeCreate ?? "").toLocaleDateString()}</p>

      {/* tasks list */}
      <div className="flex xl:flex-row flex-col items-start xl:items-center gap-x-24 gap-y-4 justify-between  w-full ">
        <div className="flex xl:flex-row flex-col items-start xl:items-center gap-y-4 w-3/5 justify-between">
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
        {/* notes */}
        <div className="flex flex-col w-full xl:w-2/5 gap-y-4 ">
          <p className="text-xl font-semibold">Notes</p>

          <div className="flex flex-wrap w-full gap-x-4 items-center">
            <input
              className="border-2 border-green-300 p-2 rounded-2xl"
              type="text"
              placeholder="Write your note..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <button
              className="bg-black rounded-4xl text-green-400 px-6 py-2 hover:bg-green-400 hover:text-black transition-all ease-in-out duration-300 cursor-pointer"
              onClick={addNote}
            >
              Add Note
            </button>
          </div>

          <ul className="flex flex-col gap-y-2 w-full ">
            {table?.notes &&
              table?.notes.map((note) => (
                <Note note={note} deleteNote={deleteNote} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
