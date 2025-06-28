const teacherList = ["ครูสมชาย", "ครูสมศรี", "ครูแจ่มใส"];
const teacherOptions = teacherList.map((name) => ({
  value: name,
  label: name,
}));

const subjectList = ["ฟิสิกส์", "เคมี", "ชีวะ"];
const subjectOptions = subjectList.map((subject) => ({
  value: subject,
  label: subject,
}));

const roomList = ["ม.1.1", "ม.1.2", "ม.1.3"];
const roomOptions = roomList.map((room) => ({
  value: room,
  label: room,
}));

export { teacherList, teacherOptions, subjectList, subjectOptions, roomList, roomOptions };
