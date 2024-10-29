import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAmount, setFromCurrency, setToCurrency } from '../Redux/currencySlice';
import SendIcon from '@mui/icons-material/Send';
import ChartIcon from '@mui/icons-material/ShowChart';
import AlertIcon from '@mui/icons-material/Notifications'; 
function CurrencyConverter() {
    const dispatch = useDispatch();
    const { amount, fromCurrency, toCurrency, exchangeRate } = useSelector((state) => state.currency);
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  
    const convertedAmount = (amount * exchangeRate).toFixed(3);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openQuoteModal = () => {
        closeModal();
        setIsQuoteModalOpen(true);
    };
    const closeQuoteModal = () => setIsQuoteModalOpen(false);
  
    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
        <div className="flex justify-between items-center pb-4 border-b">
          <button className="flex items-center text-blue-600 font-semibold hover:underline focus:outline-none">
             Convert
          </button>
          <button className="flex items-center text-gray-500 hover:text-blue-600 focus:outline-none">
            <SendIcon className="mr-1" /> Send
          </button>
          <button className="flex items-center text-gray-500 hover:text-blue-600 focus:outline-none">
            <ChartIcon className="mr-1" /> Charts
          </button>
          <button className="flex items-center text-gray-500 hover:text-blue-600 focus:outline-none">
            <AlertIcon className="mr-1" /> Alerts
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="col-span-3">
            <label className="block text-gray-700 font-semibold">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => dispatch(setAmount(e.target.value))}
              className="w-full mt-1 p-3 border rounded focus:ring focus:ring-blue-200 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => dispatch(setFromCurrency(e.target.value))}
              className="w-full mt-1 p-3 border rounded focus:ring focus:ring-blue-200 shadow-sm"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">To</label>
            <select
              value={toCurrency}
              onChange={(e) => dispatch(setToCurrency(e.target.value))}
              className="w-full mt-1 p-3 border rounded focus:ring focus:ring-blue-200 shadow-sm"
            >
              <option value="RUB">RUB - Russian Ruble</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-700 text-xl font-medium">
          {amount} {fromCurrency} = <br />
          <span className="font-bold text-2xl text-blue-600">{convertedAmount} {toCurrency}</span>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button onClick={openQuoteModal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none shadow">Track currency</button>
          <button onClick={openModal} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 focus:outline-none shadow">View transfer quote</button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md mx-auto text-center shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">Transfer Quote</h2>
              <p className="mt-4 text-lg">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </p>
              <button
                onClick={closeModal}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {isQuoteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-md mx-auto text-center shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">Transfer Quote</h2>
              <p className="mt-4 text-lg">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </p>
              <button
                onClick={closeQuoteModal}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
}

export default CurrencyConverter;
