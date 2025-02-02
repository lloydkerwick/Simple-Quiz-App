const questions = document.querySelector('.js-questions')
const quizContent = document.querySelector('.js-quiz-wrapper')
const startButton = document.querySelector('.js-start-button')

const quizQuestions = [
  {
    question: "What does typeof null return in JavaScript?",
    options: ['a) "null"', 'b) "object"', 'c) "undefined"', 'd) "boolean"'],
    correctAnswer: 'b',
    explanation: "This is a well-known JavaScript quirk. typeof null incorrectly returns \"object\" due to a historical bug in JavaScript."
  },
  {
    question: "Which keyword is used to declare a constant variable?",
    options: ['a) let', 'b) var', 'c) const', 'd) static'],
    correctAnswer: 'c',
    explanation: "const is used to declare variables that cannot be reassigned. However, objects declared with const can still have their properties modified."
  },
  {
    question: "What will be the output of `console.log([] == ![])`?",
    options: ['a) true', 'b) false', 'c) ReferenceError', 'd) TypeError'],
    correctAnswer: 'a',
    explanation: "JavaScript performs type coercion here. `[]` is truthy, but `![]` is `false`. Then `[] == false` evaluates to `true` because `false` gets coerced into a number (`0`), and `[].valueOf()` also results in `0`."
  },
  {
    question: "Which method can be used to convert a JSON string into a JavaScript object?",
    options: ['a) JSON.parse()', 'b) JSON.stringify()', 'c) Object.fromJSON()', 'd) parseJSON()'],
    correctAnswer: 'a',
    explanation: "The `JSON.parse()` method is used to parse a JSON string and convert it into a JavaScript object."
  },
  {
    question: "What is the purpose of the `this` keyword in JavaScript?",
    options: [
      'a) It refers to the current function',
      'b) It refers to the global object only',
      'c) It refers to the object that owns the function executing it',
      'd) It has no specific purpose'
    ],
    correctAnswer: 'c',
    explanation: "In JavaScript, `this` refers to the object that owns the function executing it. Its value depends on how and where the function is called."
  },
  {
    question: "What will console.log(2 + '2' - 1) output?",
    options: ['a) 21', 'b) 3', 'c) "21"', 'd) "23"'],
    correctAnswer: 'a',
    explanation: "\"2\" is a string, so 2 + '2' results in '22' (string concatenation). Then '22' - 1 converts '22' into a number (22 - 1 = 21)."
  },
  {
    question: "Which of the following is NOT a valid way to declare a function?",
    options: ['a) function myFunc() {}', 'b) const myFunc = function() {}', 'c) let myFunc = () => {}', 'd) myFunc() => {}'],
    correctAnswer: 'd',
    explanation: "Arrow functions must be assigned to a variable or used in an expression. The correct syntax would be const myFunc = () => {}."
  },
  {
    question: "What does the map() method return?",
    options: ['a) A new array', 'b) The original array', 'c) A single value', 'd) undefined'],
    correctAnswer: 'a',
    explanation: "map() creates a new array by applying a function to each element of the original array without modifying it."
  },
  {
    question: "Which event is triggered when a user types in an input field?",
    options: ['a) click', 'b) keydown', 'c) change', 'd) input'],
    correctAnswer: 'd',
    explanation: "The input event fires every time the value changes, whereas keydown fires when a key is pressed, and change fires only when the input loses focus."
  },
  {
    question: "What will console.log(0.1 + 0.2 === 0.3) print?",
    options: ['a) true', 'b) false', 'c) undefined', 'd) NaN'],
    correctAnswer: 'b',
    explanation: "Due to floating-point precision errors in JavaScript, 0.1 + 0.2 does not exactly equal 0.3, but rather 0.30000000000000004. So, 0.1 + 0.2 === 0.3 evaluates to false."
  }
];

let currentQuestionIndex = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;

const optionValues = ['a', 'b', 'c', 'd']

startButton.addEventListener('click', () => {
  currentQuestionIndex = 0;  
  loadQuestion(currentQuestionIndex);
});

function loadQuestion(index) {
  const questionData = quizQuestions[index];

  quizContent.innerHTML = `
    <div class="questions">
      <p class="question-label">${questionData.question}</p>
   <ol type="a">
          ${questionData.options.map((option, i) => `
            <li>
              <input type="radio" name="question${index}" value="${optionValues[i]}"> ${option}
            </li>
          `).join('')}
      </ol>
    </div>

    <button class="submit-button js-submit-button">Submit Answer</button>

    <p class="result js-result"></p>
    <p class="js-explanation" style="display: none">${questionData.explanation}</p>

    <button class="next-question-button js-next-question" style="display: none">Next Question</button>
  `;

  // Re-select elements inside quizContent since they are newly created
  const submitAnswerButton = document.querySelector('.js-submit-button');
  const nextQuestionButton = document.querySelector('.js-next-question');
  const explanation = document.querySelector('.js-explanation');
  const result = document.querySelector('.js-result');

  submitAnswerButton.addEventListener('click', () => {
    const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedAnswer) {
      const isCorrect = selectedAnswer.value === questionData.correctAnswer;

      if (isCorrect) {
        correctAnswer ++;
      } else {
        incorrectAnswer ++;
      }
      //ternary operator below
      result.textContent = isCorrect ? 'Correct' : 'Incorrect';
      result.style.color = isCorrect ? 'green' : 'red';
      explanation.style.display = 'block';
      nextQuestionButton.style.display = 'block';
    }
  });

  nextQuestionButton.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    } else {
      quizContent.innerHTML = `<h2>Quiz Completed</h2>
      <p>Final Result: ${correctAnswer} / ${incorrectAnswer + correctAnswer}</p>
      <button class="try-again-button js-try-again-button">Try Again</button>`;

      const tryAgainButton = document.querySelector('.js-try-again-button');

      tryAgainButton.addEventListener('click', () => {
        location.reload()
      })
    }
  });
}
