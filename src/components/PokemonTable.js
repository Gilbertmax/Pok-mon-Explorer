import React, { useState } from 'react';
import usePokemon from '../hooks/usePokemon';
import SearchFilter from './SearchFilter';

const PokemonTable = ({ onSelectPokemon }) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const { data, loading, error } = usePokemon(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredPokemon = data.results.filter(pokemon =>
    pokemon.name.includes(filter)
  );

  return (
    <div>
      <SearchFilter filter={filter} setFilter={setFilter} />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemon.map(pokemon => (
            <tr
              key={pokemon.name}
              onClick={() => onSelectPokemon(pokemon.name)}
              style={{ cursor: 'pointer', border: '1px solid #ddd' }}
            >
              <td style={{ padding: '8px' }}>{pokemon.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={() => setPage(page + 1)} style={{ marginLeft: '10px' }}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PokemonTable;