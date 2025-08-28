const customStyles = {
  container: (provided) => ({
    // <-- เพิ่มส่วนนี้เข้ามา
    ...provided,
    boxShadow: "none",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#f8fafc",
    border: state.isFocused ? "2px solid #3b82f6" : "2px solid #e2e8f0",
    borderRadius: "0.75rem",
    padding: "0.3rem",
    boxShadow: "none",
    "&:hover": {
      borderColor: state.isFocused ? "#3b82f6" : "#cbd5e1",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
      ? "#eff6ff"
      : "white",
    color: state.isSelected ? "white" : "#1f2937",
    padding: "12px 18px",
    borderRadius: "0.5rem",
    margin: "4px",
    width: "calc(100% - 8px)",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10,
    boxShadow: "none",
    borderRadius: "0.75rem",
    padding: "4px",
    border: "1px solid #f3f4f6",
  }),
  menuList: (provided) => ({ ...provided, paddingTop: 0, paddingBottom: 0 }),
  singleValue: (provided) => ({
    ...provided,
    color: "#1f2937",
    fontWeight: 500,
  }),
};

const subjectList = ["ฟิสิกส์", "เคมี", "ชีวะ", "วิทยาศาสตร์", "คณิตศาสตร์", "คอมพิวเตอร์", "สังคม", "ประวัติ", "ศิลปะ", "อังกฤษ", "ไทย", "ภาษา", "สุขศึกษา", "พละ", "แนะแนว", "อื่นๆ"];
const subjectOptions = subjectList.map((subject) => ({
  value: subject,
  label: subject,
}));

const roomList = [
  "ม.1.1", "ม.1.2", "ม.1.3", "ม.1.4", "ม.1.5", "ม.1.6", "ม.1.7", "ม.1.8", "ม.1.9", "ม.1.10", "ม.1.11", "ม.1.12", "ม.1.13", "ม.1.14",
  "ม.2.1", "ม.2.2", "ม.2.3", "ม.2.4", "ม.2.5", "ม.2.6", "ม.2.7", "ม.2.8", "ม.2.9", "ม.2.10", "ม.2.11", "ม.2.12", "ม.2.13", "ม.2.14",
  "ม.3.1", "ม.3.2", "ม.3.3", "ม.3.4", "ม.3.5", "ม.3.6", "ม.3.7", "ม.3.8", "ม.3.9", "ม.3.10", "ม.3.11", "ม.3.12", "ม.3.13", "ม.3.14",
  "ม.4.1", "ม.4.2", "ม.4.3", "ม.4.4", "ม.4.5", "ม.4.6", "ม.4.7", "ม.4.8", "ม.4.9", "ม.4.10", "ม.4.11", "ม.4.12", "ม.4.13", "ม.4.14",
  "ม.5.1", "ม.5.2", "ม.5.3", "ม.5.4", "ม.5.5", "ม.5.6", "ม.5.7", "ม.5.8", "ม.5.9", "ม.5.10", "ม.5.11", "ม.5.12", "ม.5.13", "ม.5.14",
  "ม.6.1", "ม.6.2", "ม.6.3", "ม.6.4", "ม.6.5", "ม.6.6", "ม.6.7", "ม.6.8", "ม.6.9", "ม.6.10", "ม.6.11", "ม.6.12", "ม.6.13", "ม.6.14"
];
const roomOptions = roomList.map((room) => ({
  value: room,
  label: room,
}));

export { subjectList, subjectOptions, roomList, roomOptions, customStyles };
