import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/app/provider";
import { ContextProvider } from "@/app/libs/contextapi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <ContextProvider>
        <body className={inter.className}>{children}</body>
        </ContextProvider>
      </Provider>
    </html>
  );
}
