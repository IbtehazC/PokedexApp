import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios'; 
import Pagination from './Pagination';

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [currentPageUrl, setCurrentPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=60`);
    const [prevPageUrl, setPrevPageUrl] = useState("");
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [showPokemon, setShowPokemon] = useState(false);
    
    const limit = 60;

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setLoading(false);
            setNextPageUrl(response.data.next);
            setPrevPageUrl(response.data.previous);
            setPokemons(response.data.results.map(pokemon => pokemon));
        });
        return () => cancel();
    }, [currentPageUrl])

    function gotoNextPage() {
        setCurrentPageUrl(nextPageUrl);
        setOffset(offset + limit);
    }

    function gotoPrevPage() {
        setCurrentPageUrl(prevPageUrl);
        setOffset(offset - limit);
    }

    function showStats(pokemonName) {
        setShowPokemon(true);
        console.log(pokemonName);
    }
    
    if (loading) return "Loading..."

    return (
        <>
            <PokemonList 
                pokemons={pokemons}
                offset={offset}
                showStats={showStats}
            />
            <Pagination 
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />
        </>
    )
}
