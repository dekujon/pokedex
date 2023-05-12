import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        const pokemonList = response.data.results;
        const requests = pokemonList.map((p) => axios.get(p.url));
        axios.all(requests).then((responses) => {
          const pokemonData = responses.map((r) => ({
            name: r.data.name,
            image: r.data.sprites.front_default,
          }));

          setPokemon(pokemonData);
        });
      });

    return () => cancel;
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
    <div className="pokemon-card">
      <h1>Pokemon List</h1>
      <ul>
        {pokemon.map((p) => (
          <li key={p.name}>
            {p.name}
            <img src={p.image} alt={p.name} />
          </li>
        ))}
      </ul>
    </div>
          <Pagination
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        />
        </>
  );
}

export default PokemonList;
