import React, { Fragment, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { enqueueSnackbar } from 'notistack';

ReactModal.setAppElement('#root');

const ExpenseForm = () => {
  const [expenseData, setExpenseData] = useState(() => {
    const savedExpense = localStorage.getItem('expenses');
    return savedExpense ? JSON.parse(savedExpense) : [];
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    const savedWallet = localStorage.getItem('wallet');
    return savedWallet ? parseFloat(savedWallet) : 0;
  });

  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Entertainment');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Save the updated expenses to localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenseData));
  }, [expenseData]);

  // Save the updated wallet balance to localStorage
  useEffect(() => {
    localStorage.setItem('wallet', walletBalance.toString());
  }, [walletBalance]);

  const handleAddExpense = () => {
    const uniqueId = Date.now();
    const newExpenseAmount = parseFloat(amount);

    // Check if the wallet has enough balance
    if (newExpenseAmount > walletBalance) {
      enqueueSnackbar("You don't have enough balance to add this expense.", { variant: 'error' });
      return;
    }

    const newExpense = { id: uniqueId, title, amount: newExpenseAmount, date, category };

    if (isEditing && editIndex != null) {
      const updatedData = expenseData.map((expense) =>
        expense.id === editIndex ? newExpense : expense
      );
      setExpenseData(updatedData);
      enqueueSnackbar('Expense updated successfully!', { variant: 'success' });
    } else {
      setExpenseData([...expenseData, newExpense]);
      enqueueSnackbar('Expense added successfully!', { variant: 'success' });
    }

    // Deduct the expense from the wallet balance
    setWalletBalance(walletBalance - newExpenseAmount);
    handleClose();
  };

  const handleEditExpense = (idx) => {
    const expenseToEdit = expenseData.find((expense) => expense.id === idx);
    setTitle(expenseToEdit.title);
    setAmount(expenseToEdit.amount);
    setDate(expenseToEdit.date);
    setCategory(expenseToEdit.category);
    setEditIndex(idx);
    setIsEditing(true);
    handleOpen();
  };

  const handleOpen = () => {
    setModelIsOpen(true);
  };

  const handleClose = () => {
    setModelIsOpen(false);
    setIsEditing(false);
    setTitle('');
    setAmount('');
    setDate('');
    setCategory('Entertainment');
    setEditIndex(null);
  };

  const handleDelete = (id) => {
    const filteredData = expenseData.filter((expense) => expense.id !== id);
    setExpenseData(filteredData);
    enqueueSnackbar('Expense deleted successfully!', { variant: 'info' });
  };

  return (
    <>
      <ReactModal isOpen={modelIsOpen} onRequestClose={handleClose}>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Expense item'
        />
        <input
          type='number'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Expense amount'
        />
        <input
          type='date'
          name='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select name='category' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Entertainment</option>
          <option>Food</option>
          <option>Travel</option>
        </select>

        <button onClick={handleAddExpense}>
          {!isEditing ? 'Add Expense' : 'Save Expense'}
        </button>
        <button onClick={handleClose}>Close</button>
      </ReactModal>

      <p>Current Wallet Balance: {walletBalance}</p>
      <button onClick={handleOpen}>Add Expense</button>

      <p>Expense Data:</p>
      {expenseData.map((data) => (
        <Fragment key={data.id}>
          <p>{data.title}</p>
          <p>{data.amount}</p>
          <p>{data.date}</p>
          <p>{data.category}</p>
          <button onClick={() => handleEditExpense(data.id)}>Edit</button>
          <button onClick={() => handleDelete(data.id)}>Delete</button>
        </Fragment>
      ))}
    </>
  );
};

export default ExpenseForm;
