import Link from "@node_modules/next/link";

function NavList({ item, checkPath }) {
  return (
    <li key={item.label} className={`w-fit h-full`}>
      <Link
        href={item.path}
        className={`${
          checkPath(item) ? "text-red-400 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 border-b-3 border-b-red-400" : "text-slate-gray"
        } flex justify-center items-center px-7 py-2 w-fit h-full tracking-normal hover:bg-gray-100 active:bg-gray-200 `}
      >
        <p className="w-full whitespace-nowrap">{item.label}</p>
      </Link>
    </li>
  );
}

export default NavList;
