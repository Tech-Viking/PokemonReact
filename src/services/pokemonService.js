const API_URL = 'https://pokeapi.co/api/v2';

const fetchPokemonList = async (limit = 20, offset = 0) => {
    try {
        const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching pokemon list:", error);
        throw error;
    }
}

const fetchPokemonDetails = async (url) => {
    try {
        const response = await fetch(url);
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.error("Error fetching pokemon details:", error);
        throw error;
    }
}

const fetchPokemonTypes = async () => {
    try {
      const response = await fetch(`${API_URL}/type`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching pokemon types:", error);
      throw error;
    }
  };


export { fetchPokemonList, fetchPokemonDetails, fetchPokemonTypes };