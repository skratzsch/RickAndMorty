import CharacterCard from "./components/CharacterCard/CharacterCard.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js";


const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');

const characterURL = 'https://rickandmortyapi.com/api/character';

// States
let maxPage = 42;
let page = 1;
let searchQuery = "";

const searchBar = SearchBar((event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters();
});

searchBarContainer.append(searchBar);


const prevButton = NavButton("prev", () => {
  if (page > 1) {
    //console.log("page", page);
    page--;
    fetchCharacters();
  }
});

const nextButton = NavButton("next", () => {
  if (page < maxPage) {
    page++;
    //console.log("page", page);
    fetchCharacters();
  }
});

searchBar.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputText = document.getElementById('inputText');
  //console.log("inputext.value", inputText.value);
  //console.log("inputext", inputText);
  searchQuery = inputText.value;
  //console.log("inputText-let-variable", searchQuery)
  page = 1;
  fetchCharacters();
});

const pagination = NavPagination();

navigation.append(prevButton, pagination, nextButton);

async function fetchCharacters() {

  try {
    const response = await fetch(`${characterURL}?page=${page}&name=${searchQuery}`);
    //console.log("page-url", `${characterURL}?page=${page}`)
    const data = await response.json();
    console.log("data", data);
    maxPage = data.info.pages;
    //console.log("maxPage", maxPage);
    const characters = data.results;
    //console.log("Charaters", characters);

    cardContainer.innerHTML = "";

    characters.forEach(character => {
      const card = CharacterCard(character);
      cardContainer.appendChild(card);
      //console.log("Card aus dem forEach", card);
    });

    pagination.innerHTML = `${page} / ${maxPage}`

  } catch (error) {
    console.error(error)
  }
} 

fetchCharacters();