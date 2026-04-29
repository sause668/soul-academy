import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { sourGummy, balsamiqSans, robotoFlex, geistSans, geistMono, delius } from "@/app/lib/fonts";
import { ModalProvider, Modal } from "@/app/(_home)/_context/Modal";
import NavBarShell from "@/app/(_home)/_components/NavBar/NavBarShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soul Academy",
  description: "School Management System",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body className={`${sourGummy.variable} ${balsamiqSans.variable} ${robotoFlex.variable} ${geistSans.variable} ${geistMono.variable} ${delius.variable} antialiased min-h-screen bg-screenWhite font-body`}>
        <ModalProvider>
          <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="loadingSpinner navSpinner"/></div>}>
            <NavBarShell />
          </Suspense>
          {children}
          <Modal />
        </ModalProvider>
      </body>
    </html>
  );
}
