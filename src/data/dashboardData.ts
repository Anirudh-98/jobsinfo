// Mock activity history for the student dashboard (chart + stat cards read from the same source).

export type ActivityPoint = { label: string; applied: number; interviews: number };

const toPoints = (rows: [string, number, number][]): ActivityPoint[] =>
  rows.map(([label, applied, interviews]) => ({ label, applied, interviews }));

export type ActivitySeries = { points: ActivityPoint[]; current: number; max: number };
export type ActivityRange = "Monthly" | "Weekly";

export const ACTIVITY: Record<ActivityRange, ActivitySeries> = {
  Monthly: {
    points: toPoints([
      ["Jan", 9, 2], ["Feb", 7, 1], ["Mar", 12, 3], ["Apr", 10, 2], ["May", 14, 4], ["Jun", 11, 3],
      ["Jul", 26, 7], ["Aug", 13, 3], ["Sep", 16, 5], ["Oct", 0, 0], ["Nov", 0, 0], ["Dec", 0, 0],
    ]),
    /** Index of the current period, highlighted by default. */
    current: 8,
    max: 30,
  },
  // Last eight weeks, labelled by the Monday each week starts on.
  Weekly: {
    points: toPoints([
      ["Aug 10", 3, 1], ["Aug 17", 4, 1], ["Aug 24", 2, 0], ["Aug 31", 5, 2],
      ["Sep 7", 3, 1], ["Sep 14", 4, 1], ["Sep 21", 6, 2], ["Sep 28", 2, 1],
    ]),
    current: 7,
    max: 9,
  },
};

/** Recruiter profile views: last month, this month, and the last five weeks (0–5 scale). */
export const PROFILE_VIEWS = { lastMonth: 52, thisMonth: 48, weeks: [4, 3, 5, 3, 3] };

/** Applications and interviews for the last five weeks on a 0–5 scale, for the stat-card dot matrix. */
export const WEEKLY_LEVELS = { applied: [2, 3, 2, 4, 5], interviews: [1, 1, 2, 2, 4] };
