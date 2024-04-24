angular
  .module("quizApp", [])
  .controller("QuizController", function ($scope, $interval) {
    var vm = this;

    vm.questions = [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Hyperlinks and Text Markup Language",
          "Home Tool Markup Language",
          "Hyper Tool Multi Language",
        ],
        answer: "Hyper Text Markup Language",
        weightage: 1,
      },
      {
        question: "Which CSS property is used to control the text size?",
        options: ["text-size", "font-size", "text-style", "font-style"],
        answer: "font-size",
        weightage: 1,
      },
      {
        question: "What is the first version of AngularJS?",
        options: ["1.x", "2.x", "3.x", "4.x"],
        answer: "1.x",
        weightage: 1,
      },
      {
        question:
          "Which directive in AngularJS is used to bind the application data to the HTML view?",
        options: ["ng-bind", "ng-model", "ng-app", "ng-bind-html"],
        answer: "ng-bind",
        weightage: 1,
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Colorful Style Sheets",
          "Computer Style Sheets",
        ],
        answer: "Cascading Style Sheets",
        weightage: 1,
      },
      // Add more questions here
    ];

    vm.currentQuestionIndex = 0;
    vm.currentQuestion = vm.questions[vm.currentQuestionIndex];
    vm.showResult = false;
    vm.isCorrect = false;
    vm.resultMessage = "";
    vm.selectedOption = "";
    vm.marks = 0; // Initialize marks to 0

    function startConfetti() {
      var duration = 5 * 1000; // 5 seconds
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      function randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
      }

      (function frame() {
        confetti({
          particleCount: 50,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: 0 },
          colors: ["#4facfe", "#00f2fe"],
        });
        confetti({
          particleCount: 50,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: 1 },
          colors: ["#4facfe", "#00f2fe"],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      })();
    }

    vm.checkAnswer = function (selectedOption) {
      if (!vm.selectedOption) {
        vm.selectedOption = selectedOption;
        vm.showResult = true;
        if (selectedOption === vm.currentQuestion.answer) {
          vm.isCorrect = true;
          vm.resultMessage = "Correct!";
          vm.marks += vm.currentQuestion.weightage;
          console.log(vm.currentQuestion);
          startConfetti();
        } else {
          vm.isCorrect = false;
          vm.resultMessage = "Incorrect!";
        }
      }
    };

    vm.nextQuestion = function () {
      if (vm.selectedOption) {
        vm.currentQuestionIndex++;
        if (vm.currentQuestionIndex < vm.questions.length) {
          vm.currentQuestion = vm.questions[vm.currentQuestionIndex];
          vm.showResult = false; // Reset showResult flag
          vm.selectedOption = "";
        } else {
          alert("You've reached the end of the quiz!");
          alert("Total Marks Scored: " + vm.marks);
        }
      }
    };

    // Timer functionality
    vm.timer = "5:00";
    var totalSeconds = 300; // 5 minutes
    var intervalPromise;

    vm.startTimer = function () {
      intervalPromise = $interval(function () {
        totalSeconds--;
        if (totalSeconds <= 0) {
          vm.timer = "0:00";
          $interval.cancel(intervalPromise);
          alert("Time's up!");
          alert("Total Marks Scored: " + vm.marks);
        } else {
          var minutes = Math.floor(totalSeconds / 60);
          var seconds = totalSeconds % 60;
          vm.timer = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        }
      }, 1000);
    };

    $scope.$on("$destroy", function () {
      $interval.cancel(intervalPromise);
    });
  });
