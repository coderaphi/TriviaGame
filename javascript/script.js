
var data = [
    { 
        question : 'what is name of the current president?', 
        answers: [ "Trump", "Gerry","Tom","Luther","Mercury" ],
        correctAnswerIndex: 0
    },
    {
        question : 'what is the longest river?', 
        answers: [ "thames", "nile","lizeth","giro","pern" ],
        correctAnswerIndex: 1
    },
    {
        question : 'what is the capital of England?', 
        answers: [ "Newarl", "Cloey","Priuuys","London","Faule" ],
        correctAnswerIndex: 3
    },
    {
        question : 'What is the capital of France?', 
        answers: [ "Colloo", "DC","Parkwat","Port","Paris" ],
        correctAnswerIndex: 4
    }
];

const questionTime = 10;

var questionIndex = 0;
var correctAnswer
var incorrectAnswer
var questionTimer;
var countDownTimer;
var answerDisplayTimer;
var totalAnswered = correctAnswer+ incorrectAnswer;

var countDown = questionTime;

function questionTimeout() {
    displayCorrectAnswer();
    clearTimers();
}

function clearTimers() {
    if (questionTimer) {
        clearTimeout(questionTimer);
    }
    if (countDownTimer) {
        clearTimeout(countDownTimer);
    }
    
}

function updateCountDown() {
    if (countDown > 0) {
        countDown = countDown - 1;
        $('.count-down-timer').text(countDown);
    }
}

function inializeTimer() {
    clearTimers();
    questionTimer = setTimeout(questionTimeout, questionTime * 1000);
    $('.count-down-timer').text(questionTime);
    countDownTimer = setInterval(updateCountDown, 1000);
}

function displaySummary(){

    if (totalAnswered >=4){
    
        $(".container").hide()

    $(".summary").append(`<div><h3>"Number of correct Answers : ${correctAnswer}</h3></div>` )

    return;

    }
}




// question display
function askQuestions() {

    if (questionIndex < data.length) {

        countDown = questionTime;

        inializeTimer();

        var currentQuestion = data[questionIndex];
        $('.question').text(currentQuestion.question);

        var answersHtml = [];

        for (var i = 0; i < currentQuestion.answers.length; i++) {
            var currentOption = currentQuestion.answers[i];
            answersHtml.push(`<div class="radio"><label><input type="radio" name="optradio" class="answer-btn" index="${i}">${currentOption}</label></div>`);
            
        }

        $('.answers').html(answersHtml.join(" "));

        $('.answer-btn').on("click", function() {

            var clickedIndex = parseInt($(this).attr('index'));
            // var currentQuestion = data[questionIndex];
            if ( currentQuestion.correctAnswerIndex === clickedIndex) {
                //  answer is correct
                correctAnswer++
                questionIndex++;
                askQuestions();
                
            } else {
                //  display correct answer + image
                displayCorrectAnswer();
                incorrectAnswer++
            }
            displaySummary()

        });
    }
}

function continueToNext() {
    questionIndex++;
    askQuestions();
    if (answerDisplayTimer) {
        clearTimeout(answerDisplayTimer);
    }
}
function displayCorrectAnswer() {
    var currentQuestion = data[questionIndex];
    var answersHtml = currentQuestion.answers[currentQuestion.correctAnswerIndex];
    $('.answers').html(answersHtml);
    //  hide the countdown
    answerDisplayTimer = setTimeout(continueToNext, 3000);
}

$(document).ready(function() {

    $('.start-button').on("click", function() {
        $(this).hide();
        askQuestions();
       
    });








});

