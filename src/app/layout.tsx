import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NextAuthSessionProvider from "./providers/sessionProvider";
import CartProvider from "./providers/cartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Euphoria Store",
  description: "Euphoria Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
