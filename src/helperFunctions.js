export default function filterItems(dataArray, selectedType, selectedRarity) {
  return dataArray.filter((item) => {
    const filteredCards = [...selectedType, ...selectedRarity];
    if (selectedType.length > 0) {
      if (selectedRarity.length) {
        return (
          filteredCards.includes(item.type) &&
          filteredCards.includes(item.rarity)
        );
      } else {
        return filteredCards.includes(item.type);
      }
    }
    if (selectedRarity.length > 0) {
      if (selectedType.length > 0) {
        return (
          filteredCards.includes(item.type) &&
          filteredCards.includes(item.rarity)
        );
      } else {
        return filteredCards.includes(item.rarity);
      }
    }
    return (
      filteredCards.includes(item.type) || filteredCards.includes(item.rarity)
    );
  });
}
