import Image from "@node_modules/next/image";
import { arrow_down, arrow_down_selected } from "@public/assets/icons";

function MenuBuilding({ item, menuDropdown, setMenuDropdown, checkPath }) {
  return (
    <button
      className={`flex justify-between px-6 py-3.5 ${
        checkPath(item) ? "text-red-400" : "text-slate-gray"
      } hover:bg-gray-100 w-full cursor-pointer `}
      onClick={() => setTimeout(() => {
        setMenuDropdown(!menuDropdown)
      }, 0)}
    >
      <div className="flex item-center gap-3">
        <div className="flex items-center justify-center">
          <Image
            src={checkPath(item) ? item.selectedIcon : item.icon}
            alt={item.label}
            width={20}
            height={30}
          />
        </div>
        <p className="font-[550]">{item.label}</p>
      </div>
      <div className="flex items-center justify-center relative top-[1.5px]">
        <Image
          src={checkPath(item) ? arrow_down_selected : arrow_down}
          alt="arrow_down"
          width={20}
          height={20}
          className={`${menuDropdown ? "rotate-180" : ""} duration-100`}
        />
      </div>
    </button>
  );
}

export default MenuBuilding;
