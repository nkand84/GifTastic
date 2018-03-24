$(document).ready(function () {

    var topics = ["Pizza","Burger", "Cheese", "Ice Cream", "Fries","Chocolate"];
    var queryURL;

    function renderButtons() {

        $("#btn-content").empty();
        // Loop through the array of food options, then generate buttons for each option in the array
        for (var i = 0; i < topics.length; i++) {
            var buttons = $('<button class="btn button">' + topics[i] + '</button>');
            buttons.attr("data-food", topics[i]);
            buttons.appendTo('#btn-content');
        }

        $(".btn").on("click", function () {
            $("#count-down").hide();
            var food = $(this).attr("data-food");
            console.log(food);
            queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RFWOSVnoiyhhdqyGIIT8yn5LB0kin2Gn&q=" + food + "&limit=10&offset=0&rating=PG-13&lang=en";
            ajaxCall();
        });
    };

    $("#btn-submit").on("click", function (event) {
        $("#count-down").hide();
        // event.preventDefault() prevents submit button from trying to send a form.
        event.preventDefault();
        // Write code to grab the text the user types into the input field
        var foodInput = $("#food-more").val();
        console.log(foodInput);
        // Write code to add the new food option into the topics array
        topics.push(foodInput);
        // The renderButtons function is called, rendering the list of food buttons
        renderButtons();
        //clear search content in the input field
        $("#food-more").val('');
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RFWOSVnoiyhhdqyGIIT8yn5LB0kin2Gn&q=" + foodInput + "&limit=10&offset=0&rating=PG-13&lang=en";
        ajaxCall();

    });

    renderButtons();

    // AJAX request function
    function ajaxCall() {
        // empties the gifs before each button is clicked
        $("#gif-content").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                // Make a div 
                var foodDiv = $("<div class='bottom'>");
                // Make a paragraph tag 
                var p = $("<p class='text-center style-p'>");
                // Set the inner text of the paragraph to the rating of the image 
                p.text(results[i].rating);
                // Make an image tag with 
                var foodImage = $("<img class='gif'>");
                // Set the image's src 
                foodImage.attr("src", results[i].images.fixed_height_still.url);
                // two more attributes data-still and data-animate
                foodImage.attr("data-state", "still");
                foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                foodImage.attr("data-animate", results[i].images.fixed_height.url);
                foodDiv.append(foodImage);
                foodDiv.append(p);
                $("#gif-content").prepend(foodDiv);
            }
            // pausing gifs on click
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);
                if (state == "still") {
                    var animateGif = $(this).attr("data-animate");
                    $(this).attr("src", animateGif);
                    $(this).attr("data-state", "animate");
                }
                if (state == "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    };


});