import { CharacterCard } from './js/CharacterCard.js';

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

const characterURL = 'https://rickandmortyapi.com/api/character';

prevButton.addEventListener('click', () => {
  if (page > 1) {
    console.log("page", page);
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener('click', () => {
  if (page < maxPage) {
    page++;
    console.log("page", page);
    fetchCharacters();
  }
});


// States
const maxPage = 48;
let page = 1;
const searchQuery = "";

async function fetchCharacters() {

  try {
    const response = await fetch(`${characterURL}?page=${page}`);
    console.log("page-url", `${characterURL}?page=${page}`)
    const data = await response.json();
    const characters = data.results;
    //console.log("Charaters", characters);

    cardContainer.innerHTML = "";

    characters.forEach(character => {
      const card = CharacterCard(character);
      cardContainer.appendChild(card);
      //console.log("Card aus dem forEach", card);
    });

  } catch (error) {
    console.error(error)
  }
} 


fetchCharacters();