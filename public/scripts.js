document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productsDiv = document.getElementById('products');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}" style="width: 200px; height: 200px;">
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <button onclick="addToCart(${product.id}, 1)">Add to Cart</button>
                `;
                productsDiv.appendChild(productDiv);
            });
        });
});

function addToCart(productId, quantity) {
    fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity })
    }).then(response => {
        if (response.ok) {
            alert('Item added to cart');
        } else {
            alert('Error adding item to cart');
        }
    });
}

