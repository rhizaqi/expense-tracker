import { useEffect, useState } from "react";
import CustomePieChart from "../Charts/CustomePieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

export default function RecentIncomeWithChart({ data, totalIncome }) {
  const [chartData, setChartData] = useState([]);

  // console.log(data, 999999);
  // console.log(totalIncome, `xxxxxxxxxxxx`);
  console.log(chartData, `yyyyyyyyyyyy`);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: Number(item?.amount), // customePieChart amount need number
    }));
    console.log("Prepared chart data:", dataArr);
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg"> Last 60 Days Income </h5>
      </div>

      <CustomePieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$ ${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
}
