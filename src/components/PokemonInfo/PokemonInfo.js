import React from 'react';

const PokemonInfo = ({ data }) => {
    if (!data) {
        return <h1>Нажмите на карточку</h1>;
    }

    const { name, abilities, stats } = data;

    return (
        <>
            <h1>{name}</h1>
            <img src={data?.sprites?.other?.dream_world?.front_default} alt={name} />
            <div className="abilities">
                {abilities.map(({ ability }) => (
                    <div className="group" key={ability.name}>
                        <h2>{ability.name}</h2>
                    </div>
                ))}
            </div>
            <div className="base-stat">
                {stats.map(({ stat, base_stat }) => (
                    <h3 key={stat.name}>
                        {stat.name}: {base_stat}
                    </h3>
                ))}
            </div>
        </>
    );
};

export default PokemonInfo;
