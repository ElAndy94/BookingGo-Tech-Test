const placeTypeMap = {
  A: 'Airport',
  C: 'City',
  T: 'Station',
  D: 'District'
};
const GetPlaceType = placeTypeCode => placeTypeMap[placeTypeCode] || 'Place';

export default GetPlaceType;
