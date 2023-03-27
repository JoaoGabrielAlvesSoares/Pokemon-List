export const DB_URL = "http://localhost:3000/pokemons";

export const fetchMyPokeData = async () => {
  return await fetch(DB_URL).then((response) => response.json());
};

export const favoritePokemons = async (pokemon) => {
  await fetch(`${DB_URL}/${pokemon.id}`, {
    method: "PUT",
    body: JSON.stringify({ ...pokemon, favorite: !pokemon.favorite }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resolve) => resolve.json());
};

export const releasePokemon = async (pokemon) => {
  await fetch(`${DB_URL}/${pokemon.id}`, { method: "DELETE" });
};
