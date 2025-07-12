import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import { logo, schoolname } from "@public/assets/images";
function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image src={logo} alt="logo" width={0} height={50} />
      <Image
        src={schoolname}
        alt="schoolname"
        width={0}
        height={50}
        className="hidden lg:flex ml-2"
        priority={true}
      />
    </Link>
  );
}

export default Logo;
