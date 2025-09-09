import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../utility/helper";

export default function IncomeOverview({ transactions, onAddIncome }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // console.log(transactions,9999999);

    const result = prepareIncomeBarChartData(transactions);
    // console.log(result,111111);

    const groupedData = Object.values(
      result.reduce((acc, curr) => {
        // console.log(acc,`xxxxxxxxxxx`);
        // console.log( curr,`???????`);

        const month = curr.month;
        const amount = parseFloat(curr.amount); // Convert string to number

        if (!acc[month]) {
          acc[month] = { month, amount };
        } else {
          acc[month].amount += amount;
        }

        return acc;
      }, {})
    ); // incase there is more than one income in a day in one month

    setChartData(groupedData);

    return () => {};
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

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
}
