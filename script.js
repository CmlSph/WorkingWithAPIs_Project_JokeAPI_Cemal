// confirm("This application has been developed for education purposes only. May contain some irritating jokes. Please confirm to continue.");


let api = 'https://v2.jokeapi.dev/joke/'
let amount = 'amount=10' 
let type = '&type=twopart&'

// const queryButton = document.getElementById("addString");
// queryButton.innerText = 'Search Query'
// queryButton.addEventListener("click", addSearchQuery);

// const amountButton = document.getElementById("addAmount");
// amountButton.addEventListener("click", addAmount);

// const languageButton = document.getElementById("selectLanguage");
// languageButton.addEventListener("click", selectLanguage);


function addSearchQuery() {
  const queryInput = document.getElementById("query");
  const searchQuery = `contains=${queryInput.value}&`
  // console.log(searchQuery);
  return searchQuery;
}

function addAmount() {
  const amountInput = document.getElementById("amount");
  const amountOfJokes = `amount=${amountInput.value}`
  console.log(amountOfJokes);
  return amountOfJokes;
}

function selectLanguage() {
  const languageInput = document.getElementById('language');
  const selectedLanguage = `?lang=${languageInput.value}`
  console.log(selectedLanguage);
  return selectedLanguage;
}

function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function blacklistCheckboxValues(name) {
  const blacklistCheckboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let blacklistValues = [];
  blacklistCheckboxes.forEach((checkbox) => {
    blacklistValues.push(checkbox.value);
  });
  return blacklistValues;
}

function jokeTypeCheckboxValues(name) {
  const jokeTypesValues = document.querySelectorAll(`input[name="${name}"]:checked`);
  let jokeTypes = [];
  jokeTypesValues.forEach((checkbox) => {
    jokeTypes.push(checkbox.value);
  });
  return jokeTypes;
}
function generateURLAndFetchData(){
  
    selectedCategories = (getSelectedCheckboxValues('category').toString());
    selectedBlacklists = (blacklistCheckboxValues('blacklist').toString());
    selectedType = (jokeTypeCheckboxValues('parts').toString());
    console.log(selectedType);
    const selectedTypeURLElement = `&type=${selectedType}&`
    console.log(selectedTypeURLElement)
    const blacklistURLElement = `&blacklistFlags=${selectedBlacklists}`
    console.log(selectedBlacklists);
    console.log(blacklistURLElement);
    console.log('selected categories are: ' + selectedCategories);
    
    const newQuery = addSearchQuery();
    console.log(newQuery);
    const amountOfJokes = addAmount();
    console.log(amountOfJokes);
    const selectedLanguage = selectLanguage();
    console.log(selectedLanguage)
    let url = api + selectedCategories + selectedLanguage + blacklistURLElement + selectedTypeURLElement + newQuery + amountOfJokes;
    console.log(url);
    return url
}   
generateURLAndFetchData()

const btn = document.querySelector('#btn');//Generate Jokes button!!!
btn.addEventListener('click', fetchData);
  
function fetchData(){
    const url = generateURLAndFetchData();
    console.log(url);
    fetch(url)
    .then (response => response.json())
    .then (jsonData => {
    console.log(jsonData)
    console.log(jsonData.error)
    selectedType = (jokeTypeCheckboxValues('parts').toString());
    console.log(selectedType)

      if (jsonData.error === true){
        const responseMessage = document.createElement('p')
        responseMessage.innerHTML = 'No jokes were found that match your provided filter(s).'
        console.log(responseMessage);
        responseMessage.style.color = "white";
        responseMessage.style.fontWeight = "bold";
        responseMessage.style.fontSize = '30px';
        responseMessage.style.fontFamily = "arial"
        responseMessage.style.backgroundColor = "blue";
        responseMessage.style.textAlign = "center";
        document.body.appendChild(responseMessage);
        
      }
    for (let i = 0; i < jsonData.jokes.length; i++){
      const button = document.createElement("button");//Selected joke button
     
      
      
      console.log(jsonData.jokes[i].setup)
      console.log(jsonData.jokes[i].delivery)
      
        
      button.innerText = jsonData.jokes[i].setup +  " " +  '(' + jsonData.jokes[i].category + ')'
      
      button.id = 'buttonAccordion'
      document.body.appendChild(button);
    
      const div = document.createElement("div");
      const p = document.createElement("p");
      p.innerText = jsonData.jokes[i].delivery;
      
      div.appendChild(p);
      document.body.appendChild(div);
      if (selectedType === 'single'){
        button.innerText = jsonData.jokes[i].joke;
        p.innerText = `Category:${jsonData.jokes[i].category}`;
      }
      button.addEventListener("click", function() {
      
        this.classList.toggle("active");
        var div = this.nextElementSibling;
        if (div.style.display === "block") {
          div.style.display = "none";
        } else {
          div.style.display = "block";
        } 
    })
    
  }
}).catch(error => {
  const errorElement = document.createElement('p');
  document.body.appendChild(errorElement);
  errorElement.innerHTML = error;
  errorElement.style.color = "white";
  errorElement.style.fontWeight = "bold";
  errorElement.style.fontSize = '30px';
  errorElement.style.fontFamily = "arial"
  errorElement.style.backgroundColor = "red";
  errorElement.style.textAlign = "center";
  console.log(errorElement);
  
})
  
};//Works perfectly;




const reloadButton = document.querySelector("#reload");
// Reload everything:
function reload() {
    reload = location.reload();
}
// Event listeners for reload
reloadButton.addEventListener("click", reload);

/*Bu asagidaki bolumde url'yi update edemiyoruz!*/
// async function fetchData(url){
//     try{
//       const response = await fetch(url);
//       const data = await response.json();
//       return data;
//     }
//     catch(error){
//       console.log(error);
//     }
//   };

// async function getData(){
//     const response = await fetchData('https://v2.jokeapi.dev/joke/Any?amount=10');
//     console.log(response);
// }
// getData()

