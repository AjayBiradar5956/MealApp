var category = document.querySelector('#category');
var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var mealNames = [];
let input = document.getElementById('input');
let mealList = document.getElementById('list');
let favList = document.querySelector('.fav-list');
let selectedName = document.querySelector('.selectMeal');


//GET THE CATEGORIES - DISPLAYED ON HOMEPAGE
var xhr1 = new XMLHttpRequest;
xhr1.open('get', 'https://www.themealdb.com/api/json/v1/1/categories.php', true);
xhr1.onload = function () {
    var response1 = JSON.parse(xhr1.response);
    for (let i = 0; i < response1.categories.length; i++) {
        var cat = document.createElement('li');
        cat.innerHTML = `
        <li>
        <img src="${response1.categories[i].strCategoryThumb}" alt="">
        <p class="cat-name">${response1.categories[i].strCategory}</p>
    </li>
        `;
        category.append(cat);
    }
}
xhr1.send();

//GET ALL THE NAMES OF THE MEALS
for (let i = 0; i < alpha.length; i++) {
    let xhr = new XMLHttpRequest();
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + alpha[i];
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            if (xhr.responseText) {
                var response = JSON.parse(xhr.response);
                meals = response.meals;
                if (meals != null) {
                    for (let j = 0; j < meals.length; j++) {
                        mealNames.push(meals[j].strMeal);
                    }
                }
            } else {
                console.log('Empty response for URL:', url);
            }
        } else {
            console.log('Request failed for URL:', url);
        }
    };
    xhr.send();
}

//SUGGESTIONS
input.addEventListener('keyup', () => {
    let result = [];
    let answer = input.value;
    if (answer.length) {
        result = mealNames.filter((item) => {
            return item.toLowerCase().includes(answer.toLowerCase());
        });
    }
    renderResult(result);
});

function renderResult(result) {
    if (!result.length) {
        return list.classList.add("hide");
    }
    let content = result.map((item) => {
        return `<li id="${item}"><a href="meals.html" class="selectMeal">${item}</a><button class="item-name"><i class="fa-solid fa-heart"></i></button></li>
        <hr>`;
    }).join('');
    list.classList.remove("hide");
    mealList.innerHTML = content;
}


//FAVORITE DISH SECTION

// Favorites array to store selected meal names
var favorites = getFavorites();

function getFavorites() {
    var favoriteString = localStorage.getItem('favorites');
    if (favoriteString) {
        return JSON.parse(favoriteString);
    } else {
        return [];
    }
}

function renderFavoriteMeal() {
    favList.innerHTML = '';
    favorites.forEach((meal) => {
        let favitem = document.createElement('li');
        favitem.innerHTML = `
    
                    <div id="fav-list-div">
                        <span><i class="fa-regular fa-hand-point-right "></i></span>
                        <span class="ms-3">${meal}</span>
                    </div>
                `;
        favList.append(favitem);
    })
}
// Function to toggle favorites
function toggleFavorite(mealName) {
    var index = favorites.indexOf(mealName);
    if (index > -1) {
        // Remove from favorites if already added
        // favorites.splice(index, 1);
        return;
    } else {
        // Add to favorites if not already added
        favorites.push(mealName);
        renderFavoriteMeal();
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Event delegation to handle click on heart button
mealList.addEventListener('click', function (event) {
    if (event.target.matches('.fa-heart')) {
        event.stopPropagation();
        var listItem = event.target.closest('li');
        var mealName = listItem.id;
        toggleFavorite(mealName);
        event.target.classList.toggle('active');
    }
    else if (event.target.matches('.selectMeal')) {
        var listItem = event.target;
        var mealName = listItem.innerText;
        // Store the selected meal in localStorage
        localStorage.setItem('selectedMeal', mealName);
    }
});
renderFavoriteMeal();







