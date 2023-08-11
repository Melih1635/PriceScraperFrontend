import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URI = 'http://localhost:5000';


const ScreenSizeOptions = ({ selectedBrand, onSelectScreenSize }) => {
  const [screenSizeOptions, setScreenSizeOptions] = useState([]);

  useEffect(() => {
    if (selectedBrand) {
      fetchScreenSizeOptions(selectedBrand);
    }
  }, [selectedBrand]);

  const fetchScreenSizeOptions = async (brand) => {
    try {
      const response = await axios.get(`${API_URI}/api/aggregated/screen-size-options/getall?brand=${brand}`);
      setScreenSizeOptions(response.data.screenSizeOptions);
    } catch (error) {
      console.error('Error fetching screen size options:', error);
    }
  };

  const handleScreenSizeSelect = (screenSize) => {
    onSelectScreenSize(screenSize);
  };

  return (
    <div className="border p-2 mt-3" style={{ position: 'relative', maxWidth: '220px' }}>
      <div className="fixed-title bg-dark text-white px-2 py-1">Ekran Boyutu</div>
      <div className="list-group mt-2" style={{ height: '100px', maxHeight: '200px', overflowY: 'scroll' }}>
        {screenSizeOptions.map((size) => (
          <label key={size} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              value={size}
              onChange={() => handleScreenSizeSelect(size)}
              className="form-check-input me-2"
            />
            <span className="text-sm">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
        };
  export default ScreenSizeOptions;