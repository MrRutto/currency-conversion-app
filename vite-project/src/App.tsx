/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [conversions, setConversions] = useState([]);

  const getCurrencies = async () => {
    const reposnse = await axios.get('http://localhost:8004/api/conversions');

    setConversions(reposnse.data.data)
  }

  const convertCurrency = async () => {

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
            <input type='number' />
          </div>
          <div className='form-group'>
            <label>Target Currency</label>
            <select>
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
                  <th>{conversion.id}</th>
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
