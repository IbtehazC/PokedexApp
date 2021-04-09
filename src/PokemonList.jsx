import React, {useState} from 'react';
import "./PokemonList.css";
import axios from 'axios';

export default function PokemonList({ pokemons, offset, showStats }) {

    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => (
                <li key={pokemon.name}>
                    <div onClick={showStats(pokemon.name)} className="card">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset++ + 1}.png`} alt={pokemon.name}/>
                        <p>{pokemon.name}</p>
                    </div>
                </li>
            ))}
        </div>
    )
}
