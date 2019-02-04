// Initialize Firebase
var config = {
    apiKey: "AIzaSyBrjVs0Ccw0LRYtbRQwRruLsarHeQdmCnw",
    authDomain: "time-sheet-504b5.firebaseapp.com",
    databaseURL: "https://time-sheet-504b5.firebaseio.com",
    projectId: "time-sheet-504b5",
    storageBucket: "time-sheet-504b5.appspot.com",
    messagingSenderId: "520957242957"
  };
firebase.initializeApp(config);
// database reference
var database = firebase.database();

//grab data from database on value change or on page start to display
database.ref().on('value',function(snapshot) {
    //jqeury the values as text to ID div
    $('#trainNameD').text(snapshot.val().trainName);
    $('#destinationD').text(snapshot.val().destination);
    $('#frequencyD').text(snapshot.val().frequency);
    $('#nextArrivalD').text(snapshot.val().nextArrival);
    $('#minutesAwayD').text(snapshot.val().minutesAway);
    }, function(errorObject) {

    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
  });
 // button event stores inputs to vars 
$('.btn').on("click",function(){
    event.preventDefault();
    
    var $trainName=$('#trainName').val();
    var $destination=$('#destination').val();
    var firstTrain=$('#firstTrain').val();
    var frequency=$('#frequency').val();
    var currentTime = moment().format('HH:mm')
  
    // arrival time moment js computation
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    //write to the database
    database.ref().set({
        trainName: $trainName,
        destination: $destination,
        frequency: frequency,
        minutesAway: tMinutesTillTrain,
        nextArrival: moment(nextTrain).format("hh:mm")
    });
    //display input in a new table row with table data
      var $row = $('<tr>'+
      '<td>'+$trainName+'</td>'+
      '<td>'+$destination+'</td>'+
      '<td>'+frequency+'</td>'+
      '<td>'+moment(nextTrain).format("hh:mm")+'</td>'+
      '<td>'+tMinutesTillTrain+'</td>'+
      '</tr>');    
       $('table> tbody:last').append($row);  
});
