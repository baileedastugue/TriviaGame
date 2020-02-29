
var question1 = {
    fullQuestion: "what's my name",
    answerChoices: ["Bailee", "Jack", "Caroline", "Max"],
    correctAnswer: "0"
}

var question2 = {
    fullQuestion: "what's my age",
    answerChoices: ["26", "22", "25", "24"],
    correctAnswer: 2
}

var questionArray = [question1, question2];
var questionNumber = 0;
var currentQuestion;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var answeredCorrectly = false;
var outOfTime = false;
var $this;
var correctAnswer;

// function that creates the questions + buttons for each question
function createQuestions () {
    // creates questions based on what the question number is
    currentQuestion = questionArray[questionNumber];
    // parses the question to HTML
    $("#full-question").append(currentQuestion.fullQuestion);
    // a loop to go through each question's answer choice array
    $("#answer-choices").empty();
    for (var i = 0; i < currentQuestion.answerChoices.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("answerChoice");
        newButton.attr("id", currentQuestion.answerChoices[i]);
        newButton.attr("value", i);
        newButton.text(currentQuestion.answerChoices[i]);
        $("#answer-choices").append(newButton);
    }
    correctAnswer = currentQuestion.answerChoices[currentQuestion.correctAnswer];
}

createQuestions();

$(".answerChoice").on("click", function() {
    $this = $(this);
    console.log(correctAnswer);
    if ($this.val() === currentQuestion.correctAnswer) {
        console.log("correct");
        numCorrect++;
        answeredCorrectly = true;
        
    }
    else {
        console.log("incorrect");
        numIncorrect++;
    }
    displayResults();
})

function displayResults () {
    if (answeredCorrectly) {
        $("#results-container").text("You answered " + correctAnswer);
    }
    else {
        $("#results-container").text("You answered " + $this.attr("id") + ", but the correct answer is " + correctAnswer);
    }
    $("#question-container").hide();
}

// function outOfTime() {
//     $("#results-container").text("You ran out of time! The correct answer is " + correctAnswer);
// }

var secondsLeft = 3;
var timerId = setInterval(countdown, 1000);

function countdown() {
    if (secondsLeft === -1) {
        clearTimeout(timerId);
        $("#timer-container").hide();
        $("#question-container").hide();
        $("#results-container").text("You ran out of time! The correct answer is " + correctAnswer);
    } else {
        $("#timer-container").html(secondsLeft + ' seconds left');
        secondsLeft--;
    }
}

