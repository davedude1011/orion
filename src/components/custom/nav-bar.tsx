import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

export function NavBar() {
  return (
    <div className="flex flex-row items-center gap-4 p-4">
      <ModeToggle />
      <Link href={"/"}>
        <div className="flex flex-row items-end gap-2">
          <div className="text-3xl leading-none">Orion</div>
          <div className="text-sm">(streaming)</div>
        </div>
      </Link>
    </div>
  );
}
