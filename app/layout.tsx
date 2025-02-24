import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import SessionProvider from "./SessionProvider";
import GoogleCaptchaWrapper from "./GoogleCaptchaWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chess Academy",
  description: "Çiğli'yi Kasıp Kavuran Satranç Rüzgarı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>


        <GoogleCaptchaWrapper>
        <Providers>

          <SessionProvider>
            {children}
          </SessionProvider>

        </Providers>

        </GoogleCaptchaWrapper>
       
        
        </body>
    </html>
  );
}
