let cart = [];
let products = [
    { id: 1, name: "智能手机", price: 2999, image: "iphone.avif" },
    { id: 2, name: "笔记本电脑", price: 5999, image: "laptop.jfif" },
    { id: 3, name: "智能手表", price: 1599, image: "watch.jfif" }
];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>¥${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">加入购物车</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({...product, quantity: 1});
        }
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} - ¥${item.price.toFixed(2)} x ${item.quantity}</span>
            <div class="quantity-controls">
                <button onclick="adjustQuantity(${item.id}, -1)">-</button>
                <button onclick="adjustQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `总计: ¥${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function adjustQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCart();
    }
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const paymentCode = document.getElementById('payment-code');
    const showPaymentCodeButton = document.getElementById('show-payment-code');
    
    checkoutItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - ¥${item.price.toFixed(2)} x ${item.quantity}`;
        checkoutItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });
    
    checkoutTotal.textContent = `总计: ¥${total.toFixed(2)}`;
    paymentCode.style.display = 'none';
    showPaymentCodeButton.style.display = 'block';
    modal.style.display = 'block';
}

function showPaymentCode() {
    document.getElementById('payment-code').style.display = 'block';
    document.getElementById('show-payment-code').style.display = 'none';
}

function confirmPayment() {
    alert('感谢您的支付！我们将尽快处理您的订单。');
    cart = [];
    updateCart();
    closeModal();
    // 添加以下行来关闭购物车侧边栏
    document.getElementById('cart-sidebar').classList.remove('open');
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
    document.getElementById('show-payment-code').style.display = 'block';
    document.getElementById('payment-code').style.display = 'none';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    document.getElementById('cart-icon').addEventListener('click', toggleCart);
    document.getElementById('checkout-btn').addEventListener('click', openCheckoutModal);
    document.querySelector('.close').addEventListener('click', closeCheckoutModal);
    document.getElementById('show-payment-code').addEventListener('click', showPaymentCode);
    document.getElementById('confirm-payment').addEventListener('click', confirmPayment);
});