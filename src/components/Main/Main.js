import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import Card from '../Card/Card';

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [limit] = useState(6); // Number of items to fetch per page
    const [offset, setOffset] = useState(0); // Current offset
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [currentPage, setCurrentPage] = useState(1); // Current page

    const url = 'https://pokeapi.co/api/v2/pokemon/';

    const pokePagination = async () => {
        setLoading(true);
        try {
            const result = await axios.get(`${url}?limit=${limit}&offset=${offset}`);
            setNextUrl(result.data.next);
            setPrevUrl(result.data.previous);
            setTotalPages(Math.ceil(result.data.count / limit));
            getPokemon(result.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPokemon = async (res) => {
        try {
            const pokemonData = [];
            for (const item of res) {
                const result = await axios.get(item.url);
                pokemonData.push(result.data);
            }
            setPokeData(pokemonData.sort((a, b) => a.id - b.id));
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }
    };

    const handlePreviousClick = () => {
        if (prevUrl) {
            setOffset(offset - limit);
            setPokeData([]);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (nextUrl) {
            setOffset(offset + limit);
            setPokeData([]);
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        pokePagination();
    }, [url, offset]); // Include offset as a dependency in useEffect

    return (
        <>
            <div className="container">
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
                    <div className="btn-group">
                        <button onClick={handlePreviousClick} disabled={!prevUrl}>
                            Previous
                        </button>
                        <h3>{currentPage} / {totalPages}</h3>
                        <button onClick={handleNextClick} disabled={!nextUrl}>
                            Next
                        </button>
                    </div>
                </div>
                <div className="right-content">
                    <PokemonInfo data={pokeDex} />
                </div>
            </div>
        </>
    );
};

export default Main;
