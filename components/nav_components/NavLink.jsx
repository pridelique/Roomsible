'use client';

import NavBuilding from "./NavBuilding";
import NavList from "./NavList";
import { useState } from "react";
import NavDropdown from "./NavDropdown";

function NavLink({ navLink, session, checkPath }) {
  const [navDropdown, setNavDropdown] = useState(false);
  
  return (
    <ul className="hidden md:flex md:gap-8 lg:gap-16 text-slate-gray">
      {navLink
        .filter((item) => session || !item.session)
        .map((item) => {
          if (item.label !== "ตึก")
            return (
              <NavList
                key={item.label}
                item={item}
                checkPath={checkPath}
              />
            );
          return (
            <li key={item.label} className="relative">
              <NavBuilding
                item={item}
                setNavDropdown={setNavDropdown}
                navDropdown={navDropdown}
                checkPath={checkPath}
              />
              {navDropdown && (
                <NavDropdown
                  checkPath={checkPath}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default NavLink;
