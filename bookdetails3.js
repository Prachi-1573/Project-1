// Search Bar Functionality
function searchBooks() {
    const searchQuery = document.querySelector('.search-bar input').value.toLowerCase();
    alert(`Search for: ${searchQuery}`);
}
/*add to cart functionality*/
// Add to Cart Functionality
document.addEventListener("DOMContentLoaded", function () {
    // Locate elements based on your HTML structure
    const addToCartBtn = document.querySelector(".add-to-cart"); // Add to Cart button
    const bookTitleElement = document.querySelector(".book-info h1"); // Book title
    const bookPriceElement = document.querySelector(".current-price"); // Book price
    const quantityDropdown = document.querySelector("#quantity"); // Quantity dropdown

    // Function to get the cart from local storage
    function getCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart;
    }

    // Function to save the cart to local storage
    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Function to add an item to the cart
    function addToCart(bookTitle, bookPrice, bookQuantity) {
        const cart = getCart();

        // Check if the book already exists in the cart
        const existingBookIndex = cart.findIndex((item) => item.title === bookTitle);

        if (existingBookIndex > -1) {
            // Update the quantity of the existing book
            cart[existingBookIndex].quantity += bookQuantity;
        } else {
            // Add a new book to the cart
            const bookItem = {
                title: bookTitle,
                price: parseFloat(bookPrice.replace("₹", "")), // Convert price to number
                quantity: bookQuantity,
            };
            cart.push(bookItem);
        }

        // Save the updated cart to local storage
        saveCart(cart);

        // Notify the user
        alert(`${bookTitle} (Quantity: ${bookQuantity}) has been added to your cart.`);
    }

    // Event listener for the "Add to Cart" button
    addToCartBtn.addEventListener("click", function () {
        const bookTitle = bookTitleElement.textContent.trim(); // Get the book's title
        const bookPrice = bookPriceElement.textContent.trim(); // Get the book's price
        const bookQuantity = parseInt(quantityDropdown.value); // Get the selected quantity

        // Validate the input
        if (isNaN(bookQuantity) || bookQuantity <= 0) {
            alert("Please select a valid quantity.");
            return;
        }

        // Add the book to the cart
        addToCart(bookTitle, bookPrice, bookQuantity);

        // Redirect to shopping cart page (optional)
        window.location.href = "shoppingcart.html";
    });
});

// let cart = [];
// document.querySelector('.add-to-cart').addEventListener('click', () => {
//     const quantity = document.getElementById('quantity').value;
//     cart.push({ title: "White Nights", quantity: parseInt(quantity) });
//     alert(`Added ${quantity} copies of "White Nights" to the cart!`);
// });

// Buy Now Functionality
document.querySelector('.buy-now').addEventListener('click', () => {
    alert('Redirecting to checkout...');
});

// Wishlist Functionality
document.querySelector('.wishlist').addEventListener('click', () => {
    alert('Added "White Nights" to your Wishlist!');
});

// Submit Review Functionality
document.querySelector('.submit-review').addEventListener('click', () => {
    const review = document.querySelector('.reviews textarea').value;
    const selectedStars = [...document.querySelectorAll('.star.selected')].length;
    if (!review) {
        alert('Please write a review!');
        return;
    }
    const reviewContainer = document.createElement('div');
    reviewContainer.innerHTML = `<p>${review}</p><p>Rating: ${selectedStars}★</p>`;
    document.querySelector('.reviews').appendChild(reviewContainer);
    alert('Review submitted!');
});

// Star Rating Functionality
document.querySelectorAll('.star').forEach((star, index) => {
    star.addEventListener('click', () => {
        document.querySelectorAll('.star').forEach((s, i) => {
            s.classList.toggle('selected', i <= index);
        });
    });
});
