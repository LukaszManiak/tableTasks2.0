import { Outlet, createRootRoute } from "@tanstack/react-router";
import SideMenu from "../ui/SideMenu";
import HeadBar from "../ui/HeadBar";
import Footer from "../ui/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

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

function RootComponent() {
  return (
    <div className="flex h-screen ">
      <SideMenu />
      <div className="flex flex-col w-3/4 p-12 justify-between">
        <HeadBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
