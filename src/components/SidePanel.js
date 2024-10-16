import React, { useState } from 'react';
import { Box, Button, Slider, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import the DatePicker

const SidePanel = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 100]); // Initial range
  const [startDate, setStartDate] = useState(null); // Updated to handle Date object
  const [endDate, setEndDate] = useState(null); // Updated to handle Date object
  const [groupBy, setGroupBy] = useState('');

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleApplyFilter = () => {
    onFilter({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      startDate,
      endDate,
      groupBy,
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h2>Filters</h2>
      <Box>
        <h3>Price Range</h3>
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={200} // Adjust as necessary
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            type="number"
            label="Min Price"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            variant="outlined"
          />
          <TextField
            type="number"
            label="Max Price"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            variant="outlined"
          />
        </Box>
      </Box>
      <Box>
        <h3>Date Range</h3>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </Box>
      </Box>
      <Box>
        <h3>Group By</h3>
        <TextField
          label="Group By"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          variant="outlined"
        />
      </Box>
      <Button variant="contained" onClick={handleApplyFilter}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default SidePanel;
