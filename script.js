// Global Cart Array
let cart = [];

// Load cart from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    if (localStorage.getItem('freshlinkCart')) {
        cart = JSON.parse(localStorage.getItem('freshlinkCart'));
    }
    updateCartCount();

    // Contact Form Validation
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            if (name.length < 3) {
                alert("Please enter a valid full name (minimum 3 characters)");
                e.preventDefault();
                return false;
            }
            alert("✅ Thank you! Your message has been received. FreshLink Team will contact you soon.");
        });
    }
});

// Add item to cart
function addToCart(itemName, price) {
    cart.push({ 
        name: itemName, 
        price: price 
    });
    
    // Save to localStorage so it persists between pages
    localStorage.setItem('freshlinkCart', JSON.stringify(cart));
    
    updateCartCount();
    alert(`${itemName} has been added to your cart!`);
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Show Cart Modal
function showCart() {
    const cartBody = document.getElementById('cart-items');
    if (!cartBody) return;

    cartBody.innerHTML = '';

    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
    } else {
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            cartBody.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <strong>${item.name}</strong>
                    </div>
                    <div>
                        <span class="text-success">P${item.price}</span>
                    </div>
                </div>`;
        });

        cartBody.innerHTML += `
            <hr>
            <div class="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span class="text-success">P${total}</span>
            </div>`;
    }

    // Show modal
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Checkout function
function checkout() {
    if (cart.length > 0) {
        alert("🎉 Thank you for shopping with FreshLink Trade Hub!\n\nThis is a demo website. In a real app, payment would be processed here.");
        cart = [];
        localStorage.removeItem('freshlinkCart');
        updateCartCount();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        if (modal) modal.hide();
    }
}