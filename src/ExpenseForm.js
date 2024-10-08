import React, { Fragment, useContext, useEffect, useState } from 'react'
import ReactModal from "react-modal";
import { enqueueSnackbar } from 'notistack';
import ExpenseCategoryChart from './ExpenseCategoryChart';
import TrendingSpends from './TrendingSpends';
import { ExpenseContext } from './App';


ReactModal.setAppElement("#root")



const ExpenseForm = () => {
    const [expenseData, setExpenseData] = useState(()=>{
        const savedExpense = localStorage.getItem("expenses")
        return savedExpense ? JSON.parse(savedExpense): [];
    });
    const [modelIsOpen, setModelIsOpen] = useState(false); // for add model
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("Entertainment");
    const [isEditing, setIsEditing] = useState(false); //  for edit model
    const [editIndex, setEditIndex] = useState(null); // for assigning index value on it
    const [walletBalance, setWalletBalance]=useState(()=>{
       let savedBalance= JSON.parse(localStorage.getItem('wallet'))
       return savedBalance ? savedBalance : [];
    })
    const totalBalance = walletBalance.reduce((acc,cur)=>acc+cur,0);

  
    const {expenseDatas, setExpenseDatas}=useContext(ExpenseContext);

  
    //  JSON.parse(localStorage.getItem('wallet'))


    // for first time load
    useEffect(()=>{

        try{
            const savedExpenses = localStorage.getItem('expenses');
            if(savedExpenses)
                {
                    setExpenseData(JSON.parse(savedExpenses));
                    console.log("My Data load: ", savedExpenses)
                }
        }
        catch(err)
        {
            console.error(err)
        }
       

        
    },[])



    console.log(expenseData,"expense data")
    // update my expense
    useEffect(()=>{
        localStorage.setItem('expenses',JSON.stringify(expenseData))
    },[expenseData])

    const handleAddExpense = () => {
        
        const expenseAmount = parseFloat(amount);
        
        console.log(`${title} ${amount} ${date} ${category}`);

       if(expenseAmount>totalBalance)
       {
        enqueueSnackbar("you don't have enough balance to add this expense", {variant:"error"})
       }

        const uniqueId = Date.now();
        const newExpense = { id: uniqueId, title, amount:expenseAmount, date, category };

        if (isEditing && editIndex != null) {
            // updated data 
            const updatedData = expenseData.map((expense) => expense.id === editIndex ? newExpense : expense)
            // update the data to state
            setExpenseData(updatedData)
            enqueueSnackbar("updated expense")
        }
        else {

            setExpenseData([...expenseData, newExpense]);
            enqueueSnackbar("added expense")
        }

        // console.log("Unique ID: ",uniqueId)

        setExpenseDatas([...expenseDatas, expenseData])
        handleClose();
        const newBalance = walletBalance.map((balance)=>balance-expenseAmount);
        setWalletBalance(newBalance);

    }


    

    const handleEditExpense = (idx) => {
        const expenseToEdit = expenseData.find((expense) => expense.id === idx)
        setTitle(expenseToEdit.title);
        setAmount(expenseToEdit.amount);
        setDate(expenseToEdit.date);
        setCategory(expenseToEdit.category);
        setEditIndex(idx)
        setIsEditing(true);
        handleOpen(true);

    }
    const handleOpen = () => {
        setModelIsOpen(true)
    }

    const handleClose = () => {
        setModelIsOpen(false)
        setIsEditing(false)
        setTitle("")
        setAmount("")
        setDate("")
        setCategory("Entertainment")
        setEditIndex(null)

    }

    const handleDelete = (id) => {
        const filteredData = expenseData.filter((expense)=>expense.id!==id)
        setExpenseData(filteredData)
        enqueueSnackbar("deleted expense")
    }

    const totalExpense = expenseData.reduce((acc, curr)=>acc+curr.amount,0);
    console.log(totalExpense,"total expense")
    return (
        <>

            <ReactModal isOpen={modelIsOpen} onRequestClose={handleClose}>

                <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='expense item' />
                <input type='text' name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='expense amount' />
                <input type='date' name='date' value={date} onChange={(e) => setDate(e.target.value)} />
                <select name='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Entertainment</option>
                    <option>Food</option>
                    <option>Travel</option>
                </select>

                <button onClick={handleAddExpense}>

                    {!isEditing ? "Add Expense" : "Save Expense"}
                </button>
                <button onClick={handleClose}>Close</button>
            </ReactModal>

            <button onClick={handleOpen}>Add Expense</button>






<TrendingSpends expenseData={expenseData}/>
<ExpenseCategoryChart expenseData={expenseData}/>


            <p>Expense Data added</p>
            {
                expenseData && expenseData.map((data) => (
                    <Fragment key={data.id}>

                        <p>{data.title}</p>
                        <p> {data.amount}</p>
                        <p> {data.id}</p>
                        <button onClick={() => handleEditExpense(data.id)}>Edit</button>
                        <button onClick={() => handleDelete(data.id)}>Delete</button>
                    </Fragment>

                ))
            }
        </>
    )
}

export default ExpenseForm