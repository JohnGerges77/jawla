import Header from "./_components/Header";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { LoadingProvider } from "./context/LoadingContext";
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
      </body>
    </html>
  );
}
