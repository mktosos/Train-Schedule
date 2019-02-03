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
    addToList()
    
});

function addToList(){
    var $trainName=$('#trainName').val();
    var $destination=$('#destination').val();
    var firstTrain=$('#firstTrain').val();
    var frequency=$('#frequency').val();
    var nextArrival = firstTrain;//moment().format('HH:mm');
    var currentTime = moment().format('HH:mm')
   
    // //add minutes to time function
    // var hours = currentTime.toString().split(":")[0];
    // var minutes = currentTime.toString().split(":")[1];
    // var totalMins = parseInt(minutes)+parseInt(frequency);
    // var remainderMins = totalMins-60
    
    // var adjustedTime = totalHrs+":"+newMins;

    // var y =totalMins/60
    // var z = y.toString()
    // var additionalHrs = z.split(".")[0]
    // var totalHrs = parseInt(hours) + parseInt(additionalHrs);
    
    // if (Math.round(("."+ z.split(".")[1])*60)===NaN){
    //      newMins = "00"
    // }else{
    //     var newMins =Math.round(("."+ z.split(".")[1])*60)
    // }
    // console.log (z.split("."))
    // console.log (additionalHrs)
    // console.log (newMins);
    // var adjustedTime = totalHrs+":"+newMins; 
   
    // console.log(adjustedTime);
    // console.log(minutes);
    // console.log(totalMins);
    // console.log(parseInt(hours));
    // console.log(parseInt(additionalHrs));
    // console.log(totalHrs);
    // Assumptions
    // var tFrequency = 3;

    // Time is 3:30 AM
    // var firstTrain = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

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

    var $row = $('<tr>'+
      '<td>'+$trainName+'</td>'+
      '<td>'+$destination+'</td>'+
      '<td>'+frequency+'</td>'+
      '<td>'+moment(nextTrain).format("hh:mm")+'</td>'+
      '<td>'+tMinutesTillTrain+'</td>'+
      '</tr>');    

    $('table> tbody:last').append($row);
}; 



