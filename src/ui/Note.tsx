import { useState } from "react";

export default function Note({ note, deleteNote }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      key={note.id}
      className="flex justify-between items-center bg-green-100 p-2 rounded-xl"
    >
      <span>{!isOpen ? `${note.content.slice(0, 5)}...` : note.content}</span>
      <div className="flex items-center gap-x-2">
        <button
          className="text-sm bg-green-50 rounded-3xl p-2 cursor-pointer "
          onClick={() => setIsOpen((value) => !value)}
        >
          {!isOpen ? "+" : "-"}
        </button>
        <button
          onClick={() => deleteNote(note.id)}
          className="text-sm bg-green-50 rounded-3xl p-2 cursor-pointer "
        >
          Delete
        </button>
      </div>
    </li>
  );
}
