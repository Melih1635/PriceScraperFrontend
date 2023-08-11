import React, { useState } from 'react';
import BrandFilter from '../components/BrandFilter';

import ProcessorOptions from '../components/ProcessorOptions'; // Import the ProcessorOptions component
import RamOptions from '../components/RamOptions';
import ScreenSizeOptions from '../components/ScreenSizeOptions';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import CheapestProducts from '../util/CheapestProducts';
const BrandFilterContainer = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProcessors, setSelectedProcessors] = useState([]);
  const [selectedRams, setSelectedRams] = useState([]);
  const [selectedScreenSizes, setSelectedScreenSizes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  
  const handleSearchSubmit = (searchQuery) => {
    // Perform API request using selected filters and searchQuery
    // Log the search query and selected filters
    console.table({
      'Search Query': searchQuery,
      'Selected Brands': selectedBrands,
      'Selected Processors': selectedProcessors,
      'Selected Rams': selectedRams,
      'Selected Screen Sizes': selectedScreenSizes,
    });
  
    // You can also call your API request here
  };

  const handleBrandSelect = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([brand]);
    }
  };

  const handleProcessorSelect = (processor) => {
    if (selectedProcessors.includes(processor)) {
      setSelectedProcessors(selectedProcessors.filter((p) => p !== processor));
    } else {
      setSelectedProcessors([...selectedProcessors, processor]);
    }
  };

  const handleRamSelect = (ram) => {
    if (selectedRams.includes(ram)) {
      setSelectedRams(selectedRams.filter((r) => r !== ram));
    } else {
      setSelectedRams([...selectedRams, ram]);
    }
  };

  const handleScreenSizeSelect = (screenSize) => {
    if (selectedScreenSizes.includes(screenSize)) {
      setSelectedScreenSizes(selectedScreenSizes.filter((s) => s !== screenSize));
    } else {
      setSelectedScreenSizes([...selectedScreenSizes, screenSize]);
    }
  };
  

  return (
   <div className="container-fluid">
  <Navbar
    isSearchEnabled={selectedBrands.length > 0}
    onSearchSubmit={handleSearchSubmit}
    setSearchQuery={setSearchQuery}
  />
  <div className="row">
    {/* Sidebar */}
    <div className="col-md-2 sidenav" style={{ marginTop: '40px' }}>
      <div className="border rounded-lg p-2 mt-3" style={{ maxWidth: '200px', height: 'calc(100vh - 100px)', overflowY: 'auto',position:'fixed' }}>
        <BrandFilter
          brands={selectedBrands}
          onSelectBrand={handleBrandSelect}
        />
        {selectedBrands.length > 0 && (
          <ProcessorOptions
            selectedBrand={selectedBrands[0]}
            selectedProcessors={selectedProcessors}
            onSelectProcessor={handleProcessorSelect}
          />
        )}
        {selectedBrands.length > 0 && (
          <RamOptions
            selectedBrand={selectedBrands[0]}
            selectedRams={selectedRams}
            onSelectRam={handleRamSelect}
          />
        )}
        {selectedBrands.length > 0 && (
          <ScreenSizeOptions
            selectedBrand={selectedBrands[0]}
            selectedScreenSizes={selectedScreenSizes}
            onSelectScreenSize={handleScreenSizeSelect}
          />
        )}
        {/* Other filter options */}
      </div>
    </div>

    {/* Main Content */}
    <div className="col-md-10">
      <div className="container">
        {/* Content */}
        <ProductList
          searchQuery={searchQuery}
          selectedFilters={{
            selectedBrands,
            selectedProcessors,
            selectedRams,
            selectedScreenSizes,
          }}
        />
        <CheapestProducts />
      </div>
    </div>
  </div>
</div>

  );
};

export default BrandFilterContainer;