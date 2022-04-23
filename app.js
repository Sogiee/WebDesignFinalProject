$(document).ready(function() {
// questions
    var q0 = {
        question: "Which animal is known to have the most powerful bite in the world?",
        answerChoices: ["A. Tiger", "B. Hippopotamus", "C. Wolf", "D. Grizzly Bear "],
        answer: "B. Hippopotamus",
    }
    var q1 = {
        question: "How long is an Elephant pregnant for before it gives birth?",
        answerChoices: ["A. 1 month", "B. 22 months", "C. 15 months", "D. 30 months"],
        answer: "B. 22 months",
    }
    var q2 = {
        question: "What part of the body does a dog sweat through?",
        answerChoices: ["A. Fur", "B. Mouth", "C. Paws", "D. Eyes"],
        answer: "C. Paws",
    }
    var q3 = {
        question: "What animal is known to spend 90% of its day sleeping?",
        answerChoices: ["A. Sloths", "B. My cat Nova", "C. Koalas", "D. Lions"],
        answer: "C. Koalas",
    }
    var q4 = {
        question: "What animal is known to have cube shaped poop?",
        answerChoices: ["A. Koala", "B. Wombat", "C. Platypus", "D. House Cat"],
        answer: "B. Wombat",
    }
    var timeLeft = 3;
    var losses = 0;
    var wins = 0;
    var timesUp = 0;
    var questionNumber = 0;

    var questions = [q0.question, q1.question, q2.question, q3.question, q4.question];
    var answerOptions = [q0.answerChoices, q1.answerChoices, q2.answerChoices, q3.answerChoices, q4.answerChoices];
    var answers = [q0.answer, q1.answer, q2.answer, q3.answer, q4.answer]

    var intervalId;

    function countdown() {
        if (timeLeft === 0) {
            clearInterval(intervalId);
            $(".buttons").remove();
            $(".timer").text("Time Remaining: " + timeLeft + " Seconds");
            $(".results").html("<h4> Times Up! The correct answer is: <br>  " + answers[questionNumber] + "</h4>");
            losePage();
            timesUp++;
            questionNumber++;
            setTimeout(game, 3000);
        } else {
            timeLeft--;
            $(".timer").text("Time Remaining: " + timeLeft + " Seconds");
        }
    }

    function game() {
        if (questionNumber < questions.length) {
            $(".gif-screen").empty();
            $(".results").empty();
            timeLeft = 10;
            intervalId = setInterval(countdown, 1000);
            $(".question").html("<h2>" + questions[questionNumber] + "</h2>");
            for (let i = 0; i < answerOptions[questionNumber].length; i++) {
                $(".question").append(`<button class='buttons button${[i]}' value='${answerOptions[questionNumber][i]}'> ${answerOptions[questionNumber][i]} </button>`);
            }

            $(".buttons").on("click", function() {
                console.log(answers[questionNumber]);
                if ($(this).val() === answers[questionNumber]) {
                    clearInterval(intervalId);
                    $(".buttons").remove();
                    $(".results").html("<h4> That's Correct! The answer is: <br> " + answers[questionNumber] + "</h4>");
                    winPage();
                    wins++;
                    questionNumber++;
                    setTimeout(game, 3000);
                } else {
                    clearInterval(intervalId);
                    $(".buttons").remove();
                    $(".results").html(" <h4> Wrong! The correct answer is: <br>" + answers[questionNumber] + "</h4>");
                    losePage();
                    losses++;
                    questionNumber++;
                    setTimeout(game, 3000);
                }

            });


        } else {
            clearInterval(intervalId);
            $(".results").html("<h4> Game Over! Press Restart to Play Again! </h4>");
            endPage();
            $(".question").empty();
            $(".scoreboard").append("<p> Unanswered: " + timesUp + "</p>");
            $(".scoreboard").append("<p> Correct: " + wins + "</p>");
            $(".scoreboard").append("<p> Incorrect: " + losses + "</p>");

            $(".restart").show();
        }

    }


    function reset() {

        $(".restart").hide();
        $(".scoreboard").empty();
        losses = 0;
        wins = 0;
        timesUp = 0;
        questionNumber = 0;
        game();
    }

       function winPage() {
        $(".gif-screen").html("<img src='https://media.giphy.com/media/pHZdGyFNp5sUXq4jp5/giphy-downsized-large.gif' class='winGif'>");
    }

    function losePage() {
        $(".gif-screen").html("<img src='https://media.giphy.com/media/5bgS90uCmWoWp2hBvj/giphy.gif' class='loseGif'>");
    }

    function endPage() {
        $(".gif-screen").html("<img src='https://media.giphy.com/media/ONuQzM11fjvoY/giphy.gif' class='endGif'>");
    }

    $(".restart").hide();

    $(".start").on("click", function() {

        $(this).remove();
        game();
    });

    $(".restart").on("click", function() {
        reset();
    });

});