import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';

const App = () => {
  const [joiningDate, setJoiningDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [currency, setCurrency] = useState('QAR');
  const [gratuityAmount, setGratuityAmount] = useState(null);
  const [gratuityDues, setGratuityDues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [yearsServed, setYearsServed] = useState(0);

  const calculateGratuity = () => {
    if (!joiningDate || !currentDate || !basicSalary || gratuityDues.length === 0) {
      alert('Please fill in all the required fields.');
      return;
    }

    const startDate = new Date(joiningDate);
    const endDate = new Date(currentDate);

    if (startDate >= endDate) {
      alert('End of Service Date should be after the Date of Joining.');
      return;
    }

    if (gratuityDues.some((dues) => isNaN(dues) || dues <= 0)) {
      alert('Please enter valid gratuity dues (positive numbers) for each year.');
      return;
    }

    setIsLoading(true); // Show loading animation

    setTimeout(() => {
      const differenceInMilliseconds = endDate - startDate;
      const years = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365));
      const gratuity = gratuityDues.reduce((sum, dues) => sum + dues, 0) * basicSalary;

      setGratuityAmount(gratuity);
      setYearsServed(years);
      setIsLoading(false); // Hide loading animation
    }, 2000);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <img src={logo} alt="Gratuity Calculator Logo" className="logo" onClick={handleLogoClick} />
      <h1>Gratuity Calculator</h1>
      <div>
        <label htmlFor="joining-date">Date of Joining:</label>
        <input type="date" id="joining-date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="current-date">End of Service Date:</label>
        <input type="date" id="current-date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="gratuity-dues">Dues per Year (21 days or above):</label>
        <div className="dues-container">
          {Array.from({ length: yearsServed }, (_, index) => (
            <input
              type="number"
              key={index}
              value={gratuityDues[index] || ''}
              onChange={(e) => {
                const newDues = [...gratuityDues];
                newDues[index] = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                setGratuityDues(newDues);
              }}
              placeholder={`Year ${index + 1}`}
            />
          ))}
        </div>
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
      {isLoading && (
        <div className="loading">
          <div className="loading-icon"></div>
        </div>
      )}
      {gratuityAmount !== null && (
        <div id="result">
          <p>Your gratuity amount is: <span id="gratuity-amount">{gratuityAmount.toFixed(2)}</span> {currency}</p>
        </div>
      )}
      <footer>
        <p>Created with ❤️ by <a href="https://twitter.com/shariqkazi" target="_blank" rel="noopener noreferrer">Shariq Kazi
