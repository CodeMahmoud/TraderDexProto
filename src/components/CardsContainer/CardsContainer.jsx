import React from 'react';
import Card from '../Card';
import './CardsContainer.css';

function CardsContainer({ cardData, onCardClick }) {
  return (
    <>
      <div className="cards-container">
        {cardData.map((cardInfo) => (
          <Card
            cardData={cardInfo}
            key={cardInfo.id}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </>
  );
}

export default CardsContainer;
