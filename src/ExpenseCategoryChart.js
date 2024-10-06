import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Define colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpenseCategoryChart = ({ expenseData }) => {
  // Aggregate expenses by category
  const getCategoryData = () => {
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

  const categoryData = getCategoryData();

  return (
    <div>
      <h3>Expenses by Category</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={categoryData}
          cx={200}
          cy={200}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpenseCategoryChart;
