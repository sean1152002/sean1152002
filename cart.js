document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let html = '<ul>';
        cartItems.forEach(item => {
            html += `<li>${item.name} - $${item.price}</li>`;
        });
        html += '</ul>';
        cartItemsContainer.innerHTML = html;
    }
}