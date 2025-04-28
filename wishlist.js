// Wishlist Functionality Script

// Select necessary elements
const wishlistContainer = document.querySelector('.wishlist-grid');
const totalItemsElement = document.querySelector('.total-items');
const totalValueElement = document.querySelector('.total-value');
const wishlistIcon = document.querySelector('#wishlist-icon i'); // Heart icon
const searchInput = document.querySelector('.wishlist-tools .search-bar');
const sortDropdown = document.querySelector('.sort-dropdown');

// Function to update total items and total value
function updateTotals() {
  const wishlistItems = document.querySelectorAll('.wishlist-item');
  let totalItems = 0;
  let totalValue = 0;

  wishlistItems.forEach((item) => {
    const quantityInput = item.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(item.querySelector('.price').dataset.price);

    totalItems += quantity;
    totalValue += quantity * price;

    // Update individual total price
    item.querySelector('.total-price').textContent = (quantity * price).toFixed(2);
  });

  // Update totals in the UI
  totalItemsElement.textContent = totalItems;
  totalValueElement.textContent = totalValue.toFixed(2);

  // Update heart icon count
  wishlistIcon.dataset.count = totalItems;
}

// Function to handle quantity increase/decrease
function handleQuantityChange(e, isIncrease) {
  const quantityInput = e.target.closest('.quantity-container').querySelector('.quantity-input');
  let quantity = parseInt(quantityInput.value);

  if (isIncrease) {
    quantity++;
  } else if (quantity > 1) {
    quantity--;
  }

  quantityInput.value = quantity;
  updateTotals();
}

// Function to remove an item from the wishlist
function removeItem(e) {
  const item = e.target.closest('.wishlist-item');
  item.remove();
  updateTotals();
}

// Function to search and filter items
function searchItems() {
  const searchQuery = searchInput.value.toLowerCase();
  const wishlistItems = document.querySelectorAll('.wishlist-item');

  wishlistItems.forEach((item) => {
    const title = item.querySelector('h2').textContent.toLowerCase();
    if (title.includes(searchQuery)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Function to sort items
function sortItems() {
  const sortValue = sortDropdown.value;
  const itemsArray = Array.from(document.querySelectorAll('.wishlist-item'));

  itemsArray.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.price').dataset.price);
    const priceB = parseFloat(b.querySelector('.price').dataset.price);
    const nameA = a.querySelector('h2').textContent;
    const nameB = b.querySelector('h2').textContent;

    if (sortValue === 'price-low-high') return priceA - priceB;
    if (sortValue === 'price-high-low') return priceB - priceA;
    if (sortValue === 'name-a-z') return nameA.localeCompare(nameB);
    if (sortValue === 'name-z-a') return nameB.localeCompare(nameA);
  });

  // Reorder items in the DOM
  itemsArray.forEach((item) => wishlistContainer.appendChild(item));
}

// Event listeners
wishlistContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('increase')) {
    handleQuantityChange(e, true);
  } else if (e.target.classList.contains('decrease')) {
    handleQuantityChange(e, false);
  } else if (e.target.classList.contains('remove-btn')) {
    removeItem(e);
  }
});

searchInput.addEventListener('input', searchItems);
sortDropdown.addEventListener('change', sortItems);

// Initialize totals on page load
updateTotals();

