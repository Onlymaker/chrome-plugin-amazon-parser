var bg = chrome.extension.getBackgroundPage();
var rows = 0;

$(window).load(function () {
    displayParseOrderResults();

    $("#parse-order-btn").click(function () {
        bg.notifyParser();
    });
})

function displayParseOrderResults() {
    if (rows < bg.result.length) {
        for (; rows < bg.result.length; rows++) {
            $("#parse-order-table").append('<tr><td>' + bg.result[rows] + '</td></tr>')
        }
    }
    setTimeout(displayParseOrderResults, 2000);
}