const trim = function () {
  const str = "   FunctionUp   ";
  const trim = str.trim();
  console.log(trim);
};

const upperCase = function () {
  const name = "functionUp";
  const uppercase = name.toUpperCase();
  console.log(uppercase);
};

const lowerCase = function () {
  const name1 = "functionUp";
  const lowercase = name1.toLowerCase();
  console.log(lowercase);
};

module.exports.trim = trim;
module.exports.uppercase = upperCase;
module.exports.lowercase = lowerCase;
