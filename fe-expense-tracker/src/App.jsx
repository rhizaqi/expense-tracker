import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/userContext";

// import './App.css'

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" excact element={<Login />} />
            <Route path="/signup" excact element={<SignUp />} />
            <Route path="/dashboard" excact element={<Home />} />
            <Route path="/expense" excact element={<Expense />} />
            <Route path="/income" excact element={<Income />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const isAuthenticated = !localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="dashboard" />
  ) : (
    <Navigate to="login" />
  );
};
