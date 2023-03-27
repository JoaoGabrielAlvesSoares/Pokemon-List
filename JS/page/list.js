import { getApiPokemon, catchPokemon } from "../services/list.js";
import { typesColor } from "../constants/typesColor.js";

let ITENS_PER_PAGE = 24;
let page = 0;
let apiPokemonsList = [];

async function getApiPokemons(enableSideButtons) {
  const pokemonsPromises = [];

  apiPokemonsList = [];

  for (
    let i = page * ITENS_PER_PAGE + 1;
    i <= page * ITENS_PER_PAGE + ITENS_PER_PAGE;
    i++
  ) {
    pokemonsPromises.push(getApiPokemon(i));
  }

  await Promise.all(pokemonsPromises).then((pokemons) =>
    apiPokemonsList.push(...pokemons)
  );

  apiPokemonsList.forEach((pokemon) => createPokeCard(pokemon));

  if (enableSideButtons) createSideButtons();
}

function createPokeCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  const pokeImg = document.createElement("img");
  pokeImg.src = pokemon.sprites.front_default;
  pokeImg.alt = pokemon.name;
  pokeImg.classList.add("img");

  const pokeName = document.createElement("h4");
  pokeName.textContent = `${pokemon.name} #${pokemon.id}`;
  pokeName.classList.add("title");

  const pokeType = document.createElement("div");
  pokemon.types.forEach((type) => {
    const colorType = document.createElement("div");
    colorType.textContent = `${type.type.name}`;
    colorType.style.backgroundColor = typesColor[type.type.name];
    colorType.classList.add("typeDiv");

    pokeType.append(colorType);
  });

  const pokeWeightHeight = document.createElement("p");
  pokeWeightHeight.textContent = `Weight: ${pokemon.weight}  Height: ${pokemon.height}`;
  pokeWeightHeight.classList.add("pokeStats");

  const catchBtn = document.createElement("button");
  catchBtn.textContent = "Catch!";
  catchBtn.classList.add("actionBtn", "catchBtn");
  catchBtn.id = `${pokemon.id}`;
  catchBtn.addEventListener("click", () => {
    catchPokemon(pokemon);
  });

  card.append(pokeImg, pokeName, pokeType, pokeWeightHeight, catchBtn);
  document.querySelector("#pokeSection").append(card);
}

function createSideButtons() {
  const rightBtn = document.createElement("i");
  rightBtn.classList.add("fa-solid", "fa-chevron-right");
  rightBtn.addEventListener("click", () => changePage("right"));

  const leftBtn = document.createElement("i");
  leftBtn.classList.add("fa-solid", "fa-chevron-left");
  leftBtn.addEventListener("click", () => changePage("left"));

  const pokeContainer = document.querySelector("#pokeContainer");
  pokeContainer.insertAdjacentElement("afterbegin", leftBtn);
  pokeContainer.insertAdjacentElement("beforeend", rightBtn);
}

function resetPage() {
  document.querySelector("#pokeSection").replaceChildren();
}

function changePage(direction) {
  if (direction === "left" && page <= 0) return;

  if (direction === "left" && page > 0) {
    page--;
  } else {
    page++;
  }

  resetPage();

  getApiPokemons(false);
}

document.addEventListener("DOMContentLoaded", () => getApiPokemons(true));
