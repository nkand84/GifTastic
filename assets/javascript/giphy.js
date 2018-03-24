$(document).ready(function () {


    var topics = ["Pizza", "Burger", "Cheese", "Ice Cream","Fries", "Chocolate"];

    function renderButtons() {

        $("#btn-content").empty();
        // Loop through the array of food options, then generate buttons for each option in the array
            for (var i = 0; i < topics.length; i++) {
                var buttons = $('<button class="btn button">' + topics[i] + '</button>');
                buttons.attr("data-food", topics[i]);
                buttons.appendTo('#btn-content');
            }
        $(".btn").on("click", function () {
            var food = $(this).attr("data-food");
            console.log(food);
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RFWOSVnoiyhhdqyGIIT8yn5LB0kin2Gn&q=" + food + "&limit=10&offset=0&rating=PG-13&lang=en";
            // empties the gifs before each button is clicked
            $("#gif-content").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                // Step 2: since the image information is inside of the data key,
                // make a variable named results and set it equal to response.data
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    // Make a div with jQuery and store it in a variable named animalDiv.
                    var foodDiv = $("<div class='bottom'>");
                    // Make a paragraph tag with jQuery and store it in a variable named p.
                    var p = $("<p class='text-center style-p'>");
                    // Set the inner text of the paragraph to the rating of the image in results[i].
                    p.text(results[i].rating);
                    // Make an image tag with jQuery and store it in a variable named animalImage.
                    var foodImage = $("<img>");
                    // Set the image's src to results[i]'s fixed_height.url.
                    foodImage.attr("src", results[i].images.fixed_height.url);

                    foodDiv.append(foodImage);

                    foodDiv.append(p);
                    // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
                    $("#gif-content").prepend(foodDiv);

                }

            });

        });

    };
    
    

$("#btn-submit").on("click", function (event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    event.preventDefault();
    // Write code to grab the text the user types into the input field
    var foodInput = $("#food-more").val();
    console.log(foodInput);
    // Write code to add the new food option into the topics array
    topics.push(foodInput);
    // The renderButtons function is called, rendering the list of food buttons
    renderButtons();
    //clear search content
    $("#food-more").val('');
    // =================================================
    var food = $(".btn").val("data-food");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RFWOSVnoiyhhdqyGIIT8yn5LB0kin2Gn&q=" + foodInput + "&limit=10&offset=0&rating=PG-13&lang=en";

    console.log(queryURL);
    // empties the gifs before each button is clicked
    $("#gif-content").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // Step 2: since the image information is inside of the data key,
        // make a variable named results and set it equal to response.data
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            // Make a div with jQuery and store it in a variable named animalDiv.
            var foodDiv = $("<div class='bottom'>");
            // Make a paragraph tag with jQuery and store it in a variable named p.
            var p = $("<p class='text-center style-p'>");
            // Set the inner text of the paragraph to the rating of the image in results[i].
            p.text(results[i].rating);
            // Make an image tag with jQuery and store it in a variable named animalImage.
            var foodImage = $("<img>");
            // Set the image's src to results[i]'s fixed_height.url.
            foodImage.attr("src", results[i].images.fixed_height.url);

            foodDiv.append(foodImage);

            foodDiv.append(p);
            // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
            $("#gif-content").prepend(foodDiv);

        }



    });

});
renderButtons();
});   