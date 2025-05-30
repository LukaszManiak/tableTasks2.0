import logo from "../images/logoHeader.svg";

export default function HeadBar() {
  return (
    <div className="flex justify-between items-center w-full">
      <img src={logo} alt="" />
      {/* mode toggle */}
      <button className="bg-green-200 rounded-full p-2">Change color</button>
    </div>
  );
}
