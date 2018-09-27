var config = {
    apiKey: "AIzaSyDy8z0fUItzhjapFY6UYBR8DGDbP5O12QE",
    authDomain: "test-database-4c8a3.firebaseapp.com",
    databaseURL: "https://test-database-4c8a3.firebaseio.com",
    projectId: "test-database-4c8a3",
    storageBucket: "test-database-4c8a3.appspot.com",
    messagingSenderId: "909685564758"
}

firebase.initializeApp(config);


// Created a variable to reference the database.
var database = firebase.database();

$("#submitButton").on("click", function () {

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();


    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    })
    audio.volume = 0.03;
})
var audio = document.getElementById("trainMusic");
audio.volume = 0.0;

database.ref().on("child_added", function (snapshot) {
    // Store this train in an easy to use, well-named variable
    var train = snapshot.val()

    // Change the HTML to reflect snapshot
    var newRow = $("<tr>")
    var nameCol = $("<td>").text(train.trainName)
    var destCol = $("<td>").text(train.destination)
    var freqCol = $("<td>").text(train.frequency)

    newRow.append(nameCol, destCol, freqCol);

    $(".tBody").append(newRow);

    var firstTimeConverted = moment(train.trainTime, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


    var timeRemainder = diffTime % train.frequency;


    var timeTilNextTrain = train.frequency - timeRemainder;


    var nextTrain = moment().add(timeTilNextTrain, "minutes").format("hh:mm a");

    var nextTrain2Table = $("<td>").text(nextTrain);
    var timeTilNextTrain2Table = $("<td>").text(timeTilNextTrain);

    newRow.append(nextTrain2Table, timeTilNextTrain2Table);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});







