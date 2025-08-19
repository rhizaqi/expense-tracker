import CARD_LOGIN from "../../assets/images/card-login.png";

export default function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-voilet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 abolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-fuchsia-600 absolute top-[30%]" />
        <div className="" />

        <img src={CARD_LOGIN} alt="" />
      </div>
    </div>
  );
}
