import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
const PinkFooter= dynamic(()=>import('@/components/PinkFooter/PinkFooter'),{ssr:false});
const PinkNavbar= dynamic(()=>import('@/components/PinkNavbar/PinkNavbar'),{ssr:false});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Estetica Pink",
  description: "Sandra Jimenez - Estilista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PinkNavbar/>
        <div
        style={{
          minHeight: "80vh",
        }}
        >
        {children}
        </div>
        <PinkFooter/>
        </body>
    </html>
  );
}
