import Link from "@node_modules/next/link";
import { navBuildings } from "@data";

function MenuDropdown({ setIsShow, checkPath }) {
  return (
    <div className=" bg-white w-full">
      <ul>
        {navBuildings.map((item) => (
          <li key={item.id} className="group">
            <Link
              href={`/building/${item.id}`}
              className="w-full text-start flex px-10 py-3.5 hover:bg-gray-100 relative"
              onClick={() => setIsShow(false)}
            >
              <span
                className={`h-full top-0 absolute border  ${
                  checkPath(item)
                    ? "border-red-300 group-hover:border-red-400"
                    : "border-gray-300 group-hover:border-slate-gray"
                } group-first:rounded-t-lg group-first:h-3/4 group-first:top-[25%] group-last:rounded-b-lg group-last:h-3/4 group-last:bottom-[25%] `}
              ></span>
              <p
                className={`px-5 ${
                  checkPath(item) ? "text-red-400" : "text-slate-gray"
                }`}
              >
                {`ตึก ${item.id} - ${item.name}`}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuDropdown;
