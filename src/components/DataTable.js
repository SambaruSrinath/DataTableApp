import React, { useMemo, useState } from 'react';
import {MaterialReactTable} from 'material-react-table';
import sampleData from '../data/sample-data.json';
import SidePanel from './SidePanel'; // Import the SidePanel component
import { Box } from '@mui/material'; // Import Box from Material-UI

const DataTable = () => {
  const [filteredData, setFilteredData] = useState(sampleData);
  
  const handleFilter = (filters) => {
    let newData = sampleData;

    // Apply date range filter
    if (filters.startDate || filters.endDate) {
      newData = newData.filter((item) => {
        const createdAt = new Date(item.createdAt);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);

        return (
          (!filters.startDate || createdAt >= startDate) &&
          (!filters.endDate || createdAt <= endDate)
        );
      });
    }

    // Apply number range filter
    if (filters.minPrice || filters.maxPrice) {
      newData = newData.filter((item) => {
        return (
          (!filters.minPrice || item.price >= filters.minPrice) &&
          (!filters.maxPrice || item.price <= filters.maxPrice)
        );
      });
    }

    // Apply grouping if specified
    if (filters.groupBy) {
      newData = handleGroupData(newData, filters.groupBy);
    }

    setFilteredData(newData);
  };

  // Grouping function
  const handleGroupData = (data, groupBy) => {
    const groupedData = data.reduce((acc, curr) => {
      const key = curr[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});
  
    return Object.entries(groupedData).map(([key, value]) => ({
      group: key,
      items: value,
    }));
  };

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'subcategory', header: 'Subcategory' },
      { accessorKey: 'price', header: 'Price' },
      { accessorKey: 'sale_price', header: 'Sale Price' },
      { accessorKey: 'createdAt', header: 'Created At' },
      { accessorKey: 'updatedAt', header: 'Updated At' },
    ],
    []
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <SidePanel onFilter={handleFilter} />
      <Box sx={{ flexGrow: 1 }}>
        <MaterialReactTable
          columns={columns}
          data={filteredData}
          initialState={{ pagination: { pageIndex: 0, pageSize: 10 } }}
          enableRowSelection
        />
      </Box>
    </Box>
  );
};

export default DataTable;
