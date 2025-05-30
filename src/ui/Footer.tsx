export default function Footer() {
  return (
    <footer className="flex justify-between items-center p-4">
      <div className="flex flex-col gap-y-2">
        <p>© 2024 TableTask</p>
        <span>
          Old version of{" "}
          <a className="text-green-300" href="https://tabletasks.netlify.app/">
            TableTask{" "}
          </a>
        </span>
      </div>
      <span>
        Made by{" "}
        <a className="text-green-500" href="https://github.com/LukaszManiak">
          Łukasz Maniak
        </a>
      </span>{" "}
    </footer>
  );
}
