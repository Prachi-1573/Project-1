// Function to handle 'Add to Cart' action
function addToCart() {
    const quantity = document.getElementById("quantity").value;
    const bookTitle = document.querySelector(".book-info h1").innerText;
    const bookPrice = document.querySelector(".current-price").innerText.replace('₹', '');
    
    // Validate quantity input
    if (quantity <= 0 || isNaN(quantity)) {
      alert("Please enter a valid quantity.");
      return;
    }
  
    // Logic to store book info in localStorage (or sessionStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingBookIndex = cart.findIndex(item => item.title === bookTitle);
    
    if (existingBookIndex >= 0) {
      // Update quantity if book already in the cart
      cart[existingBookIndex].quantity += parseInt(quantity);
    } else {
      // Add new book to cart
      cart.push({ title: bookTitle, price: bookPrice, quantity: parseInt(quantity) });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Book added to cart!");
  }
  
  // Function to handle 'Add to Wishlist' action
  function addToWishlist() {
    const bookTitle = document.querySelector(".book-info h1").innerText;
    const bookPrice = document.querySelector(".current-price").innerText.replace('₹', '');
    
    // Logic to store book info in localStorage (or sessionStorage)
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const existingBookIndex = wishlist.findIndex(item => item.title === bookTitle);
    
    if (existingBookIndex >= 0) {
      alert("Book already in wishlist!");
    } else {
      wishlist.push({ title: bookTitle, price: bookPrice });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert("Book added to wishlist!");
    }
  }
  
  // Function to handle review submission
  function submitReview() {
    const reviewText = document.querySelector("#review-text").value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
  
    if (!reviewText || !rating) {
      alert("Please provide a review text and select a rating.");
      return;
    }
  
    // Collect the review data
    const review = {
      text: reviewText,
      rating: rating
    };
  
    // Store the review in localStorage (for the specific book)
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
  
    alert("Review submitted!");
  }
  
  // Event listeners for button clicks
  document.querySelector('.add-to-cart').addEventListener('click', addToCart);
  document.querySelector('.wishlist').addEventListener('click', addToWishlist);
  document.querySelector('.submit-review').addEventListener('click', submitReview);
  
