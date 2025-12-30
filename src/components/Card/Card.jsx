import React from 'react';

import './Card.css';

function Card({ cardData }) {
  const { name, type, hp, rarity, price, image } = cardData;
  console.log('bud-tests');

  const typeClass = type ? `type-${type.toLowerCase()}` : '';
  const rarityClass = rarity
    ? `rarity-${rarity.toLowerCase().replace(/\s+/g, '-')}`
    : '';

  return (
    <div className={`pokemon-card ${typeClass} ${rarityClass}`}>
      <img src={image} alt={name} className="card-image" />

      <div className="card-info">
        <h3 className="card-name">{name}</h3>

        <div className="card-stats">
          {hp && <span className="hp">HP {hp}</span>}

          {type && <span className={`type-badge ${typeClass}`}>{type}</span>}
        </div>

        <div className="card-footer">
          <span className="rarity">{rarity}</span>
          <span className="price">${Number(price).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card);
