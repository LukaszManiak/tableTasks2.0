import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export type Table = {
  id: string;
  timeCreate: string;
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

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className="font-semibold text-3xl">Table Task</h1>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
