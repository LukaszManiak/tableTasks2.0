import { createContext, useContext } from "react";
import { useLocalStorage } from "../useLocalStorage";

export type Table = {
  // id: string;
  timeCreate: string;
  type: "table" | "archived";
  title: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  timeCreate: string;
  title: string;
  description: string;
  subTasks: SubTask[];
};

export type SubTask = {
  id: string;
  timeCreate: string;
  title: string;
  description: string;
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
