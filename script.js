let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


const addButtons = document.querySelectorAll(".add-to-cart");

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

const sendOrderButton =
    document.querySelector(".send-order");



/* إضافة منتج إلى السلة */

addButtons.forEach(button => {

    button.addEventListener("click", function () {

        const productCard =
            this.closest(".product-card");


        const quantityInput =
            productCard.querySelector(".quantity");


        const quantity =
            Number(quantityInput.value);


        const name =
            this.dataset.name;


        const price =
            Number(this.dataset.price);


        const existingProduct =
            cart.find(item => item.name === name);


        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: quantity

            });

        }


        saveCart();

        updateCart();

        alert("تمت إضافة المنتج إلى السلة 🛒");

    });

});



/* تحديث السلة */

function updateCart() {

    if (!cartItems || !cartTotal) return;


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">


                <div class="cart-product">

                    <strong>
                        ${item.name}
                    </strong>


                    <div class="cart-quantity">


                        <button
                            class="decrease-quantity"
                            data-index="${index}">

                            ➖

                        </button>


                        <span>

                            ${item.quantity}

                        </span>


                        <button
                            class="increase-quantity"
                            data-index="${index}">

                            ➕

                        </button>


                    </div>


                </div>



                <div class="cart-price">

                    ${itemTotal}
                    شيكل

                </div>



                <button
                    class="remove-item"
                    data-index="${index}">

                    🗑️ حذف

                </button>


            </div>

        `;

    });



    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>السلة فارغة 🛒</p>";

    }



    cartTotal.textContent = total;


    addCartButtonsListeners();

}



/* أزرار زيادة ونقصان وحذف */

function addCartButtonsListeners() {


    const increaseButtons =
        document.querySelectorAll(
            ".increase-quantity"
        );


    const decreaseButtons =
        document.querySelectorAll(
            ".decrease-quantity"
        );


    const removeButtons =
        document.querySelectorAll(
            ".remove-item"
        );



    increaseButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {


                const index =
                    Number(this.dataset.index);


                cart[index].quantity += 1;


                saveCart();

                updateCart();


            }
        );

    });




    decreaseButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {


                const index =
                    Number(this.dataset.index);


                if (cart[index].quantity > 1) {

                    cart[index].quantity -= 1;

                } else {

                    cart.splice(index, 1);

                }


                saveCart();

                updateCart();


            }
        );

    });




    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {


                const index =
                    Number(this.dataset.index);


                cart.splice(
                    index,
                    1
                );


                saveCart();

                updateCart();


            }
        );

    });


}



/* إرسال الطلب إلى واتساب */

if (sendOrderButton) {

    sendOrderButton.addEventListener(
        "click",
        function () {


            if (cart.length === 0) {

                alert("السلة فارغة 🛒");

                return;

            }


            let message =
                "طلب جديد من موقع شقور إخوان 🛒\n\n";


            let total = 0;



            cart.forEach(item => {


                const itemTotal =
                    item.price * item.quantity;


                total += itemTotal;


                message +=

                    `${item.name}\n` +

                    `العدد: ${item.quantity}\n` +

                    `السعر: ${itemTotal} شيكل\n\n`;

            });



            message +=

                `المجموع الكلي: ${total} شيكل`;



            const phone =
                "970598318424";


            const whatsappUrl =

                `https://wa.me/${phone}?text=` +

                encodeURIComponent(message);



            window.open(
                whatsappUrl,
                "_blank"
            );


        }
    );

}



/* تشغيل السلة عند فتح الصفحة */

updateCart();