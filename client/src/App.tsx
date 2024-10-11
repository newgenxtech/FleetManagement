import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Driver from "./view/Master pages/Driver/Driver";
import Vehicle from "./view/Master pages/vehicle";
import Customer from "./view/Master pages/Customer";

const queryClient = new QueryClient();
const routes = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        element: <Dashboard />,
        index: true
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "master",
        children: [
          {
            path: "driver",
            element: <Driver />,
          },
          {
            path: "vehicle",
            element: <Vehicle />,
          },
          {
            path: "customer",
            element: <Customer />,
          }
        ]
      },
      {
        path: "*",
        element: <h1 className=" 
        flex
        justify-center
        items-center
        h-screen
        text-4xl
        font-bold
        ">
          There is No Such Page 🤷🏻
        </h1>
      }
    ]
  },
  // define the routes for the auth layout
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "*",
        element: <h1 className=" flex
        justify-center
        items-center
        h-screen
        text-4xl
        font-bold">Not Found</h1>
      }
    ]
  }

]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider >
    </Provider>
  );
}

export default App;
