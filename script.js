document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links'); // Assuming this is ul.nav-links
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Cart Counter & Toast Notification
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountSpan = document.querySelector('.cart-count');
    const toastNotification = document.getElementById('toast-notification');
    let cartItemCount = 0;

    if (cartCountSpan) { // Check if cartCountSpan exists
        if (cartCountSpan.textContent.trim() !== '') { // Initialize from existing number if any
             cartItemCount = parseInt(cartCountSpan.textContent) || 0;
        }
       
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                cartItemCount++;
                cartCountSpan.textContent = cartItemCount;
                
                if (toastNotification) {
                    toastNotification.textContent = "Item added to cart!"; // Default message
                    // Optional: Get item name if available from product card
                    // const card = button.closest('.product-card');
                    // if (card) {
                    //    const productName = card.querySelector('h3 a')?.textContent || card.querySelector('h3')?.textContent;
                    //    if (productName) toastNotification.textContent = `${productName} added to cart!`;
                    // }
                    toastNotification.classList.add('show');
                    setTimeout(() => {
                        toastNotification.classList.remove('show');
                    }, 2500); // Hide after 2.5 seconds
                }
            });
        });
    }

    // Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('product-card--hidden');
                } else {
                    card.classList.add('product-card--hidden');
                }
            });
        });
    });

    // Dropdown Menu for Apparel (and other future dropdowns)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a[aria-controls]'); // Target links that control a dropdown
        if (link) {
            link.addEventListener('click', function(e) {
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
                    e.preventDefault();
                    const isOpen = this.parentElement.classList.toggle('open');
                    this.setAttribute('aria-expanded', isOpen);
                }
            });
        }
    });
    // Close dropdown if clicking outside
    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            // If the click is not inside the dropdown and the dropdown is open
            if (!dropdown.contains(e.target) && dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                const controlLink = dropdown.querySelector('a[aria-expanded="true"]');
                if (controlLink) {
                    controlLink.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Current Year for Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
