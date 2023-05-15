import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Pagination from "./Pagination";
import PokeInfo from "./PokeInfo";
import PokemonList from "./PokemonList";
import Pokeball from "./Pokeball";
import Header from "./Header";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        const pokemonList = res.data.results;
        const requests = pokemonList.map((p) => axios.get(p.url));
        axios.all(requests).then((res) => {
          const pokemonData = res.map((r) => ({
            name: r.data.name,
            image: r.data.sprites.front_default,
            id: r.data.id,
          }));

          setPokemon(pokemonData);
          setLoading(false);
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

  const handlePokemonClick = (id) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
      const clickData = res.data;
      setSelectedPokemon(clickData);
      setIsClicked(true);
    });
  };


  return (
    <>
    <Header />
    <div className="pokedex">
      <div className="pokedex-left">
        <PokemonList pokemon={pokemon} pokeOnClick={handlePokemonClick} />
        <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
      </div>
      <div className="pokedex-right">
        {isClicked ? <PokeInfo pokemon={selectedPokemon} /> : <Pokeball /> }
      </div>
    </div>
    </>
  );
}

export default App;
