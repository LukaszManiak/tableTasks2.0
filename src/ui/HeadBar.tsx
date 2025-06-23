import logo from "../images/logoHeader.svg";

export default function HeadBar() {
  const toggleInvert = () => {};
  return (
    <div className="flex justify-between items-center w-full">
      <img src={logo} alt="" />
      {/* mode toggle */}
      <button
        onClick={() => toggleInvert()}
        className="bg-green-200 rounded-full py-2 px-4 cursor-pointer"
      >
        Change color
      </button>
    </div>
  );
}
