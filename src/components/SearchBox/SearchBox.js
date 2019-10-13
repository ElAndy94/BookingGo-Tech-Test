import React, { useRef, useState, useEffect } from 'react';

import './SearchBox.scss';
import Button from '../UI/Button/Button';
import GetPlaceColor from '../GetPlaceInfo/GetPlaceColor';
import GetPlaceType from '../GetPlaceInfo/GetPlaceType';
import DataService from '../../services/DataService';

const SearchBox = () => {
  const inputEl = useRef();
  let [results, setResults] = useState([]);
  let [showLocations, setShowLocations] = useState(false);
  let [locationsListComponent, setLocationsListComponent] = useState();

  useEffect(() => {
    resetSearchbar();
  }, []);

  const resetSearchbar = () => {
    setShowLocations(false);
    setLocationsListComponent('');
  };

  const handleChange = () => {
    if (inputEl.current.value.length < 2) {
      setShowLocations(false);
      setLocationsListComponent('');
      return;
    }

    DataService.getData(inputEl.current.value).then(res => {
      setShowLocations(true);
      setResults(res.data.results.docs);
      console.log(res.data.results.docs);
    });

    if (results.length && showLocations) {
      setLocationsListComponent(
        <div id='search_box_results_container'>
          <ul className='pickup_location_results'>
            {results.map(value => {
              const placeName =
                value.name + ' ' + (value.iata ? '(' + value.iata + ')' : '');

              // value.city === 'undefined' && '';
              // value.region === 'undefined' && '';

              let placeLocation =
                (value.city ? value.city : value.region) + ', ' + value.country;

              // placeLocation
              //   .replace('undefined', '')
              //   .replace('undefined,', '');

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
                        backgroundColor: GetPlaceColor(value.placeType)
                      }}
                    >
                      {GetPlaceType(value.placeType)}
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
    setLocationsListComponent('');
  };

  return (
    <div className='search_box'>
      <h1 className='search_box_title'>Let’s find your ideal car</h1>
      <form>
        <div>
          <label className='search_box_label'>Pick-up Location</label>
          <input
            className='search_box_input'
            name='pickupLocation'
            type='text'
            autoComplete='off'
            placeholder='city, airport, station, region, district…'
            ref={inputEl}
            onChange={() => {
              handleChange();
            }}
            onBlur={() => {
              blurResults();
            }}
          />
        </div>

        {locationsListComponent}

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
