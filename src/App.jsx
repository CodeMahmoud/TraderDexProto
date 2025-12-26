import React from 'react'
import './App.css'

import Navbar from './components/Navbar';
import CardsGrid from './components/CardsContainer/CardsContainer';

function App() {
  return (
    <>
    <h1>Poke Cards</h1>
    <Navbar />
    <CardsGrid />
    </>
  )
}

export default App
