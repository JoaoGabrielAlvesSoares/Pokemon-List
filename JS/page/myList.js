import { typesColor } from "../constants/typesColor.js";
import {
  fetchMyPokeData,
  favoritePokemons,
  releasePokemon,
} from "../services/myList.js";

let myPokemonslist = [];

async function startMyPokeList() {
  const results = await fetchMyPokeData();

  myPokemonslist.push(...results);
  myPokemonslist.forEach((pokemon) => createMyPokeCard(pokemon));
}

function createMyPokeCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon");
  card.id = `cardId-${pokemon.id}`;

  if (pokemon.favorite) {
    card.classList.add("favorites");
  }

  const pokeImg = document.createElement("img");
  pokeImg.src = pokemon.img;
  pokeImg.alt = pokemon.name;
  pokeImg.classList.add("img");

  const pokeName = document.createElement("h4");
  pokeName.textContent = `${pokemon.name} #${pokemon.id}`;
  pokeName.classList.add("title");

  const pokeType = document.createElement("div");
  pokemon.type.forEach((types) => {
    const typeColor = document.createElement("div");
    typeColor.textContent = `${types.type.name}`;
    typeColor.style.backgroundColor = typesColor[types.type.name];
    typeColor.classList.add("typeDiv");

    pokeType.append(typeColor);
  });

  const pokeWeightHeight = document.createElement("p");
  pokeWeightHeight.textContent = `Weight: ${pokemon.weight}  Height: ${pokemon.height}`;
  pokeWeightHeight.classList.add("pokeStats");

  const releaseBtn = document.createElement("button");
  releaseBtn.textContent = "Release!";
  releaseBtn.classList.add("actionBtn", "releaseBtn");
  releaseBtn.id = `${pokemon.id}`;
  releaseBtn.addEventListener("click", () => releasePokemon(pokemon));

  const favoriteBtn = document.createElement("i");
  favoriteBtn.classList.add("fa-solid", "fa-star");
  if (pokemon.favorite) {
    favoriteBtn.classList.add("fa-star-checked");
  }
  favoriteBtn.addEventListener("click", () => favoritePokemons(pokemon));

  card.append(
    pokeImg,
    pokeName,
    pokeType,
    pokeWeightHeight,
    favoriteBtn,
    releaseBtn
  );
  document.querySelector("#pokeSection").append(card);
}

document.addEventListener("DOMContentLoaded", startMyPokeList);
