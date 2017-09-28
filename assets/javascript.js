$(document).ready(function() {

    // My array
    var topic = ["Chris Farley", "Jim Carrey", "Dave Chappelle", "Will Ferrell", "Jack Black", "Melissa McCarthy", "Steve Carell", "John Belushi"];

    //function that displays the gif buttons
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("funny");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }

    //function to add new button
    function addNewButton() {
        $("#addGif").on("click", function() {
            var funny = $("#topicInput").val().trim();
            if (funny == "") {
                return false;
            }
            topic.push(funny);

            displayGifButtons();
            return false;
        });
    }

    //function to remove last button
    function removeLastButton() {
        $("removeGif").on("click", function() {
            topic.pop(funny);
            displayGifButtons();
            return false;
        });
    }

    // function that displays the gifs
    function displayGifs() {
        var funny = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + funny + "&api_key=6BW6MYjZoS3599iWCNieFPz4wLTIzasP";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })

            .done(function(response) {
                $("#gifsView").empty();
                var results = response.data;
                if (results == "") {
                    alert("Try Again!");
                }
                for (var i = 0; i < results.length; i++) {
                    //put gifs in a div
                    var gifDiv = $("<div1>");
                    //pull rating of gif
                    var gifRating = $("<p>").text("Rating " + results[i].rating);
                    gifDiv.append(gifRating);
                    //pull gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    //paused images
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    //animated images
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    //paused images
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    //add new div to existing divs
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    displayGifButtons();
    addNewButton();
    removeLastButton();

    //event listeners
    $(document).on("click", ".funny", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});