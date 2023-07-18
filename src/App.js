import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';

const App = () => {
  const [joiningDate, setJoiningDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [currency, setCurrency] = useState('QAR');
  const [gratuityAmount, setGratuityAmount] = useState(null); // Initialize to null
  const [yearsServed, setYearsServed] = useState(0);
  const [daysServed, setDaysServed] = useState(0);
  const [calculationType, setCalculationType] = useState('');

  const calculateGratuity = () => {
    if (!joiningDate || !currentDate || !basicSalary) {
      alert('Please fill in all the required fields.');
      return;
    }

    const startDate = new Date(joiningDate);
    const endDate = new Date(currentDate);

    if (startDate >= endDate) {
      alert('End of Service Date should be after the Date of Joining.');
      return;
    }

    const differenceInMilliseconds = endDate - startDate;
    const years = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const daysPerYear = years >= 5 ? 30 : 21;
    const gratuity = (basicSalary * years * daysPerYear) / 365;

    setGratuityAmount(gratuity);
    setYearsServed(years);
    setDaysServed(days);
    setCalculationType(daysPerYear === 21 ? 'Based on 21 days per year' : 'Based on 30 days per year');
  };

  return (
    <div className="container">
      <img src={logo} alt="Gratuity Calculator Logo" className="logo" />
      <h1>Gratuity Calculator</h1>
      <div>
        <label htmlFor="joining-date">Date of Joining:</label>
        <input type="date" id="joining-date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="current-date">End of Service Date:</label>
        <input type="date" id="current-date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
      </div>
      <div className="input-container">
        <label htmlFor="basic-salary">Basic Salary (in selected currency):</label>
        <input
          type="number"
          id="basic-salary"
          min="0"
          step="0.01"
          placeholder="Enter your basic salary"
          value={basicSalary}
          onChange={(e) => setBasicSalary(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="currency">Select Currency:</label>
        <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="QAR">Qatari Riyal (QAR)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">British Pound (GBP)</option>
          {/* Add more currency options as needed */}
        </select>
      </div>
      <button onClick={calculateGratuity}>Calculate Gratuity</button>
      {gratuityAmount !== null && ( // Check if gratuityAmount is not null before rendering the result
        <div id="result">
          <p>Your gratuity amount is: <span id="gratuity-amount">{gratuityAmount.toFixed(2)}</span> {currency}</p>
          <p>Based on <span id="years-served">{yearsServed}</span> years and <span id="days-served">{daysServed}</span> days of service.</p>
          <p>{calculationType}</p>
        </div>
      )}
    </div>
  );
};

export default App;
