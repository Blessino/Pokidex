import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  cosnt[error, setError] = useState(null);
  const[pokemonList, setPokemonList] = useState([]);
  cosnt[filteredPokemon, setFilteredPokemon] = useState([]);
  const[type, setType] = useState('');

  const url = new URL(`https://pokeapi.co/api/v2/pokemon`);
  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = () => {
    setLoading(true);
    setError(null);

    fetch(`{url}?limit=10`)
    .then((response) => {
      if(!response.ok) throw new Error('Failed to fetch pokemon list');
      return response.json();
    })
    .then((data) => {
      Promise.all(data.results.map((pokemon) => fetch(pokemon.url)
      .then((res) => res.json()
      )))
      .then((fullData) => {
        setPokemon(fullData);
        setFilteredPokemon(fullData);
        setLoading(false);
      });
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    })
  };

  const handleTypeChange = (e) => {
    const {name, value} = e.target;
    if(name === 'type1') {
      setType(value);
    } 
    // else {
    //   setType(value);
    // }
  }

  const handleAbilityChange = (e) => {
    const {name, value} = e.target;
    if(name === 'type') {
      setType(value);
    }
    // else {
    //   setType(value);
    // }
  };

  const filterByType = () => {
    let filtered = pokemonList;
    if (type) {
      filterd= filtered.filter((pokemon) => 
      pokemon.type.some((type) => type.type.name === type)
    );
    }
    setFilteredPokemon(filtered);
  }

  useEffect(() => {
    filterByType();
  },[type]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(search) {
      const foundPokemon = pokemonList.filter((pokemon) => {
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      });
      setFilteredPokemon(foundPokemon);
    } else {
      setFilteredPokemon(pokemonList);
    }
  };

  

  return (
    <>
      {console.log(data)}
    </>
  )
}

export default App
