// import logo from './logo.svg';
import { SnackbarProvider } from 'notistack';
import './App.css';
import ExpenseForm from './ExpenseForm';
import ExpenseView from './ExpenseView';



function App() {
  return (
    <div className="App">
      <SnackbarProvider/>
      <ExpenseForm/>
      <ExpenseView/>

    </div>
  );
}

export default App;
