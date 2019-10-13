const placeColorMap = {
  A: 'rgb(150, 20, 18)',
  C: 'rgb(10, 99, 176)',
  T: 'rgb(91, 91, 91)',
  D: 'rgb(1, 124, 68)'
};
const GetPlaceColor = placeTypeCode =>
  placeColorMap[placeTypeCode] || 'rgb(255, 154, 2)';

export default GetPlaceColor;
