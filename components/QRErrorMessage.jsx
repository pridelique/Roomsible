import Image from "@node_modules/next/image";
import { warning, x_mark } from "@public/assets/icons";

function QRCodeErrorMessage({ error, startScaning }) {
  if (error.type === "Error accessing camera")
    return (
      <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center">
        <div>
          <Image src={warning} alt={"warning"} width={36} height={36} />
        </div>

        <h3 className="text-xl text-gray-700 mt-2">เกิดข้อผิดพลาด</h3>
        <p className="leading-5 mt-1 text-slate-gray px-3">
          ไม่สามารถเข้าถึงกล้องได้ <br/>
          กรุณาอนุญาตการเข้าถึงกล้องในเบราว์เซอร์ของคุณ
        </p>

        <hr className="w-full border border-gray-300 my-6" />
        <button
          className="text-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 font-medium text-center shadow-sm cursor-pointer py-2 w-4/5 rounded-2xl"
          onClick={startScaning}
        >
          ตกลง
        </button>
      </div>
    );
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center">
      <div>
        <Image
          src={error?.type === "incorrect" ? warning : x_mark}
          alt={error?.type === "incorrect" ? "warning" : "x_mark"}
          width={36}
          height={36}
        />
      </div>

      <h3 className="text-xl text-gray-700 mt-2">ขออภัย</h3>
      {error?.type === "incorrect" ? (
        <p className="leading-5 mt-1 text-slate-gray px-3">
          ข้อมูล QR Code ไม่ถูกต้องกรุณาตรวจสอบและทำรายการใหม่อีกครั้ง
        </p>
      ) : (
        <p className="leading-5 mt-1 text-slate-gray px-3">
          คุณไม่ได้จองห้อง {error?.roomNumber} <br />
          ในเวลา {error?.time} กรุณาตรวจสอบและทำรายการใหม่อีกครั้ง
        </p>
      )}
      <hr className="w-full border border-gray-300 my-6" />
      <button
        className="text-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 font-medium text-center shadow-sm cursor-pointer py-2 w-4/5 rounded-2xl"
        onClick={startScaning}
      >
        ตกลง
      </button>
    </div>
  );
}

export default QRCodeErrorMessage;
