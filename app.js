let input = document.getElementById("input");
let searchBtn = document.getElementById('searchBtn');
let completeDataContainer = document.querySelector('.left-br')
let oneDataContainer = document.querySelector('.right-br')

searchBtn.addEventListener('click', getCompleteData);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getCompleteData();
    }
});

async function getCompleteData() {
    let completeData = await CompleteDataFetch();

    let { data: { recipes: [...totalData] } } = completeData

    completeDataSetUi(totalData)
}

async function CompleteDataFetch() {
    let completeDataApi = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${input.value}`
    let response = await fetch(completeDataApi);
    return response.json()
}

async function oneDataFetch(id) {
    let oneDataApi = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    let response = await fetch(oneDataApi);
    return response.json()
}

function completeDataSetUi(completeData) {
    completeData.forEach(data => {
        let div = document.createElement('div');
        div.classList.add('data')

        let imgDiv = document.createElement('div');
        let imgTag = document.createElement('img');

        let textDiv = document.createElement('div');
        textDiv.classList.add("textDiv")
        let h2Tag = document.createElement('h2');
        let pTag = document.createElement('p')

        let idList = document.createElement('span')


        completeDataContainer.append(div)
        div.append(imgDiv);
        div.append(textDiv);
        imgDiv.append(imgTag);
        textDiv.append(h2Tag);
        textDiv.append(pTag);
        div.append(idList)

        imgTag.src = data.image_url
        h2Tag.textContent = data.title
        pTag.textContent = data.publisher
        idList.textContent = data.id
    });

    let data = document.querySelectorAll('.data')

    data.forEach((item) => {
        item.addEventListener('click', async () => {
            let id = item.children[2].textContent
            let oneData = await oneDataFetch(id);
            let { data: { recipe: { cooking_time, image_url, ingredients, publisher, servings, title } } } = oneData
            console.log(oneData)
            oneDataUiSet(cooking_time, image_url, ingredients, publisher, servings, title)
        })
    })
};



function oneDataUiSet(cookingTime, imgUrl, ingredients, publisher, servings, title) {
    oneDataContainer.innerHTML = ''
    let imgDiv = document.createElement('div');
    imgDiv.classList.add('img-div');
    let timeAndServingsDiv = document.createElement('div');
    timeAndServingsDiv.classList.add('timeAndServingsDiv')
    let recipeIngredientsDiv = document.createElement('div');
    recipeIngredientsDiv.classList.add('recipeIngredientsDiv');


    let imgTag = document.createElement('img');
    let titleHeading = document.createElement('h1')
    let minutesPara = document.createElement('p');
    let servingsPara = document.createElement('p');
    let headingTag = document.createElement('h2');
    let ul = document.createElement('ul');

    oneDataContainer.append(imgDiv);
    oneDataContainer.append(timeAndServingsDiv);
    oneDataContainer.append(recipeIngredientsDiv);

    imgDiv.append(imgTag);
    imgDiv.append(titleHeading);
    timeAndServingsDiv.append(minutesPara);
    timeAndServingsDiv.append(servingsPara);
    recipeIngredientsDiv.append(ul);
    recipeIngredientsDiv.append(headingTag)

    imgTag.src = imgUrl
    titleHeading.textContent = title
    minutesPara.innerHTML = `<i class="fa-regular fa-clock"></i> ${cookingTime} Minutes`
    servingsPara.innerHTML = `<i class="fa-solid fa-users"></i> ${servings}`
    headingTag.textContent = 'Recipe ingredients'
    ingredients.forEach((item) => {
        let li = document.createElement('li');
        ul.append(li)
        li.innerHTML = `<i class="fa-solid fa-check"></i>    ${item.unit} ${item.description}`
    })

}