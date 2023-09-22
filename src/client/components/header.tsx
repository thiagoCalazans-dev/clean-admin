import { ThemeToggle } from "./theme-togle";
import { Navbar } from "./ui/navbar";


export function Header() {
  return (
    <div className="border-b flex justify-center">
      <div className="flex flex-1 h-16 items-center justify-between md:justify-start px-2  md:px-16">
        <span>GCASPP</span>
        <div className="flex flex-1 items-center px-4  justify-between">
          <Navbar />
          <ThemeToggle />
          {/* <span>LOGOUT</span> */}
        </div>
      </div>
    </div>
  );
}
