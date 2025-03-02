import React from 'react';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import SummaryTable from './SummaryTable';

const Layout = () => {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  return (
    <div className="layout">
      {/* Listado de Pokémon y tabla resumen */}
      <div className="left-panel">
        <PokemonList onSelectPokemon={setSelectedPokemon} />
        <SummaryTable />
      </div>

      {/* Detalle del Pokémon */}
      <div className="right-panel">
        {selectedPokemon && <PokemonDetail pokemonName={selectedPokemon} />}
      </div>
    </div>
  );
};

export default Layout;