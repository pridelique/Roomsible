import DocsLink from "@components/docs_components/DocsLink";

const faqs = [
  {
    question: "ถ้าจองผิดห้องทำอย่างไร?",
    answer: (
      <div>
        สามารถ <DocsLink to="cancel" content="ยกเลิกการจอง" /> ได้ก่อนถึงเวลาเรียน หากเลยเวลาแล้ว ระบบจะถือว่าไม่เช็คอินและมี <DocsLink to="penalty" content="บทลงโทษ" />
      </div>
    )
  },
  {
    question: "สามารถแก้ไขการจองได้หรือไม่?",
    answer: (
      <div>
        ไม่สามารถแก้ไขได้ ต้องทำการ <DocsLink to="cancel" content="ยกเลิกการจอง" />แล้วจองใหม่เท่านั้น
      </div>
    )
  },
  {
    question: "สามารถจองห้องกิจกรรมเกิน 1 ห้องต่อสัปดาห์ได้ไหม?",
    answer: (
      <div>
        ไม่ได้ ระบบจำกัดสิทธิ์ 1 ห้องต่อสัปดาห์ตาม <DocsLink to="booking-condition" content="เงื่อนไข" />
      </div>
    )
  },
  {
    question: "ถ้าลืมเช็คอินจะเกิดอะไรขึ้น?",
    answer: (
      <div>
        ห้องจะถูกปล่อยว่าง และระบบจะนับเป็น 1 ครั้งของการไม่เช็คอิน ซึ่งมีผลต่อ <DocsLink to="penalty" content="บทลงโทษ" />
      </div>
    )
  },
  {
    question: "หากมีปัญหาหรือข้อสงสัย ติดต่อใคร?",
    answer: (
      <div>
        สามารถติดต่อเจ้าหน้าที่ผ่าน <DocsLink to="contact-us" content="ช่องทางนี้" />
      </div>
    )
  },
];

export default faqs;
