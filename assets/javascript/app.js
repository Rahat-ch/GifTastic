//still need to do:
//if user wants to add another button they can do so on the form and hit add button which will push the user input into the array and display this as a new button
//click events for all buttons
// once clicked ajax gets the info from giphy api to display ten images
//when images are displayed add in some random info and a download link for the gify
// when images display the are static - when you click on them they will be swapped from static gifs into working gifs
//grab the api link with a


//jquery will run once the document is ready
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
      $("#buttonDisplay").append(carButton);

    }
  };

  //create all buttons when page loads
  window.onload = printButtons();

  function gifDisplay() {

  };

  //click function for all of the dynamically created buttons - after clicking ten stil gifs append to the gifArea
  $(document).on('click', '.gifButtons', function() {
    $("#gifArea").empty();
    var carName = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carName + "&api_key=RSiqdQSgdinLvFRhZoh4VVKeQy9gotru&limit=10";
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

  //add new buttons from user input



  $('#addCar').click(function(e) {
    e.preventDefault();
    var newButton = $("input").val();
    car.push(newButton);
    $("#buttonDisplay").empty();
    printButtons();
    $('#addCarForm').find('input:text').val('');
  });


});
