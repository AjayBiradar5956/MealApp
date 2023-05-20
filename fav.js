var listGroup = document.querySelector('.list-group');

//Get Favorites from Local Storage
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
    listGroup.innerHTML = '';
    favorites.forEach((meal) => {
        pageLayout(meal);
    })
}

function pageLayout(meal) {
    let favitem = document.createElement('li');
    favitem.setAttribute('id', meal);

    favitem.classList.add('favItem');
    favitem.innerHTML = `
        <span class="details">
            <p style="margin-bottom: 0;">${meal}</p>
        </span>
        <span class="delete" id=${meal}>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </span>
                `;
    let hrule = document.createElement('hr');
    listGroup.append(favitem, hrule);
}
renderFavoriteMeal();

//Delete Operation
listGroup.addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.matches('.fa-solid') || event.target.matches('.delete-btn')) {
        let mealName = event.target.closest('li').id;
        let valueToRemove = mealName;
        favorites = favorites.filter(function (item) {
            return item !== valueToRemove;
        });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavoriteMeal();
    }
});

