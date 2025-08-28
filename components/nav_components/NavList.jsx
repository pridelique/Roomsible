import Link from "@node_modules/next/link";

function NavList({ item, checkPath }) {
  return (
    <li key={item.label} className={`w-fit`}>
      <Link
        href={item.path}
        className={`${
          checkPath(item) ? "text-red-400" : "text-slate-gray"
        } block px-4 py-2 w-fit rounded-lg hover:bg-gray-100 active:bg-gray-200 `}
      >
        <p className="w-full whitespace-nowrap">{item.label}</p>
      </Link>
    </li>
  );
}

export default NavList;
