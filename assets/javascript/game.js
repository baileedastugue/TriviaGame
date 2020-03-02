var question1 = {
    fullQuestion: "What was Billy Joel's first album?",
    answerChoices: ["Cold Spring Harbor", "Turnstiles", "Piano Man", "An Innocent Man"],
    correctAnswer: 0
}

var question2 = {
    fullQuestion: "Which character did Joel voice in the animated film Oliver & Company",
    answerChoices: ["Oliver", "Tito", "Dodger", "Einstein"],
    correctAnswer: 2
}

var question3 = {
    fullQuestion: "What song is not on Joel's The Stranger album?",
    answerChoices:['"Scenes from an Italian Restaurant"', '"Only the Good Die Young"', '"You May Be Right"', '"Just the Way You Are"'],
    correctAnswer: 2
}

var question4 = {
    fullQuestion: 'What song is Joel referring to in the following quote: "I had a suspicion that was going to be the last time I was going to be able to hit those notes, so why not go out in a blaze of glory?"',
    answerChoices: ['"Uptown Girl"', '"An Innocent Man"', '"All About Soul"', '"Allentown"'],
    correctAnswer: 1
}

var question5 = {
    fullQuestion: "Who did Joel see on the Ed Sullivan show and then decide to pursue a career in music?",
    answerChoices: ["The Beatles", "The Drifters", "The Four Seasons", "Sam & Dave"],
    correctAnswer: 0
}

var questionArray = [question1, question2, question3, question4, question5];
var questionNumber = 0;
var currentQuestion;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var answeredCorrectly = false;
var questionAnswered = false;
var $this;
var correctAnswer;
var outOfTime = false;
var timeleft = 10;
var timerID = setInterval(countingDown, 1000);

// function that creates the questions + buttons for each question
function createQuestions () {
    $("#question-container").show();
    answeredCorrectly = false;
    // creates questions based on what the question number is
    currentQuestion = questionArray[questionNumber];
    // parses the question to HTML
    $("#full-question").text(currentQuestion.fullQuestion);
    // a loop to go through each question's answer choice array
    $("#answer-choices").empty();
    for (var i = 0; i < currentQuestion.answerChoices.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("answerChoice btn btn-lg btn-block");
        newButton.attr("type", "button");
        newButton.attr("id", currentQuestion.answerChoices[i]);
        newButton.attr("value", i);
        newButton.text(currentQuestion.answerChoices[i]);
        $("#answer-choices").append(newButton);
    }
    correctAnswer = currentQuestion.answerChoices[currentQuestion.correctAnswer];

}
    
function countingDown (){
    $("#timer-container").empty();
    if(timeleft <= 0){
        clearInterval(timerID);
        $("#timer-container").html("Finished");
        outOfTime = true;
        displayResults();
    } else {
        $("#timer-container").html(timeleft + " seconds remaining");
    }
    timeleft -= 1;
    };


function openingScreen() {
    $("#results-container, #question-container").hide();
    $("#startGame-btn").on("click", function () {
        gameStart();
    })
}

openingScreen();

function gameStart () {
    $("#openingScreen, #restart-btn").hide();
    questionNumber = 0;
    numCorrect = 0;
    numIncorrect = 0;
    numUnanswered = 0;
    createQuestions();
}

$("#answer-choices").on("click", ".answerChoice", function () {
    questionAnswered = true;
    $this = $(this);
    if ($this.attr("id") == correctAnswer) {
        numCorrect++;
        answeredCorrectly = true;
    }
    else {
        numIncorrect++;
    }
    displayResults();
    timeleft = 10;
})

function displayResults () {
    $("#results-container").show();
    $("#userResults").empty();
    if (answeredCorrectly) {
        $("#userResults").text("You answered " + correctAnswer);
    }
    else if (outOfTime) {
        $("#timer-container").hide();
        $("#userResults").text("You ran out of time! The correct answer is " + correctAnswer);
    }
    else {
        $("#userResults").text("You answered " + $this.attr("id") + ", but the correct answer is " + correctAnswer);
    }
    $("#question-container").hide();
    $("#nextQuestion-btn").show();
}

function nextQuestion () {
    questionNumber++;
    $("#results-container").hide();
    $("#question-container").show();
}

$("#nextQuestion-btn").on("click", function () {
    if (questionNumber == 5) {
        gameOver();
    }
    else {
        nextQuestion();
        createQuestions();
    }
});

function gameOver () {
    $("#userResults").show().empty().append("Answered correctly: " + numCorrect + 
            "<br>Answered incorrectly: " + numIncorrect + "<br>Unanswered questions: " + numUnanswered)
    restartGame();
}

function restartGame () {
    $("#restart-btn").show();
    $("#nextQuestion-btn").hide();
}

// restart game after restart button has been clicked
$("#restart-btn").on("click", function (){
   gameStart();
})

