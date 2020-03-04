var question1 = {
    fullQuestion: "What was Billy Joel's first album?",
    answerChoices: ["Cold Spring Harbor", "Turnstiles", "Piano Man", "An Innocent Man"],
    correctAnswer: 0,
    forResults: '"https://www.youtube.com/embed/T2zjVszdiXA"'
}

var question2 = {
    fullQuestion: "Which character did Joel voice in the animated film Oliver & Company",
    answerChoices: ["Oliver", "Tito", "Dodger", "Einstein"],
    correctAnswer: 2,
    forResults: '"https://www.youtube.com/embed/Jb7kJ-j_dKA?start=30"'
}

var question3 = {
    fullQuestion: "What song is not on Joel's The Stranger album?",
    answerChoices:['"Scenes from an Italian Restaurant"', '"Only the Good Die Young"', '"You May Be Right"', '"Just the Way You Are"'],
    correctAnswer: 2,
    forResults: '"https://www.youtube.com/embed/Jo9t5XK0FhA"'
}

var question4 = {
    fullQuestion: 'What song is Joel referring to in the following quote: "I had a suspicion that was going to be the last time I was going to be able to hit those notes, so why not go out in a blaze of glory?"',
    answerChoices: ['"Uptown Girl"', '"An Innocent Man"', '"All About Soul"', '"Allentown"'],
    correctAnswer: 1,
    forResults: '"https://www.youtube.com/embed/cf0s-YfTpw4"'
}

var question5 = {
    fullQuestion: "Who did Joel see on the Ed Sullivan show and then decide to pursue a career in music?",
    answerChoices: ["The Beatles", "The Drifters", "The Four Seasons", "Sam & Dave"],
    correctAnswer: 0, 
    forResults: '"https://www.youtube.com/embed/jenWdylTtzs"'
}

// array that holds the question objects
var questionArray = [question1, question2, question3, question4, question5];

// booleans to direct game play flow
var answeredCorrectly = false;
var gameStarted = false;
var outOfTime = false;
var displayingFinalResults = false;

// global variables
var questionNumber = 0;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var timeleft = 20;
var timerID;
var currentQuestion;
var $this;
var correctAnswer;
var progessWidth = 0;

// displays rules, prompts user to begin play
function openingScreen() {
    $("#results-container, #question-container").hide();
    $("#startGame-btn").on("click", function () {
        gameStart();
    })
}

// sets game up, starts questions at 0, clears results
function gameStart () {
    $("#openingScreen, #restart-btn").hide();
    $("#finalResults").empty().hide();
    progessWidth = 0;
    $(".progress-bar").css({"width": progessWidth +"%"});
    questionNumber = 0;
    progessWidth = 0;
    numCorrect = 0;
    numIncorrect = 0;
    numUnanswered = 0;
    createQuestions();
    gameStarted = true;
    displayingFinalResults = false;
    timeleft = 20;
}

// displays time remaining on page, determines whether user answered within the time limit
function countingDown (){
    if(timeleft <= 0){
        clearInterval(timerID);
        outOfTime = true;
        displayResults();
    } else {
        $("#timer-container").html(timeleft + " seconds remaining");
    }
    timeleft -= 1;
};

// function that creates the questions + buttons for each question
function createQuestions () {
    $("#question-container").show();
    timerID = setInterval(countingDown, 1000);
    $("#timer-container").show();
    answeredCorrectly = false;
    // creates questions based on what the question number is
    currentQuestion = questionArray[questionNumber];
    // parses the question to HTML
    $("#full-question").text(currentQuestion.fullQuestion);
    // a loop to go through each question's answer choice array
    $("#answer-choices").empty();
    for (var i = 0; i < currentQuestion.answerChoices.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("answerChoice btn btn-lg btn-block btn-outline-danger");
        newButton.attr("type", "button");
        newButton.attr("id", currentQuestion.answerChoices[i]);
        newButton.attr("value", i);
        newButton.text(currentQuestion.answerChoices[i]);
        $("#answer-choices").append(newButton);
    }
    correctAnswer = currentQuestion.answerChoices[currentQuestion.correctAnswer];
}

// notifies the user whether they answered correctly, incorrectly, or ran out of time
function displayResults () {
    $("#incorrect, #correct").hide();
    if (gameStarted && !displayingFinalResults) {
        $("#results-container").show();
        $("#userResults").empty().show();
        if (answeredCorrectly) {
            $("#userResults").text("You answered " + correctAnswer);
            $("#correct").show();
        }
        else if (outOfTime) {
            numUnanswered++;
            $("#userResults").text("You ran out of time! The correct answer is " + correctAnswer);
        }
        else {
            $("#userResults").text("You answered " + $this.attr("id") + ", but the correct answer is " + correctAnswer);
            $("#incorrect").show();
        }
        $("#question-container").hide();
        $("#nextQuestion-btn").show();
        clearInterval(timerID);
        timeleft = 20;
        $("#video-container").empty().show().append('<br><iframe width="470" height="315" src=' + questionArray[questionNumber].forResults + 'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    }
}

// goes to next question
function nextQuestion () {
    outOfTime = false;
    questionNumber++;
    progessWidth += 20;
    $(".progress-bar").css({"width": progessWidth +"%"});
    $("#results-container").hide();
    $("#question-container").show();
}

// notifies user of their stats after the game has finished
function gameOver () {
    $("#finalResults").show().empty().append("<h1 class='display-4'>Final Results:</h1>Answered correctly: " + numCorrect + 
            "<br>Answered incorrectly: " + numIncorrect + "<br>Unanswered questions: " + numUnanswered);
    $("#userResults, #video-container").hide()
    restartGame();
}

// displays button to restart game
function restartGame () {
    $("#restart-btn").show();
    $("#nextQuestion-btn").hide();
}

// USER GAME PLAY: 

openingScreen();

// determines whether the user has chosen the correct answer choice 
$("#answer-choices").on("click", ".answerChoice", function () {
    $this = $(this);
    if ($this.attr("id") == correctAnswer) {
        numCorrect++;
        answeredCorrectly = true;
    }
    else {
        numIncorrect++;
    }
    displayResults();
})

// moves on to the next question after user input
$("#nextQuestion-btn").on("click", function () {
    $("#timer-container").empty();
    if (questionNumber == 4) {
        displayingFinalResults = true;
        gameOver();
        $("#incorrect, #correct").hide();
    }
    else {
        nextQuestion();
        createQuestions();
    }
});

// restart game after restart button has been clicked
$("#restart-btn").on("click", function (){
   gameStart();
})

