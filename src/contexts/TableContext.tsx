import { createContext, useContext } from "react";
import { useLocalStorage } from "../useLocalStorage";

export type Table = {
  id: string;
  timeCreate: string;
  type: "table" | "archived";
  title: string;
  tasks: Task[];
  notes?: Note[];
};

export type Task = {
  id: string;
  type: "todo" | "doing" | "done";
  timeCreate: string;
  title: string;
  description: string;
  subTasks: SubTask[];
  tags: string[];
};

export type SubTask = {
  id: string;
  description: string;
};

export type Note = {
  id: string;
  content: string;
};

type TablesContextType = {
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
};

const TablesContext = createContext<TablesContextType | undefined>(undefined);

export const TablesProvider = ({ children }: { children: React.ReactNode }) => {
  const [tables, setTables] = useLocalStorage<Table[]>("TABLES", []);

  return (
    <TablesContext.Provider value={{ tables, setTables }}>
      {children}
    </TablesContext.Provider>
  );
};

export function useTables() {
  const context = useContext(TablesContext);
  if (!context) {
    throw new Error("useTables must be used within a TablesProvider");
  }
  return context;
}
