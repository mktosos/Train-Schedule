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
  // Get a reference to the database service
var database = firebase.database();
  
$('.btn').on("click",function(){
    
    var $trainName=$('#trainName').val();
    var $destination=$('#destination').val();
    var firstTrain=$('#firstTrain').val();
    var frequency=$('#frequency').val();
    var nextArrival = firstTrain;//moment().format('HH:mm');
    var currentTime = moment().format('HH:mm')
 
      
// database.ref().on(
//     'value',
//     function(snapshot) {
//       console.log(snapshot.val());

//       clickCounter = snapshot.val().clickCount;

//       $('#trainName').text(snapshot.val().clickCount);
//     }
//     // function(errorObject) {
//     //   console.log('The read failed: ' + errorObject.code);
//     // }
//   );


  
    
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    database.ref().set({
        trainName: $trainName,
        destination: $destination,
        frequency: frequency,
        minutesAway: tMinutesTillTrain,
        nextArrival: moment(nextTrain).format("hh:mm")
    });
    var $row = $('<tr>'+
      '<td>'+$trainName+'</td>'+
      '<td>'+$destination+'</td>'+
      '<td>'+frequency+'</td>'+
      '<td>'+moment(nextTrain).format("hh:mm")+'</td>'+
      '<td>'+tMinutesTillTrain+'</td>'+
      '</tr>');    
       $('table> tbody:last').append($row);  
});
