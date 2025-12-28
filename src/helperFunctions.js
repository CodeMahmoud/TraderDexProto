// export default function filterItems(
//   dataArray,
//   selectedType,
//   selectedRarity,
//   searchTerm
// ) {
//   return dataArray.filter((item) => {
//     const matchesSearch =
//       searchTerm === '' ||
//       item.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const filteredCards = [...selectedType, ...selectedRarity];
//     if (selectedType.length > 0) {
//       if (selectedRarity.length) {
//         return (
//           filteredCards.includes(item.type) &&
//           filteredCards.includes(item.rarity)
//         );
//       } else {
//         return filteredCards.includes(item.type);
//       }
//     }
//     if (selectedRarity.length > 0) {
//       if (selectedType.length > 0) {
//         return (
//           filteredCards.includes(item.type) &&
//           filteredCards.includes(item.rarity)
//         );
//       } else {
//         return filteredCards.includes(item.rarity);
//       }
//     }
//     return (
//       filteredCards.includes(item.type) ||
//       filteredCards.includes(item.rarity) ||
//       filteredCards.includes(matchesSearch)
//     );
//   });
// }
export default function filterItems(
  dataArray,
  selectedType,
  selectedRarity,
  searchTerm = '' // 👈 ADD THIS: Default to empty string if undefined
) {
  // Add a second safety check just in case
  const safeSearch = (searchTerm || '').toLowerCase();

  return dataArray.filter((item) => {
    // Use the safeSearch variable here
    const matchesSearch =
      safeSearch === '' ||
      item.name.toLowerCase().includes(safeSearch) ||
      item.type.toLowerCase().includes(safeSearch) ||
      item.rarity.toLowerCase().includes(safeSearch);

    const matchesType =
      selectedType.length === 0 || selectedType.includes(item.type);

    const matchesRarity =
      selectedRarity.length === 0 || selectedRarity.includes(item.rarity);

    return matchesSearch && matchesType && matchesRarity;
  });
}
