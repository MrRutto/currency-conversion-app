/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [usdValue, setUSDValue] = useState(0);
  const [currency, setCurrency] = useState('GBP');
  const [conversions, setConversions] = useState([]);

  const getCurrencies = async () => {
    const reposnse = await axios.get('http://localhost:8004/api/conversions');

    setConversions(reposnse.data.data)
  }

  const convertCurrency = async () => {
    const reposnse = await axios.post('http://localhost:8004/api/convert-currency', {
      usd_value: usdValue,
      currency
    });

    setConversions(reposnse.data.data);
  }

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <>
      <div className='container'>
        <h1>Currency Converter</h1>

        <div className=''>
          <div className='form-group'>
            <label>USD Currency</label>
            <input
              type='number'
              value={usdValue}
              onChange={(e) => setUSDValue(Number(e.target.value))}
            />
          </div>
          <div className='form-group'>
            <label>Target Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value={'KES'}>Kenya Shillings</option>
              <option value={'GBP'}>British Pound</option>
              <option value={'INR'}>Indian Rupee</option>
              <option value={'RSD'}>SA Rand</option>
            </select>
          </div>
          <button type='submit' onClick={convertCurrency}>Convert</button>
        </div>

        <div className=''>
          <table>
            <thead>
              <tr>
                <th>USD Value</th>
                <th>Target Value</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              { conversions.map((conversion: any) => (
                <tr key={conversion.id}>
                  <th>USD {conversion.usd_value}</th>
                  <th>{conversion.target_currency} {conversion.target_value}</th>
                  <th>{conversion.created_at}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
