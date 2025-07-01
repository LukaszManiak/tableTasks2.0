import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 items-center xl:items-start">
      <h1 className="text-3xl xl:text-start text-center text-green-400 font-bold ">
        Welcome to Tables Task Manager!
      </h1>
      <p className="text-xl xl:text-start text-center w-full xl:w-1/2 text-gray-700 ">
        Tables Task Manager is your simple yet powerful tool for organizing
        tasks and managing projects. Create custom task tables, add and edit
        individual tasks, and switch between multiple boards effortlessly.
      </p>
      <p className="text-xl xl:text-start text-center w-full xl:w-1/2 text-gray-700 ">
        Built with modern technologies like TypeScript, TanStack Router,
        TanStack Query, and Tailwind CSS, this app is designed to be responsive,
        fast, and intuitive. Get started now and simplify the way you handle
        tasks—one table at a time.
      </p>
      <Link
        to="/table"
        className="bg-green-400 text-white hover:bg-green-300 transition-all ease-in-out duration-200 px-4 py-2 rounded-3xl cursor-pointer"
      >
        Check out your tables!
      </Link>
    </div>
  );
}
