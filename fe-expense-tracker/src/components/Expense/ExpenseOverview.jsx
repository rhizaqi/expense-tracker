import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utility/helper";
import CustomLineChart from "../Charts/CustomLineChart";

export default function ExpenseOverview({ transactions, onAddExpense }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);

    // const groupedData = Object.values(
    //   result.reduce((acc, curr) => {
    //     const month = curr.month;
    //     const amount = parseFloat(curr.amount); // Convert string to number

    //     if (!acc[month]) {
    //       acc[month] = { month, amount };
    //     } else {
    //       acc[month].amount += amount;
    //     }

    //     return acc;
    //   }, {})
    // );

    setChartData(result);
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your expense over time and gain insights your money goes.
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
}
