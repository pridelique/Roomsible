import Image from "@node_modules/next/image";
import { arrow_down, arrow_down_selected } from "@public/assets/icons";

function NavBuilding({ item, navDropdown, setNavDropdown, checkPath }) {
  return (
    <button
      className="cursor-pointer px-4 py-2 flex gap-2 items-center md:mx-3 lg:mx-6"
      onClick={() => setTimeout(() => setNavDropdown(!navDropdown), 0)}
    >
      <p className={` ${checkPath(item) ? "text-red-400" : "text-slate-gray"}`}>
        {item.label}
      </p>
      <div className="flex items-center justify-center relative top-[1.5px]">
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
