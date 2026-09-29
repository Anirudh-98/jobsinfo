"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Code,
  LineChart,
  Palette,
  Briefcase,
  Layers,
  GraduationCap,
} from "lucide-react";
import { CategoryCard } from "@/components/quietly/CategoryCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const CategorySection: React.FC = () => {
  const router = useRouter();

  const categories = [
    {
      id: "tech",
      icon: Code,
      title: "Technology & Software",
      description: "Frontend, Backend, Cloud DevOps, AI/ML, and Mobile development roles.",
    },
    {
      id: "mba",
      icon: GraduationCap,
      title: "MBA & Campus Cohorts",
      description: "Business analytics, corporate strategy, marketing, and rotational leadership.",
    },
    {
      id: "design",
      icon: Palette,
      title: "Product & UI/UX Design",
      description: "User research, product design systems, visual branding, and motion design.",
    },
    {
      id: "finance",
      icon: LineChart,
      title: "Finance & Accounting",
      description: "Investment banking, corporate audit, tax consulting, and financial modeling.",
    },
    {
      id: "operations",
      icon: Layers,
      title: "Operations & HR Management",
      description: "Talent acquisition, organizational strategy, people ops, and supply chain.",
    },
    {
      id: "growth",
      icon: Briefcase,
      title: "Sales & Strategic Growth",
      description: "Enterprise sales, B2B partnerships, client relations, and growth marketing.",
    },
  ];

  return (
    <section className="w-full bg-canvas py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-3 inline-block">
              Curated Specializations
            </span>
            <h2 className="text-display-lg text-ink font-bold leading-[1.25]">
              Popular Job Categories
            </h2>
            <p className="mt-2 text-body-lg text-body">
              Explore open positions by domain, verified by regional hiring partners.
            </p>
          </div>

          <Link href="/jobs">
            <Button variant="secondary" size="md">
              View All Categories
            </Button>
          </Link>
        </div>

        {/* 3-Column Desktop Grid / 2-Column Tablet / 1-Column Mobile with 16px Gutter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              description={cat.description}
              onClick={() => router.push(`/jobs?cat=${encodeURIComponent(cat.title)}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
