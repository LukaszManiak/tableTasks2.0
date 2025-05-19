export default function SideMenu() {
  return (
    <div className="w-1/4 bg-green-50 p-8 flex flex-col justify-between">
      <p>TableTask</p>
      {/* tables list */}
      <ul></ul>

      {/* darkmode toggle */}

      <>
        <button></button>
        <span>
          Old version of{" "}
          <a className="text-green-300" href="https://tabletasks.netlify.app/">
            TableTask{" "}
          </a>
        </span>
      </>
    </div>
  );
}
