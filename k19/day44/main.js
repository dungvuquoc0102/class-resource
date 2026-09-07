const students = [
  {
    name: "Anh Đức",
    point: 10,
  },
  {
    name: "Do Quy Dat Hoang",
    point: 9,
  },
  {
    name: "Hoàng Vũ",
    point: 9.5,
  },
];

// Tính tổng điểm của tất cả học sinh
const callback = (total, student) => {
  return total + student.point;
};
const initialValue = 0;
const totalPoint = students.reduce(callback, initialValue);
console.log(totalPoint); // 28.5
