import { Warning, warning, X_Mark, x_mark } from "@public/assets/icons";
import ErrorBox from "../ErrorBox";
import { useRouter } from "@node_modules/next/navigation";
import { indexToDay } from "@utils/translateDay";


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
        header="QR Code ไม่ถูกต้อง"
        message={`ข้อมูล QR Code ไม่ถูกต้อง\nกรุณาลองใหม่อีกครั้ง`}
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
        message={`คุณไม่ได้จองห้อง ${error.room} ${(error.period === 'before-school' || error.period === 'after-school') ? 'ในขณะนี้': `${indexToDay[error.day]} คาบ ${error.period}`} กรุณาลองใหม่อีกครั้ง`}
        buttonText="ตกลง"
        handleOnclick={startScaning}
        color="red"
      />
    );

  if (error.type === "unexpected")
    return (
      <ErrorBox
        Svg={Warning}
        alt="warning"
        header="เกิดข้อผิดพลาด"
        message={`เกิดข้อผิดพลาดที่ไม่คาดคิด\nกรุณาลองใหม่อีกครั้ง`}
        buttonText="ตกลง"
        handleOnclick={startScaning}
        color="red"
      />
    );
  return <div></div>;
}

export default QRCodeErrorMessage;
