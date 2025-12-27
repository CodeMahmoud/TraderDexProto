import React from 'react'
import './App.css'

import PureNavbar from './components/Navbar';
import CardsContainer from './components/CardsContainer/CardsContainer';
import Filter from './components/Filter'
import Search from './components/Search/Search';

function App() {
  console.log('APP')
   const [data, setData] = React.useState([]);
   const [selectedType, setSelectedType] = React.useState('');
   const [selectedRarity, setSelectedRarity] = React.useState('');
   

  React.useEffect(() => {
  async function fetchEffect() {
    const response = await fetch('/pokeCardsAPI.json');
    const dataJson = await response.json();
    setData(dataJson);
  }
  fetchEffect();
}, [])


  function filterByInput(dataArray, filterType, value) {
    if (value === '') return dataArray;
    // console.log({value})
    return dataArray.filter((item) => {
      // console.log(item.id)
      if (filterType === 'type') {
        return item.type === value;
      } else if (filterType === 'rarity') {
        return item.rarity === value
      }

    });
  }
  
  let filteredCards = data;
  if (selectedType) {
    filteredCards = filterByInput(data, 'type', selectedType)
    console.log(filteredCards)
  }
  if (selectedRarity) {
    filteredCards = filterByInput(data, 'rarity', selectedRarity);
  }
  return (
    <>
    <header className="site-header">
        <h1>Pokémon Trading Cards</h1>
        <p className="site-subtitle">Your Pokémon Trading Card Collection</p>
      </header>
    <PureNavbar />
    <Search data={data}/>
      <Filter setType={setSelectedType} setRarity={setSelectedRarity} />
    <main>
        <CardsContainer cardData={filteredCards}/>
      </main>
    </>
  )
}

export default App
