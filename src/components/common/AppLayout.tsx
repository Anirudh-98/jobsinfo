"use client";

import React from "react";
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
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
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
