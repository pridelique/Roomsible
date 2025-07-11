import Image from "@node_modules/next/image";
import { Warning, warning, X_Mark, x_mark } from "@public/assets/icons";
import ErrorBox from "./ErrorBox";
import { useRouter } from "@node_modules/next/navigation";

function QRCodeErrorMessage({ error, startScaning }) {
  const router = useRouter();

  if (error.type === "Error accessing camera")
    return (
      <ErrorBox
        Svg={Warning}
        alt="warning"
        header="เกิดข้อผิดพลาด"
        message={`ไม่สามารถเข้าถึงกล้องได้\nกรุณาอนุญาตการเข้าถึงกล้องในเบราว์เซอร์ของคุณ`}
        buttonText="ตกลง"
        handleOnclick={() => router.push("/")}
        color="red"
      />
    );

  if (error.type === "incorrect")
    return (
      <ErrorBox
        Svg={Warning}
        alt="warning"
        header="ข้อมูลไม่ถูกต้อง"
        message={`ข้อมูล QR Code ไม่ถูกต้อง\nกรุณาตรวจสอบและทำรายการใหม่อีกครั้ง`}
        buttonText="ตกลง"
        handleOnclick={startScaning}
        color="red"
      />
    );

  if (error.type === "no-booking")
    return (
      <ErrorBox
        Svg={X_Mark}
        alt="x_mark"
        header="ไม่มีการจองห้อง"
        message={`คุณไม่ได้จองห้อง ${error.room}\nในเวลา ${error.time} \nกรุณาตรวจสอบและทำรายการใหม่อีกครั้ง`}
        buttonText="ตกลง"
        handleOnclick={startScaning}
        color="red"
      />
    );
  return <div></div>;
}

export default QRCodeErrorMessage;
