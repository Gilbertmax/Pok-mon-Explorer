import React from 'react';
import usePokemon from '../hooks/usePokemon';

const SummaryTable = () => {
  const { data } = usePokemon('https://pokeapi.co/api/v2/pokemon?limit=1000');
  const [summary, setSummary] = React.useState({});

  React.useEffect(() => {
    if (data && data.results) {
      const count = data.results.reduce((acc, pokemon) => {
        const firstLetter = pokemon.name[0].toUpperCase();
        acc[firstLetter] = (acc[firstLetter] || 0) + 1;
        return acc;
      }, {});
      setSummary(count);
    }
  }, [data]);

  return (
    <table className="summary-table">
      <thead>
        <tr>
          <th>Letra</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(summary).map(([letter, count]) => (
          <tr key={letter}>
            <td>{letter}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;