import { BookOpenIcon, HistoryIcon, HomeIcon, MapPin } from "lucide-react";
import Link from "@node_modules/next/link";

function MenuList({ item, setIsShow, checkPath }) {
  return (
    <li key={item.label}>
      <Link
        href={item.path}
        className={`block px-6 py-3.5 ${
          checkPath(item) ? "text-red-400" : "text-slate-gray"
        } hover:bg-gray-100 active:bg-gray-200 w-full`}
        onClick={() => setTimeout(() =>  setIsShow(false), 0)}
      >
        <div className="flex item-center gap-3">
          <div className="flex items-center justify-center">
            {item.name === 'main' && <HomeIcon className="w-5 h-5" />}
            {item.name === 'checkin' && <MapPin className="w-5 h-5" />}
            {item.name === 'history' && <HistoryIcon className="w-5 h-5" />}
            {item.name === 'docs' && <BookOpenIcon className="w-5 h-5" />}
          </div>
          <p className="font-[550]">{item.label}</p>
        </div>
      </Link>
    </li>
  );
}

export default MenuList;
