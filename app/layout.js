import Header from "./_components/Header";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
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
        <FavoritesProvider>
          <AuthProvider>
             <Header />
            {children}
          </AuthProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
