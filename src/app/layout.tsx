import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "buycycle Design Hub",
  description: "Design resources, onboarding, and case studies for the buycycle design team",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("hub-auth");

  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {isAuthenticated && <Navigation />}
        <main className={`relative min-h-screen ${isAuthenticated ? "pt-[72px]" : ""}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
