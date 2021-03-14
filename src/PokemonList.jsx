import React from 'react';
import "./PokemonList.css"

export default function PokemonList({ pokemons, offset }) {
    return (
        <div>
            {pokemons.map((pokemon) => (
                <li key={pokemon.name}>
                    <div className="card">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset++ + 1}.png`} alt={pokemon.name}/>
                        {pokemon.name}
                    </div>
                </li>
            ))}
        </div>
    )
}
