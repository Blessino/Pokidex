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

    fetch(`${url}?limit=10`)
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

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
    <div>
      <h1>Pokemon Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <input 
        type="text" 
        value={search}
        onChange={handleSearchChange} />
        <button type='submit'>Search</button>
      </form>
      <div>
        <label>Type 1:
        <input type="text" name='type' value={type} onChange={handleTypeChange} placeholder='Enter the Type' />
        </label>
      </div>
      {loading && <P>Loading...</P>}
      {error && <p>{error}</p>}
      {filteredPokemon && filteredPokemon.length > 0 ? (
        <div className='pokemon--list'>
          {filteredPokemon.map((pokemon) => (
            <div key={pokemon.id} className='pokemon--card'>
              <h3>ID: #{pokemon.id}</h3>
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
              <p><strong>Weight:</strong>{pokemon.weight}g</p>
              <p><strong>Height:</strong> {pokemon.height * 10}in</p>
              <p><strong>Type:</strong> {pokemon.types.map((type) => type.type.name).join(', ')}</p>
              <p><strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          </div>
          ))}
          </div>
      ) : (
        !loading && <p>No Pokemon Found</p>
      )
      }
      
    </div>
  )
}

export default App
