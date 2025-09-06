import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utility/helper";
import CustomBarChart from "../Charts/CustomBarChart";

export default function Last30DaysExpenses({ data }) {
  //   console.log(data, `data last 30 days`);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // const numericData = data.map((item) => ({
    //   ...item,
    //   amount: Number(item.amount),
    // }));

    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);
  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
}
