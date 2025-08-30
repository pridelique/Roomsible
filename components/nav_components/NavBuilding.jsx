import Image from "@node_modules/next/image";
import { arrow_down, arrow_down_selected } from "@public/assets/icons";

function NavBuilding({ item, navDropdown, setNavDropdown, checkPath }) {
  return (
    <button
      className={`cursor-pointer pl-7 pr-6 py-2  gap-0.5 items-center flex justify-center hover:bg-gray-100 active:bg-gray-200 h-full ${
          checkPath(item) ? "text-red-400 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 border-b-3 border-b-red-400" : "text-slate-gray"
        }`}
      onClick={() => setTimeout(() => setNavDropdown(!navDropdown), 0)}
    >
      <p>
        {item.label}
      </p>
      <div className="flex items-center justify-center relative top-[1.5px] ">
        <Image
          src={checkPath(item) ? arrow_down_selected : arrow_down}
          alt="arrow_down"
          width={20}
          height={20}
          className={`${navDropdown ? "rotate-180" : ""} duration-100`}
        />
      </div>
    </button>
  );
}

export default NavBuilding;
