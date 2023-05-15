function PokeInfo({ pokemon }) {
  return (
    <div className="pokedex-right">
      
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      <h2 className="capitalize">{pokemon.name}</h2>
      <p>Height: {(pokemon.height)/10} m.</p>
      <p>Weight: {(pokemon.weight)/10} kg.</p>
      {pokemon.stats?.map((poke) => {
        return <p className="capitalize">{(poke.stat.name)}: {poke.base_stat}</p>
      })}
      
      
    </div>
  );
}

export default PokeInfo;
