const body = document.querySelector('body');
const store = document.getElementById('store');
const meinCard = document.getElementById('mein-card');
const select = document.getElementById('select');
const card1 = document.querySelector('.cart1');
const uniqueCategory = [];
const cart = [];
const products = [];
const card = document.createElement('div');
card.setAttribute('class', 'cardes')
store.addEventListener('click', () => {
    body.classList.add('active')
})
async function ecommerce() {
    const api = await fetch('https://fakestoreapi.com/products');
    const apiData = await api.json();
    products.push(...apiData); 
    console.log(apiData);

    const product = apiData.map((item) => {
        if (!uniqueCategory.includes(item.category)) {
            const option = document.createElement('option');
            // option.setAttribute('onchange',`categoryFilte`)
            option.textContent = item.category
            option.value = item.category
            uniqueCategory.push(item.category)
            console.log(option)
            select.appendChild(option)
        }

        console.log(item)
        card.innerHTML += `
            <div class="card">
               <img src="${item.image}" alt="">
               <div class="titel"><b>Titel:</b> ${item.title.slice(0, 20)}</div>
               <div class="price"><b>Price:</b> ${item.price}</div>
               <div class="catagery"><b>Category:</b> ${item.category}</div>
               <div class="pm" style="display: flex; justify-content: space-between;">
                  <div class="rate"><b>Rate:</b> ${item.rating.rate}</div>
                  <div class="count"><b>Count:</b> ${item.rating.count}</div>
               </div>
                <div class="btns d-flex justify-content-center">
               <button onclick="addToCart(${item.id})" class="btn btn-primary">Add to cart</button> 
               </div> 
               </div>
               `
        meinCard.appendChild(card)
    })
}

// function addToCart(id){
//     console.log(id)
// }

function addToCart(itemId) {
    // Add product to cart
    const product = products.find((item) => item.id === itemId);
    if (product) {
        cart.push(product);
        displayCart()
        console.log(cart)
        // alert(`${products.image} has been added to the cart!`);
    }
}

function displayCart() {
    
    cart.map((item, index) => {
        console.log(item)
        const div = document.createElement('div');
        div.setAttribute('class', 'cart-item');
        div.innerHTML = `
            <div class="div">
            <img src="${item.image}" alt="">
            <div>${item.title} - $${item.price}</div>
            <button onclick="removeFromCart(${index})" class="btn btn-danger">Remove</button>
            </div>
        `;
        card1.appendChild(div);
    });

    // Show total items and price
    // const total = cart.reduce((sum, item) => sum + item.price, 0);
    // const totalDiv = document.createElement('div');
    // totalDiv.setAttribute('class', 'cart-total');
    // totalDiv.innerHTML = `<b>Total Items:</b> ${cart.length} | <b>Total Price:</b> $${total.toFixed(2)}`;
    // cartDisplay.appendChild(totalDiv);
}

ecommerce()



