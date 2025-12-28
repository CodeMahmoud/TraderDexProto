import React from 'react';
import { Autocomplete } from '@base-ui/react';
import styles from './Search.module.css';

function Search({ data, searchTerm, setSearchTerm }) {
  return (
    <Autocomplete.Root
      items={data}
      filter={(item, query) => {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
        );
      }}
      inputValue={searchTerm || ''} // Safety: never pass undefined to the input
      onInputValueChange={(newValue) => {
        // Safety: If newValue is null/undefined, send empty string
        setSearchTerm(newValue ?? '');
      }}
      onValueChange={(selectedItem) => {
        // Safety: If a user clears the selection, reset to empty string
        setSearchTerm(selectedItem?.name ?? '');
      }}
      itemToStringValue={(item) => (item ? item.name : '')}
    >
      <div className="search-wrapper">
        <label className={styles.Label}>
          Search Pokémon by name or type
          <Autocomplete.Input
            placeholder="e.g. Pikachu or Fire"
            className={styles.Input}
            // Add this handler:
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                // This tells the Autocomplete to close the popup
                // It also prevents the page from refreshing if this is inside a form
                event.defaultPrevented = true;

                // If you want to force an immediate filter update (optional)
                setSearchTerm(event.target.value);
              }
            }}
          />
        </label>

        <Autocomplete.Portal>
          <Autocomplete.Positioner
            className={styles.Positioner}
            sideOffset={8}
            align="start"
          >
            <Autocomplete.Popup className={styles.Popup}>
              <Autocomplete.List>
                {/* Base UI usually passes 'item' to the render function */}
                {(item) => (
                  <Autocomplete.Item
                    key={item.id}
                    className={styles.Item}
                    value={item}
                  >
                    <div className={styles.PokemonItem}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.PokeImage} // Matches our new CSS
                      />
                      <div className={styles.Info}>
                        <div className={styles.PokeName}>{item.name}</div>
                        <div className={styles.PokeType}>{item.type}</div>
                      </div>
                    </div>
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </div>
    </Autocomplete.Root>
  );
}

export default Search;
