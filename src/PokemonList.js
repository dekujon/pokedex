function PokemonList({ pokemon, pokeOnClick }) {
  return (

      <ul className="pokelist">
        {pokemon.map((p) => (
          <li key={p.name} onClick={() => pokeOnClick(p.id)} className="poke-card">
            <p className="pokeName capitalize hide">{p.name}</p>
            <img src={p.image} alt={p.name} />
            <p className="pokeName hide">#{p.id}</p>
          </li>
        ))}
      </ul>
      
      
      

  );
}

export default PokemonList;
