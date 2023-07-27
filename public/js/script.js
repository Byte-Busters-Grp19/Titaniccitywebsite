let cartItems = [];
let cartTotal = 0;

function addItemToCart(itemName, price) {
  cartItems.push({ itemName, price });
  cartTotal += price;
  updateCart();
  scrollToCart();
}
function scrollToCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.scrollIntoView({ behavior: "smooth" });
}
function removeItemFromCart(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  cartTotal -= removedItem.price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  cartList.innerHTML = "";
  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.itemName} - GHS ${item.price}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeItemFromCart(index);
    li.appendChild(removeButton);
    cartList.appendChild(li);
  });
  cartTotalElement.textContent = cartTotal;
}

const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
        //Redirect the user to the payment page
        window.location.href = 'payment processors.html';
    });