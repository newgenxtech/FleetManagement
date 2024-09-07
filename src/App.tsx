import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Regularly imported components
import AuthLayout from "./layout/AuthLayout";
import Dashboard from "./view/dashboard/page";

const navbarItems = [
  { id: 1, name: "General Master" },
  { id: 2, name: "Test Master" },
  { id: 3, name: "Organization Master" },
  { id: 4, name: "Scheduling & Events" },
  { id: 5, name: "Monitoring" },
  { id: 6, name: "Reports" },
];

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#FFF",
            fontFamily: "Inter, sans-serif  !important",
            // fontSize
          },
          components: {
            Table: {
              headerColor: "#fff",
              headerBg: "#243271",
            },
            Select: {
              optionSelectedBg: "#E6F4FF",
              optionActiveBg: "#E6F4FF",
            },
            Tabs: {
              inkBarColor: "#243271",
              itemActiveColor: "#243271",
              itemSelectedColor: "#243271",
              // fontFamily: "Inter, sans-serif",
            },
            Menu: {
              // horizontalItemSelectedColor: "#EF8927",
              // itemSelectedColor: "#1A1A60",
              // horizontalItemHoverColor: "#EF8927",
              // itemSelectedBg: "lightgray",
            }
          },
        }}
      > */}
      {/* <Suspense fallback={<div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}>
          <Loaders />
        </div>}> */}
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout navbarItems={navbarItems} />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<MainScreenLayout />} />

            <Route path="userMaster" element={<UserMaster />} />

          </Route>

          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="create-password" element={<CreatePassword />} />
            <Route path="authPage" element={<AuthPage />} />
          </Route>
          {/* <Route path="oauth" element={<OAuthRedirect />} /> */}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* </Suspense> */}
      {/* </ConfigProvider> */}
    </QueryClientProvider >
  );
}

export default App;
