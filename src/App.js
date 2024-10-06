// import logo from './logo.svg';
import { SnackbarProvider } from 'notistack';
import './App.css';
import ExpenseForm from './ExpenseForm';
import ExpenseView from './ExpenseView';
import AddWalletBalance from './AddWalletBalance';



function App() {
  return (
    <div className="App">
      <SnackbarProvider/>
      <ExpenseForm/>
      <ExpenseView/>
      <AddWalletBalance/>
    </div>
  );
}

export default App;
