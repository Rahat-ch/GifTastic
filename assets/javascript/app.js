
$(document).ready(function() {


  //array for all car names
  var car = ["Audi", "Ferrari", "Honda", "Maserati", "Lamborghini"];

  //for loop that creates all of the buttons from the array above

  function printButtons() {
    for (var i = 0; i < car.length; i++) {
      var carButton = $("<button>");
      carButton.addClass("gifButtons");
      carButton.addClass("btn btn-outline-secondary");
      carButton.html(car[i]);
      carButton.attr("data-name", car[i]);
      $("#buttonDisplay").prepend(carButton);

    }
  };

  //create all buttons when page loads
  window.onload = printButtons();

  // function gifDisplay() {
  //
  // };

  //click function for all of the dynamically created buttons - after clicking ten stil gifs append to the gifArea
  $(document).on('click', '.gifButtons', function() {
    $("#gifArea").empty();
    var carName = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carName + "&api_key=RSiqdQSgdinLvFRhZoh4VVKeQy9gotru&limit=10";
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" +carName;
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {

        for (var i = 0; i < response.data.length; i++) {
          var gifDisplay = $("<div class = 'gifs'>");
          var rating = response.data[i].rating;
          var ratingDisplay = $("<p>");
          ratingDisplay.html('Rating: ' + rating);
          var still = response.data[i].images.fixed_height_still.url;
          var moving = response.data[i].images.fixed_height.url;
          var img = $("<img>");
          img.attr("src", still);
          img.attr("data-still", still);
          img.attr("data-moving", moving);
          img.attr("data-state", "still");
          img.addClass('carGifs');
          gifDisplay.append(ratingDisplay);
          gifDisplay.append(img);
          $("#gifArea").prepend(gifDisplay);
        }

      })


        //for some reason can't use ajax for this api - not sure why - another classmate ran into this same issue - we eventually found the getjson funciton on stack overflow would be awesome if you can lave something in the comment about why this wouldn't work with ajax the wikipedia api documention was no help
        $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + carName, function(data) {
                    summaryExtract = data.extract;
                    console.log(summaryExtract);
                    $("#info").html(summaryExtract); //where the summary is shown on the page
           });
        });



  //make gifs animate with click
  $(document).on('click', '.carGifs', function() {
    var imgState = $(this).attr('data-state')
    if (imgState == 'still') {
      $(this).attr('src', $(this).data('moving'));
      $(this).attr('data-state', 'moving');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  });

  //prevent submit button from working if there is no input

  function disableSubmit(){
    $('#addCar').prop('disabled',true);
    $('#carInput').keyup(function(){
        $('#addCar').prop('disabled', this.value == "" ? true : false);
    })
  };

  disableSubmit();
  //add new buttons from user input

  $('#addCar').click(function(e) {
    e.preventDefault();
    var newButton = $("input").val();
    car.push(newButton);
    $("#buttonDisplay").empty();
    printButtons();
    $('#addCarForm').find('input:text').val('');
    disableSubmit();
  });





});
