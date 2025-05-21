import logo from "../images/logoHeader.svg";
// import logoBright from "../images/logoHeaderBright.svg";

export default function SideMenu() {
  return (
    <div className="w-1/5 bg-green-50 p-8 flex flex-col justify-between">
      <img className="w-1/2" src={logo} alt="" />
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
