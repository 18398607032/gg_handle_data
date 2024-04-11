const fs = require("fs");
const ExcelJS = require("exceljs");

async function writeDataToExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Sheet1");
  // 添加表头
  sheet.addRow([
    "Username",
    "Password",
    "Email",
    "Code",
    "Auth Token",
    "2FA code",
  ]);
  // 添加数据
  data.forEach((row) => {
    sheet.addRow(row);
  });
  // 保存为 .xlsx 文件
  await workbook.xlsx.writeFile("output3gmail.xlsx");
}

// 读取 txt 文件
fs.readFile("data3.txt", "utf8", (err, data) => {
  if (err) {
    console.error("读取文件时发生错误:", err);
    return;
  }

  // 将文件内容按行分割成数组
  const lines = data.trim().split("\n");

  console.log("读取到的文件内容数组:", lines);
  console.log("lines-length: ", lines.length);
  const handledData = lines.map((item) => {
    return item.split(":");
  });
  console.log("showdata-handledData: ", handledData);

  writeDataToExcel(handledData)
    .then(() => console.log("数据已写入到 output.xlsx 文件中"))
    .catch((error) => console.error("写入文件时发生错误:", error));
});
