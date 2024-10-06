import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

const AddWalletBalance = () => {
  const [walletIncome, setWalletIncome] = useState('');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [wallet, setWallet] = useState([]);

  // Open the modal
  const handleOpen = () => {
    setIsModelOpen(true);
  };

  // Close the modal and reset the input
  const handleClose = () => {
    setIsModelOpen(false);
    setWalletIncome(''); // Reset the input field
  };

  // Load wallet transactions from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet)); // Parse the saved data and set it as wallet
    }
  }, []);

  // Save wallet transactions to localStorage whenever the wallet array changes
  useEffect(() => {
    if (wallet.length > 0) {
      localStorage.setItem('wallet', JSON.stringify(wallet)); // Save entire wallet array
    }
  }, [wallet]);

  // Add income to the wallet
  const handleAddIncome = () => {
    const incomeAmount = parseFloat(walletIncome);

    if (!isNaN(incomeAmount) && incomeAmount > 0) {
      setWallet([...wallet, incomeAmount]); // Add the valid income to the wallet array
    } else {
      alert('Please enter a valid positive number');
    }

    handleClose(); // Close the modal after adding
  };

  // Calculate total wallet balance dynamically from the wallet array
  const totalBalance = wallet.reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <ReactModal isOpen={isModelOpen} onRequestClose={handleClose}>
        <input
          type='text'
          value={walletIncome}
          onChange={(e) => setWalletIncome(e.target.value)}
          placeholder='Enter income'
        />
        <button onClick={handleAddIncome}>Add Balance</button>
        <button onClick={handleClose}>Close</button>
      </ReactModal>

      <p>Wallet balance: {totalBalance}</p>
      <button onClick={handleOpen}>Add Income</button>
    </>
  );
};

export default AddWalletBalance;
