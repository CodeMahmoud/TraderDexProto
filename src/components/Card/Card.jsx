import React from 'react';

import './Card.css'
function Card({ cardInfo }) {

  const { name, type, hp, rarity, price, image } = cardInfo;

  return (
  <div className={`pokemon-card type-${type.toLowerCase()} rarity-${rarity.toLowerCase().replace(' ', '-')}`}>
      <img src={image} alt={name} className="card-image" />
      
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        
        <div className="card-stats">
          {hp && <span className="hp">HP {hp}</span>}
          
          {type && (
            <span className={`type-badge type-${type.toLowerCase()}`}>
              {type}
            </span>
          )}
        </div>
        
        <div className="card-footer">
          <span className="rarity">{rarity}</span>
          <span className="price">${Number(price).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;
