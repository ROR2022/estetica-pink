import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import dynamic from "next/dynamic";
//const PinkFooter= dynamic(()=>import('@/components/PinkFooter/PinkFooter'),{ssr:false});
//const PinkNavbar= dynamic(()=>import('@/components/PinkNavbar/PinkNavbar'),{ssr:false});
import PinkFooter from "@/components/PinkFooter/PinkFooter";
import PinkNavbar from "@/components/PinkNavbar/PinkNavbar";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

interface CustomMetadata extends Metadata {
  "apple-mobile-web-app-capable"?: "yes" | "no";
  "apple-touch-icon"?: string;
}

export const metadata: CustomMetadata = {
  title: "Estetica Pink",
  description: "Sandra Jimenez - Estilista",
  manifest: "/manifest.json",
  "apple-mobile-web-app-capable": "yes",
  "apple-touch-icon": "/icon-192x192.png",
  keywords: ["Estetica", "Pink", "Sandra Jimenez", "Estilista"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        <PinkNavbar/>
        <div
        style={{
          minHeight: "80vh",
        }}
        >
        {children}
        </div>
        <PinkFooter/>
        </ReduxProvider>
        </body>
    </html>
  );
}
