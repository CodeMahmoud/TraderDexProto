import React from "react";
import './Filter.css'
function Filter({ setType, setRarity }) {
  console.log("FILTER");
  function handleTypeFilterSelect(event) {
    if (event.target.checked) {
      setType(event.target.value);
    } else {
      setType("");
    }
  }
  function handleRarityFilterSelect(event) {
    if (event.target.checked) {
      setRarity(event.target.value);
    } else {
      setRarity("");
    }
  }
  return (
    <div className="filter-bar">
      {/* Type Group */}
      <div className="filter-group">
        <span className="filter-label-text">Type:</span>
        <label className="filter-item">
          <input type="checkbox" value='Grass' onChange={handleTypeFilterSelect} />
          Grass
        </label>
        <label className="filter-item">
          <input type="checkbox" value='Fire' onChange={handleTypeFilterSelect} />
          Fire
        </label>
        <label className="filter-item">
          <input type="checkbox" value='Water' onChange={handleTypeFilterSelect} />
          Water
        </label>
        <label className="filter-item">
          <input type="checkbox" value='Electric' onChange={handleTypeFilterSelect} />
          Electric
        </label>
         <label className="filter-item">
          <input type="checkbox" value='Psychic' onChange={handleTypeFilterSelect} />
          Psychic
        </label>
        <label className="filter-item">
          <input type="checkbox" value='Fighting' onChange={handleTypeFilterSelect} />
          Fighting
        </label>
        <label className="filter-item">
          <input type="checkbox" value='Lightning' onChange={handleTypeFilterSelect} />
          Lightning
        </label>
        <label className="filter-item">
          <input type="checkbox" value='Colorless' onChange={handleTypeFilterSelect} />
          Colorless
        </label>
      </div>

      <div className="filter-divider"></div>

      {/* Rarity Group */}
      <div className="filter-group">
        <span className="filter-label-text">Rarity:</span>
        <label className="filter-item">
          <input type="checkbox" value='Rare Holo' onChange={handleRarityFilterSelect} />
          Rare Holo
        </label>
        <label className="filter-item">
          <input type="checkbox" value='Rare' onChange={handleRarityFilterSelect} />
          Rare
        </label>
        <label className="filter-item">
          <input type="checkbox" value='Common' onChange={handleRarityFilterSelect} />
          Common
        </label>
      </div>
    </div>
  );
}

export default React.memo(Filter);
