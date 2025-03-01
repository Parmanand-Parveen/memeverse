import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/Store/StoreProvider";
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/Theme-Provider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        
        <SessionProvider>
        <StoreProvider>
          <ThemeProvider    attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
           <Navbar/> 
          {children}
          </ThemeProvider>
        </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
