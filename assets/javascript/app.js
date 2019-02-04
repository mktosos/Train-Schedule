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
 
      
database.ref().on('value',function(snapshot) {
      console.log(snapshot.val());
      console.log(snapshot.val().destination);
      console.log(snapshot.val().frequency);
      console.log(snapshot.val().minutesAway);
      console.log(snapshot.val().nextArrival);
      console.log(snapshot.val().trainName);

//       clickCounter = snapshot.val().clickCount;

//       $('#trainName').text(snapshot.val().clickCount);
    });
//     // function(errorObject) {
//     //   console.log('The read failed: ' + errorObject.code);
//     // }
//   );
    // arrival time moment js computation
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
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
