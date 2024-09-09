import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Regularly imported components
import AuthLayout from "@/layouts/AuthLayout";
import Dashboard from "./view/dashboard/page";
import BaseLayout from "./layouts/BaseLayout";
import Login from "./view/login/Login";
import ForgetPassword from "./components/ForgotPassword";
import SignUpPage from "./view/signup/page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Dashboard />} />
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
  );
}

export default App;
