import React, { useState } from 'react';
import DataTable from './components/DataTable';
import SidePanel from './components/SidePanel';

function App() {
  const [isPanelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  return (
    <div>
      <h1>Reunion Data Table</h1>
      <button onClick={togglePanel}>Toggle Side Panel</button>
      <DataTable />
      <SidePanel isOpen={isPanelOpen} onClose={togglePanel} />
    </div>
  );
}

export default App;
