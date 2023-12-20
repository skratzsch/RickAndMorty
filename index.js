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

const characterURL = 'https://rickandmortyapi.com/api/character/';

// States
const maxPage = 20;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {

  try {
    const response = await fetch(characterURL);
    const data = await response.json();
    const characters = data.results;
    console.log("Charaters", characters);

    characters.forEach(character => {
      const card = CharacterCard(character);
      cardContainer.appendChild(card);
      console.log("Card aus dem forEach", card);
    });

  } catch (error) {
    console.error(error)
  }
} 

fetchCharacters();