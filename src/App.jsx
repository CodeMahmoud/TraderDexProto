import React from 'react';

import { Dialog } from '@base-ui/react';

import './App.css';

import Navbar from './components/Navbar';
import CardsContainer from './components/CardsContainer/CardsContainer';
import Filter from './components/Filter';
import Search from './components/Search/Search';
// import Modal from './components/Modal/Modal.jsx';

import filterItems from './helperFunctions.js';

function App() {
  const [data, setData] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedRarity, setSelectedRarity] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  // const [isModalToggle, setIsModalToggle] = React.useState(true);
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  const [visibleCount, setVisibleCount] = React.useState(20);
  const [debouncedSearch, setDebouncedSearch] = React.useState('');

  React.useEffect(() => {
    async function fetchEffect() {
      const response = await fetch('/pokeCardsAPI.json');
      const dataJson = await response.json();
      setData(dataJson);
    }
    fetchEffect();
  }, []);

  // let newCards = filterItems(data, selectedType, selectedRarity, searchTerm);
  // let theCards = newCards;
  // const filteredCards = filterItems(
  //   data,
  //   selectedType,
  //   selectedRarity,
  //   searchTerm
  // );
  // const currentCards = filteredCards.slice(0, visibleCount);
  // function handleDismiss() {
  //   console.log(isModalToggle);
  //   setIsModalToggle(!isModalToggle);
  // }

  // 1. We create a "deferred" search term to prevent lagging while typing

  // 2. DEBOUNCE LOGIC: Wait 300ms after typing stops before filtering
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setVisibleCount(20); // Reset scroll when search actually executes
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 3. MEMOIZED FILTERING: Only runs when data or filters actually change
  const filteredCards = React.useMemo(() => {
    return filterItems(
      data,
      selectedType,
      selectedRarity,
      debouncedSearch // Use the debounced version here
    );
  }, [data, selectedType, selectedRarity, debouncedSearch]);

  // 4. LIMITING THE DOM: Only send a small slice to the container
  const currentCards = React.useMemo(() => {
    return filteredCards.slice(0, visibleCount);
  }, [filteredCards, visibleCount]);

  // --- SCROLL LISTENER ---
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentPosition = window.innerHeight + window.scrollY;

      // If we're 500px from the bottom, show 20 more
      if (currentPosition >= scrollHeight - 500) {
        setVisibleCount((prev) => prev + 20);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll count when user filters or searches
  React.useEffect(() => {
    setVisibleCount(20);
  }, [searchTerm, selectedType, selectedRarity]);

  return (
    <>
      <header className="site-header">
        <h1>Pokémon Trading Cards</h1>
        <p className="site-subtitle">Your Pokémon Trading Card Collection</p>
      </header>
      <Navbar />
      {/* <button onClick={handleDismiss}></button> */}
      {/* {isModalToggle && <Modal handleDismiss={handleDismiss} />} */}
      {/* 1. Debug line to confirm state is moving */}
      {/* 2. Passing the setter correctly */}
      <Search
        data={data}
        searchTerm={searchTerm}
        setSearchTerm={(newValue) => setSearchTerm(newValue)}
      />
      <Filter
        type={selectedType}
        rarity={selectedRarity}
        setType={setSelectedType}
        setRarity={setSelectedRarity}
      />
      <main>
        <CardsContainer
          cardData={currentCards}
          onCardClick={(data) => setSelectedPokemon(data)}
        />
      </main>
      <Dialog.Root
        open={Boolean(selectedPokemon)}
        onOpenChange={() => setSelectedPokemon(null)}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="modal-backdrop" />
          {/* <Dialog.Positioner className="modal-positioner"> */}
          <Dialog.Popup className="modal-content">
            {selectedPokemon && (
              <>
                <Dialog.Title className="modal-title">
                  {selectedPokemon.name}
                </Dialog.Title>
                <img
                  src={selectedPokemon.image}
                  alt={selectedPokemon.name}
                  className="modal-image"
                />
                <div className="modal-details">
                  <p>
                    <strong>Type:</strong> {selectedPokemon.type}
                  </p>
                  <p>
                    <strong>Rarity:</strong> {selectedPokemon.rarity}
                  </p>
                  <p>
                    <strong>Description:</strong> This is where your long text
                    goes about {selectedPokemon.name}...
                  </p>
                  {/* Add more stats here like HP, Attack, etc. */}
                </div>
                <Dialog.Close className="close-btn">Close</Dialog.Close>
                {/* <button onClick={() => setSelectedPokemon(null)}>Close</button> */}
                {selectedPokemon && (
                  <>
                    {/* ... your existing Modal Content (Title, Image, Details) ... */}

                    <div className="related-section">
                      <h3 className="related-title">
                        More {selectedPokemon.type} Type Cards
                      </h3>
                      <div className="related-grid">
                        {data
                          .filter(
                            (p) =>
                              p.type === selectedPokemon.type &&
                              p.id !== selectedPokemon.id
                          )
                          .slice(0, 3) // Grab only 3 cards
                          .map((related) => (
                            <div
                              key={related.id}
                              className="related-item"
                              onClick={() => setSelectedPokemon(related)} // Switches the modal to this card!
                            >
                              <div className="related-img-wrapper">
                                <img src={related.image} alt={related.name} />
                              </div>
                              <p className="related-name">{related.name}</p>
                            </div>
                          ))}
                      </div>
                    </div>

                    <Dialog.Close className="close-btn">Close</Dialog.Close>
                  </>
                )}
              </>
            )}
          </Dialog.Popup>
          {/* </Dialog.Positioner> */}
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default App;
