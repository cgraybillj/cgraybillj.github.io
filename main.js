$(function () {
    console.log('Ready!')

    $('#show').text("25")

    $('#limit').mouseup(function () {
        var limit = $('#limit').val();
        $('#show').html(limit)
    });

        $("#search").click(function () {
            var choice = $("input[name='url']:checked").val();
            var apikey = 'qCTweoTLPCLppqQ6z3Wz4z2DBnV0Tfzj';
            var q = $('#q').val();
            var limit = $('#limit').val();
            var rating = $('#rating').val();
            console.log('Clicked!')
            $("#status").text("Searching...")
            $("#output").html("");
            $.ajax({
                url: choice + apikey + '&q=' + q + '&limit=' + limit + '&offset=0&rating=' + rating + '&lang=en',
                method: 'GET',
                success: function (data) {
                    if (q == 0) {
                        alert('-__-                                   -__-                                        -__-\n\n PLEASE INPUT INFO. IN SEARCH BAR AND CLICK SUBMIT!\n\n-__-                                    -__-                                       -__-')
                        $("#status").text("")
                        return false;
                    }
                    $("#status").text('Enjoy ;)!')

                    for (i = 0; i < limit; i++) {
                        var $img = $("<img>");
                        var $div = $("<div>");
                        var $rating = $("<h6>");
                        var gifObj = data.data[i];
                        var gif = gifObj.images;

                        // Image builder object
                        $img.attr({
                            // "width": "200px",
                            src: gif.fixed_height_still.url,
                            "data-animate": gif.fixed_height.url,
                            "data-still": gif.fixed_height_still.url,
                            "data-state": "still",
                            class: "gif"
                        });
                        // $div.attr("id", "gif-" + i);
                        $div.addClass("gif-box");
                        $rating.text("Rating: " + gifObj.rating);
                        $div.append($img, $rating);
                        $("#output").append($div);
                    }

                    $(".gif").on("click", function () {
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                    $("#bottom").html('<a href="#top">Back to top!</a>')

                },
                error: function () {
                    $("#status").text("")
                    alert('Oops!\nSomething went wrong...')
                },
            });

        })
    });
