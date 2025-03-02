import React, { useState } from 'react';
import usePokemon from '../hooks/usePokemon';

const PokemonList = ({ onSelectPokemon }) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null); 
  const { data, loading, error } = usePokemon(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredPokemon = data.results.filter(pokemon =>
    pokemon.name.includes(filter.toLowerCase())
  );

  const handlePokemonClick = (pokemonName) => {
    setSelectedPokemon(pokemonName); 
    onSelectPokemon(pokemonName); 
  };

  return (
    <div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Buscar Pokémon"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className="pokemon-table">
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemon.map(pokemon => (
            <tr
              key={pokemon.name}
              onClick={() => handlePokemonClick(pokemon.name)}
              className={selectedPokemon === pokemon.name ? 'selected' : ''}
            >
              <td>{pokemon.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PokemonList;