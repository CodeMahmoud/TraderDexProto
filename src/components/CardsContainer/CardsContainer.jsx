import React from 'react';
import Card from '../Card';
import './CardsContainer.css';

function CardsContainer({ cardData }) {
  return (
    <>
      <div className="cards-container">
        {cardData.map((cardInfo) => (
          <Card cardData={cardInfo} key={cardInfo.id} />
        ))}
      </div>
    </>
  );
}

export default CardsContainer;
