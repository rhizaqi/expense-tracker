import CARD_LOGIN from "../../assets/images/card-login.png";

export default function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-voilet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="" />
        <div className="" />
        <div className="" />

        <img src={CARD_LOGIN} alt="" />
      </div>
    </div>
  );
}
