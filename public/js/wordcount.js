var max_count = 40;
$(document).ready(function () {
    var wordCounts = {};

     $("#text").on('keyup', function() {
        var words = this.value.match(/\S+/g).length;
        if (words > max_count) {
            // Split the string on first 200 words and rejoin on spaces
            var trimmed = $(this).val().split(/\s+/, max_count).join(" ");
            // Add a space at the end to keep new typing making new words
            $(this).val(trimmed + " ");
            $('#wordcount').html("No more words!");
        }
        else {
            $('#wordcount').html((40 - words) + " words left");
            //$('#count_left').html(max_count-words);
        }
    });


    }).keyup();
