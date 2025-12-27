import React from 'react';

import './App.css';

import Navbar from './components/Navbar';
import CardsContainer from './components/CardsContainer/CardsContainer';
import Filter from './components/Filter';
import Search from './components/Search/Search';

import { filterItems } from './helperFunctions';

function App() {
  const [data, setData] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedRarity, setSelectedRarity] = React.useState([]);

  React.useEffect(() => {
    async function fetchEffect() {
      const response = await fetch('/pokeCardsAPI.json');
      const dataJson = await response.json();
      setData(dataJson);
    }
    fetchEffect();
  }, []);

  let newCards = filterItems(data, selectedType, selectedRarity);
  let theCards = newCards.length ? newCards : data;

  return (
    <>
      <header className="site-header">
        <h1>Pokémon Trading Cards</h1>
        <p className="site-subtitle">Your Pokémon Trading Card Collection</p>
      </header>
      <Navbar />
      <Search data={data} />
      <Filter
        type={selectedType}
        rarity={selectedRarity}
        setType={setSelectedType}
        setRarity={setSelectedRarity}
      />
      <main>
        <CardsContainer cardData={theCards} />
      </main>
    </>
  );
}

export default App;
