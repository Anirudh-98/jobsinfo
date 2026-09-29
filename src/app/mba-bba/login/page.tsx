import type { Metadata } from "next";
import { MbaBbaAuth } from "@/components/auth/MbaBbaAuth";

export const metadata: Metadata = {
  title: "MBA / BBA Sign in — Jobsinfo.world",
  description: "Sign in to the MBA & BBA portal for internships, final placements and live projects.",
};

export default function MbaBbaLoginPage() {
  return <MbaBbaAuth mode="login" />;
}
