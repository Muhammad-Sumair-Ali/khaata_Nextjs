import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/app/components/common/Navbar'; 
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "YourKhaata.co",
  description: "YourKhaata app developed by Muhammad Sumair Easy To Manage Your Regular Customers Expences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
