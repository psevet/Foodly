const menu = () => {
const cardsMenu = document.querySelector('.cards-menu');

const changeTitle = (restaurant) => {
    const restaurantTitle = document.querySelector('.restaurant-title');
    const price = document.querySelector('.price');
    const rating = document.querySelector('.rating');
    restaurantTitle.textContent = restaurant.name;
    price.textContent = `От ${restaurant.price} ₽`;
    rating.textContent = restaurant.stars;
};

const cartArray = localStorage.getItem('cart') ?
 JSON.parse(localStorage.getItem('cart')): [];

const addToCart = (cartItem) => {
    if (cartArray.some((item) => item.id === cartItem.id)) {
        cartArray.map(item => {
            if (item.id === cartItem.id){
                item.count++;
            }
            return item;
        });
    } else {
        cartArray.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
};

const renderIrems = (data) => {
    data.forEach(({description, id, image, name, price}) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card">
                <img src=${image} alt=${name} class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">${description}
                        </div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                    </div>
                </div>
            </div>`;
        card.querySelector('.button-add-cart').addEventListener('click', () => {
            addToCart({ name, price, id, count: 1 });
        });
        cardsMenu.appendChild(card);
    });
};

if (localStorage.getItem('restaurant')) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'));
    changeTitle(restaurant);

    fetch(`../db/${restaurant.products}`)
    .then((response) => response.json())
    .then((data) => renderIrems(data))
    .catch((error) => {
        console.log("Ахтунг, ошибка");
    });
} else {
    window.location.href = "index.html";
}
};
menu();


function search_food() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('card');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}

function try_game() {
    if (confirm(`Не хочете скрасити очікування спробувавши на собі роль кур'єра`)) {
        // Save it!
        window.location = "../NeedForJS/game.html"
      } else {
        // Do nothing!
      }
}