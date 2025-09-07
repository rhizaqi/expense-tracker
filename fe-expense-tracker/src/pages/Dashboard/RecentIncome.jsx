import { LuArrowRight } from "react-icons/lu";
import TransactionsInfoCard from "../../components/Cards/TransactionsInfoCard";
import moment from "moment";

export default function RecentIncome({ transactions, oneSeeMore }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>

        <button className="card-btn">
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionsInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MM YYYY")}
            amount={item.amount}
            type="Income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}
