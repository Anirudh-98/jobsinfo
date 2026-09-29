"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { GlobalSearchModal } from "@/components/common/GlobalSearchModal";
import { AuthModal } from "@/components/common/AuthModal";
import { JobDetailModal } from "@/components/common/JobDetailModal";
import { QuickApplyModal } from "@/components/common/QuickApplyModal";
import { MentorBookingModal } from "@/components/common/MentorBookingModal";
import { ToastNotification } from "@/components/ui/ToastNotification";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // The student and employer dashboards are self-contained app screens: no site navbar, banners or footer.
  const pathname = usePathname();
  const isApp = pathname.startsWith("/dashboard") || pathname.startsWith("/employer");

  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        {!isApp && <Navbar />}
        <main id="main-content" className="flex-1">{children}</main>
        {!isApp && <Footer />}
        <GlobalSearchModal />
        <AuthModal />
        <JobDetailModal />
        <QuickApplyModal />
        <MentorBookingModal />
        <ToastNotification />
      </div>
    </AppProvider>
  );
};
