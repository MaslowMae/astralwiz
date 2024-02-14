//set initial time and score
var timeLeft = 120;
var score = 0;
var currentQuestionIndex = 0;

//Array of questions
const questions = [
    {
        questionText: "what does your north node represent in astrology?",
        options: ["what you are really good at", "your twin flame", "the energy to harness for full potential", "where you'll end up"],
        correctAnswer: "the energy to harness for full potential"
    },
    {
        questionText: "Astrological houses represent the rotation of the earth around it's axis over the course of how long?",
        options: ["1 year", "24 hours", "12 hours", "1 day"],
        correctAnswer: "24 hours"
    },
    {
        questionText: "Which houses are the Cardinal Houses hint: Ascendant, Midhaven, Imum Coeli and Descendent",
        options: ["1st, 3rd, 6th, 12th", "2nd, 4th, 6th, 8th", "1st, 4th, 7th, 10th", "1st, 3rd, 7th, 11th"],
        correctAnswer: "1st, 4th, 7th, 10th"
    },
    {
        questionText: "what degrees do cusps fall under? hint: Sun only and last three days",
        options: ["27,28,29", "28,29,0,1", "29,0,1", "20,29,10"],
        correctAnswer: "27,28,29"
    },
    {
        questionText: "what is a Grand Trine?",
        options: ["when three of the same element aspect eachother", "three planets in trine to eachother, three trines", "a planet in each element", "any triangle in your chart"],
        correctAnswer: "three planets in trine to eachother, three trines"
    },
    {
        questionText: "What does your sun sign represent?",
        options: ["how others see you", "your higher self", "your true potential", "your core personality and sense of self"],
        correctAnswer: "your core personality and sense of self"
    },
    {
        questionText: "What does your south node represent?",
        options: ["what you need to work on or pay attention to", "your past life or where you are coming from", "your biggest downfall", "what you burry deep down"],
        correctAnswer: "your past life or where you are coming from"
    },
    {
        questionText: "What does your rising sign(ascendent) represent?",
        options: ["how others see you", "your higher self", "your true potential", "your core personality and sense of self"],
        correctAnswer: "your core personality and sense of self"
    },
];


//countdown function
function countdown() {
    const timerDisplay = document.getElementById('countdown');
    const intervalId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            endQuiz();
        }
    }, 1000);
};

//start the countdown when start button is pushed 
document.getElementById('start').addEventListener('click', function () {
    countdown();
    displayQuestion(); //call to display first question when start is pressed
});

//display the current question
function displayQuestion() {
    const questionContainer = document.getElementById('question');
    const currentQuestion = questions[currentQuestionIndex];

    //clear the question container before appending new elements
    questionContainer.innerHTML = '';

    //create a paragraph element for question text
    const questionText = document.createElement('p');
    questionText.textContent = currentQuestion.questionText;

    //append the question text to the question container
    questionContainer.appendChild(questionText);

    //create options element
    const optionsList = document.createElement('ul')

    currentQuestion.options.forEach(option => {
        const listItem = document.createElement('li');
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'options';
        optionInput.value = option;
        optionInput.id = option;
        const optionLabel = document.createElement('label');
        optionLabel.textContent = option;
        optionLabel.htmlFor = option;
        listItem.appendChild(optionInput);
        listItem.appendChild(optionLabel);
        optionsList.appendChild(listItem);
    });

    questionContainer.appendChild(optionsList);
}


//Event listener for submit button
document.getElementById('submitAnswer').addEventListener('click', function () {
    checkAnswer();
});

//function to check answers and update points and timer
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="options"]:checked');
    if (selectedAnswer) {
        const answer = selectedAnswer.value;
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correctAnswer) {
            score += 10; //correct answer adds points 
        } else {
            timeLeft -= 5; //Incorrect answer deducts time
            if (timeLeft < 0) {
                timeLeft = 0
                endQuiz(); //ensure time doesn't go negative
            }
        }
        document.getElementById('score').textContent = score;
        currentQuestionIndex++; //move to the next question in the index
        if (currentQuestionIndex < questions.length) {
            displayQuestion();

        } else {
            endQuiz(); //End quiz if all questions are answered
        }

    }

}
//function to handle the end of the quiz
function endQuiz() {
    alert("time's UP! Your final score is " + score);
    //save score option
    saveScore();
}


function saveScore() {
    const initials = prompt("Enter your initials to save your score:");
    if (initials) {
        //retrieve score from local storage
        var savedScores = JSON.parse(localStorage.getItem('quizScores'));
        if (!savedScores) {
            savedScores = [];
        }
        //add current svore
        savedScores.push({ initials, score: score });
        //Save scores back to storage
        localStorage.setItem('quizScores', JSON.stringify(savedScores));
        console.log(initials, score);
        alert("Your score has been saved!")
    }
}
function displayScores() {
    const savedScores = JSON.parse(localStorage.getItem('quizScores'));
    const scoresTable = document.getElementById('scoresTable');

    //clear previous scores
    scoresTable.innerHTML = '';

    //create table header
    const headerRow = document.createElement('tr');
    const headerInitials = document.createElement('th');
    headerScore.textContent = ' score';
    headerRow.appendChild(headerInitials);
    headerRow.appendChild(headerScore);
    headerRow.appendChild(headerRow);

    //populate table with scores
    if (savedScores) {
        savedScores.forEach(score => {
            const row = document.createElement("tr");
            const cellInitials = document.createElement('td');
            cellInitials.textContent = score.initials;
            const cellScore = document.createElement('td');
            cellScore.textContent = score.score;
            row.appendChild(cellInitials);
            row.appendChild(cellScore);
            scoresTable.appendChild(row);

        });
    } else { 
        //before scores
        const noScoresRow = document.createElement('tr');
        const noScoresCell = document.createElement('td');
        noScoresCell.textContent = 'No scores saved yet :('
        noScoresCell.setAttribute('colspan', 2);
        noScoresRow.appendChild(noScoresCell);
        scoresTable.appendChild(noScoresRow);
    }
}

window.onload = function() {
    displayScores();
};