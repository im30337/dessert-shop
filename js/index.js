//cart
// $(document).ready(function () {
//     $('img[src$=".svg"]').each(function () {
//         var $img = jQuery(this);
//         var imgURL = $img.attr('src');
//         var attributes = $img.prop("attributes");

//         $.get(imgURL, function (data) {
//             // Get the SVG tag, ignore the rest
//             var $svg = jQuery(data).find('svg');

//             // Remove any invalid XML tags
//             $svg = $svg.removeAttr('xmlns:a');

//             // Loop through IMG attributes and apply on SVG
//             $.each(attributes, function () {
//                 $svg.attr(this.name, this.value);
//             });

//             // Replace IMG with SVG
//             $img.replaceWith($svg);
//         }, 'xml');
//     });
// });
$(function () {
    var productsRef = db.collection("dessert-products");
    var cart;
    if (localStorage.getItem("sweetasteCart") == undefined) {
        cart = {};
    } else {
        cart = JSON.parse(localStorage.getItem("sweetasteCart"));
        //cartItemCount(cart);
    }
    cartItemCount(cart);
    //繪製產品資料
    productsRef.get().then(function (data) {
        for (var index = 0; index < 3; index++) {
            var product = data.docs[index].data();
            var productId = data.docs[index].id;
            console.log(product);
            //建立顯示產品的模板
            var template = `            
                        <div class="cartbox1 col-md-4">
                            <div class = "product-img" style = "background-image:url(${product.imgUrl})" >
                                <div class="product-tag">
                                    <span>本日精選</span>
                                </div>
                            </div>
                            <div class="product-info">
                                <div class="name"><span>${product.name}</span></div>
                                <div class="price"><span>NT$${product.price}</span></div>
                                    <div class="add-cart clearfix" product-id="${productId}" ><span>加入購物車</span></div>
                            </div>
                        </div>`;
            //貼到網頁上
            $(".daily-special").append(template);
        }
    });
    //產品Buy按鈕的事件
    $(".daily-special").on("click", ".add-cart", function () {
        var productId = $(this).attr("product-id");
        productsRef.doc(productId).get().then(function (doc) {
            var selectedProduct = doc.data();
            //把使用者要購買的產品放到購物車物件裡
            if (cart[productId] == undefined) {
                cart[productId] = {
                    product: selectedProduct,
                    count: 1
                };
                cartItemCount(cart);
            } else {

                cart[productId].count++;
                cartItemCount(cart);
            }

            //將物件存入localStorage
            localStorage["sweetasteCart"] = JSON.stringify(cart);
            console.log(cart);
        });
        /*
        cart = {
            "iphone7-doc-id":{
                product: {
                    price:24800,
                    name:....
                },
                count:1
            },
            "iphone-doc-id":{
                product:{
                    price:28500,
                    name:....
                },
                count:2
            }
        }
        */
    });

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