document.getElementById("current-year").textContent = new Date().getFullYear();

// Search
$(document).ready(function () {
    $("#btn-random").click(function () {
        window.open(
            "https://en.wikipedia.org/wiki/Special:Random",
            "_blank",
            "resizable=yes"
        );
    });

    $("#btn-search").click(function () {
        const $searchBackground = $(".search-background");
        const $footer = $(".footer");
        const $wiki = $(".wiki");
        const $wikiArticles = $("#wikiArticles");
        let query = $("#q").val();

        if (query == "") query = "nothing";
        const wikiApiUrl =
            "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
            query +
            "&format=json&callback=?";

        // Remove previous results
        $wikiArticles.text("");

        // Close autocomplete so it's not in the user's way
        $("#q").autocomplete("close");

        $wiki.css("min-height", "80vh");
        $searchBackground.css("background-color", "#eae3ea");
        $searchBackground.css("border-bottom", "1px solid #ccc6cc");
        $searchBackground.css("margin-bottom", "20px");
        $searchBackground.css("margin-top", "0");
        $footer.css("background-color", "#eae3ea");
        $footer.css("border-top", "1px solid #ccc6cc");
        $footer.css("margin-top", "20px");
        $footer.css("padding", "20px 0");

        const wikiRequestTimeout = setTimeout(function () {
            $wikiArticles.text(
                "Sorry, the Wikipedia articles cannot be loaded as your request timed out."
            );
        }, 8000);

        $.ajax({
            dataType: "jsonp",
            url: wikiApiUrl,
            type: "GET",
        })
            .done(function (data) {
                const wikiArticlesLength = data[1].length;

                if (wikiArticlesLength == 0) {
                    $wikiArticles.append(
                        "Sorry, <b>" + query + "</b> returned no results."
                    );
                } else {
                    for (let i = 0; i < wikiArticlesLength; i++) {
                        const articleTitle = data[1][i];
                        const articleSnippet = data[2][i];
                        const articleUrl = data[3][i];
                        $(
                            '<li><h3><a href="' +
                                articleUrl +
                                '" target="_blank" rel="noopener noreferrer">' +
                                articleTitle +
                                '</a></h3><p class="url">' +
                                articleUrl +
                                "</p><p>" +
                                articleSnippet +
                                "</p></li>"
                        ).appendTo($wikiArticles);
                    }
                    $(
                        '<li><h3><a href="https://en.wikipedia.org/w/index.php?title=Special:Search&profile=default&fulltext=1&search=' +
                            query +
                            '" target="_blank" rel="noopener noreferrer">See all search results for <b>' +
                            query +
                            "</b> on Wikipedia...</a></h3></li>"
                    ).appendTo($wikiArticles);
                }
                clearTimeout(wikiRequestTimeout);
            })
            .fail(function () {
                $wikiArticles.text(
                    "Sorry, the Wikipedia articles cannot be loaded as the request failed."
                );
            });
    });
    return false;
});

// Autocomplete
$("#q").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                action: "opensearch",
                format: "json",
                search: request.term,
            },
            success: function (data) {
                response(data[1]);
            },
        });
    },
});
