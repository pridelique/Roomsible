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
        className="block md:max-lg:hidden ml-2"
      />
    </Link>
  );
}

export default Logo;
