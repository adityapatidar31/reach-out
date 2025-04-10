import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import Navbar from "./components/components/navbar/Navbar";

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Navbar setTheme={setTheme} theme={theme} />
        <main className="p-4">
          {/* <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes> */}
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
