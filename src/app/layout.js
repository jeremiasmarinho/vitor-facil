// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Vitor Fácil App",
  description: "Gerador de apostas para a Lotofácil",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
