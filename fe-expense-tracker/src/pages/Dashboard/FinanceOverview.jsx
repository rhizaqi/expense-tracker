import CustomePieChart from "../../components/Charts/CustomePieChart";

const COLORS = ["#875cf5", "#ff3700ff", "#62c103ff"];

export default function FinanceOverview({
  totalBalance,
  totalIncome,
  totalExpense,
}) {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg"> Financial Overview</h5>
      </div>

      <CustomePieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$ ${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
}
