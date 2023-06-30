$(document).ready(function() {
    // Mengambil data kategori dari API
    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
        method: 'GET',
        success: function(response) {
            var categories = response.categories;
            var categoryList = $('#category-list');

            // Membuat daftar kategori dengan gambar
            categories.forEach(function(category) {
                var categoryItem = $('<div class="category-item"></div>');
                var categoryLink = $('<a></a>').attr('href', 'category-detail.html?category=' + category.strCategory);
                var categoryImage = $('<img>').attr('src', category.strCategoryThumb);
                var categoryName = $('<h2></h2>').text(category.strCategory);

                categoryLink.append(categoryImage);
                categoryLink.append(categoryName);
                categoryItem.append(categoryLink);
                categoryList.append(categoryItem);
            });
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });

    // Mendapatkan nilai parameter category dari URL
    var category = new URLSearchParams(window.location.search).get('category');

    // Mengambil data meal berdasarkan kategori dari API
    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category,
        method: 'GET',
        success: function(response) {
            var meals = response.meals;
            var mealList = $('#meal-list');

            // Membuat daftar meal dengan gambar
            meals.forEach(function(meal) {
                var mealItem = $('<div class="meal-item"></div>');
                var mealLink = $('<a></a>').attr('href', 'meals-detail.html?meal=' + meal.idMeal);
                var mealImage = $('<img>').attr('src', meal.strMealThumb);
                var mealName = $('<h2></h2>').text(meal.strMeal);

                mealLink.append(mealImage);
                mealLink.append(mealName);
                mealItem.append(mealLink);
                mealList.append(mealItem);
            });
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });

    // Mendapatkan nilai parameter meal dari URL
    var mealId = new URLSearchParams(window.location.search).get('meal');

    // Mengambil data detail meal berdasarkan mealId dari API
    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId,
        method: 'GET',
        success: function(response) {
            var meal = response.meals[0];
            var mealDetail = $('#meal-detail');

            // Menampilkan gambar meal
            var mealImage = $('<img>').attr('src', meal.strMealThumb);
            mealDetail.append(mealImage);

            // Menampilkan judul/nama meal
            var mealTitle = $('<h2></h2>').text(meal.strMeal);
            mealDetail.append(mealTitle);

            // Menampilkan deskripsi/tutorial
            var mealDescription = $('<p></p>').text(meal.strInstructions);
            mealDetail.append(mealDescription);

            // Menampilkan resep
            var recipeTitle = $('<h3></h3>').text('Recipe');
            mealDetail.append(recipeTitle);
            var mealRecipe = $('<p></p>').text(meal.strSource);
            mealDetail.append(mealRecipe);

            // Menampilkan video Youtube yang terintegrasi
            var youtubeUrl = meal.strYoutube;
            var youtubeId = youtubeUrl.split('v=')[1];
            var youtubeEmbed = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + youtubeId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            mealDetail.append(youtubeEmbed);
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
});
