import Link from "@node_modules/next/link";

function NavList({ item, checkPath }) {
  return (
    <li key={item.label} className={`flex-1 w-fit ${item.label === 'ประวัติ' && 'mr-[14px]'}`}>
      <Link
        href={item.path}
        className={`${
          checkPath(item) ? "text-red-400" : "text-slate-gray"
        } block px-4 py-2 md:mx-3 lg:mx-6 w-fit`}
      >
        <p className="w-full whitespace-nowrap">{item.label}</p>
      </Link>
    </li>
  );
}

export default NavList;
