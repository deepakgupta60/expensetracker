
import { SnackbarProvider } from 'notistack';
import './App.css';
import ExpenseForm from './ExpenseForm';
import ExpenseView from './ExpenseView';
import AddWalletBalance from './AddWalletBalance';
import { createContext, useState } from 'react';


export const ExpenseContext = createContext()

function App() {

  

  const [expenseDatas, setExpenseDatas]=useState([])

  console.log(expenseDatas,"data")
  return (
    <div className="App">
      <ExpenseContext.Provider value={{expenseDatas, setExpenseDatas}}>

        <SnackbarProvider />
        <h1>Expense Tracker</h1>
        <div>
          <ExpenseForm />
          <AddWalletBalance />

        </div>
        <ExpenseView />

      </ExpenseContext.Provider>
    </div>
  );
}

export default App;
