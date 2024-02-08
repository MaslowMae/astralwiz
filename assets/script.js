
//set initial time and score
var timeLeft = 120;
var score = 0;

//countdown function
function countdown() {
  const timerDisplay = document.getElementById('countdown');
  const intervalId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent=timeLeft;
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      endQuiz();
    }
  }, 1000);
}

//function to check answers and update points

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="question1"]:checked');
  if (selectedAnswer) {
    const answer = selectedAnswer.value;
    if (answer === "5") {
      score += 10; //correct answer adds points
    }else{
      timeLeft -= 10; //Incorrect answer deducts time
      if (timeLeft <0){
        timeLeft=0
        endQuiz(); //ensure time doesn't go negative
      }
    }
    document.getElementById('score').textContent = score;
    }
  }
//function to handle the end of the quiz
function endQuiz () {
  alert("time's UP! Your final score is " + score);
  //submit score - add later
}

//Event listener for submit button
document.getElementById('start').addEventListener('click',function() {
  countdown();
});

//start the countdown when start button is pushed 
document.getElementById('submitAnswer').addEventListener('click',function() {
  checkAnswer();
});