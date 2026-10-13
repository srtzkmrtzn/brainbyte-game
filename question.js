"use strict";

const QUESTION_BANK = [

  {
    level: 1,
    difficulty: "EASY",
    type: "Debug the code",

    title: "Find the Bug",

    prompt:
      "The function should add two numbers. Which line contains the bug?",

    referenceCode:
`function add(a, b) {
  return a + b;
}`,

    debugCode:
`function add(a, b) {
  return a - b;
}`,

    answers: [
      "Line 1",
      "Line 2",
      "Line 3",
      "There is no bug"
    ],

    answerIndex: 1,

    hint:
      "Check the mathematical operator.",

    explanation:
      "The function should use + for addition, not - for subtraction."
  },


  {
    level: 2,
    difficulty: "EASY",
    type: "Debug the code",

    title: "Fix the Variable",

    prompt:
      "Which line has the incorrect variable value?",

    referenceCode:
`let score = 100;

console.log(score);`,

    debugCode:
`let score = 10;

console.log(score);`,

    answers: [
      "Line 1",
      "Line 2",
      "Line 3",
      "No error"
    ],

    answerIndex: 0,

    hint:
      "Look at the value assigned to score.",

    explanation:
      "The intended score is 100, but the debugging code sets it to 10."
  },


  {
    level: 3,
    difficulty: "MEDIUM",
    type: "Debug the code",

    title: "Fix the Condition",

    prompt:
      "A player who is exactly 18 should be considered an adult. Find the bug.",

    referenceCode:
`let age = 18;

if (age >= 18) {
  access = true;
}`,

    debugCode:
`let age = 18;

if (age > 18) {
  access = true;
}`,

    answers: [
      "Line 1",
      "Line 3",
      "Line 4",
      "No error"
    ],

    answerIndex: 1,

    hint:
      "What happens when age is exactly 18?",

    explanation:
      "The condition needs >= so that exactly 18 is also accepted."
  },


  {
    level: 4,
    difficulty: "MEDIUM",
    type: "Debug the code",

    title: "Array Index",

    prompt:
      "Which line incorrectly accesses the first item?",

    referenceCode:
`let fruits = ["Apple", "Banana"];

console.log(fruits[0]);`,

    debugCode:
`let fruits = ["Apple", "Banana"];

console.log(fruits[1]);`,

    answers: [
      "Line 1",
      "Line 2",
      "Line 3",
      "No error"
    ],

    answerIndex: 2,

    hint:
      "Remember that JavaScript arrays start at index 0.",

    explanation:
      "The first item of an array is at index 0."
  },


  {
    level: 5,
    difficulty: "HARD",
    type: "Debug the code",

    title: "Logic Error",

    prompt:
      "The function should return true when a person is an adult.",

    referenceCode:
`function isAdult(age) {
  return age >= 18;
}`,

    debugCode:
`function isAdult(age) {
  return age <= 18;
}`,

    answers: [
      "Function name",
      "Return condition",
      "Parameter",
      "There is no bug"
    ],

    answerIndex: 1,

    hint:
      "An adult should be 18 or older.",

    explanation:
      "The condition should use >= instead of <=."
  },


  {
    level: 6,
    difficulty: "HARD",
    type: "Debug the code",

    title: "Loop Error",

    prompt:
      "The loop should print numbers from 0 to 4. Find the problem.",

    referenceCode:
`for (let i = 0; i < 5; i++) {
  console.log(i);
}`,

    debugCode:
`for (let i = 0; i <= 5; i++) {
  console.log(i);
}`,

    answers: [
      "The variable i",
      "The condition",
      "console.log",
      "The loop has no error"
    ],

    answerIndex: 1,

    hint:
      "Compare < 5 with <= 5.",

    explanation:
      "Using <= 5 causes the loop to also print 5."
  }

];