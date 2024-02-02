import { Link } from "react-router-dom";
function Header() {
  
  return (
    <>
      <header className="h-[8vh]">
        <div className="flex justify-between py-4 px-6 items-center bg-neutral-200 dark:bg-neutral-600">
          <div className="dark:text-white gap-4 flex uppercase">
            <Link className=" cursor-pointer hover:scale-105" to="/">Home</Link>
            <Link className=" cursor-pointer hover:scale-105" to="/exchanges">Exchanges</Link>
            <Link className=" cursor-pointer hover:scale-105" to="/coins">Coins</Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
