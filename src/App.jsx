import React, { useEffect } from 'react'
import './App.css'

import Navbar from './components/Navbar';

function App() {
const [data, setData] = React.useState([]);
useEffect(() => {
  async function fetchEffect() {
    const response = await fetch('./public/pokeCardsAPI.json');
    const dataJson = await response.json();
    setData(dataJson);
  }
  fetchEffect();
}, [])
console.log(data)
  return (
    <>
    <Navbar />
    <h1>Poke Cards</h1>
    <div>
      {data.map((item) => (
        <img key={item.id} src={item.image}/>
      ))}
    </div>
    </>
  )
}

export default App
