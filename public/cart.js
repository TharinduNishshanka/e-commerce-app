document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/cart')
        .then(response => response.json())
        .then(cart => {
            const cartDiv = document.getElementById('cart');
            const cartTotalDiv = document.getElementById('cart-total');
            let totalCartPrice = 0;

            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                const itemTotalPrice = item.quantity * item.product.price;
                totalCartPrice += itemTotalPrice;

                cartItemDiv.innerHTML = `
                    <h2>${item.product.name}</h2>
                    <img src="${item.product.image}" alt="${item.product.name}" style="width: 100px; height: 100px;">
                    <p>Price: $${item.product.price}</p>
                    <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateCart(${item.product.id}, this.value)"></p>
                    <p>Total Price: $${itemTotalPrice}</p>
                    <button onclick="removeFromCart(${item.product.id})">Remove</button>
                `;
                cartDiv.appendChild(cartItemDiv);
            });

            cartTotalDiv.innerHTML = `<h3>Total Cart Price: $${totalCartPrice}</h3>`;
        });
});

function updateCart(productId, quantity) {
    fetch('/api/cart', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity: parseInt(quantity) })
    }).then(response => {
        if (response.ok) {
            alert('Cart updated');
            location.reload();
        } else {
            alert('Error updating cart');
        }
    });
}

function removeFromCart(productId) {
    fetch('/api/cart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    }).then(response => {
        if (response.ok) {
            alert('Item removed from cart');
            location.reload();
        } else {
            alert('Error removing item from cart');
        }
    });
}
