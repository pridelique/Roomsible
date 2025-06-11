import { navBuildings } from "@data";
import Link from "@node_modules/next/link";
import React from "react";

function NavDropdown({ setNavDropdown, checkPath, ref }) {
  return (
    <div className="absolute top-full border border-gray-300 shadow-lg z-9 bg-white rounded-xl overflow-hidden" ref={ref}>
      <ul>
        {navBuildings.map((item) => (
          <li key={item.id}>
            <Link
              onClick={() => {setNavDropdown(false)}}
              href={`/building/${item.id}`}
              className="w-64 text-start  block px-5 py-2.5 hover:bg-gray-100"
            >
              <p
                className={` ${
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

export default NavDropdown;
