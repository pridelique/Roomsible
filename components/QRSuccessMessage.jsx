import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import { buildingImages } from "@public/assets/images";

function QRSuccessMessage({ success }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-1/2 bg-white text-white pb-4 rounded-xl z-3 shadow-lg text-center w-full max-w-[340px] flex flex-col justify-center items-center "
    >
      <div className="w-full relative">
        <Image
          src={buildingImages[success?.buildingId || 0]}
          alt="school"
          width={340}
          height={340}
          draggable="false"
          className="rounded-t-xl select-none"
        />
        {/* <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded-full shadow-green-500/50 shadow-md">
          <Image src={check_mark} alt="check_mark" width={111} height={111} />
        </div> */}
      </div>

      <div className="px-8 flex flex-col justify-center items-center w-full mt-1">
        <h3 className="text-2xl text-green-500 mt-3 font-semibold">ยืนยันสำเร็จ</h3>
        <p className="leading-5 mt-2 text-slate-gray px-3">
          คุณได้ทำการเช็คอินห้อง {success?.room} <br />
          ในเวลา {success?.time} เรียบร้อยแล้ว
        </p>
        <hr className="w-full border border-gray-300 my-6" />
        <Link href="/" className="text-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 shadow-sm text-center cursor-pointer py-2 w-4/5 rounded-2xl">
          กลับไปหน้าแรก
        </Link>
      </div>
    </div>
  );
}

export default QRSuccessMessage;
