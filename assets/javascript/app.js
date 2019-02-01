$('.btn').on("click",function(){
    addToList()
});

function addToList(){
    var $trainName=$('#trainName').val();
    var $destination=$('#destination').val();
    var $firstTrain=$('#firstTrain').val();
    var $frequency=$('#frequency').val();
    var nextArrival = moment().format('HH:mm');
    console.log(nextArrival);
    var $row = $('<tr>'+
      '<td>'+$trainName+'</td>'+
      '<td>'+$destination+'</td>'+
      '<td>'+$frequency+'</td>'+
      '<td>'+$frequency+'</td>'+
      '<td>'+$frequency+'</td>'+
      '</tr>');    

    $('table> tbody:last').append($row);
}; 
