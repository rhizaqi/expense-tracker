import { LuDownload } from "react-icons/lu";
import TransactionsInfoCard from "../Cards/TransactionsInfoCard";
import moment from "moment";

export default function IncomeList({ transactions, onDelete, onDownload }) {
  console.log(transactions, `income list`);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5>Income Source</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-lg">Download</LuDownload>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionsInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="Income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
}
