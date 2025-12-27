import React from 'react';



function Search({ data }) {

  const [searchTerm, setSearchTerm] = React.useState('');
  const filteredResults = React.useMemo(() => {
    const query = searchTerm.toLowerCase();
    if (!query) return data;
    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.rarity.toLowerCase().includes(query)
      )
    })
  },[searchTerm, data])
  return (
    <div className='search-wrapper'>
      <input
      className='search-input'
        type='text'
        placeholder='Search by name, type, or rarity...'
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
      />

      <div>
        {filteredResults.map((item) => {
          <div key={item.id}>
          <img src={item.image} alt={item.name} />
          <p className=''>{item.name}</p>
          <p className=''>{item.type}</p>
          <p className=''>{item.rarity}</p>
          <p className=''>{item.price}</p>
        </div>
        })}
      </div>
      {filteredResults.length === 0 && <p>No cards found matching {searchTerm}</p>}
    </div>
  );
}

export default Search;