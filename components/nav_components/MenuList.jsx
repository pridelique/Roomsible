import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";

function MenuList({ item, setIsShow, checkPath }) {
  return (
    <li key={item.label}>
      <Link
        href={item.path}
        className={`block px-6 py-3.5 ${
          checkPath(item) ? "text-red-400" : "text-slate-gray"
        } hover:bg-gray-100 w-full`}
        onClick={() => setIsShow(false)}
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
      </Link>
    </li>
  );
}

export default MenuList;
