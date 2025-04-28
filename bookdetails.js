// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Add to Cart functionality
    const addToCartButton = document.querySelector(".add-to-cart");
    const quantitySelect = document.getElementById("quantity");

    addToCartButton.addEventListener("click", () => {
        const quantity = quantitySelect.value;
        alert(`Added ${quantity} item(s) of "White Nights" to your cart!`);
    });


    // Buy Now functionality
    const buyNowButton = document.querySelector(".buy-now");

    buyNowButton.addEventListener("click", () => {
        alert("Redirecting you to the checkout page...");
        window.location.href = "/checkout";
    });

    // Add to Wishlist functionality
    const wishlistButton = document.querySelector(".wishlist");

    wishlistButton.addEventListener("click", () => {
        alert("Book added to your wishlist!");
    });

    // Ratings functionality
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            // Reset all stars
            stars.forEach((s, i) => {
                s.classList.toggle("selected", i <= index);
            });
            alert(`You rated this book ${index + 1} star(s)!`);
        });
    });

    // Dynamic Bestsellers Carousel

    const bestsellers = [
        { title: "The Psychology of Money", author: "Morgan Housel", image: "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg" },
        { title: "Rich Dad Poor dad", author: "Robert T.Kiyosaki", image: "https://bookosmia.com/wp-content/uploads/2021/12/Rich-Dad-Poor-Dad.jpg" },
        { title: "Pride and Prejudice", author: "Jane Austen", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/book/5/j/s/pride-prejudice-original-imagm2g8e3dtqzhe.jpeg?q=20&crop=false" },
    ];

    const carousel = document.querySelector(".card-carousel");
    bestsellers.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <p><strong>${book.title}</strong></p>
            <p>${book.author}</p>
        `;
        carousel.appendChild(card);
    });
});

// JavaScript to handle dynamic review submission
document.addEventListener('DOMContentLoaded', () => {
    const submitReviewButton = document.querySelector('.submit-review');
    const reviewTextarea = document.querySelector('textarea');
    const starRating = document.querySelectorAll('.star-rating .star');
    const reviewsSection = document.querySelector('.reviews');

    let selectedRating = 0;

    // Handle star rating selection
    starRating.forEach((star) => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'), 10);
            starRating.forEach((s) => s.classList.remove('selected')); // Remove previous selection
            for (let i = 0; i < selectedRating; i++) {
                starRating[i].classList.add('selected'); // Highlight selected stars
            }
        });
    });

    // Handle review submission
    submitReviewButton.addEventListener('click', () => {
        const reviewText = reviewTextarea.value.trim();

        // Validation: Ensure a rating and review text are provided
        if (selectedRating === 0) {
            alert('Please select a star rating before submitting your review.');
            return;
        }

        if (reviewText === '') {
            alert('Please write a review before submitting.');
            return;
        }

        // Dynamically create a new review block
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `
            <p><strong>Rating:</strong> ${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</p>
            <p>${reviewText}</p>
        `;

        

        // Insert the new review into the reviews section (before the textarea)
        reviewsSection.insertBefore(newReview, reviewTextarea);

        // Clear the input fields after submission
        reviewTextarea.value = '';
        selectedRating = 0;
        starRating.forEach((s) => s.classList.remove('selected'));
        alert('Thank you for your review!');

        // Add delete functionality to the delete button
        const deleteButton = newReview.querySelector('.delete-review');
        deleteButton.addEventListener('click', () => {
            newReview.remove();
            newReview.innerHTML = `
        <p><strong>Rating:</strong> ${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</p>
        <p>${reviewText}</p>
        <button class="delete-review">Delete Review</button>
`;

        });
    });
});
