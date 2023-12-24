class CrosswordRow {
  constructor(answer, typedAnswer, question) {
    this.answer = answer;
    this.typedAnswer = typedAnswer;
    this.question = question;
  }
}

var row0 = new CrosswordRow("VINHPHUC", 1, "Dãy núi Tam Đảo nằm ở tỉnh nào?");
var row1 = new CrosswordRow(
  "BADINH",
  2,
  "Bác Hồ đọc bản Tuyên ngôn độc lập, ngày 2/9/1945 tại quảng trường nào?"
);
var row2 = new CrosswordRow(
  "SONGHONG",
  7,
  "Cầu Long Biên bắc qua dòng sông nào?"
);
var row3 = new CrosswordRow(
  "CHUAMOTCOT",
  5,
  "Đây là tên một ngôi chùa nổi tiếng ở Hà Nội, nằm cạnh quần thể Quảng trường Ba Đình và Lăng Chủ tịch Hồ Chí Minh."
);
var row4 = new CrosswordRow(
  "HANOI",
  5,
  "Đây là thủ đô của nước Việt Nam ta hiện nay."
);
var row5 = new CrosswordRow(
  "HOANKIEM",
  7,
  "Quận nào có diện tích nhỏ nhất tại thành phố Hà Nội?"
);
var row6 = new CrosswordRow(
  "MUATHU",
  6,
  "Mùa nào ở miền bắc có thời tiết se se lạnh, cũng là mùa các bạn học sinh tựu trường?"
);

export const crosswordData = [row0, row1, row2, row3, row4, row5, row6];
