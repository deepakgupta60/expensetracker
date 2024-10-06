import React, { Fragment, useState } from 'react'
import ReactModal from "react-modal";


ReactModal.setAppElement("#root")

const ExpenseForm = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [modelIsOpen, setModelIsOpen] = useState(false); // for add model


    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");

    const [isEditing, setIsEditing] = useState(false); //  for edit model

    const [editIndex, setEditIndex] = useState(null); // for assigning index value on it


    const handleAddExpense = () => {
        console.log(`${title} ${amount} ${date} ${category}`);

        const uniqueId = Date.now();
        const newExpense = { id: uniqueId, title, amount, date, category };

        if (isEditing && editIndex != null) {
            // updated data 
            const updatedData = expenseData.map((expense) => expense.id === editIndex ? newExpense : expense)
            // update the data to state
            setExpenseData(updatedData)

        }
        else {

            setExpenseData([...expenseData, newExpense]);
        }

        // console.log("Unique ID: ",uniqueId)


        handleClose()
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
        setCategory("")

    }

    const handleDelete = (id) => {
        const filteredData = expenseData.filter((expense)=>expense.id!==id)
        setExpenseData(filteredData)
    }

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