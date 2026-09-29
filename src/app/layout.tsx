import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/common/AppLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jobsinfo.world — The Global Career, Business & Leadership Ecosystem",
  description:
    "Connecting students, job seekers, employers, colleges, businesses and experts. 1,586+ verified jobs, 325+ real-time projects and 500+ expert mentors. 100% free for students and job seekers.",
  keywords: ["Jobsinfo.world", "Jobs", "Real-time projects", "Students", "Employers", "Colleges", "Business clinic", "Mentorship"],
  authors: [{ name: "Jobsinfo.world" }],
  openGraph: {
    title: "Jobsinfo.world — Learn • Do • Earn • Lead",
    description: "One integrated ecosystem for students, job seekers, employers, colleges, businesses and experts.",
    url: "https://jobsinfo.world",
    siteName: "Jobsinfo.world",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans selection:bg-primary/10 selection:text-primary">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
