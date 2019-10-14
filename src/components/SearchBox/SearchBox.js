import React, { useRef, useState, useEffect } from 'react';
import _ from 'lodash';

import './SearchBox.scss';
import Button from '../Button/Button';
import getPlaceColor from '../../utils/GetPlaceColor';
import getPlaceType from '../../utils/GetPlaceType';
import DataService from '../../services/DataService';

const SearchBox = () => {
  const inputEl = useRef();
  let [results, setResults] = useState([]);
  let [showLocations, setShowLocations] = useState(false);
  let [locations, setLocations] = useState();

  useEffect(() => {
    resetSearchbar();
  }, []);

  const resetSearchbar = () => {
    setShowLocations(false);
    setLocations('');
  };

  const handleChange = () => {
    if (inputEl.current.value.length <= 1) {
      setShowLocations(false);
      setLocations('');
      return;
    }

    DataService.getData(inputEl.current.value).then(res => {
      setShowLocations(true);
      setResults(res.data.results.docs);
    });

    if (results.length && showLocations) {
      setLocations(
        <div id='search_box_results_container'>
          <ul className='pickup_location_results'>
            {results.slice(0, 6).map(value => {
              const placeName = `${value.name} ${
                value.iata ? `(${value.iata})` : ''
              }`;

              const placeLocation = `${
                value.city ? value.city : value.region
              }, ${value.country}`;

              if (value.name === 'No results found') {
                return (
                  <li className='list_item' key={value.bookingId}>
                    <div className='results_location_container'>
                      <div className='results_location_name'>{placeName}</div>
                    </div>
                  </li>
                );
              }

              return (
                <li className='list_item' key={value.bookingId}>
                  <div className='results_bookingId_container'>
                    <div
                      style={{
                        backgroundColor: getPlaceColor(value.placeType)
                      }}
                    >
                      {getPlaceType(value.placeType)}
                    </div>
                  </div>
                  <div className='results_location_container'>
                    <div className='results_location_name'>{placeName}</div>
                    <div className='results_support_text'>{placeLocation}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  const blurResults = () => {
    setShowLocations(false);
    setLocations('');
  };

  return (
    <div className='search_box'>
      <h1 className='search_box_title'>Let’s find your ideal car</h1>
      <form>
        <div>
          <label className='search_box_label'>Pick-up Location</label>
          <input
            className='search_box_input'
            id='search_box_input'
            name='pickupLocation'
            type='text'
            autoComplete='off'
            placeholder='city, airport, station, region, district…'
            aria-label='city, airport, station, region, district…'
            ref={inputEl}
            onChange={_.debounce(handleChange, 500)}
            onBlur={blurResults}
          />
        </div>

        {locations}

        <Button
          className='search_box_button'
          btnType='success'
          clicked={() => {
            handleChange();
          }}
          //disabled={true}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;
