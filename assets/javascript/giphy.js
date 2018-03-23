$(document).ready(function () {


    var topics = ["Pizza", "Burger", "Fries", "Burrito", "Enchilada", "Cheese", "Ice cream", "Wings"];

    function renderButtons() {

        $("#btn-content").empty();
        // Loop through the array of food options, then generate buttons for each movie in the array
        for (var i = 0; i < topics.length; i++) {
            var buttons = $('<button class="btn button">' + topics[i] + '</button>')
            buttons.appendTo('#btn-content');
        }
    }
    $("#btn-submit").on("click", function (event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        event.preventDefault();
        // Write code to grab the text the user types into the input field
        var foodInput = $("#food-more").val();
        console.log(foodInput);
        // Write code to add the new food option into the topics array
        topics.push(foodInput);
        // The renderButtons function is called, rendering the list of movie buttons
        renderButtons();
    });

    renderButtons();







});