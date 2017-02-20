register();

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        parseOrder();
        sendResponse({});
    }
);

function register() {
    console.log("register");
    chrome.extension.sendRequest({
            data: "register"
        },
        function(response) {
            console.log(response.data);
        }
    );
}

function parseOrder() {
    var orders = [];
    $(".order-row").each(function () {
        var cells = $(this).find(".order-cell");
        var cellWithHiddenInput = cells.eq(1);
        var cellWithDetail = cells.eq(2);
        var asin = cellWithDetail.find("table tr").eq(1).find("td").eq(1).text();
        if (asin.length > 5) { //ASIN：冒号可能为中文或英文，不是固定值
            asin = asin.substr(5);
            asin = asin.trim();
        }
        orders.push({
            orderId: cellWithHiddenInput.find(".order-id").val(),
            customerId: cellWithHiddenInput.find(".cust-id").val(),
            asin: asin,
        });
    })

    console.log(orders.length, "orders found");

    console.log("request:", JSON.stringify(orders));

    chrome.extension.sendRequest({
            data: orders
        },
        function(response) {
            console.log(response.data);
        }
    );
}
