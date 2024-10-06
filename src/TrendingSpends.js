import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Function to aggregate expenses by category
const getCategoryData = (expenseData) => {
  const categoryMap = {};

  expenseData.forEach((expense) => {
    if (categoryMap[expense.category]) {
      categoryMap[expense.category] += parseFloat(expense.amount);
    } else {
      categoryMap[expense.category] = parseFloat(expense.amount);
    }
  });

  // Convert categoryMap to array format for Recharts
  return Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));
};

// ExpenseBarChart component that takes expenseData as a prop
const ExpenseBarChart = ({ expenseData }) => {
  // Aggregate the category data
  const data = getCategoryData(expenseData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical" // Makes the bar chart horizontal
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
