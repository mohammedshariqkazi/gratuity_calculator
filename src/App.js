import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';

const App = () => {
  const [joiningDate, setJoiningDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [currency, setCurrency] = useState('QAR');
  const [gratuityAmount, setGratuityAmount] = useState(null);
  const [yearsServed, setYearsServed] = useState(0);
  const [daysServed, setDaysServed] = useState(0);
  const [calculationType, setCalculationType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true); // Show loading animation

    setTimeout(() => {
      const differenceInMilliseconds = endDate - startDate;
      const years = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
      const daysPerYear = years >= 5 ? 30 : 21;
      const gratuity = (basicSalary * years * daysPerYear) / 365;

      setGratuityAmount(gratuity);
      setYearsServed(years);
      setDaysServed(days);
      setCalculationType(daysPerYear === 21 ? 'Based on 21 days per year' : 'Based on 30 days per year');
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
      {/* ... (Existing code) */}
      <button onClick={calculateGratuity}>Calculate Gratuity</button>
      {isLoading ? (
        <div className="loading">
          <div className="loading-icon"></div>
        </div>
      ) : (
        gratuityAmount !== null && (
          <div id="result">
            <p>Your gratuity amount is: <span id="gratuity-amount">{gratuityAmount.toFixed(2)}</span> {currency}</p>
            <p>Based on <span id="years-served">{yearsServed}</span> years and <span id="days-served">{daysServed}</span> days of service.</p>
            <p>{calculationType}</p>
          </div>
        )
      )}
      <footer>
        <p>Created with ❤️ by <a href="https://twitter.com/shariqkazi" target="_blank" rel="noopener noreferrer">Shariq Kazi</a></p>
      </footer>
    </div>
  );
};

export default App;
