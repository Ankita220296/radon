const express = require("express");
const myHelper = require("../util/helper");
const underscore = require("underscore");
const lodash = require("lodash");
const { indexOf } = require("lodash");

const router = express.Router();

router.get("/test-me", function (req, res) {
  myHelper.printDate();
  myHelper.getCurrentMonth();
  myHelper.getCohortData();
  let firstElement = underscore.first(["Sabiha", "Akash", "Pritesh"]);
  console.log(
    "The first element received from underscope function is " + firstElement
  );
  res.send("My first ever api!");
});

router.get("/hello", function (req, res) {
  //split into 4 arrays
  const split = lodash.chunk(
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    3
  );
  console.log(split);

  //tail returns 9 elements
  const tail = lodash.tail([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
  console.log(tail);

  //merge and remove duplicate values
  const merge = lodash.union(
    [1, 2, 3],
    [2, 3, 4, 5],
    [4, 5, 6, 7],
    [2, 6, 7, 8],
    [7, 8, 9, 5]
  );
  console.log(merge);

  // divide into keyy value pairs
  const movieDetails = lodash.fromPairs([
    ["Horror", "The Shining"],
    ["Drama", "Titanic"],
    ["Thriller", "Shutter Island"],
    ["Fantasy", "Pans Labyrinth"],
  ]);
  console.log(movieDetails);
  res.send("Hello there!");
});

//get movies name
router.get("/movies", function (req, res) {
  let movies = [
    "Rang de basanti",
    "The shining",
    "Lord of the rings",
    "Batman begins",
  ];
  res.send(movies);
});

// Invalid index
router.get("/movies/:indexNumber", function (req, res) {
  let movies = [
    "Rang de basanti",
    "The shining",
    "Lord of the rings",
    "Batman begins",
  ];

  let index = req.params.indexNumber;
  if (!movies[index]) {
    res.send("Please enter valid index number");
  }
  res.send(movies[index]);
});

//Array of movie objects
router.get("/films", function (req, res) {
  let films = [
    { id: 1, name: "The shining" },
    { id: 2, name: "Incendies" },
    { id: 3, name: "Rang de Basanti" },
    { id: 4, name: "Finding Nemo" },
  ];
  res.send(films);
});

//get films by Id
router.get("/films/:filmId", function (req, res) {
  let films = [
    { id: 1, name: "The shining" },
    { id: 2, name: "Incendies" },
    { id: 3, name: "Rang de Basanti" },
    { id: 4, name: "Finding Nemo" },
  ];

  const input = req.params.filmId;
  const result = films.find((ele) => ele.id == input);
  if (result === undefined) {
    res.send("No movie exists with this id");
  }
  res.send(result);
});

//missing number 1
router.get("/sol1", function (req, res) {
  let arr = [1, 2, 3, 5, 6, 7];
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  let last = 7;
  let sum = (last * (last + 1)) / 2;
  let missingNumber = sum - total;

  res.send({ data: missingNumber });
});

//missing number 2
router.get("/sol2", function (req, res) {
  let arr = [33, 34, 35, 37, 38];
  let len = arr.length;
  let total = 0;
  for (let i = 0; i < len; i++) {
    total += arr[i];
  }
  let first = arr[0];
  let last = arr.pop();
  let sum = ((len + 1) * (last + first)) / 2;
  let missingNumber = sum - total;

  res.send({ data: missingNumber });
});

module.exports = router;
// adding this comment for no reason
