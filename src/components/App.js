import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import DaySummary from './DaySummary';

export default function App() {
  const [location, setLocation] = useState('');
  const [selectedDayData, setSelectedDayData] = useState([]);

  useEffect(() => {
    setSelectedDayData([]);
  }, [location]);

  const handleOnChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDaySelected = (data) => {
    setSelectedDayData(data);
  };

  return (
    <div>
      <input type="text" value={location} onChange={handleOnChange} />
      <Forecast location={location} onDaySelected={handleDaySelected} />
      {selectedDayData.length > 0 && <DaySummary data={selectedDayData} />}
    </div>
  );
}
