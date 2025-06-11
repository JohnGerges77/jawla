import Header from "./_components/Header";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: {
    template: "Jawla : %s ",
    default: "Jawla",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary min-h-screen">
        <LoadingProvider>
          <FavoritesProvider>
            <AuthProvider>
              <Header />
              {children}
            </AuthProvider>
          </FavoritesProvider>
        </LoadingProvider>
        <ToastContainer position="top-center" autoClose={2500} />
      </body>
    </html>
  );
}
