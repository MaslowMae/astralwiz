
//Dialog box jquery for starting quiz

function displayConfirmation(){
if (window.confirm("Do you want to test your Astrology knowledge?")) {
  //user clicks OK take them to the quiz
  window.location.href = "quiz.html";
} else {
  //User clicked Cancel or closed the dialog
  console.log("User canceled the quiz :(");
};
}
displayConfirmation();