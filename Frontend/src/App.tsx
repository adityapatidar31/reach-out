import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import Navbar from "./components/components/navbar/Navbar";
import HomePage from "./components/components/pages/HomePage/HomePage";
import HelpPage from "./components/components/pages/HelpPage/HelpPage";
import { ToastContainer } from "react-toastify";
import MyHelpOffersPage from "./components/components/pages/MyHelpOffers/MyHelpOffersPage";
import MyHelpRequestsPage from "./components/components/pages/myHelpRequests/MyHelpRequestsPage";
import MyDetailHelpRequestPage from "./components/components/pages/MyDetailHelpRequests/MyDetailHelpRequestPage";
import CreateHelpRequestPage from "./components/components/pages/CreateHelpRequest/CreateHelpRequestPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginPage from "./components/components/pages/Login/LoginPage";
import SignupPage from "./components/components/pages/Signup/SignupPage";
import RenderAlert from "./components/components/RenderAlert";
import Footer from "./components/components/Footer";
import ProfilePage from "./components/components/pages/Profile/ProfilePage";
import AboutPage from "./components/components/pages/About/AboutPage";
import MessagePage from "./components/components/pages/Message/MessagePage";

export const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      // If no theme in localStorage, default to dark
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          draggable
          theme={theme}
        />
        <BrowserRouter>
          <div className="max-w-screen-xl flex flex-col min-h-screen mx-auto">
            <RenderAlert />
            <Navbar setTheme={setTheme} theme={theme} />
            <main className="sm:p-4 p-2  flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/help/:id" element={<HelpPage />} />
                <Route path="/my-help-offers" element={<MyHelpOffersPage />} />

                <Route
                  path="/my-help-requests"
                  element={<MyHelpRequestsPage />}
                />
                <Route
                  path="/my-help-requests/:id"
                  element={<MyDetailHelpRequestPage />}
                />
                <Route
                  path="/create-help-request"
                  element={<CreateHelpRequestPage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/messages" element={<MessagePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
