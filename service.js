var persistUrl = "";
var parser = {};
var result = [];

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.data == "register") {
            if (parser.tab && parser.tab.id != sender.tab.id) {
                result = [];
            }
            parser = sender;
            sendResponse({data: "ready"});
        } else {
            if (!persistUrl) {
                result.push("Error: persistUrl invalid");
                return sendResponse({data: "success"});
            }

            if (request.data.length == 0) {
                result.push((result.length + 1) + ": " + request.data.length + " orders exported successfully");
                return sendResponse({data: "success"});
            }

            $.post(
                persistUrl,
                {data: JSON.stringify(request.data)},
                function (data) {
                    result.push((result.length + 1) + ": " + request.data.length + " orders exported successfully");
                    return sendResponse({data: "success"});
                })
        }
    });

function notifyParser() {
    chrome.tabs.sendMessage(parser.tab.id, {data: "parse"}, function (response) {});
}