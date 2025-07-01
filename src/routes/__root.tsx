import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TablesProvider } from "../contexts/TableContext";

// ui elements
import SideMenu from "../ui/SideMenu";
import HeadBar from "../ui/HeadBar";
import Footer from "../ui/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <TablesProvider>
      <div className="flex xl:flex-row flex-col gap-y-4 h-screen ">
        <SideMenu />
        <div className="flex flex-col w-11/12 p-12 h-full justify-between ">
          <HeadBar />
          <Outlet />
          <Footer />
        </div>
      </div>
    </TablesProvider>
  );
}
