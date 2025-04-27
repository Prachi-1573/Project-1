document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items");
  const totalItemsElement = document.querySelector(".cart-summary .subtotal");
  const orderValueElement = document.querySelector(".cart-summary .subtotal:nth-child(2)");
  const taxElement = document.querySelector(".cart-summary .tax");
  const totalAmountElement = document.querySelector(".cart-summary .total-amount");
  const checkoutButton = document.querySelector(".checkout-button");
  const continueShoppingButton = document.querySelector(".contshop");
  const searchBar = document.querySelector(".search-bar input");

  // Retrieve cart items from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  function renderCartItems() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty!</p>";
      updateSummary();
      return;
    }

    cart.forEach((item, index) => {
      const cartItemHTML = `
        <div class="cart-item">
          <img src="https://m.media-amazon.com/images/I/51lMJWnnRDL.jpg" alt="Book Cover" class="book-cover" style="width: 100px; height: auto;">
          <div class="item-details">
            <h2><b>${item.title}</b></h2>
            <p><b>Author:Fyodor Dostoevsky</b></p>
          </div>
          <div class="rate">
            <p style="font-size: 20px;">
              <span class="font-weight-bold">
                <span class="actual price">₹90</span>
              </span>
              <span class="maxprice" style="margin-left: 10px; color: gray;">
                <label>
                  <del>₹190</del>
                </label>
              </span>
            </p>
          </div>
          <div class="item-price-quantity">
            <p><b>Quantity:</b> <input type="number" value="${item.quantity}" class="quantity-input" data-index="${index}" style="width: 50px; text-align: center;"></p>
            <p style="color: #bc2f2f; margin-top: 10px;">Total price: ₹${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <div class="button-container">
            <button class="Wishlist-button" data-index="${index}">Move to Wishlist</button>
            <button class="Remove-button" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
      cartContainer.innerHTML += cartItemHTML;
    });

    updateSummary();
  }

  function updateSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const orderValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = orderValue * 0.1;
    const totalAmount = orderValue + tax;

    totalItemsElement.textContent = totalItems;
    orderValueElement.textContent = `₹${orderValue.toFixed(2)}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
  }

  cartContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("Remove-button")) {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    }

    if (event.target.classList.contains("Wishlist-button")) {
      const index = event.target.dataset.index;
      const item = cart.splice(index, 1)[0];
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    }
  });

  cartContainer.addEventListener("input", (event) => {
    if (event.target.classList.contains("quantity-input")) {
      const index = event.target.dataset.index;
      const quantity = parseInt(event.target.value);
      if (quantity > 0) {
        cart[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      } else {
        alert("Quantity must be at least 1");
        event.target.value = cart[index].quantity;
      }
    }
  });

  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Proceeding to checkout...");
      // Redirect to checkout page or handle payment integration
    }
  });

  continueShoppingButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Update with your homepage URL
  });

  searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCart = cart.filter(
      (item) => item.title.toLowerCase().includes(searchTerm) || item.author.toLowerCase().includes(searchTerm)
    );
    if (searchTerm) {
      cart = filteredCart;
    } else {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    renderCartItems();
  });

  renderCartItems();
});
