import { useEffect, useState } from "react";
import CustomBarChart from "../Charts/CustomBarChart";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseBarChartData } from "../../utility/helper";
prepareExpenseBarChartData;

export default function ExpenseOverview({ transactions, onAddExpense }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);

    const groupedData = Object.values(
      result.reduce((acc, curr) => {
        const month = curr.month;
        const amount = parseFloat(curr.amount); // Convert string to number

        if (!acc[month]) {
          acc[month] = { month, amount };
        } else {
          acc[month].amount += amount;
        }

        return acc;
      }, {})
    );

    setChartData(groupedData);
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earning over time and analyze your income trends.
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
}
