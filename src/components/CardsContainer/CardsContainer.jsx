import React from 'react';
import Card from '../Card'
import './CardsContainer.css'

function CardsContainer() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
  async function fetchEffect() {
    const response = await fetch('./pokeCardsAPI.json');
    const dataJson = await response.json();
    setData(dataJson);
  }
  fetchEffect();
}, [])
  return (
    <>
    <div className="cards-container">
      {data.map((cardInfo) => (
      <Card cardInfo={cardInfo} key={cardInfo.id}/>
      ))}
      </div>
      </>
  )
  
}

export default CardsContainer;
