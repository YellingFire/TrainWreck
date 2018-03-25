$(document).ready(function() {

  // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBw72gcMw6F1SOEYgm4VTNjlquvUABNev0",
  authDomain: "train-wreck-time.firebaseapp.com",
  databaseURL: "https://train-wreck-time.firebaseio.com",
  projectId: "train-wreck-time",
  storageBucket: "",
  messagingSenderId: "822975309913"
};

firebase.initializeApp(config);

//creating a reference to the database  
var database = firebase.database();


//set global variables
var trainName;
var destination;
var frequency;
var first_arrival;
var next_arrival;
var nextConv;
var firstTrainCov;
var min_away;
var timeUntil;
var timeLeft;
var currentTime = moment();

$("#add-train").on("click", function(event) {

  event.preventDefault();
  

  //Grab the input data from the form
  trainName = $("#addTrainName").val().trim();
  destination = $("#addDestination").val().trim();
  frequency = $("#addFrequency").val().trim();
  first_arrival = $("#firstTrainTime").val().trim();

  // console.log(trainName);
  // console.log(destination);
  // console.log(frequency);
  // console.log(first_arrival);
  // console.log(currentTime);

  firstTrainCov = moment(first_arrival,"HH:mm").subtract(1, "years");
  // console.log("first train conversion" + firstTrainCov);

  timeUntil = moment().diff(moment(firstTrainCov), "minutes");
  // console.log("time until:" + timeUntil);

  timeLeft = (timeUntil % frequency);
  // console.log("time left:" + timeLeft);

  min_away = (frequency - timeLeft);
  // console.log("minutes away:" + min_away);

  nextConv = moment().add(min_away, "minutes");
  next_arrival = moment(nextConv).format("hh:mm A");
  // console.log(next_arrival);

  //Sets Database content
  database.ref().push({
      name: trainName,
      destination: destination,
      frequency: frequency,
      min_away: min_away,
      next_arrival: next_arrival,
      dateadded: firebase.database.ServerValue.TIMESTAMP
  });

  // reset the form after submission
  function resetTrainAdd() {
    document.getElementById("add_train").reset();
}
resetTrainAdd();


})

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var min_away = childSnapshot.val().min_away;
  var next_arrival = childSnapshot.val().next_arrival;

  // console.log(name);
  // console.log(destination);
  // console.log(frequency);
  // console.log(min_away);
  // console.log(next_arrival);

  
  $("#train_info").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + next_arrival + "</td><td>" + min_away + "</td></tr>");

});

// function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// };




});
 
 
  