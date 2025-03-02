import React from 'react';
import usePokemon from '../hooks/usePokemon';

const PokemonDetail = ({ pokemonName }) => {
  const { data, loading, error } = usePokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pokemon-detail">
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <div className="pokemon-info">
        <p><strong>Altura:</strong> {data.height}</p>
        <p><strong>Peso:</strong> {data.weight}</p>
        <p><strong>Tipos:</strong> {data.types.map(type => type.type.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default PokemonDetail;