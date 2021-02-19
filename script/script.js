    // global variable for the users input into the search box
    var searchItem;


    // this function will load all our recipes from the API
    function loadRecipes() {

        //call function to clear the recipes from the previous search
        clearRecipes();

        // add spinner class to div while search is completing
        $('#spinner').addClass('spinner-border');

        // global variable of the users input
        searchItem = $("#recipe-search").val();


        // ajax call including users input -> searchItem
        $.ajax('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchItem)

            .done(function (result) {

                //call function that is getting the array of objects for the data below
                addToContainer(result);

            })

            //error code to handle
            .fail(function (xhr, status, error) {

                // console.log("error" + xhr);


            })

            //always to hide the spiiner
            .always(function () {

                //always means after done or fail so we will remove the spinner here.
                $('#spinner').removeClass('spinner-border');

            });
    }

    // this function will dynamically add the contents to the container
    function clearRecipes() {

        // clear the search param and container to load in new search items
        $(searchItem).empty();
        $("#receipe-rows-container").empty();

    }

    // dynamically create all the elements related to the recipes from the api call
    function addToContainer(result) {

        //Add container to hold all the items from the query selection
        var myContainer = document.querySelector('#receipe-rows-container');


        //double check if the array is not null or contains items
        if (result.meals !== null && result.meals !== '' && result.meals !== undefined) {

            //loop through the array of objects
            for (var i = 0; i < result.meals.length; i++) {

                // create a div to hold all items form the aray
                var box = document.createElement('div');

                // add class to the div
                box.classList.add('recipe-container');

                // add bootstrap card class for styling
                box.classList.add('card');

                // Add images and append them to the box
                var img = $('<img />').attr({

                    'id': 'recipe-' + result.meals[i].idMeal,
                    'class': "card-img-top",
                    'src': result.meals[i].strMealThumb,
                    'alt': result.meals[i].strMeal + ' recipe'

                }).appendTo(box);

                // create the title for each recipe name in the card 
                var title = document.createElement('h6');

                // name of the recipe
                title.innerText = result.meals[i].strMeal;

                // add a class name to the recipe title div with bootstrap styling
                title.classList.add('recipe-name');
                title.classList.add('card-title');

                // append title to the box div
                box.appendChild(title);

                // create category element
                var category = document.createElement('div');

                // add class to div
                category.classList.add('recipe-category');

                // add bootstrap class for styling
                category.classList.add('card-text');

                // add text to div with array items
                category.innerText = 'Category: ' + result.meals[i].strCategory;

                // append category to box
                box.appendChild(category);


                // create origin div
                var origin = document.createElement('div');

                // add class to div
                origin.classList.add('recipe-origin');

                // add bootstrap class to div for styling
                origin.classList.add('card-text');

                // add text to div
                origin.innerText = 'Origin: ' + result.meals[i].strArea;

                // append div to box
                box.appendChild(origin);




                //validate if the item is there in the object
                if (result.meals[i].strSource !== '' && result.meals[i].strSource !== null && result.meals[i]
                    .strSource !== undefined) {

                    //if there is a link, create the element and add it to the box div
                    var webLink = document.createElement('a');

                    webLink.classList.add('btn');
                    webLink.classList.add('btn-info');

                    webLink.href = result.meals[i].strSource;
                    webLink.innerText = 'View Recipe';
                    webLink.target = '_blank';

                    box.appendChild(webLink);

                } else {

                    // if the link is empty, put a "coming soon" message
                    var webLink = document.createElement('p');
                    webLink.innerText = 'Recipe Link Coming Soon!';
                    webLink.classList.add('alert');
                    webLink.classList.add('alert-light');

                    box.appendChild(webLink);
                }

                // append all box items to the main container
                myContainer.appendChild(box);

                //check if the search parameter is blank
                if (searchItem === null || searchItem === '' || searchItem === undefined) {

                    // clear the div
                    clearRecipes();

                    // add feedback text for user
                    var searchBlank = document.createElement('h6');

                    // add text to container
                    searchBlank.innerText = 'Please enter an item to search for';
                    myContainer.appendChild(searchBlank);
                }
            }
        }

        // if there are no items in the array, display a message
        else {

            // display feedback for user that there are no matching recipes
            var noResult = document.createElement('h6');

            noResult.innerText = 'Sorry, we could not find a receipe for ' + searchItem;

            myContainer.appendChild(noResult);

        }


    }