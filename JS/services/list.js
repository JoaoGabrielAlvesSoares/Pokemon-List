const API_URL = "https://pokeapi.co/api/v2";

export const DB_URL = "http://localhost:3000/pokemons";

export const getApiPokemon = async (id) => {
  return await fetch(`${API_URL}/pokemon/${id}`).then((res) => res.json());
};

export const catchPokemon = async (pokemon) => {
  await fetch(DB_URL, {
    method: "POST",
    body: JSON.stringify({
      img: pokemon.sprites.front_default,
      name: pokemon.name,
      weight: pokemon.weight,
      type: pokemon.types,
      height: pokemon.height,
      id: pokemon.id,
      favorite: false,
    }),
    headers: { "content-type": "application/json" },
  });
};
