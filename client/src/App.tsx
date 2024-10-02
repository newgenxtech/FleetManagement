import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from 'react-redux'
import { store } from "./store/store";

// Regularly imported components
import AuthLayout from "@/layouts/AuthLayout";
import Dashboard from "./view/dashboard/page";
import BaseLayout from "./layouts/BaseLayout";
import Login from "./view/login/Login";
import ForgetPassword from "./components/ForgotPassword";
import SignUpPage from "./view/signup/page";
import Driver from "./view/Master pages/Driver";
import Vehicle from "./view/Master pages/vehicle";
import Customer from "./view/Master pages/Customer";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            {/* <Route index element={<Dashboard />} /> */}
            <Route path="/master/driver" element={<Driver />} />
            <Route path="/master/vehicle" element={<Vehicle />} />
            <Route path="/master/customer" element={<Customer />} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgetPassword />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
    </Provider>
  );
}

export default App;
