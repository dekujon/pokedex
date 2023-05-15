function PokemonList({ pokemon, pokeOnClick }) {
  return (

      <ul className="pokelist">
        {pokemon.map((p) => (
          <li key={p.name} onClick={() => pokeOnClick(p.id)} className="poke-card">
            <p className="pokeName capitalize">{p.name}</p>
            <img src={p.image} alt={p.name} />
            <p className="pokeName">#{p.id}</p>
          </li>
        ))}
      </ul>
      
      
      

  );
}

export default PokemonList;
