var allMenus = [];
var orderItem = [];

function loadAllMenus() {

    $.ajax({
        url: "https://raw.githubusercontent.com/shaileshyadav24/menu.json/main/menu.json",
        success: function (result) {
            allMenus = JSON.parse(result);
            const element = document.getElementById("menuList");
            for (var i = 0; i < allMenus.length; i++) {
                allMenus[i].selectedCount = 0;
                element.innerHTML +=
                    "<div class='item-details' id='" + allMenus[i].Id + "Items'></div>"
                renderCount(allMenus[i]);
            }
            if (window.localStorage.getItem("order")) {
                orderItem = JSON.parse(window.localStorage.getItem("order"));
                orderItem.forEach(function (data) {
                    renderCount(data);
                });
                renderOrder();
            }
        }
    })
}

function increaseQuantity(menu) {
    if (menu.Available > menu.selectedCount) {
        menu.selectedCount++;
        var itemFound = false;
        orderItem.forEach(function (item) {
            if (menu.Id === item.Id) {
                item.selectedCount = menu.selectedCount;
                itemFound = true;
            }
        });
        if (!itemFound) {
            orderItem.push(menu);
        }
        renderCount(menu);
        renderOrder();
    } else {
        alert("Maximum quantity available to order reached.");
    }
}

function decreaseQuantity(menu) {
    if (menu.selectedCount > 0) {
        menu.selectedCount--;
        var idx = -1;
        orderItem.forEach(function (item, index) {
            if (menu.Id === item.Id) {
                item.selectedCount = menu.selectedCount;
                idx = index;
            }
        });
        if (orderItem[idx].selectedCount === 0) {
            orderItem.splice(idx, 1);
        }
        renderCount(menu);
        renderOrder();
    }
}

function renderCount(menu) {
    document.getElementById(menu.Id + 'Items').innerHTML =
        "<div class='item-name'><div><b>" + menu.Title + "</b> <span class='rating-label'>Ratings: " + menu.Ratings + "</span></div><div style='font-size:12px'>" + menu.Description + "</div></div>" +
        "<div class='item-price'>$" + menu.Price + "</div>" +
        (menu.Available > 0 ? "<div class='item-button'>	<div class='qty'><span onclick='decreaseQuantity(" + JSON.stringify(menu) + ")' class='minus bg-dark'>-</span><input id='" + menu.Id + "Count' type='number' class='count quantity' name='qty' value='" + menu.selectedCount + "'><span onclick='increaseQuantity(" + JSON.stringify(menu) + ")' class='plus bg-dark'>+</span></div></div>" : "<div class='item-button'>Not available</div>");
}

function renderOrder() {
    const element = document.getElementById("orderList");
    const final = document.getElementById('finalOrderRate');
    element.innerHTML = "";
    final.innerHTML = "";
    if (orderItem.length > 0) {
        orderItem.forEach(function (data) {
            element.innerHTML += "<div class='item-details' id='" + data.Id + "OrderItems'></div>";
            renderOrderCount(data);
        });
        renderTotalQuantity(final);
    }
}

function renderOrderCount(menu) {
    document.getElementById(menu.Id + 'OrderItems').innerHTML =
        "<div class='order-name'><b>" + menu.Title + "</b></div>" +
        "<div class='order-price padd0'>" + menu.selectedCount + "</div>" +
        "<div class='order-button'>$ " + menu.Price * menu.selectedCount + "</div>";
}

function renderTotalQuantity(element) {
    var totalOrder = 0;
    orderItem.forEach(function (data) {
        totalOrder += data.selectedCount * data.Price;
    });
    const discount = totalOrder > 1000 ? 30 : (totalOrder <= 1000 && totalOrder > 80 ? 20 : 5);
    const finalRate = totalOrder - (totalOrder * discount / 100);
    element.innerHTML =
        "<div class='item-details'>" +
        "<div class='discount-name'>Quantity: " + orderItem.length + "</div>" +
        "<div class='discount-price padd0'>Discount: " + discount + "%</div>" +
        "<div class='discount-button padd0'><div>Total: $ " + totalOrder + "</div><div>Final: $ " + finalRate + "</div></div>" +
        "</div>" +
        "<div><button onclick='submitFinalOrder()' class='w-100 btn btn-lg text-light bg-dark'>Order</button></div>"

}

function submitFinalOrder() {
    var ask = confirm("Are you want to finalize order?");
    if (ask) {
        window.location.href = "order-final.html";
        window.localStorage.setItem("order", JSON.stringify(orderItem));
    }
}


function logoutUser() {
    var ask = confirm("Are you sure want to logout?");
    if (ask) {
        window.localStorage.removeItem("order");
        window.localStorage.removeItem("loggedInStatus");
        window.location.href = "index.html";
    }
}