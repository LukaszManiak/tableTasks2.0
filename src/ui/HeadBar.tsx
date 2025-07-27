import logo from "../images/logoHeader.svg";

export default function HeadBar() {
  return (
    <div className="flex justify-between items-center w-full">
      <img src={logo} alt="" width="280" height="280" className="w-32 h-16" />
    </div>
  );
}
