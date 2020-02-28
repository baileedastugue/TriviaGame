
var question1 = {
    fullQuestion: "what's my name",
    answerChoices: ["Bailee", "Jack", "Caroline", "Max"],
    correctAnswer: 0
}

var question2 = {
    fullQuestion: "what's my age",
    answerChoices: ["26", "22", "25", "24"],
    correctAnswer: 2
}

var questionArray = [question1, question2];
var questionNumber = 0;

// function that creates the questions + buttons for each question
function createQuestions () {
    // creates questions based on what the question number is
    var currentQuestion = questionArray[questionNumber];
    // parses the question to HTML
    $("#full-question").append(currentQuestion.fullQuestion);
    // a loop to go through each question's answer choice array
    $("#answer-choices").empty();
    for (var i = 0; i < currentQuestion.answerChoices.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("answerChoice");
        newButton.attr("value", i);
        newButton.text(currentQuestion.answerChoices[i]);
        $("#answer-choices").append(newButton);
    }
}

createQuestions();