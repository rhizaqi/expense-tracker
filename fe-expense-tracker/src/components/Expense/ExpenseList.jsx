import { LuDownload } from "react-icons/lu";
import TransactionsInfoCard from "../Cards/TransactionsInfoCard";
import moment from "moment";

export default function ExpenseList({ transactions, onDownload, onDelete }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5>Expense Source</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-lg">Download</LuDownload>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionsInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="Expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
}
