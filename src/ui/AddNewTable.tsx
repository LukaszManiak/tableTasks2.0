import { Link } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

type TableInputs = {
  title: string;
  type: "table" | "archived";
};

export default function AddNewTable() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TableInputs>();

  const onSubmit: SubmitHandler<TableInputs> = (data) => console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 flex flex-col gap-y-8 p-12 rounded-3xl "
      >
        <label className="text-3xl font-bold text-center">Title</label>
        <input
          className="border-2 rounded-full p-4"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title needs to be at least 3 characters long",
            },
          })}
          type="text"
        />
        {errors.title && <p>{errors.title.message}</p>}

        <div className="flex items-center justify-center gap-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-amber-300 font-bold tracking-wider hover:bg-amber-200 transition-all ease-in-out duration-200 cursor-pointer text-yellow-50 rounded-md p-4"
          >
            ADD TABLE
          </button>
          <Link to="..">
            <button className="bg-orange-400 font-bold tracking-wider hover:bg-amber-200 transition-all ease-in-out duration-200 cursor-pointer text-yellow-50 rounded-md p-4">
              CANCEL
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
