import "@/app/globals.scss";
import CategoryNav from "@/components/CategoryNav";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camping Web",
  description: "Camping Web",
};

export default function RootLayout({
  children,
  showHeaderFooter = true,
}: {
  children: React.ReactNode;
  showHeaderFooter?: boolean;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <Head>
          <title>Camping Web</title>
          <meta name="description" content="Camping Web" />
          <meta property="og:image" content="/logo.svg" />
        </Head>
        <body suppressHydrationWarning={true} className={inter.className}>
          {showHeaderFooter ? (
            <div>
              <div className="h-24 md:w-full md:max-w-[1440px] mx-auto px-[15px] md:px-[20px] flex items-center justify-between">
                <Link href="/">
                  <Image
                    alt="logo"
                    src="/logo.svg"
                    width={160}
                    height={40}
                    priority
                    className="w-[160px] h-auto"
                  />
                </Link>
                <Header />
              </div>
              <CategoryNav />
            </div>
          ) : (
            <></>
          )}
          <div className="md:w-full md:max-w-[1440px] mx-auto px-[15px] md:px-[20px] mt-6">
            {children}
          </div>
          <Chatbot />
          {showHeaderFooter ? (
            <footer className="mt-20 text-white text-center py-4">
              <Footer />
            </footer>
          ) : (
            <></>
          )}
        </body>
      </html>
    </AuthProvider>
  );
}
