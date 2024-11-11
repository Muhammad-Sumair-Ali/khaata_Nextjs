import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import 'sweetalert2/dist/sweetalert2.min.css';

6
export const metadata: Metadata = {
  title: "YourKhaata.co",
  description: "YourKhaata app developed by Muhammad Sumair - Easy To Manage Your Regular Customers' Expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title) || "Default Title"}</title>
        <meta name="description" content={String(metadata.description) || "Default description"} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
         
          {children}
          
        </AuthProvider>
      </body>
    </html>
  );
}
