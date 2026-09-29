import type { Metadata } from "next";
import { MbaBbaAuth } from "@/components/auth/MbaBbaAuth";

export const metadata: Metadata = {
  title: "MBA / BBA Registration — Jobsinfo.world",
  description: "Create a free MBA or BBA account and get matched to internships and placements for your specialisation.",
};

export default function MbaBbaRegisterPage() {
  return <MbaBbaAuth mode="register" />;
}
