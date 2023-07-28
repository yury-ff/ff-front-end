import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  Error,
  Register,
  Login,
  Verify,
  Dashboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import Transfer from "./pages/Transfer";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { useGlobalContext } from "./context";
function App() {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <section className="page page-center">
        <div className="loading"></div>
      </section>
    );
  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <ProtectedRoute path="/transfer" exact>
          <Transfer />
        </ProtectedRoute>
        <ProtectedRoute path="/deposit" exact>
          <Deposit />
        </ProtectedRoute>
        <ProtectedRoute path="/withdraw" exact>
          <Withdraw />
        </ProtectedRoute>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <ProtectedRoute path="/dashboard" exact>
          <Dashboard />
        </ProtectedRoute>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/user/verify-email" exact>
          <Verify />
        </Route>
        <Route path="/user/reset-password" exact>
          <ResetPassword />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
