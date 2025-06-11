import Image from "@node_modules/next/image";
import { warning, x_mark } from "@public/assets/icons";

function QRCodeErrorMessage({ error, startScaning, elementTop }) {
  return (
    <div
      className="absolute left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center"
      style={{ top: elementTop }}
    >
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
      <hr className="w-full border border-gray-300 my-6"/>
      <button
        className="text-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 font-medium text-center shadow-sm cursor-pointer py-2 w-4/5 rounded-2xl"
        onClick={startScaning}
      >
        ตกลง
      </button>
    </div>
    // <>
    //   {error?.type === "incorrect" && (
    //     <div
    //       className="absolute left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center"
    //       style={{ top: elementTop }}
    //     >
    //       <div>
    //         <Image src={error?.type === 'incorrect' ? warning : x_mark} alt={error?.type === "incorrect" ? 'warning' : 'x_mark'} width={36} height={36} />
    //       </div>

    //       <h3 className="text-xl text-gray-700 mt-2">ขออภัย</h3>
    //       <p className="leading-5 mt-1 text-slate-gray px-3">
    //         {error?.type === "incorrect" ? 'ข้อมูล QR Code ไม่ถูกต้องกรุณาตรวจสอบและทำรายการใหม่อีกครั้ง' : `คุณไม่ได้จองห้อง ${error?.roomNumber} <br />
    //         ในเวลา ${error?.time} กรุณาตรวจสอบและทำรายการใหม่อีกครั้ง`}

    //       </p>
    //       <hr className="w-full border border-gray-300 mt-4" />
    //       <button
    //         className="mt-4 text-lg bg-green-500 py-2 w-4/5 rounded-full"
    //         onClick={startScaning}
    //       >
    //         ตกลง
    //       </button>
    //     </div>
    //   )}

    //   {error?.type === "no-booking" && (
    //     <div
    //       className="absolute left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-3 shadow-lg text-center w-full max-w-[340px] flex flex-col justify-center items-center"
    //       style={{ top: elementTop }}
    //     >
    //       <div>
    //         <Image src={x_mark} alt="x_mark" width={36} height={36} />
    //       </div>

    //       <h3 className="text-xl text-gray-700 mt-2">ขออภัย</h3>
    //       <p className="leading-5 mt-1 text-slate-gray px-3">
    //         คุณไม่ได้จองห้อง {error?.roomNumber} <br />
    //         ในเวลา {error?.time} กรุณาตรวจสอบและทำรายการใหม่อีกครั้ง
    //       </p>
    //       <hr className="w-full border border-gray-300 mt-4" />
    //       <button
    //         className="mt-4 text-lg bg-green-500 py-2 w-4/5 rounded-full"
    //         onClick={startScaning}
    //       >
    //         ตกลง
    //       </button>
    //     </div>
    //   )}
    // </>
  );
}

export default QRCodeErrorMessage;
