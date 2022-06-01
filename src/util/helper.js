const printDate = function () {
  const date = new Date();
  console.log("Cureent Date = " + date);
};

const printMonth = function () {
  const date = new Date();
  const month = date.getMonth();
  console.log("Current Month = " + (month + 1));
};

const getBatchInfo = function () {
  console.log("Radon, W3D3, the topic for today is Nodejs module system");
};

module.exports.date = printDate;
module.exports.month = printMonth;
module.exports.info = getBatchInfo;
