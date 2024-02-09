
//Dialog box jquery for starting quiz
if (window.confirm("Do you want to test your knowledge?")) {
  //user clicks OK take them to the quiz
  window.location.href = "quiz.html";
} else {
  //User clicked Cancel or closed the dialog
  //Handle accordingly or do nothing
  console.log("User canceled the quiz :(")
};