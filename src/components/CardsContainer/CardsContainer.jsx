import React from 'react';
import PureCard from '../Card'
import './CardsContainer.css'

function CardsContainer({ cardData }) {
 console.log('CONTAINER')
  return (
    <>
    <div className="cards-container">
      {cardData.map((cardInfo) => (
      <PureCard cardData={cardInfo} key={cardInfo.id}/>
      ))}
      </div>
      </>
  )
  
}

export default CardsContainer;
