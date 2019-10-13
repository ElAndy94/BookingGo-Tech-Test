import axios from 'axios';

class DataService {
  static getData = searchTerm => {
    return axios
      .get(
        `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${searchTerm}`
      )
      .then(res => {
        return res;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export default DataService;
