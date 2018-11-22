$(function () {
    var cart;
    if (localStorage.getItem("sweetasteCart") == undefined) {
        cart = {};
        renderBill();
    } else {
        cart = JSON.parse(localStorage.getItem("sweetasteCart"));
        renderBill();
    }
    cartItemCount(cart);
    $(".cart-list").on("click", ".del-btn", function () {
        //取得要刪除的產品
        var productId = $(this).attr("id");
        //將key從cart物件刪除
        delete cart[productId];
        localStorage["sweetasteCart"] = JSON.stringify(cart);
        renderBill();
        cartItemCount(cart);
    });
    //送出訂單按鈕
    $(".checkout-btn").click(function () {
        alert("訂單已送出");
        cart = {};
        delete localStorage["sweetasteCart"];
        renderBill();
        cartItemCount(cart);
    });

    function renderBill() {

        var total = 0;
        var count = 0;
        console.log(cart);
        $(".cart-list").html("");
        $(".sum").html("");
        if (Object.keys(cart).length === 0) {
            $('.fak-btn').show();
            $(".checkout-btn").hide();
            return 0;
        }
        $('.fak-btn').hide();

        Object.keys(cart).forEach(function (productId) {
            var currentRecord = cart[productId];
            console.log(currentRecord);
            /*console.log(cart);
            console.log(Object.keys(cart));*/
            /*
            var arr = [1,2,3,4];
            arr.forEach(fuction(){
                cart = {
                    "iphone7":...,
                    "iphone8":...
                }
                ["iphone7","iphone8"]
            });
            */
            var cartTemplate = `
            <div class = "cart">
                    <div class="item-detail">
                        <img src="${currentRecord.product.imgUrl}" alt="">
                        <span>${currentRecord.product.name}<br>NT$ ${currentRecord.product.price}</span>
                        <span>${currentRecord.count}</span>
                        <span>NT$ ${currentRecord.product.price * currentRecord.count}</span>
                        <i class="far fa-trash-alt del-btn" id="${productId}"></i>
                    </div>
            </div>`;
            total += currentRecord.product.price * currentRecord.count;
            count += currentRecord.count;
            //累加total count的值


            //貼到購物車表格
            $(".cart-list").append(cartTemplate);
        });
        var billTemplate = `                        
                        <div class="cart-sum">
                            <span>小計</span>
                            <span>NT$ ${total}</span>
                        </div>
                        <div class="freight">
                            <span>運費</span>
                            <span>NT$ 300</span>
                        </div>
                        <div class="bill-sum">
                            <span>總計</span>
                            <span>NT$ ${total+300}</span>
                        </div>`;
        $(".sum").append(billTemplate);
        console.log(count);
        if (count > 0) {
            // $(".checkout-btn").prop("disabled", false);
        } else {
            // $(".checkout-btn").prop("disabled", true);
            console.log('hide');

        }
    }

    function cartItemCount(cart) {
        var count = 0;
        Object.keys(cart).forEach(function (id) {
            count += cart[id].count;
        });
        $("#count-span").text(count);
        if (Object.keys(cart).length == 0) {
            $("#count-span").hide();
        } else {
            $("#count-span").show();
        }
    }
});