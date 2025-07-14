export const bookingError = {
    'default' : {
        alt:"warning",
        header:"ขออภัย",
        message:"เกิดข้อผิดพลาดในการจองห้องเรียน กรุณาลองใหม่อีกครั้ง",
        buttonText: "ย้อนกลับ",
        color:"red",
    },
    'booked' : {
        alt:"warning",
        header:"ห้องเรียนถูกจองแล้ว",
        message:"ห้องเรียนที่คุณเลือกถูกจองแล้ว กรุณาเลือกห้องเรียนอื่น",
        buttonText: "ย้อนกลับ",
        color:"red",
    },
    'noPermission' : {
        alt:"warning",
        header:"ไม่มีสิทธิ์จองห้องเรียน",
        message:"คุณใช้สิทธิ์การจองห้องเรียนในสัปดาห์นี้ไปแล้ว กรุณาลองใหม่ในสัปดาห์ถัดไป",
        buttonText: "ย้อนกลับ",
        color:"red",
    },
    'banned' : {
        alt:"warning",
        header:"คุณถูกแบน",
        message:"คุณถูกแบนจากการจองห้องเรียน เนื่องจากไม่เช็คอินในเวลาที่กำหนด  กรุณาติดต่อผู้ดูแลระบบเพื่อขอข้อมูลเพิ่มเติม",
        buttonText: "ตกลง",
        color:"red",
    },
}