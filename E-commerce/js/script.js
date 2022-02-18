// Show Product Detail
const productList = document.querySelectorAll('.product-list');
const modalImg = document.querySelector('.modal-img');
const detailTitle = document.querySelector('.detail-title');
const detailPrice = document.querySelector('.detail-price');

productList.forEach(product => {
    const img = product.querySelector('.product-img').getAttribute('src');
    const titleProduct = product.querySelector('.title-product').innerHTML;
    const priceProduct = product.querySelector('.price-product').innerHTML;
    const view = product.querySelector('.option-product');

    view.addEventListener('click', () => {
        modalImg.setAttribute('src', img);
        detailTitle.innerHTML = titleProduct;
        detailPrice.innerHTML = priceProduct;
    });
});
// end Show Product Detail

// choice Size product in Product Detail
const btnSize = document.querySelectorAll('.button-size');
btnSize.forEach(button => {
    button.addEventListener('click', function () {
        btnSize.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});
// end choice Size product in Product Detail

const cartNumber = function() {
    let value = 0;
    productInCart.forEach(number => {
        value += number.price;
    });
    return value;
}

// Inialization Element in Product Detail 
let productInCart = JSON.parse(localStorage.getItem('shopping'));
if(!productInCart){
	productInCart = [];
}
const parent = document.querySelector('.show-product');
const cartPrice = document.querySelector('.number');
const productRows = document.querySelectorAll('.product-list');

productRows.forEach(productRow => {
    productRow.addEventListener('click', (e) => {
        if (e.target.classList.contains('addCart')) {
            alert('Successfully!');
            const id = e.target.dataset.id;
            const imgList = productRow.querySelector('.product-img').src;
            const nameList = productRow.querySelector('.title-product').innerHTML;
            const priceList = productRow.querySelector('.price').innerHTML;
            let productToCart = {
                id: id,
                image: imgList,
                name: nameList,
                price: +priceList,
                basePrice: +priceList,
                count: 1
            }
            updateCart(productToCart);
            cartModal();
        }
    });
});
// end Inialization Element in Product Detail 

parent.addEventListener('click', (e) => {
    const minus = e.target.classList.contains('minus');
    const plus = e.target.classList.contains('plus');
    if ( minus || plus ){
        for(let i = 0; i < productInCart.length; i++) {
            if (productInCart[i].id == e.target.dataset.id) {
                if(minus) {
                    productInCart[i].count -= 1;
                } else if(plus) {
                    productInCart[i].count += 1;
                }
                productInCart[i].price = productInCart[i].basePrice * productInCart[i].count;
            }
            if (productInCart[i].count <= 0) {
                productInCart.splice(i, 1);
            }
        }
        cartModal();
    }
});

// push in Array Product
function updateCart(productToCart) {
    for(let i = 0; i < productInCart.length; i++){
        if( productInCart[i].id == productToCart.id ){
            productInCart[i].count += 1;
            productInCart[i].price = productInCart[i].basePrice * productInCart[i].count;
            return;
        }
    }
    productInCart.push(productToCart);
}
// end push in Array Product

// Click Button Cart at Product Detail to Add to Cart
const cartModal = function () {
    localStorage.setItem('shopping', JSON.stringify(productInCart));
    if (productInCart.length > 0) {
        let result = productInCart.map(productToCart => {
            return `
            <tr>
                <td data-th="Product">
                    <div class="row justify-content-center">
                        <div class="col-sm-4">
                            <img src="${productToCart.image}" alt="..." class="img-responsive img-thumbnail" />
                        </div>
                        <div class="col-sm-11">
                            <h5 class="text-uppercase text-center">${productToCart.name}</h5>
                        </div>
                    </div>
                </td>
                <td data-th="Price">${productToCart.basePrice}</td>
                <td data-th="Quantity">
                    <button class="btn btn-outline-dark minus" style="padding: 5px 5px 5px 5px;" data-id="${productToCart.id}">-</button>
                    <span class=""countProduct>${productToCart.count}</span>
                    <button class="btn btn-outline-dark plus" style="padding: 5px 5px 5px 5px;" data-id="${productToCart.id}">+</button>
                </td>
                <td data-th="Size">
                    <div class="input-group border-dark">
                        <select class="custom-select" id="inputGroupSelect02">
                            <option selected>S</option>
                            <option value="1">M</option>
                            <option value="2">L</option>
                            <option value="3">XL</option>
                            <option value="4">XXL</option>
                        </select>
                    </div>
                </td>
                <td data-th="Subtotal" class="text-center">${productToCart.price}</td>
            </tr>
            `
        });
        parent.innerHTML = result.join('');
        cartPrice.innerHTML = 'Rp ' + cartNumber();
        document.querySelector('thead').classList.remove('hidden');
        document.querySelector('.checkout').classList.remove('hidden');
        document.querySelector('.check').addEventListener('click', function(){
            alert('Checkout Successfully ..');
        });
    } else {
        document.querySelector('.checkout').classList.add('hidden');
        document.querySelector('thead').classList.add('hidden');
        parent.innerHTML = '<div class="text-center"><img src="/assets/image/3973481.jpg" class="w-25 img-thumbnail img-responsive"><h4>Your shopping cart is empty</h4></div>';
        cartPrice.innerHTML = '';
    }
}
cartModal();
// end Click Button Cart at Product Detail to Add to Cart