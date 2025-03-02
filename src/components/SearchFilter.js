import React, { useState, useEffect } from 'react';
import usePokemon from '../hooks/usePokemon';

const SearchFilter = ({ filter, setFilter }) => {
  const [suggestions, setSuggestions] = useState([]);
  const { data } = usePokemon('https://pokeapi.co/api/v2/pokemon?limit=1000');

  useEffect(() => {
    if (data && data.results) {
      const filtered = data.results.filter(pokemon =>
        pokemon.name.includes(filter)
      );
      setSuggestions(filtered);
    }
  }, [filter, data]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {suggestions.slice(0, 5).map(pokemon => (
          <li
            key={pokemon.name}
            onClick={() => setFilter(pokemon.name)}
            style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilter;