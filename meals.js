// Retrieve the selected meal from localStorage
var selectedMeal = localStorage.getItem('selectedMeal');

//Grabbing elements
var cardTitle = document.querySelector('.card-title');
var cardImgTop = document.querySelector('.card-img-top');
var category = document.querySelector('#category');
var tags = document.querySelector('#tags');
var cardText = document.querySelector(".card-text");
var youtube = document.querySelector('.youtube');
var listGroup = document.querySelector('.list-group');

// Check if a meal is selected
if (selectedMeal) {
    // Display the meal details
    cardTitle.innerText = selectedMeal;
} else {
    // No meal selected, display a message
    mealDetails.textContent = 'No meal selected.';
}

//Call to the Meal API
let xhr = new XMLHttpRequest();
let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + selectedMeal;
xhr.open('GET', url, true);
xhr.onload = function () {
    if (xhr.status === 200) {
        if (xhr.responseText) {
            var response = JSON.parse(xhr.response);
            dishDetails(response)
            mainIngredient(response);
        } else {
            console.log('Empty response for URL:', url);
        }
    } else {
        console.log('Request failed for URL:', url);
    }
};
xhr.send();

//Common Details of the Dish
function dishDetails(response) {
    cardImgTop.setAttribute("src", response['meals'][0]['strMealThumb']);
    category.innerHTML = `<b>Category</b>: ${response['meals'][0]['strCategory']} &nbsp || &nbsp <b>Area: ${response['meals'][0]['strArea']}</b>`;
    tags.innerHTML = `<b>Tags</b>: ${response['meals'][0]['strTags']}`;
    cardText.innerText = response['meals'][0]['strInstructions'];
    youtube.setAttribute('href', response['meals'][0]['strYoutube']);
    youtube.setAttribute('target', "_blank");
}

//Main Ingredients of the Dish
function mainIngredient(response) {
    for (let i = 0; i < 20; i++) {
        let ingredient = response['meals'][0]['strIngredient' + i];
        if (ingredient != null && ingredient != "") {
            let item = document.createElement('li');
            item.innerHTML = `<li class="list-group-item">${ingredient}</li>`;
            listGroup.append(item);
        }
    }
}