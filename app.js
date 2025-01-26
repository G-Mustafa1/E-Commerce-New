const body = document.querySelector('body');
const store = document.getElementById('store');
const meinCard = document.getElementById('mein-card');
const select = document.getElementById('select');
const quantity = document.querySelector('.quantity');
const card1 = document.querySelector('.cart1');
const tl = document.getElementById('total');
const con = document.getElementById('con');
const uniqueCategory = [];
const products = [];
const cart = JSON.parse(localStorage.getItem('cart')) || [];
// console.log(lg)
const card = document.createElement('div');
card.setAttribute('class', 'cardes')
store.addEventListener('click', () => {
    body.classList.add('active')
})
con.addEventListener('click', () => {
    body.classList.remove('active')
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
               <div class="price"><b>Price:</b> $${item.price}</div>
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
//     console.log(i
// }
function addToCart(itemId) {
    console.log(cart)
    console.log(itemId)
    const product = products.find((item) => {
        return item.id == itemId
    });
    let p = product.title.slice(0,20)
    if(!cart.some((item) => item.id == product.id)){
        cart.push(product);
        console.log(cart)
        localStorage.setItem('cart',JSON.stringify(cart));
        displayCart()
        alert(`${p} Add to cart`)
    }
    else{
        alert(`${p} Chl nikl`)
    }
}
// addToCart()
function displayCart() {
    let loc = JSON.parse(localStorage.getItem('cart')) || [];
    card1.innerHTML = ''
    console.log(loc)
    if(loc.length == 0){
        card1.innerHTML = `<h2>Your cart is empty!</h2>`
    }
    loc.map((item , index) => {
        console.log(index)
        const cart_item = document.createElement('div');
        cart_item.setAttribute('class','cart-item');
        cart_item.innerHTML = `
        <div class="div">
            <img src="${item.image}" alt="">
            <div>
               <h6>${item.title.slice(0,20)}</h6>
               <h6>${item.category}</h6>
               <h6>$${item.price}</h6>
            </div>
               <div>
                  <button onclick="removeItem('${index}')" class="btn btn-danger">Remove</button>
              </div>
            </div>
        `
        card1.appendChild(cart_item)
    })
    quantity.textContent = `${loc.length}`
    const total = loc.reduce((acc , curr) => {
        return acc + curr.price
    },0)
    tl.textContent = `Item(${loc.length}) $${total.toFixed(2)}`;
}

function removeItem(id){
    const loc = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(loc)  
    loc.splice(id,1);
    localStorage.setItem('cart',JSON.stringify(loc))
    displayCart()
}

ecommerce()
displayCart()

// window.onload(addToCart)


